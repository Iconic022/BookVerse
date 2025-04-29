import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../types';
import { Star, Eye, Clock, Bookmark, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useBooks } from '../../context/BookContext';

interface BookHeroProps {
  book: Book;
}

const BookHero: React.FC<BookHeroProps> = ({ book }) => {
  const { bookmarkedBooks, toggleBookmark } = useBooks();
  const isBookmarked = bookmarkedBooks.includes(book.id);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="relative overflow-hidden bg-gray-900 py-12 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0" style={{
        backgroundImage: `url(${book.cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(8px)',
        opacity: 0.3
      }}></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-12">
          {/* Book Cover */}
          <motion.div 
            className="mx-auto mb-6 w-56 flex-shrink-0 lg:mx-0 lg:mb-0 lg:w-64"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105">
              <img 
                src={book.cover} 
                alt={book.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 rounded-lg shadow-inner"></div>
            </div>
          </motion.div>
          
          {/* Book Details */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="mb-2 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">{book.title}</h1>
              <p className="mb-4 text-lg text-gray-300">by <Link to={`/authors/${book.author.id}`} className="hover:text-amber-400 hover:underline">{book.author.name}</Link></p>
              
              <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-gray-300 lg:justify-start">
                <div className="flex items-center">
                  <Star className="mr-1 h-5 w-5 text-yellow-400" />
                  <span className="text-white">{book.rating}</span>
                  <span className="ml-1">({book.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1 h-5 w-5" />
                  <span>{(book.readCount / 1000).toFixed(1)}k reads</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-5 w-5" />
                  <span>{book.pageCount} pages</span>
                </div>
                <div className="flex items-center">
                  <span>Published: {formatDate(book.publishedDate)}</span>
                </div>
              </div>
              
              <div className="mb-8 flex flex-wrap gap-2">
                {book.categories.map((category, index) => (
                  <Link 
                    key={index} 
                    to={`/categories/${category.toLowerCase()}`}
                    className="rounded-full bg-gray-700 px-3 py-1 text-sm hover:bg-gray-600"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              
              <p className="mb-8 max-w-2xl text-gray-300 lg:text-lg">{book.description}</p>
              
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
                <Link to={`/books/${book.id}/read`}>
                  <Button 
                    variant="primary" 
                    size="lg"
                    leftIcon={<BookOpen size={18} />}
                  >
                    Start Reading
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  leftIcon={<Bookmark size={18} />}
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => toggleBookmark(book.id)}
                >
                  {isBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHero;