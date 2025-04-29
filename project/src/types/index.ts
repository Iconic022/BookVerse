export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  isAuthor: boolean;
  joinedDate: Date;
  following: number;
  followers: number;
}

export interface Book {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
  cover: string;
  description: string;
  publishedDate: Date;
  categories: string[];
  rating: number;
  reviewCount: number;
  pageCount: number;
  readCount: number;
  pages?: BookPage[];
}

export interface BookPage {
  id: string;
  content: string;
  pageNumber: number;
  images?: {
    url: string;
    position: 'left' | 'right' | 'center' | 'background';
  }[];
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  bookCount: number;
}