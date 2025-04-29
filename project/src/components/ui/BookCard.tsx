import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../types';
import { Link } from 'react-router-dom';
import { Star, Clock, Eye } from 'lucide-react';
import { useBooks } from '../../context/BookContext';
import Button from './Button';

interface BookCardProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
}

const BookCard: React.FC<BookCardProps> = ({ book, size = 'md' }) => {
  const { bookmarkedBooks, toggleBookmark } = useBooks();
  const isBookmarked = bookmarkedBooks.includes(book.id);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const cardSizes = {
    sm: {
      container: 'w-40',
      image: 'h-56',
      title: 'text-sm',
      author: 'text-xs',
      details: 'hidden'
    },
    md: {
      container: 'w-56',
      image: 'h-72',
      title: 'text-base',
      author: 'text-sm',
      details: 'flex'
    },
    lg: {
      container: 'w-72',
      image: 'h-96',
      title: 'text-lg',
      author: 'text-base',
      details: 'flex'
    }
  };

  return (
    <motion.div
      className={`${cardSizes[size].container} flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl`}
      whileHover={{ y: -5 }}
    >
      <Link to={`/books/${book.id}`} className="relative overflow-hidden">
        <div className={`${cardSizes[size].image} overflow-hidden bg-gray-200`}>
          <img 
            src={book.cover} 
            alt={book.title}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
          <h3 className={`${cardSizes[size].title} font-serif font-semibold`}>{book.title}</h3>
          <p className={`${cardSizes[size].author} mt-1 text-gray-200`}>by {book.author.name}</p>
        </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-3">
        <div className={`${cardSizes[size].details} mt-2 items-center gap-3 text-sm text-gray-600`}>
          <div className="flex items-center">
            <Star size={16} className="mr-1 text-yellow-400" />
            <span>{book.rating}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-1 text-gray-400" />
            <span>{book.pageCount} pgs</span>
          </div>
          <div className="flex items-center">
            <Eye size={16} className="mr-1 text-gray-400" />
            <span>{(book.readCount / 1000).toFixed(1)}k</span>
          </div>
        </div>
        
        <div className="mt-auto pt-3">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={(e) => {
                e.preventDefault();
                toggleBookmark(book.id);
              }}
              className={isBookmarked ? 'bg-amber-50' : ''}
            >
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Link to={`/books/${book.id}/read`} className="inline-flex items-center justify-center rounded-md bg-amber-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-amber-700">
              Read
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;