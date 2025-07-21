// GitHub API configuration
const GITHUB_TOKEN = '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';
const GITHUB_OWNER = 'clickmediapropy';
const GITHUB_REPO = 'neuroinnova-cl';
const GITHUB_BRANCH = 'main';

interface GitHubFile {
  path: string;
  content: string;
  sha?: string;
}

interface CommitResult {
  success: boolean;
  commitSha?: string;
  commitUrl?: string;
  error?: string;
}

// Base64 encode/decode utilities
function encodeBase64(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function decodeBase64(str: string): string {
  return decodeURIComponent(escape(atob(str)));
}

// Get file content from GitHub
async function getFileContent(path: string): Promise<GitHubFile | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        // File doesn't exist, which is ok for new files
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      path: data.path,
      content: decodeBase64(data.content),
      sha: data.sha
    };
  } catch (error) {
    console.error(`Error fetching file ${path}:`, error);
    throw error;
  }
}

// Update or create a file on GitHub
async function updateFile(
  path: string, 
  content: string, 
  message: string, 
  sha?: string
): Promise<any> {
  const body: any = {
    message,
    content: encodeBase64(content),
    branch: GITHUB_BRANCH
  };

  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub API error: ${error.message || response.statusText}`);
  }

  return response.json();
}

// Apply changes from ProcessedChange
export async function applyChangesToGitHub(
  changes: {
    file: string;
    oldCode: string;
    newCode: string;
    lineStart: number;
    lineEnd: number;
  }[],
  commitMessage: string
): Promise<CommitResult> {
  try {
    // Group changes by file
    const fileChanges = new Map<string, typeof changes[0][]>();
    
    for (const change of changes) {
      if (!fileChanges.has(change.file)) {
        fileChanges.set(change.file, []);
      }
      fileChanges.get(change.file)!.push(change);
    }

    // Process each file
    const results = [];
    
    for (const [filePath, fileChangeList] of fileChanges) {
      // Get current file content
      const currentFile = await getFileContent(filePath);
      
      if (!currentFile) {
        // For new files, we'll create them with the new content
        const newContent = fileChangeList.map(c => c.newCode).join('\n');
        const result = await updateFile(filePath, newContent, commitMessage);
        results.push(result);
        continue;
      }

      // Apply changes to existing file
      let updatedContent = currentFile.content;
      
      // Sort changes by line number in reverse order to avoid offset issues
      const sortedChanges = [...fileChangeList].sort((a, b) => b.lineStart - a.lineStart);
      
      console.log(`Applying ${sortedChanges.length} changes to ${filePath}`);
      
      for (const change of sortedChanges) {
        console.log(`Looking for: "${change.oldCode.substring(0, 100)}..."`);
        
        // Try exact match first
        if (updatedContent.includes(change.oldCode)) {
          updatedContent = updatedContent.replace(change.oldCode, change.newCode);
          console.log('✓ Applied change with exact match');
        } else {
          // Try normalized whitespace match
          const normalizeWhitespace = (str: string) => str.replace(/\s+/g, ' ').trim();
          const normalizedOld = normalizeWhitespace(change.oldCode);
          const normalizedContent = normalizeWhitespace(updatedContent);
          
          if (normalizedContent.includes(normalizedOld)) {
            // Find the actual content with flexible whitespace
            const flexibleRegex = new RegExp(
              change.oldCode
                .split(/\s+/)
                .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
                .join('\\s*'),
              'g'
            );
            
            if (flexibleRegex.test(updatedContent)) {
              updatedContent = updatedContent.replace(flexibleRegex, change.newCode);
              console.log('✓ Applied change with flexible whitespace match');
            }
          } else {
            // Try line-based replacement for multi-line changes
            const lines = updatedContent.split('\n');
            
            if (change.lineStart > 0 && change.lineEnd > 0 && 
                change.lineStart <= lines.length && change.lineEnd <= lines.length) {
              
              // Special case: if oldCode contains <h1 element, use direct line replacement
              if (change.oldCode.includes('<h1') && change.newCode.includes('<h1')) {
                console.log(`Replacing <h1> element at lines ${change.lineStart}-${change.lineEnd}`);
                const newLines = change.newCode.split('\n');
                lines.splice(change.lineStart - 1, change.lineEnd - change.lineStart + 1, ...newLines);
                updatedContent = lines.join('\n');
                console.log(`✓ Applied <h1> change by replacing lines ${change.lineStart}-${change.lineEnd}`);
              } else {
                // Extract the lines to be replaced
                const linesToReplace = lines.slice(change.lineStart - 1, change.lineEnd).join('\n');
                console.log(`Lines ${change.lineStart}-${change.lineEnd}: "${linesToReplace.substring(0, 100)}..."`);
                
                // Replace the lines
                const newLines = change.newCode.split('\n');
                lines.splice(change.lineStart - 1, change.lineEnd - change.lineStart + 1, ...newLines);
                updatedContent = lines.join('\n');
                console.log(`✓ Applied change by replacing lines ${change.lineStart}-${change.lineEnd}`);
              }
            } else {
              console.warn(`✗ Could not find content to replace in ${filePath}`);
              console.warn(`Searched for: "${change.oldCode.substring(0, 100)}..."`);
              
              // Last resort: try partial match on key parts
              if (change.oldCode.includes('<h1') && change.newCode.includes('<h1')) {
                // Special handling for HTML elements
                const h1Regex = /<h1[^>]*>[\s\S]*?<\/h1>/;
                if (h1Regex.test(updatedContent)) {
                  updatedContent = updatedContent.replace(h1Regex, change.newCode);
                  console.log('✓ Applied change by replacing entire <h1> element');
                }
              }
            }
          }
        }
      }

      // Update the file
      const result = await updateFile(
        filePath, 
        updatedContent, 
        commitMessage, 
        currentFile.sha
      );
      results.push(result);
    }

    // Return success with the last commit info
    const lastResult = results[results.length - 1];
    return {
      success: true,
      commitSha: lastResult.commit.sha,
      commitUrl: lastResult.commit.html_url
    };

  } catch (error: any) {
    console.error('Error applying changes to GitHub:', error);
    return {
      success: false,
      error: error.message || 'Error desconocido al aplicar cambios'
    };
  }
}

// Test GitHub connection
export async function testGitHubConnection(): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );
    
    return response.ok;
  } catch (error) {
    console.error('Error testing GitHub connection:', error);
    return false;
  }
}

// Get repository info
export async function getRepositoryInfo() {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch repository info');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching repository info:', error);
    throw error;
  }
}

// Check if a file exists in the repository
export async function checkFileExists(filePath: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );
    
    return response.ok;
  } catch (error) {
    console.error(`Error checking if file exists ${filePath}:`, error);
    return false;
  }
}