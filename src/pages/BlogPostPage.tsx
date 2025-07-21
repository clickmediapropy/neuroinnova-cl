import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { BlogPostContent } from '@/components/BlogPostContent';
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blogPosts';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = getRelatedPosts(post, 3);
  
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-6 py-8 pt-24">
          <BlogPostContent post={post} relatedPosts={relatedPosts} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostPage;