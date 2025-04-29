import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PenTool, BookOpen, Users } from 'lucide-react';
import Button from '../ui/Button';

const AuthorFeature: React.FC = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-12 shadow-xl sm:px-12 md:py-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">Become a BookVerse Author</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-300">
                Share your stories with thousands of readers. Self-publish your work and reach a global audience with BookVerse's easy-to-use writing and publishing tools.
              </p>
              
              <ul className="mt-8 space-y-5">
                <li className="flex items-start text-gray-300">
                  <div className="mr-3 rounded-full bg-amber-600 p-2">
                    <PenTool className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-lg font-medium text-white">Intuitive Writing Tools</span>
                    <span>State-of-the-art editor with formatting options</span>
                  </div>
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="mr-3 rounded-full bg-amber-600 p-2">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-lg font-medium text-white">Self-Publishing</span>
                    <span>Publish your book in minutes and reach readers instantly</span>
                  </div>
                </li>
                <li className="flex items-start text-gray-300">
                  <div className="mr-3 rounded-full bg-amber-600 p-2">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="block text-lg font-medium text-white">Author Community</span>
                    <span>Connect with fellow writers and get valuable feedback</span>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8">
                <Link to="/author/publish">
                  <Button size="lg" className="bg-amber-600 text-white hover:bg-amber-700">
                    Start Writing Today
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-72 w-48 rotate-[-3deg] transform rounded-lg bg-white/10 shadow-lg"></div>
                <div className="absolute -right-4 -top-6 h-80 w-48 rotate-[6deg] transform rounded-lg bg-amber-600/60 shadow-lg"></div>
                <div className="relative h-96 w-full overflow-hidden rounded-lg bg-white p-8 shadow-2xl">
                  <div className="h-full overflow-y-auto rounded border border-gray-200 p-4 font-serif">
                    <h3 className="mb-2 text-center text-xl font-bold">A Writer's Journey</h3>
                    <p className="mb-4 text-sm text-gray-700">
                      The cursor blinked patiently against the white screen, waiting for the words to come. Sarah took a deep breath, her fingers hovering over the keyboard. This was it—after months of planning, she was finally ready to begin her novel.
                    </p>
                    <p className="mb-4 text-sm text-gray-700">
                      She had always dreamed of being an author, but between her day job and family responsibilities, finding time to write had been a challenge. Until she discovered BookVerse.
                    </p>
                    <p className="text-sm text-gray-700">
                      Now, with dedicated writing tools and a supportive community of fellow authors, she felt ready to bring her story to life. She began to type, and the words flowed like never before...
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorFeature;