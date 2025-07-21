import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
  title: string;
  summary: string;
  date: string;
  category: string;
  image: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ title, summary, date, category, image }) => {
  const categoryColors: { [key: string]: string } = {
    'EMT/TMS': 'bg-blue-100 text-blue-800',
    'tDCS': 'bg-green-100 text-green-800',
    'Psiquiatría': 'bg-purple-100 text-purple-800',
    'Casos de Éxito': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="aspect-video bg-gray-200 relative overflow-hidden">
        {/* Placeholder para imagen - en producción usarías la imagen real */}
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <span className="text-4xl font-bold text-white/20">Blog</span>
        </div>
      </div>
      
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[category] || 'bg-gray-100 text-gray-800'}`}>
            {category}
          </span>
        </div>
        <h3 className="text-xl font-semibold line-clamp-2 text-foreground">
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
        
        <Button asChild className="w-full">
          <Link to={`/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}>
            Leer más
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;