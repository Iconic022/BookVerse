import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../types';
import BookCard from '../ui/BookCard';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface FeaturedBooksProps {
  title: string;
  books: Book[];
  link?: string;
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ title, books, link }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h2>
          {link && (
            <Link 
              to={link} 
              className="flex items-center text-amber-600 hover:text-amber-700"
            >
              <span>View all</span>
              <ChevronRight size={16} className="ml-1" />
            </Link>
          )}
        </div>
        
        <motion.div 
          className="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {books.map((book) => (
            <motion.div key={book.id} variants={itemVariants}>
              <BookCard book={book} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedBooks;