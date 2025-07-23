const fs = require('fs');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('./educational_articles.json', 'utf8'));

// Function to convert HTML to a cleaner format and extract text
function htmlToMarkdown(html) {
  if (!html) return '';
  
  // Remove style attributes
  html = html.replace(/style="[^"]*"/g, '');
  
  // Convert headers
  html = html.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
  html = html.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
  html = html.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
  
  // Convert lists
  html = html.replace(/<ul[^>]*>/gi, '\n');
  html = html.replace(/<\/ul>/gi, '\n');
  html = html.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
  
  // Convert paragraphs
  html = html.replace(/<p[^>]*>/gi, '\n');
  html = html.replace(/<\/p>/gi, '\n\n');
  
  // Convert strong/bold
  html = html.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
  html = html.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
  
  // Convert em/italic
  html = html.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
  html = html.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
  
  // Remove all other HTML tags
  html = html.replace(/<[^>]+>/g, '');
  
  // Clean up multiple newlines
  html = html.replace(/\n\n\n+/g, '\n\n');
  
  // Decode HTML entities
  html = html.replace(/&nbsp;/g, ' ');
  html = html.replace(/&amp;/g, '&');
  html = html.replace(/&lt;/g, '<');
  html = html.replace(/&gt;/g, '>');
  html = html.replace(/&quot;/g, '"');
  html = html.replace(/&#39;/g, "'");
  html = html.replace(/&hellip;/g, "...");
  
  return html.trim();
}

// Function to determine category based on content
function determineCategory(article) {
  const title = article.title.toLowerCase();
  const content = article.content.toLowerCase();
  
  if (title.includes('emt') || title.includes('tms') || content.includes('estimulación magnética')) {
    return 'EMT/TMS';
  } else if (title.includes('tdcs') || content.includes('corriente directa')) {
    return 'tDCS';
  } else if (title.includes('caso') || title.includes('historia') || title.includes('éxito')) {
    return 'Casos de Éxito';
  } else if (title.includes('dolor') || content.includes('dolor crónico')) {
    return 'Dolor Crónico';
  } else if (title.includes('rehabilitación') || title.includes('cognitiva')) {
    return 'Rehabilitación';
  } else if (article.condition === 'depression') {
    return 'Depresión';
  } else if (article.condition === 'anxiety') {
    return 'Ansiedad';
  } else if (article.condition === 'bipolar') {
    return 'Trastorno Bipolar';
  } else {
    return 'Psiquiatría';
  }
}

// Function to determine tags
function determineTags(article) {
  const tags = [];
  const content = (article.title + ' ' + article.content).toLowerCase();
  
  if (content.includes('emt') || content.includes('tms')) tags.push('EMT');
  if (content.includes('tdcs')) tags.push('tDCS');
  if (content.includes('depresión')) tags.push('Depresión');
  if (content.includes('ansiedad')) tags.push('Ansiedad');
  if (content.includes('bipolar')) tags.push('Trastorno Bipolar');
  if (content.includes('dolor')) tags.push('Dolor Crónico');
  if (content.includes('neuromodulación')) tags.push('Neuromodulación');
  if (content.includes('tratamiento')) tags.push('Tratamiento');
  if (content.includes('cognitiva')) tags.push('Rehabilitación Cognitiva');
  
  // Add SEO keywords if they exist
  if (article.seo_keywords) {
    article.seo_keywords.forEach(keyword => {
      if (keyword && keyword.length > 2) {
        tags.push(keyword.charAt(0).toUpperCase() + keyword.slice(1));
      }
    });
  }
  
  // Remove duplicates and limit to 5 tags
  return [...new Set(tags)].slice(0, 5);
}

// Convert articles
const convertedArticles = data.articles.map((article, index) => {
  const cleanContent = htmlToMarkdown(article.content);
  const wordCount = cleanContent.split(' ').length;
  const readTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
  
  return {
    id: (index + 1).toString(),
    slug: article.slug,
    title: article.title,
    summary: article.excerpt.replace(/\[&hellip;\]/g, '...').substring(0, 200) + '...',
    content: cleanContent,
    date: article.date_published.split('T')[0],
    category: determineCategory(article),
    image: article.featured_image || '',
    author: article.author || 'Dr. Victor Adorno',
    readTime: `${readTime} min`,
    tags: determineTags(article),
    wordpressId: article.wordpress_id
  };
});

// Output format for TypeScript
const output = `export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  image: string;
  author: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = ${JSON.stringify(convertedArticles, null, 2)};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag))))
    .slice(0, limit);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(blogPosts.map(post => post.category)));
};

export const getAllTags = (): string[] => {
  return Array.from(new Set(blogPosts.flatMap(post => post.tags)));
};`;

// Write to file
fs.writeFileSync('./src/data/blogPostsConverted.ts', output);

console.log(`Converted ${convertedArticles.length} articles successfully!`);
console.log(`Categories found: ${[...new Set(convertedArticles.map(a => a.category))].join(', ')}`);