import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-amber-50">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="mx-auto inline-flex items-center">
              <Book className="h-10 w-10 text-amber-600" />
              <span className="ml-2 font-serif text-3xl font-bold text-gray-900">BookVerse</span>
            </Link>
            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
              Create your account
            </h2>
          </div>
          
          <RegisterForm />
          
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;