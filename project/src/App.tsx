import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BookDetailsPage from './pages/BookDetailsPage';
import BookReaderPage from './pages/BookReaderPage';
import AuthorDashboardPage from './pages/AuthorDashboardPage';
import AuthorPublishPage from './pages/AuthorPublishPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CategoriesPage from './pages/CategoriesPage';
import AuthorsPage from './pages/AuthorsPage';
import TrendingPage from './pages/TrendingPage';

function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <Router>
          <div className="flex min-h-screen flex-col">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/books/:id" element={<BookDetailsPage />} />
                        <Route path="/books/:id/read" element={<BookReaderPage />} />
                        <Route path="/author/dashboard" element={<AuthorDashboardPage />} />
                        <Route path="/author/publish" element={<AuthorPublishPage />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                        <Route path="/authors" element={<AuthorsPage />} />
                        <Route path="/trending" element={<TrendingPage />} />
                        <Route
                          path="*"
                          element={
                            <div className="flex min-h-[60vh] items-center justify-center">
                              <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
                                <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
                              </div>
                            </div>
                          }
                        />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </BookProvider>
    </AuthProvider>
  );
}

export default App;