import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookPage } from '../../types';
import { ChevronLeft, ChevronRight, Bookmark, Settings } from 'lucide-react';
import { useBooks } from '../../context/BookContext';

interface BookReaderProps {
  pages: BookPage[];
  bookId: string;
}

const BookReader: React.FC<BookReaderProps> = ({ pages, bookId }) => {
  const { currentReadingPage, setCurrentReadingPage, bookmarkedBooks, toggleBookmark } = useBooks();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [readingMode, setReadingMode] = useState<'day' | 'night'>('day');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const totalPages = pages.length;
  const isBookmarked = bookmarkedBooks.includes(bookId);

  const currentPage = pages.find(page => page.pageNumber === currentReadingPage) || pages[0];

  const nextPage = () => {
    if (currentReadingPage < totalPages && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentReadingPage(currentReadingPage + 1);
    }
  };

  const prevPage = () => {
    if (currentReadingPage > 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentReadingPage(currentReadingPage - 1);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextPage();
    } else if (e.key === 'ArrowLeft') {
      prevPage();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentReadingPage, isTransitioning]);

  // Theme settings
  const themeStyles = {
    day: {
      bg: 'bg-amber-50',
      text: 'text-gray-800',
      paper: 'bg-white',
      shadow: 'shadow-xl'
    },
    night: {
      bg: 'bg-gray-900',
      text: 'text-gray-200',
      paper: 'bg-gray-800',
      shadow: 'shadow-xl shadow-black/30'
    }
  };

  return (
    <div className={`min-h-screen ${themeStyles[readingMode].bg} ${themeStyles[readingMode].text} pb-20`}>
      {/* Reader header */}
      <div className={`sticky top-0 z-10 flex items-center justify-between border-b ${readingMode === 'day' ? 'border-gray-200 bg-white/90' : 'border-gray-700 bg-gray-800/90'} backdrop-blur-sm px-4 py-3`}>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-1 rounded-md px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft size={16} />
          <span>Back</span>
        </button>

        <div className="flex-1 text-center">
          <h2 className="text-sm font-medium sm:text-base">Page {currentReadingPage} of {totalPages}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => toggleBookmark(bookId)}
            className={`rounded-full p-2 transition-colors ${isBookmarked ? 'text-amber-500' : 'text-gray-400 hover:text-amber-500'}`}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark size={20} />
          </button>
          <button 
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="rounded-full p-2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Reader settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Settings panel */}
      {settingsOpen && (
        <div className={`mb-4 ${themeStyles[readingMode].paper} mx-auto mt-4 max-w-3xl rounded-lg p-4 ${themeStyles[readingMode].shadow}`}>
          <h3 className="mb-2 font-medium">Reader Settings</h3>
          <div className="flex items-center space-x-4">
            <span>Theme:</span>
            <button 
              onClick={() => setReadingMode('day')}
              className={`rounded-md px-3 py-1 ${readingMode === 'day' ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Light
            </button>
            <button 
              onClick={() => setReadingMode('night')}
              className={`rounded-md px-3 py-1 ${readingMode === 'night' ? 'bg-amber-500 text-white' : 'bg-gray-700 text-white'}`}
            >
              Dark
            </button>
          </div>
        </div>
      )}

      {/* Book content */}
      <div className="mx-auto mt-6 max-w-3xl px-4">
        <div 
          className={`relative overflow-hidden rounded-lg ${themeStyles[readingMode].paper} ${themeStyles[readingMode].shadow} p-8 sm:p-12`}
          style={{
            minHeight: '70vh'
          }}
        >
          <AnimatePresence mode="wait" initial={false} onExitComplete={() => setIsTransitioning(false)}>
            <motion.div
              key={currentReadingPage}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative font-serif"
            >
              {/* Background image if any */}
              {currentPage.images?.some(img => img.position === 'background') && (
                <div className="absolute inset-0 z-0 opacity-10">
                  <img 
                    src={currentPage.images.find(img => img.position === 'background')?.url} 
                    alt="Background" 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              
              {/* Page content */}
              <div className="relative z-10 leading-relaxed">
                <div className="flex flex-wrap">
                  {/* Left positioned image */}
                  {currentPage.images?.some(img => img.position === 'left') && (
                    <div className="mr-4 mb-4 w-full sm:w-1/3">
                      <img 
                        src={currentPage.images.find(img => img.position === 'left')?.url} 
                        alt="Story illustration" 
                        className="rounded-md object-cover shadow-md"
                      />
                    </div>
                  )}
                  
                  {/* Main content */}
                  <div className={`flex-1 text-lg leading-relaxed ${currentPage.images?.some(img => img.position === 'left' || img.position === 'right') ? 'sm:w-3/5' : 'w-full'}`}>
                    <div dangerouslySetInnerHTML={{ __html: currentPage.content }} />
                  </div>
                  
                  {/* Right positioned image */}
                  {currentPage.images?.some(img => img.position === 'right') && (
                    <div className="ml-4 mb-4 w-full sm:w-1/3">
                      <img 
                        src={currentPage.images.find(img => img.position === 'right')?.url} 
                        alt="Story illustration" 
                        className="rounded-md object-cover shadow-md"
                      />
                    </div>
                  )}
                </div>
                
                {/* Center positioned image */}
                {currentPage.images?.some(img => img.position === 'center') && (
                  <div className="my-6 w-full">
                    <img 
                      src={currentPage.images.find(img => img.position === 'center')?.url} 
                      alt="Story illustration" 
                      className="mx-auto rounded-md object-cover shadow-md"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Page navigation buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            {currentReadingPage > 1 && (
              <button 
                onClick={prevPage}
                disabled={isTransitioning}
                className={`-ml-4 rounded-r-full p-3 ${readingMode === 'day' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'} transition-colors disabled:opacity-50`}
                aria-label="Previous page"
              >
                <ChevronLeft size={24} />
              </button>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            {currentReadingPage < totalPages && (
              <button 
                onClick={nextPage}
                disabled={isTransitioning}
                className={`-mr-4 rounded-l-full p-3 ${readingMode === 'day' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'} transition-colors disabled:opacity-50`}
                aria-label="Next page"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Page number */}
          <div className="mt-4 text-center text-sm text-gray-500">
            {currentReadingPage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookReader;