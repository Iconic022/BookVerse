import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import BookReader from '../components/books/BookReader';

const BookReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchBook, fetchBookPages, setCurrentReadingPage } = useBooks();
  
  const book = fetchBook(id || '');
  const pages = fetchBookPages(id || '');
  
  useEffect(() => {
    if (book) {
      document.title = `Reading: ${book.title} | BookVerse`;
    } else {
      navigate('/404');
    }
    
    // Reset to page 1 when opening a new book
    setCurrentReadingPage(1);
    
    return () => {
      document.title = 'BookVerse';
    };
  }, [book, id]);
  
  if (!book || pages.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-amber-600 border-t-transparent"></div>
          <h2 className="text-xl font-medium text-gray-800">Loading book content...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <BookReader pages={pages} bookId={book.id} />
    </div>
  );
};

export default BookReaderPage;