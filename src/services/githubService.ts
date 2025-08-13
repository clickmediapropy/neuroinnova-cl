// GitHub API configuration
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_OWNER = import.meta.env.VITE_GITHUB_OWNER || 'clickmediapropy';
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'neuroinnova-cl';
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
  branchName?: string;
  pullRequestUrl?: string;
}

// --- Helper functions for branch management ---

function generateBranchName(commitMessage: string): string {
  const sanitized = commitMessage
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word chars except space and dash
    .trim()
    .replace(/\s+/g, '-') // replace spaces with dashes
    .substring(0, 40); // truncate
  return `ai-patch/${sanitized}-${Date.now()}`;
}

// Get branch head SHA from GitHub
async function getBranchSha(branch: string = GITHUB_BRANCH): Promise<string> {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs/heads/${branch}`,
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );
    if (!response.ok) {
      throw new Error(`GitHub API error getting branch SHA: ${response.status}`);
    }
    const data = await response.json();
    return data.object.sha;
}

// Create a new branch on GitHub
async function createBranch(newBranchName: string, sha: string): Promise<any> {
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/refs`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ref: `refs/heads/${newBranchName}`,
        sha: sha,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    // Branch might already exist, which is not a critical error in some workflows.
    // For now, we'll throw.
    throw new Error(`GitHub API error creating branch: ${error.message || response.statusText}`);
  }
  return response.json();
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
  branch: string,
  sha?: string
): Promise<any> {
  const body: any = {
    message,
    content: encodeBase64(content),
    branch: branch
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
    const newBranchName = generateBranchName(commitMessage);

    // 1. Get the SHA of the main branch
    const mainSha = await getBranchSha(GITHUB_BRANCH);

    // 2. Create a new branch from the main branch SHA
    await createBranch(newBranchName, mainSha);

    // Group changes by file
    const fileChanges = new Map<string, typeof changes[0][]>();
    for (const change of changes) {
      if (!fileChanges.has(change.file)) {
        fileChanges.set(change.file, []);
      }
      fileChanges.get(change.file)!.push(change);
    }

    // Process each file and commit to the new branch
    const results = [];
    for (const [filePath, fileChangeList] of fileChanges) {
      const currentFile = await getFileContent(filePath);

      if (!currentFile) {
        // Create new file
        const newContent = fileChangeList.map(c => c.newCode).join('\n');
        const result = await updateFile(filePath, newContent, commitMessage, newBranchName);
        results.push(result);
        continue;
      }

      // Apply changes to existing file
      let updatedContent = currentFile.content;
      const sortedChanges = [...fileChangeList].sort((a, b) => b.lineStart - a.lineStart);
      
      for (const change of sortedChanges) {
        // Apply changes using the same logic as before
        if (updatedContent.includes(change.oldCode)) {
          updatedContent = updatedContent.replace(change.oldCode, change.newCode);
        } else {
          const lines = updatedContent.split('\n');
          if (change.lineStart > 0 && change.lineEnd > 0 && change.lineEnd <= lines.length) {
            lines.splice(change.lineStart - 1, change.lineEnd - change.lineStart + 1, ...change.newCode.split('\n'));
            updatedContent = lines.join('\n');
          } else {
             console.warn(`Could not apply change to ${filePath}, content not found.`);
          }
        }
      }

      // Update the file on the new branch
      const result = await updateFile(
        filePath,
        updatedContent,
        commitMessage,
        newBranchName,
        currentFile.sha
      );
      results.push(result);
    }

    // Return success with info about the new branch and a PR link
    const lastResult = results[results.length - 1];
    const pullRequestUrl = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/pull/new/${newBranchName}`;

    return {
      success: true,
      commitSha: lastResult.commit.sha,
      commitUrl: lastResult.commit.html_url,
      branchName: newBranchName,
      pullRequestUrl: pullRequestUrl,
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