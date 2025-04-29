import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Menu, X, Search, UserCircle, LogOut, Home, Bookmark, PenTool } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 font-serif text-xl font-bold">
              <Book className="h-8 w-8 text-amber-600" />
              <span>
                <span className="text-amber-600">Book</span>
                <span className="text-gray-900">Verse</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Home</Link>
              <Link to="/categories" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Categories</Link>
              <Link to="/authors" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Authors</Link>
              <Link to="/trending" className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Trending</Link>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-2 md:ml-6 md:justify-end">
            <form onSubmit={handleSearch} className="w-full max-w-lg">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Search for books, authors, or genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:ml-4 md:flex md:items-center">
            {isAuthenticated && user ? (
              <div className="relative ml-3">
                <div className="flex items-center">
                  <Link to="/bookmarks" className="mr-2 rounded-full bg-gray-100 p-1 text-gray-700 hover:bg-gray-200">
                    <Bookmark className="h-6 w-6" />
                  </Link>
                  {user.isAuthor && (
                    <Link to="/author/dashboard" className="mr-4 rounded-full bg-gray-100 p-1 text-gray-700 hover:bg-gray-200">
                      <PenTool className="h-6 w-6" />
                    </Link>
                  )}
                  <Link to="/profile" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                    ) : (
                      <UserCircle className="h-8 w-8" />
                    )}
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="ml-4 rounded-full bg-gray-100 p-1 text-gray-700 hover:bg-gray-200"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button>Join BookVerse</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link 
              to="/" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              <div className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </div>
            </Link>
            <Link 
              to="/categories" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              <div className="flex items-center space-x-2">
                <Book className="h-5 w-5" />
                <span>Categories</span>
              </div>
            </Link>
            <Link 
              to="/bookmarks" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeMenu}
            >
              <div className="flex items-center space-x-2">
                <Bookmark className="h-5 w-5" />
                <span>Bookmarks</span>
              </div>
            </Link>
            {isAuthenticated && user?.isAuthor && (
              <Link 
                to="/author/dashboard" 
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={closeMenu}
              >
                <div className="flex items-center space-x-2">
                  <PenTool className="h-5 w-5" />
                  <span>Author Dashboard</span>
                </div>
              </Link>
            )}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            {isAuthenticated && user ? (
              <div className="space-y-1 px-4">
                <div className="flex items-center px-3 py-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                  ) : (
                    <UserCircle className="h-10 w-10" />
                  )}
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Your Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-4">
                <Link 
                  to="/login" 
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenu}
                >
                  Join BookVerse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;