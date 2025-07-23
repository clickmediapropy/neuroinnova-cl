// Script to fix the format of converted blog posts
import * as fs from 'fs';
import * as path from 'path';

// Read the converted posts file
const convertedPath = path.join(__dirname, '../data/convertedBlogPosts.ts');
const content = fs.readFileSync(convertedPath, 'utf8');

// Extract the posts array from the file
const postsMatch = content.match(/export const convertedBlogPosts: BlogPost\[\] = (\[[\s\S]*\]);/);
if (!postsMatch) {
  console.error('Could not find posts array in file');
  process.exit(1);
}

// Parse the posts (carefully handling the template literals)
let postsString = postsMatch[1];

// Function to safely evaluate the posts array
function parsePostsArray(str: string): any[] {
  // This is a simplified parser - in production you'd want something more robust
  return eval(str);
}

const posts = parsePostsArray(postsString);

// Transform posts to match our schema
const transformedPosts = posts.map((post: any, index: number) => {
  return {
    id: (index + 6).toString(), // Start from 6 since we have 5 existing posts
    slug: post.slug,
    title: post.title,
    summary: post.excerpt || post.summary,
    content: post.content,
    date: post.date,
    category: post.category,
    image: post.image || '',
    author: post.author,
    readTime: post.readingTime || post.readTime || '5 min',
    tags: post.tags
  };
});

// Create the output
const output = `// Converted blog posts from educational_articles.json
import { BlogPost } from './blogPosts';

export const convertedBlogPosts: BlogPost[] = ${JSON.stringify(transformedPosts, null, 2).replace(/"content": "(.*?)"/gs, (match, content) => {
  // Preserve template literal formatting for content
  const unescaped = content
    .replace(/\\n/g, '\n')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');
  return `"content": \`${unescaped}\``;
})};

export default convertedBlogPosts;`;

// Write the fixed file
fs.writeFileSync(convertedPath, output);

console.log(`Fixed ${transformedPosts.length} posts successfully!`);