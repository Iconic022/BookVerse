import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, BookPage } from '../types';
import { getBookById, getBooksByCategory, getTrendingBooks, getNewReleases, getHighestRated } from '../data/books';
import { getBookPages } from '../data/bookPages';

interface BookContextType {
  fetchBook: (id: string) => Book | undefined;
  fetchBookPages: (bookId: string) => BookPage[];
  fetchBooksByCategory: (category: string) => Book[];
  fetchTrendingBooks: () => Book[];
  fetchNewReleases: () => Book[];
  fetchHighestRated: () => Book[];
  currentReadingPage: number;
  setCurrentReadingPage: (page: number) => void;
  bookmarkedBooks: string[];
  toggleBookmark: (bookId: string) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentReadingPage, setCurrentReadingPage] = useState<number>(1);
  const [bookmarkedBooks, setBookmarkedBooks] = useState<string[]>([]);

  const fetchBook = (id: string) => {
    return getBookById(id);
  };

  const fetchBookPages = (bookId: string) => {
    return getBookPages(bookId);
  };

  const fetchBooksByCategory = (category: string) => {
    return getBooksByCategory(category);
  };

  const fetchTrendingBooks = () => {
    return getTrendingBooks();
  };

  const fetchNewReleases = () => {
    return getNewReleases();
  };

  const fetchHighestRated = () => {
    return getHighestRated();
  };

  const toggleBookmark = (bookId: string) => {
    setBookmarkedBooks(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId);
      } else {
        return [...prev, bookId];
      }
    });
  };

  return (
    <BookContext.Provider value={{
      fetchBook,
      fetchBookPages,
      fetchBooksByCategory,
      fetchTrendingBooks,
      fetchNewReleases,
      fetchHighestRated,
      currentReadingPage,
      setCurrentReadingPage,
      bookmarkedBooks,
      toggleBookmark
    }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};