import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ title, summary, date, category, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{summary}</p>
        <div className="mt-2 flex items-center">
          <span className="text-gray-500">{date}</span>
          <span className="mx-2">|</span>
          <span className="text-gray-500">{category}</span>
        </div>
        <Link to={`/blog/${title.toLowerCase().replace(/ /g, '-')}`} className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80">Leer más</Link>
      </div>
    </div>
  );
};

export default BlogCard;