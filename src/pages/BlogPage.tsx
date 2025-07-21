import React from 'react';
import { BlogCard } from '../components/BlogCard';
import Layout from '@/components/layout/Layout';

const BlogPage = () => {
  const blogPosts = [
    {
      title: '¿Qué es la Estimulación Magnética Transcraneal?',
      summary: 'Descubre cómo la EMT/TMS está revolucionando el tratamiento de la depresión resistente sin efectos secundarios sistémicos.',
      date: '2024-03-15',
      category: 'EMT/TMS',
      image: '/images/emt-tms.jpg',
    },
    {
      title: 'Beneficios de tDCS para la depresión',
      summary: 'La estimulación transcraneal por corriente directa ofrece una alternativa suave y efectiva para mejorar el estado de ánimo.',
      date: '2024-03-10',
      category: 'tDCS',
      image: '/images/tdcs.jpg',
    },
    {
      title: 'Historia de éxito: Superando la ansiedad',
      summary: 'Conozca cómo María logró superar 10 años de ansiedad generalizada con nuestro tratamiento integral de neuromodulación.',
      date: '2024-03-05',
      category: 'Casos de Éxito',
      image: '/images/success-story.jpg',
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Blog de NeuroInnova
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Artículos educativos y casos de éxito sobre psiquiatría y neuromodulación
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.title}
                title={post.title}
                summary={post.summary}
                date={post.date}
                category={post.category}
                image={post.image}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;