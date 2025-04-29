import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../../types';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <Link to={`/categories/${category.id}`} className="block">
        <div className="relative h-40 w-full overflow-hidden">
          <img 
            src={category.imageUrl} 
            alt={category.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="text-xl font-bold">{category.name}</h3>
            <div className="mt-1 flex items-center text-sm text-gray-200">
              <Book size={16} className="mr-2" />
              <span>{category.bookCount} books</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;