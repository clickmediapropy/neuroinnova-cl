import React from 'react';
import { BlogCard } from '../components/BlogCard';

const BlogPage = () => {
  const blogPosts = [
    {
      title: '¿Qué es la Estimulación Magnética Transcraneal?',
      summary: 'Artículo educativo sobre EMT/TMS.',
      date: '2023-04-01',
      category: 'EMT/TMS',
      image: '/images/emt-tms.jpg',
    },
    {
      title: 'Beneficios de tDCS para la depresión',
      summary: 'Artículo educativo sobre tDCS.',
      date: '2023-04-02',
      category: 'tDCS',
      image: '/images/tdcs.jpg',
    },
    {
      title: 'Historia de éxito: Superando la ansiedad',
      summary: 'Caso de éxito de tratamiento de ansiedad.',
      date: '2023-04-03',
      category: 'Casos de Éxito',
      image: '/images/success-story.jpg',
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold">Blog</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
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
  );
};

export default BlogPage;