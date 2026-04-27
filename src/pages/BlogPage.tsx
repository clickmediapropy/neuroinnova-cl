import React, { useState } from 'react';
import { BlogCard } from '../components/BlogCard';
import Layout from '@/components/layout/Layout';
import { allBlogPosts as blogPosts, getAllCategories } from '@/data/blogPosts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getAllCategories();
  
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <Layout>
      <div className="min-h-screen neural-bg">
        {/* Hero Section */}
        <section className="pt-12 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
                Blog de NeuroInnova
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Artículos educativos y casos de éxito sobre psiquiatría y neuromodulación
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                Todos
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  summary={post.summary}
                  date={post.date}
                  category={post.category}
                  image={post.image}
                  slug={post.slug}
                  author={post.author}
                  readTime={post.readTime}
                />
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No hay artículos en esta categoría aún.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default BlogPage;