import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/categories';
import { useBooks } from '../context/BookContext';
import { Book } from 'lucide-react';
import BookCard from '../components/ui/BookCard';

const CategoriesPage: React.FC = () => {
  const { fetchBooksByCategory } = useBooks();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-gray-900">Explore Categories</h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover books across different genres and find your next favorite read
          </p>
        </div>

        <div className="mt-12 space-y-16">
          {categories.map((category) => (
            <motion.section
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-xl bg-white p-8 shadow-lg"
            >
              <div className="relative mb-8 h-48 overflow-hidden rounded-lg">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-3xl font-bold text-white">{category.name}</h2>
                      <div className="mt-2 flex items-center text-gray-200">
                        <Book size={16} className="mr-2" />
                        <span>{category.bookCount} books</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-8 text-lg text-gray-600">{category.description}</p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {fetchBooksByCategory(category.name).slice(0, 5).map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;