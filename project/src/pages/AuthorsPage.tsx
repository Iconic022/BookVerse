import React from 'react';
import { motion } from 'framer-motion';
import { users } from '../data/users';
import { useBooks } from '../context/BookContext';
import { Book, Users } from 'lucide-react';
import BookCard from '../components/ui/BookCard';

const AuthorsPage: React.FC = () => {
  const { fetchBook } = useBooks();
  const authors = users.filter(user => user.isAuthor);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-gray-900">Featured Authors</h1>
          <p className="mt-4 text-lg text-gray-600">
            Meet the talented writers behind your favorite stories
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-xl bg-white shadow-lg"
            >
              <div className="relative h-48">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <div className="p-6">
                <h2 className="font-serif text-2xl font-bold text-gray-900">{author.name}</h2>
                <p className="mt-2 text-gray-600">{author.bio}</p>

                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Book className="mr-1 h-4 w-4" />
                    <span>Published Books: 3</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    <span>{author.followers} followers</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-4 font-medium text-gray-900">Popular Books</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2].map((bookId) => {
                      const book = fetchBook(bookId.toString());
                      if (!book) return null;
                      return (
                        <BookCard
                          key={book.id}
                          book={book}
                          size="sm"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;