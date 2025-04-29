import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBooks } from '../context/BookContext';
import { Flame, TrendingUp, Star, Clock } from 'lucide-react';
import BookCard from '../components/ui/BookCard';

type TimeRange = 'today' | 'week' | 'month' | 'year';

const TrendingPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const { fetchTrendingBooks, fetchNewReleases, fetchHighestRated } = useBooks();

  const trendingBooks = fetchTrendingBooks();
  const newReleases = fetchNewReleases();
  const topRated = fetchHighestRated();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-gray-900">Trending on BookVerse</h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover what's popular in the reading community
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {(['today', 'week', 'month', 'year'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  timeRange === range
                    ? 'rounded-md bg-amber-500 text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-16">
          {/* Most Read Books */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex items-center">
              <Flame className="mr-3 h-8 w-8 text-amber-500" />
              <h2 className="font-serif text-2xl font-bold text-gray-900">Most Read Books</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {trendingBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </motion.section>

          {/* New & Notable */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex items-center">
              <TrendingUp className="mr-3 h-8 w-8 text-green-500" />
              <h2 className="font-serif text-2xl font-bold text-gray-900">New & Notable</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {newReleases.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </motion.section>

          {/* Highest Rated */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex items-center">
              <Star className="mr-3 h-8 w-8 text-yellow-500" />
              <h2 className="font-serif text-2xl font-bold text-gray-900">Highest Rated</h2>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {topRated.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </motion.section>

          {/* Reading Time Trends */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl bg-white p-8 shadow-lg"
          >
            <div className="mb-8 flex items-center">
              <Clock className="mr-3 h-8 w-8 text-blue-500" />
              <h2 className="font-serif text-2xl font-bold text-gray-900">Reading Time Trends</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Average Reading Time', value: '45 mins' },
                { label: 'Most Active Time', value: '9 PM' },
                { label: 'Books Completed', value: '1.2k' },
                { label: 'Active Readers', value: '3.5k' },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg bg-gray-50 p-6 text-center">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;