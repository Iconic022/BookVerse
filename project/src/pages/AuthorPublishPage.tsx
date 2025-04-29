import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Upload, X } from 'lucide-react';
import Button from '../components/ui/Button';
import BookEditor from '../components/author/BookEditor';

interface PublishFormData {
  title: string;
  description: string;
  categories: string[];
  coverImage: string;
}

const AuthorPublishPage: React.FC = () => {
  const navigate = useNavigate();
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [bookContent, setBookContent] = useState<string>('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<PublishFormData>();
  
  const watchCoverImage = watch('coverImage');
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCoverPreview(e.target.value);
    } else {
      setCoverPreview('');
    }
  };
  
  const handleRemoveCover = () => {
    setCoverPreview('');
  };
  
  const onSubmitBookDetails = (data: PublishFormData) => {
    // In a real app, we would save the data and move to the next step
    console.log('Book details:', data);
    setCurrentStep(2);
  };
  
  const handleSaveContent = (content: string) => {
    setBookContent(content);
    console.log('Book content saved:', content);
  };
  
  const handlePublish = () => {
    // In a real app, we would submit the book for review/publication
    console.log('Publishing book...');
    setCurrentStep(3);
    
    // Simulate a successful publication after a delay
    setTimeout(() => {
      navigate('/author/dashboard');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Publish Your Book</h1>
          <p className="mt-2 text-lg text-gray-600">Share your story with the world</p>
        </div>
        
        {/* Step Indicator */}
        <div className="mt-8">
          <ol className="relative flex w-full items-center justify-between text-sm font-medium text-gray-500">
            <li className={`flex items-center ${currentStep >= 1 ? 'text-amber-600' : ''}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep >= 1 ? 'bg-amber-600 text-white' : 'bg-gray-200'
              }`}>1</span>
              <span className="ml-2">Book Details</span>
            </li>
            <div className={`h-0.5 w-full flex-1 ${currentStep >= 2 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
            <li className={`flex items-center ${currentStep >= 2 ? 'text-amber-600' : ''}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep >= 2 ? 'bg-amber-600 text-white' : 'bg-gray-200'
              }`}>2</span>
              <span className="ml-2">Write Content</span>
            </li>
            <div className={`h-0.5 w-full flex-1 ${currentStep >= 3 ? 'bg-amber-600' : 'bg-gray-200'}`}></div>
            <li className={`flex items-center ${currentStep >= 3 ? 'text-amber-600' : ''}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentStep >= 3 ? 'bg-amber-600 text-white' : 'bg-gray-200'
              }`}>3</span>
              <span className="ml-2">Publish</span>
            </li>
          </ol>
        </div>
        
        {/* Step Content */}
        <div className="mt-8">
          {currentStep === 1 && (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <form onSubmit={handleSubmit(onSubmitBookDetails)}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Book Information */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Book Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          {...register('title', { required: 'Title is required' })}
                          className={`mt-1 block w-full rounded-md border ${
                            errors.title ? 'border-red-300' : 'border-gray-300'
                          } px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500`}
                          placeholder="Enter your book title"
                        />
                        {errors.title && (
                          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Book Description
                        </label>
                        <textarea
                          id="description"
                          rows={4}
                          {...register('description', { 
                            required: 'Description is required',
                            minLength: {
                              value: 50,
                              message: 'Description should be at least 50 characters'
                            }
                          })}
                          className={`mt-1 block w-full rounded-md border ${
                            errors.description ? 'border-red-300' : 'border-gray-300'
                          } px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500`}
                          placeholder="Write a compelling description of your book"
                        ></textarea>
                        {errors.description && (
                          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                          Categories (select at least one)
                        </label>
                        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {['Fiction', 'Non-fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller', 
                            'Romance', 'Historical Fiction', 'Biography', 'Self-help', 'Horror', 'Poetry'].map((category) => (
                            <div key={category} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`category-${category}`}
                                value={category}
                                {...register('categories', { required: 'Select at least one category' })}
                                className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                              />
                              <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                                {category}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.categories && (
                          <p className="mt-1 text-sm text-red-600">{errors.categories.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Cover Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover Image
                    </label>
                    <div className="mt-1">
                      <div className="flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        {coverPreview ? (
                          <div className="relative">
                            <img
                              src={coverPreview}
                              alt="Cover preview"
                              className="h-60 w-40 rounded object-cover"
                            />
                            <button
                              type="button"
                              onClick={handleRemoveCover}
                              className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                              aria-label="Remove cover image"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-1 text-center">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="text-sm text-gray-600">
                              <label
                                htmlFor="coverImage"
                                className="relative cursor-pointer rounded-md font-medium text-amber-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 hover:text-amber-500"
                              >
                                <span>Upload a cover image</span>
                                <input
                                  id="coverImage"
                                  type="text"
                                  className="sr-only"
                                  {...register('coverImage', { required: 'Cover image is required' })}
                                  onChange={handleCoverImageChange}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              Enter URL or upload image
                            </p>
                          </div>
                        )}
                      </div>
                      {errors.coverImage && (
                        <p className="mt-1 text-sm text-red-600">{errors.coverImage.message}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button type="submit">
                    Next: Write Content
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {currentStep === 2 && (
            <div>
              <BookEditor 
                initialContent={bookContent || "<p>Start writing your book here...</p>"}
                onSave={handleSaveContent}
              />
              
              <div className="mt-8 flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)}
                >
                  Back to Details
                </Button>
                <Button onClick={handlePublish}>
                  Proceed to Publish
                </Button>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="rounded-lg bg-white p-12 text-center shadow-md">
              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-amber-600 border-t-transparent"></div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">Publishing Your Book</h2>
              <p className="mt-2 text-gray-600">
                Your book is being processed and will be available soon. Please wait...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorPublishPage;