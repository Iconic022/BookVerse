import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Github, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-serif text-xl font-bold text-white">
              <Book className="h-8 w-8 text-amber-500" />
              <span>BookVerse</span>
            </Link>
            <p className="text-sm text-gray-400">
              BookVerse is a platform for readers and writers to connect through stories.
              Discover new worlds, share your imagination, and join a community of book lovers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link>
              </li>
              <li>
                <Link to="/trending" className="text-gray-400 hover:text-white">Trending Books</Link>
              </li>
              <li>
                <Link to="/authors" className="text-gray-400 hover:text-white">Popular Authors</Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-gray-400 hover:text-white">New Releases</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">For Authors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/author/publish" className="text-gray-400 hover:text-white">Publish Your Book</Link>
              </li>
              <li>
                <Link to="/author/dashboard" className="text-gray-400 hover:text-white">Author Dashboard</Link>
              </li>
              <li>
                <Link to="/author/resources" className="text-gray-400 hover:text-white">Writing Resources</Link>
              </li>
              <li>
                <Link to="/author/community" className="text-gray-400 hover:text-white">Author Community</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Help & Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BookVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;