import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    author: {
      id: '1',
      name: 'Eleanor Hayes'
    },
    cover: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'In a world where silence has become the most valuable commodity, one woman discovers she can hear the thoughts of others, plunging her into a dangerous game of survival and truth.',
    publishedDate: new Date('2023-05-15'),
    categories: ['Science Fiction', 'Thriller'],
    rating: 4.7,
    reviewCount: 342,
    pageCount: 320,
    readCount: 12500
  },
  {
    id: '2',
    title: 'Whispers in the Mist',
    author: {
      id: '2',
      name: 'Thomas Wright'
    },
    cover: 'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'A small coastal town is shrouded in a mysterious mist that brings the deepest secrets of its residents to life, forcing them to confront their past or be consumed by it.',
    publishedDate: new Date('2022-11-03'),
    categories: ['Horror', 'Mystery'],
    rating: 4.3,
    reviewCount: 187,
    pageCount: 275,
    readCount: 8940
  },
  {
    id: '3',
    title: 'The Lost Garden',
    author: {
      id: '3',
      name: 'Sophia Chen'
    },
    cover: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'When a young botanist inherits her grandmother\'s mysterious journal, she embarks on a journey to find a mythical garden said to hold the secrets of immortality.',
    publishedDate: new Date('2023-02-28'),
    categories: ['Fantasy', 'Adventure'],
    rating: 4.8,
    reviewCount: 521,
    pageCount: 412,
    readCount: 15200
  },
  {
    id: '4',
    title: 'Chronicles of the Forgotten',
    author: {
      id: '4',
      name: 'Marcus Reid'
    },
    cover: 'https://images.pexels.com/photos/2170473/pexels-photo-2170473.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'In a world where memories can be traded like currency, a memory dealer stumbles upon a collection that reveals a conspiracy threatening to reshape humanity.',
    publishedDate: new Date('2023-07-12'),
    categories: ['Science Fiction', 'Dystopian'],
    rating: 4.5,
    reviewCount: 278,
    pageCount: 388,
    readCount: 10300
  },
  {
    id: '5',
    title: 'Beneath Azure Skies',
    author: {
      id: '5',
      name: 'Amelia Foster'
    },
    cover: 'https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'A heartwarming tale of love, loss, and second chances set against the backdrop of a picturesque coastal town in Italy.',
    publishedDate: new Date('2022-09-05'),
    categories: ['Romance', 'Contemporary'],
    rating: 4.6,
    reviewCount: 412,
    pageCount: 302,
    readCount: 18700
  },
  {
    id: '6',
    title: 'The Quantum Paradox',
    author: {
      id: '6',
      name: 'Dr. Nathan Wells'
    },
    cover: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'A theoretical physicist makes a breakthrough that allows travel between parallel universes, only to become trapped in a reality where his research has led to catastrophe.',
    publishedDate: new Date('2023-03-20'),
    categories: ['Science Fiction', 'Thriller'],
    rating: 4.9,
    reviewCount: 634,
    pageCount: 456,
    readCount: 21500
  },
  {
    id: '7',
    title: 'Echoes of the Forgotten',
    author: {
      id: '2',
      name: 'Thomas Wright'
    },
    cover: 'https://images.pexels.com/photos/3391931/pexels-photo-3391931.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    description: 'When a renowned paranormal investigator receives a mysterious package containing an antique mirror, she uncovers a terrifying connection between a series of disappearances and an ancient curse that threatens to consume everything she holds dear.',
    publishedDate: new Date('2023-10-31'),
    categories: ['Horror', 'Supernatural'],
    rating: 4.8,
    reviewCount: 156,
    pageCount: 312,
    readCount: 5670
  }
];

export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const getBooksByCategory = (category: string): Book[] => {
  return books.filter(book => book.categories.includes(category));
};

export const getTrendingBooks = (): Book[] => {
  return [...books].sort((a, b) => b.readCount - a.readCount).slice(0, 5);
};

export const getNewReleases = (): Book[] => {
  return [...books].sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()).slice(0, 5);
};

export const getHighestRated = (): Book[] => {
  return [...books].sort((a, b) => b.rating - a.rating).slice(0, 5);
};