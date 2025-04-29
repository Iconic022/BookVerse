import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, PenTool, Users, Star, Eye, Bookmark, Plus, BookOpen, Settings, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { books } from '../data/books';

const AuthorDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'books' | 'stats' | 'settings'>('overview');
  
  // Filter books to only include those authored by the current user
  const myBooks = books.filter(book => book.author.id === user?.id);
  
  if (!user || !user.isAuthor) {
    return (
      <div className="mx-auto my-12 max-w-3xl px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold">Author Dashboard</h1>
        <p className="mb-8 text-lg text-gray-600">You need to be registered as an author to access this page.</p>
        <Link to="/author/register">
          <Button>Register as an Author</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 py-8 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Author Dashboard</h1>
              <p className="mt-1 text-amber-100">Manage your books and monitor performance</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/author/publish">
                <Button 
                  leftIcon={<Plus size={16} />}
                  className="bg-white text-amber-800 hover:bg-amber-50"
                >
                  New Book
                </Button>
              </Link>
              <Button 
                leftIcon={<Settings size={16} />}
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <button
              className={`cursor-pointer border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`cursor-pointer border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === 'books'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('books')}
            >
              My Books
            </button>
            <button
              className={`cursor-pointer border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === 'stats'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('stats')}
            >
              Statistics
            </button>
            <button
              className={`cursor-pointer border-b-2 py-4 px-1 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'border-amber-600 text-amber-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
          </nav>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <motion.div 
                className="rounded-lg bg-white p-6 shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center">
                  <div className="rounded-full bg-amber-100 p-3">
                    <Book className="h-6 w-6 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Published Books</p>
                    <h3 className="text-2xl font-semibold text-gray-900">{myBooks.length}</h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="rounded-lg bg-white p-6 shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center">
                  <div className="rounded-full bg-blue-100 p-3">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Reads</p>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {(myBooks.reduce((sum, book) => sum + book.readCount, 0) / 1000).toFixed(1)}k
                    </h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="rounded-lg bg-white p-6 shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center">
                  <div className="rounded-full bg-yellow-100 p-3">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Avg. Rating</p>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {myBooks.length > 0 
                        ? (myBooks.reduce((sum, book) => sum + book.rating, 0) / myBooks.length).toFixed(1)
                        : 'N/A'
                      }
                    </h3>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="rounded-lg bg-white p-6 shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <Bookmark className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Bookmarks</p>
                    <h3 className="text-2xl font-semibold text-gray-900">127</h3>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Recent Activity */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 rounded-full bg-blue-100 p-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Your book "The Silent Echo" was read by 15 new readers today</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 rounded-full bg-yellow-100 p-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">You received 3 new reviews on "The Silent Echo"</p>
                    <p className="text-sm text-gray-500">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 rounded-full bg-green-100 p-2">
                    <Bookmark className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">12 readers bookmarked your books this week</p>
                    <p className="text-sm text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <motion.div 
                className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="mb-4 rounded-full bg-amber-100 p-4">
                  <PenTool className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Write New Book</h3>
                <p className="mb-4 text-sm text-gray-600">Start creating your next masterpiece</p>
                <Link to="/author/publish" className="mt-auto">
                  <Button variant="outline">Start Writing</Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="mb-4 rounded-full bg-blue-100 p-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Edit Books</h3>
                <p className="mb-4 text-sm text-gray-600">Update your existing publications</p>
                <Link to="/author/books" className="mt-auto">
                  <Button variant="outline">View Books</Button>
                </Link>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="mb-4 rounded-full bg-green-100 p-4">
                  <BarChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">Analytics</h3>
                <p className="mb-4 text-sm text-gray-600">Track performance and insights</p>
                <Button variant="outline" onClick={() => setActiveTab('stats')}>
                  View Stats
                </Button>
              </motion.div>
            </div>
          </div>
        )}
        
        {activeTab === 'books' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">My Books</h2>
              <Link to="/author/publish">
                <Button leftIcon={<Plus size={16} />}>
                  Add New Book
                </Button>
              </Link>
            </div>
            
            {myBooks.length > 0 ? (
              <div className="space-y-4">
                {myBooks.map((book) => (
                  <div key={book.id} className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="h-24 w-16 rounded object-cover sm:mr-6"
                    />
                    
                    <div className="mt-4 flex-1 sm:mt-0">
                      <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Published: {new Date(book.publishedDate).toLocaleDateString()}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          <span>{(book.readCount / 1000).toFixed(1)}k reads</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 text-yellow-500" />
                          <span>{book.rating} ({book.reviewCount} reviews)</span>
                        </div>
                        <div className="flex items-center">
                          <Book className="mr-1 h-4 w-4" />
                          <span>{book.pageCount} pages</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-shrink-0 space-x-2 sm:mt-0">
                      <Link to={`/author/edit/${book.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Link to={`/books/${book.id}`}>
                        <Button size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                <Book className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No books yet</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating a new book.</p>
                <div className="mt-6">
                  <Link to="/author/publish">
                    <Button>Create a Book</Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div>
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Author Statistics</h2>
            
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-gray-600">
                Detailed statistics and analytics would be displayed here, including:
              </p>
              <ul className="mt-4 ml-6 list-disc space-y-2 text-gray-600">
                <li>Reader demographics</li>
                <li>Book performance over time</li>
                <li>Reading completion rates</li>
                <li>Review analysis</li>
                <li>Earnings and royalties (if applicable)</li>
                <li>Comparison to genre averages</li>
              </ul>
              <div className="mt-6 rounded-lg bg-gray-100 p-4 text-center text-gray-500">
                <p>Interactive charts and graphs would be displayed here</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div>
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Account Settings</h2>
            
            <div className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-gray-600">
                Author account settings would be displayed here, including:
              </p>
              <ul className="mt-4 ml-6 list-disc space-y-2 text-gray-600">
                <li>Profile information</li>
                <li>Author bio and photo</li>
                <li>Payment details</li>
                <li>Notification preferences</li>
                <li>Privacy settings</li>
                <li>Account security</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorDashboardPage;