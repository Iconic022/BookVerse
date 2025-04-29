import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import FeaturedBooks from '../components/home/FeaturedBooks';
import CategoriesSection from '../components/home/CategoriesSection';
import AuthorFeature from '../components/home/AuthorFeature';
import { useBooks } from '../context/BookContext';
import { categories } from '../data/categories';

const HomePage: React.FC = () => {
  const { fetchTrendingBooks, fetchNewReleases, fetchHighestRated } = useBooks();
  
  const trendingBooks = fetchTrendingBooks();
  const newReleases = fetchNewReleases();
  const topRated = fetchHighestRated();

  return (
    <div>
      <Hero />
      
      <FeaturedBooks 
        title="Trending Books" 
        books={trendingBooks}
        link="/trending"
      />
      
      <CategoriesSection categories={categories} />
      
      <FeaturedBooks 
        title="New Releases" 
        books={newReleases}
        link="/new-releases"
      />
      
      <FeaturedBooks 
        title="Highest Rated" 
        books={topRated}
        link="/top-rated"
      />
      
      <AuthorFeature />
      
      <section className="bg-amber-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            Start Your Reading Journey Today
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Join thousands of readers exploring new worlds, experiencing adventures, and connecting with stories that move them.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/register" className="rounded-md bg-amber-600 px-8 py-3 font-medium text-white transition-colors hover:bg-amber-700">
              Sign Up Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;