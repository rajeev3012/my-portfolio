import React from 'react';
import { format } from 'date-fns';
import { Clock, Share2 } from 'lucide-react';

interface BlogPostProps {
  title: string;
  description: string;
  content: string;
  image: string;
  author: string;
  date: Date;
  readingTime: number;
  category: string;
}

export function BlogPost({
  title,
  description,
  content,
  image,
  author,
  date,
  readingTime,
  category,
}: BlogPostProps) {
  return (
    <article className="prose prose-invert max-w-none">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        <span>{format(date, 'MMM d, yyyy')}</span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {readingTime} min read
        </span>
        <span className="px-2 py-1 rounded-full bg-gray-800 text-xs">
          {category}
        </span>
      </div>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <img
            src="/images/pp.jpg"
            alt={author}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm">{author}</span>
        </div>
        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <Share2 size={16} />
          Share
        </button>
      </div>
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}