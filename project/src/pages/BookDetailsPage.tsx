import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import BookHero from '../components/books/BookHero';
import FeaturedBooks from '../components/home/FeaturedBooks';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchBook, fetchBooksByCategory } = useBooks();
  
  const book = fetchBook(id || '');
  
  useEffect(() => {
    if (book) {
      document.title = `${book.title} by ${book.author.name} | BookVerse`;
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    return () => {
      document.title = 'BookVerse';
    };
  }, [book]);
  
  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Book not found</h2>
          <p className="mt-2 text-gray-600">The book you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  // Get related books based on the first category
  const relatedBooks = book.categories.length > 0 
    ? fetchBooksByCategory(book.categories[0]).filter(b => b.id !== book.id)
    : [];
  
  return (
    <div>
      <BookHero book={book} />
      
      {/* Book information section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Book details */}
            <div className="lg:col-span-2">
              <h2 className="mb-6 font-serif text-2xl font-bold">About the Book</h2>
              <div className="prose max-w-none">
                <p className="text-lg">{book.description}</p>
                <p className="mt-4 text-lg">
                  <strong>Category:</strong> {book.categories.join(', ')}
                </p>
                <p className="text-lg">
                  <strong>Pages:</strong> {book.pageCount}
                </p>
                <p className="text-lg">
                  <strong>Published:</strong> {new Date(book.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            {/* Author info */}
            <div className="rounded-lg bg-gray-50 p-6 shadow-md">
              <h2 className="mb-4 font-serif text-xl font-bold">About the Author</h2>
              <div className="flex items-center">
                {/* This would show the actual author image in a real application */}
                <div className="h-16 w-16 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">{book.author.name}</h3>
                  <p className="text-sm text-gray-600">Author</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                Author bio would go here. This could include a brief description of the author's background, other works, and writing style.
              </p>
              <button className="mt-4 w-full rounded-md bg-gray-800 py-2 text-center text-white transition-colors hover:bg-gray-900">
                View Author Profile
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Reviews section would go here */}
      
      {/* Related books section */}
      {relatedBooks.length > 0 && (
        <FeaturedBooks 
          title={`More ${book.categories[0]} Books`} 
          books={relatedBooks}
          link={`/categories/${book.categories[0].toLowerCase()}`}
        />
      )}
    </div>
  );
};

export default BookDetailsPage;