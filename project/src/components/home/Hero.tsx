import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, Search } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-700 to-amber-900 py-12 text-white sm:py-16 md:py-20 lg:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="book-pattern" patternUnits="userSpaceOnUse" width="70" height="70" patternTransform="rotate(45)">
              <Book width="30" height="30" x="0" y="0" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#book-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse items-center lg:flex-row lg:space-x-12">
          {/* Hero Text */}
          <motion.div 
            className="mt-10 text-center lg:mt-0 lg:w-1/2 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-serif text-4xl font-bold sm:text-5xl md:text-6xl">
              Discover Your Next <span className="inline text-amber-300">Literary Adventure</span>
            </h1>
            <p className="mt-4 text-xl leading-relaxed text-amber-100 sm:mt-6 sm:text-2xl">
              Read, write, and share your stories with a community of book lovers on BookVerse. Start your reading journey today.
            </p>
            <div className="mt-8 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
              <Link to="/categories">
                <Button 
                  size="lg" 
                  className="bg-white text-amber-900 hover:bg-amber-100"
                >
                  Browse Books
                </Button>
              </Link>
              <Link to="/author/publish">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                >
                  Publish Your Story
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-72 w-40 rotate-[-6deg] transform rounded-lg bg-amber-300 shadow-xl md:h-80 md:w-56 lg:h-96 lg:w-64"></div>
              <div className="absolute -right-6 top-6 h-80 w-48 rotate-[6deg] transform rounded-lg bg-amber-500 shadow-xl md:h-96 md:w-64 lg:h-96 lg:w-72"></div>
              <div className="relative rounded-lg shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  alt="Book cover"
                  className="z-10 h-96 w-64 rounded-lg object-cover shadow-xl md:h-96 md:w-72 lg:h-[450px] lg:w-80"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Search Bar */}
        <motion.div 
          className="mx-auto mt-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form className="relative">
            <div className="flex items-center overflow-hidden rounded-full bg-white/90 shadow-xl">
              <div className="pointer-events-none pl-4 text-gray-500">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Search for books, authors, or genres..."
                className="w-full bg-transparent py-4 pl-3 pr-8 text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="m-1 rounded-full bg-amber-600 px-6 py-3 font-medium text-white transition-colors hover:bg-amber-700"
              >
                Search
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;