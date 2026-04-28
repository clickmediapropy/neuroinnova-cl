import React from 'react';
import { BlogPost } from '@/data/blogPosts';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

export const BlogPostContent: React.FC<BlogPostContentProps> = ({ post, relatedPosts = [] }) => {
  const categoryColors: { [key: string]: string } = {
    'EMT/TMS': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    'tDCS': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    'Psiquiatría': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    'Casos de Éxito': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    'Dolor Crónico': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    'Rehabilitación': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300',
  };

  // Simple markdown-like content parser
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    const processList = () => {
      if (currentList.length > 0 && listType) {
        const ListComponent = listType === 'ul' ? 'ul' : 'ol';
        elements.push(
          <ListComponent key={elements.length} className={listType === 'ul' ? 'list-disc' : 'list-decimal'} style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            {currentList.map((item, idx) => (
              <li key={idx} className="text-foreground/80 mb-3 leading-relaxed text-lg">{item}</li>
            ))}
          </ListComponent>
        );
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Headers
      if (trimmedLine.startsWith('### ')) {
        processList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold mt-8 mb-3 text-foreground">
            {trimmedLine.substring(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith('## ')) {
        processList();
        elements.push(
          <h2 key={index} className="text-2xl font-semibold mt-10 mb-4 text-foreground">
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('# ')) {
        processList();
        elements.push(
          <h1 key={index} className="text-3xl font-bold mt-12 mb-6 text-foreground">
            {trimmedLine.substring(2)}
          </h1>
        );
      }
      // Lists
      else if (trimmedLine.startsWith('- ')) {
        if (listType !== 'ul') processList();
        listType = 'ul';
        currentList.push(trimmedLine.substring(2));
      } else if (/^\d+\.\s/.test(trimmedLine)) {
        if (listType !== 'ol') processList();
        listType = 'ol';
        currentList.push(trimmedLine.replace(/^\d+\.\s/, ''));
      }
      // Paragraphs
      else if (trimmedLine !== '') {
        processList();
        
        // Process inline styles
        let processedLine = trimmedLine;
        
        // Bold
        processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground/90">$1</strong>');
        
        // Italic
        processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        elements.push(
          <p 
            key={index} 
            className="mb-6 text-foreground/80 leading-[1.8] text-lg"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }
    });

    processList(); // Process any remaining list
    return elements;
  };

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" size="sm" asChild className="mb-8 text-muted-foreground hover:text-foreground hover:translate-x-[-4px] transition-all">
        <Link to="/blog">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al Blog
        </Link>
      </Button>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            className={categoryColors[post.category] || 'bg-gray-100 text-gray-800'}
          >
            {post.category}
          </Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          {post.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-y border-border/50 py-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} de lectura</span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="mb-12 blog-content">
        {renderContent(post.content)}
      </div>

      {/* CTA Section */}
      <div className="bg-muted/50 rounded-lg p-8 mb-12 text-center border border-border">
        <h3 className="text-2xl font-bold mb-4">
          ¿Listo para dar el siguiente paso?
        </h3>
        <p className="text-muted-foreground mb-6">
          Agenda una consulta con nuestros especialistas y descubre cómo podemos ayudarte
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a
              href={buildWhatsAppUrl("Hola, me gustaría agendar una consulta de evaluación para tratamiento de neuromodulación.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Agendar Consulta
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/contacto">
              Más Información
            </Link>
          </Button>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border/50 pt-12">
          <h3 className="text-2xl font-bold mb-6 text-foreground">Artículos Relacionados</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.id}
                to={`/blog/${relatedPost.slug}`}
                className="group"
              >
                <div className="bg-muted/30 border border-border/50 rounded-lg p-4 hover:shadow-sm transition-all hover:border-primary/20">
                  <Badge 
                    className={`mb-2 ${categoryColors[relatedPost.category] || 'bg-gray-100 text-gray-800'}`}
                  >
                    {relatedPost.category}
                  </Badge>
                  <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedPost.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default BlogPostContent;