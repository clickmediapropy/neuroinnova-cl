import * as fs from 'fs';
import * as path from 'path';

interface OldArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  condition?: string;
  treatment?: string[];
  symptoms?: string[];
  author?: string;
  date_published: string;
  date_modified?: string;
  medical_accuracy?: string;
  seo_keywords?: string[];
  featured_image?: string;
  patient_journey_stage?: string;
  wordpress_id?: number;
  wordpress_url?: string;
}

interface ConvertedBlogPost {
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

// Read the JSON file
const jsonPath = path.join(__dirname, '../../educational_articles.json');
const rawData = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(rawData);

// Function to convert HTML to a cleaner format
function htmlToMarkdown(html: string): string {
  if (!html) return '';
  
  // Remove WordPress block comments
  html = html.replace(/<!--.*?-->/gs, '');
  
  // Remove style attributes and class attributes
  html = html.replace(/\s*style="[^"]*"/gi, '');
  html = html.replace(/\s*class="[^"]*"/gi, '');
  
  // Convert headers
  html = html.replace(/<h1[^>]*>(.*?)<\/h1>/gis, '\n\n# $1\n\n');
  html = html.replace(/<h2[^>]*>(.*?)<\/h2>/gis, '\n\n## $1\n\n');
  html = html.replace(/<h3[^>]*>(.*?)<\/h3>/gis, '\n\n### $1\n\n');
  html = html.replace(/<h4[^>]*>(.*?)<\/h4>/gis, '\n\n#### $1\n\n');
  
  // Convert lists
  html = html.replace(/<ul[^>]*>/gi, '\n');
  html = html.replace(/<\/ul>/gi, '\n');
  html = html.replace(/<ol[^>]*>/gi, '\n');
  html = html.replace(/<\/ol>/gi, '\n');
  html = html.replace(/<li[^>]*>(.*?)<\/li>/gis, '- $1\n');
  
  // Convert paragraphs
  html = html.replace(/<p[^>]*>/gi, '\n');
  html = html.replace(/<\/p>/gi, '\n');
  
  // Convert strong/bold
  html = html.replace(/<strong[^>]*>(.*?)<\/strong>/gis, '**$1**');
  html = html.replace(/<b[^>]*>(.*?)<\/b>/gis, '**$1**');
  
  // Convert em/italic
  html = html.replace(/<em[^>]*>(.*?)<\/em>/gis, '*$1*');
  html = html.replace(/<i[^>]*>(.*?)<\/i>/gis, '*$1*');
  
  // Convert links
  html = html.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gis, '[$2]($1)');
  
  // Remove figure and figcaption tags but keep content
  html = html.replace(/<figure[^>]*>/gi, '\n');
  html = html.replace(/<\/figure>/gi, '\n');
  html = html.replace(/<figcaption[^>]*>(.*?)<\/figcaption>/gis, '\n*$1*\n');
  
  // Remove images for now (can be handled separately)
  html = html.replace(/<img[^>]*>/gi, '');
  
  // Remove video blocks
  html = html.replace(/<video[^>]*>.*?<\/video>/gis, '');
  
  // Remove div and span tags
  html = html.replace(/<div[^>]*>/gi, '\n');
  html = html.replace(/<\/div>/gi, '\n');
  html = html.replace(/<span[^>]*>/gi, '');
  html = html.replace(/<\/span>/gi, '');
  
  // Remove mark tags
  html = html.replace(/<mark[^>]*>/gi, '');
  html = html.replace(/<\/mark>/gi, '');
  
  // Remove all other HTML tags
  html = html.replace(/<[^>]+>/g, '');
  
  // Clean up HTML entities
  html = html.replace(/&nbsp;/g, ' ');
  html = html.replace(/&amp;/g, '&');
  html = html.replace(/&lt;/g, '<');
  html = html.replace(/&gt;/g, '>');
  html = html.replace(/&quot;/g, '"');
  html = html.replace(/&#39;/g, "'");
  html = html.replace(/&hellip;/g, "...");
  html = html.replace(/&mdash;/g, "—");
  html = html.replace(/&ndash;/g, "–");
  
  // Clean up multiple newlines
  html = html.replace(/\n\s*\n\s*\n+/g, '\n\n');
  
  // Trim each line
  html = html.split('\n').map(line => line.trim()).join('\n');
  
  return html.trim();
}

// Function to determine category based on content
function determineCategory(article: OldArticle): string {
  const title = article.title.toLowerCase();
  const content = (article.content || '').toLowerCase();
  
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
  } else if (article.condition === 'depression' || title.includes('depresión')) {
    return 'Depresión';
  } else if (article.condition === 'anxiety' || title.includes('ansiedad')) {
    return 'Ansiedad';
  } else if (article.condition === 'bipolar' || title.includes('bipolar')) {
    return 'Trastorno Bipolar';
  } else if (article.condition === 'ocd' || title.includes('toc')) {
    return 'TOC';
  } else if (article.condition === 'phobias' || title.includes('fobia')) {
    return 'Fobias';
  } else {
    return 'Psiquiatría';
  }
}

// Function to determine tags
function determineTags(article: OldArticle): string[] {
  const tags: string[] = [];
  const content = ((article.title || '') + ' ' + (article.content || '')).toLowerCase();
  
  if (content.includes('emt') || content.includes('tms')) tags.push('EMT');
  if (content.includes('tdcs')) tags.push('tDCS');
  if (content.includes('depresión')) tags.push('Depresión');
  if (content.includes('ansiedad')) tags.push('Ansiedad');
  if (content.includes('bipolar')) tags.push('Trastorno Bipolar');
  if (content.includes('dolor')) tags.push('Dolor Crónico');
  if (content.includes('neuromodulación')) tags.push('Neuromodulación');
  if (content.includes('tratamiento')) tags.push('Tratamiento');
  if (content.includes('cognitiva')) tags.push('Rehabilitación Cognitiva');
  if (content.includes('toc')) tags.push('TOC');
  if (content.includes('fobia')) tags.push('Fobias');
  if (content.includes('insomnio')) tags.push('Trastornos del Sueño');
  
  // Remove duplicates and limit to 5 tags
  return [...new Set(tags)].slice(0, 5);
}

// Function to clean and truncate summary
function createSummary(excerpt: string): string {
  if (!excerpt) return '';
  
  // Clean HTML entities
  let summary = excerpt.replace(/\[&hellip;\]/g, '...');
  summary = summary.replace(/&[^;]+;/g, ' ');
  
  // Remove any remaining HTML tags
  summary = summary.replace(/<[^>]+>/g, '');
  
  // Truncate to 200 characters
  if (summary.length > 200) {
    summary = summary.substring(0, 197) + '...';
  }
  
  return summary.trim();
}

// Convert articles
const convertedArticles: ConvertedBlogPost[] = data.articles
  .filter((article: OldArticle) => article.title && article.content) // Filter out articles without title or content
  .slice(0, 50) // Limit to first 50 articles for now
  .map((article: OldArticle, index: number) => {
    const cleanContent = htmlToMarkdown(article.content);
    const wordCount = cleanContent.split(/\s+/).filter(word => word.length > 0).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200)); // At least 1 minute
    
    return {
      id: (index + 6).toString(), // Start from 6 since we already have 5 articles
      slug: article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: article.title,
      summary: createSummary(article.excerpt),
      content: cleanContent,
      date: article.date_published ? article.date_published.split('T')[0] : '2024-01-01',
      category: determineCategory(article),
      image: article.featured_image || '',
      author: article.author || 'Dr. Victor Adorno',
      readTime: `${readTime} min`,
      tags: determineTags(article)
    };
  });

// Create the TypeScript output
const output = `import { BlogPost } from './blogPosts';

// Converted articles from WordPress
export const convertedBlogPosts: BlogPost[] = ${JSON.stringify(convertedArticles, null, 2)};

// Export for use in main blogPosts file
export default convertedBlogPosts;`;

// Write to file
const outputPath = path.join(__dirname, '../data/convertedBlogPosts.ts');
fs.writeFileSync(outputPath, output);

console.log(`Successfully converted ${convertedArticles.length} articles!`);
console.log(`Categories found: ${[...new Set(convertedArticles.map(a => a.category))].join(', ')}`);
console.log(`Output saved to: ${outputPath}`);