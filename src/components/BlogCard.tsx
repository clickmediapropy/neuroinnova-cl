import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, Clock, User } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogCardProps {
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  author?: string;
  readTime?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ 
  title, 
  summary, 
  date, 
  category, 
  image, 
  slug,
  author = 'NeuroInnova',
  readTime = '5 min'
}) => {
  const categoryColors: { [key: string]: string } = {
    'EMT/TMS': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    'tDCS': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    'Psiquiatría': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
    'Casos de Éxito': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
    'Dolor Crónico': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
    'Rehabilitación': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300',
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:scale-[1.02] hover:border-primary/30">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-white/20">NeuroInnova</span>
          </div>
        )}
        <Badge 
          className={`absolute top-4 right-4 ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}
        >
          {category}
        </Badge>
      </div>
      
      <CardHeader>
        <h3 className="text-xl font-semibold line-clamp-2 text-foreground hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">
          {summary}
        </p>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground w-full">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(date).toLocaleDateString('es-ES', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <Button asChild className="w-full">
          <Link to={`/blog/${slug}`}>
            Leer más
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;