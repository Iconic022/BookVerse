import { Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Science Fiction',
    description: 'Explore futuristic worlds, advanced technology, and scientific concepts through imaginative storytelling.',
    imageUrl: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bookCount: 342
  },
  {
    id: '2',
    name: 'Fantasy',
    description: 'Immerse yourself in magical worlds filled with mythical creatures, epic quests, and supernatural elements.',
    imageUrl: 'https://images.pexels.com/photos/3910141/pexels-photo-3910141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bookCount: 518
  },
  {
    id: '3',
    name: 'Mystery',
    description: 'Solve puzzling crimes, uncover secrets, and follow detectives as they untangle complex mysteries.',
    imageUrl: 'https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bookCount: 476
  },
  {
    id: '4',
    name: 'Romance',
    description: 'Experience the ups and downs of love through stories focused on relationships and emotional connections.',
    imageUrl: 'https://images.pexels.com/photos/5686103/pexels-photo-5686103.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bookCount: 721
  },
  {
    id: '5',
    name: 'Horror',
    description: 'Face your fears with tales designed to frighten, shock, and unsettle through supernatural or psychological elements.',
    imageUrl: 'https://images.pexels.com/photos/3391932/pexels-photo-3391932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bookCount: 283
  },
  {
    id: '6',
    name: 'Thriller',
    description: 'Feel the tension and excitement of fast-paced stories filled with suspense, danger, and unexpected twists.',
    imageUrl: 'https://images.pexels.com/photos/1738865/pexels-photo-1738865.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    bookCount: 395
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};