import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Eleanor Hayes',
    email: 'eleanor.hayes@example.com',
    bio: 'Bestselling author of speculative fiction exploring the boundaries of human consciousness and technology.',
    avatar: 'https://images.pexels.com/photos/3756985/pexels-photo-3756985.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    isAuthor: true,
    joinedDate: new Date('2021-04-12'),
    following: 45,
    followers: 12300
  },
  {
    id: '2',
    name: 'Thomas Wright',
    email: 'thomas.wright@example.com',
    bio: 'Horror and mystery writer inspired by the foggy coastlines of New England and the secrets they hold.',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    isAuthor: true,
    joinedDate: new Date('2020-09-28'),
    following: 120,
    followers: 8500
  },
  {
    id: 'current',
    name: 'Gadaveni Nithin',
    email: 'gadaveninithin@gmail.com',
    bio: 'Avid reader with a passion for science fiction and fantasy. Aspiring writer working on my first novel.',
    avatar: 'https://media.licdn.com/dms/image/v2/D4E03AQGuJ6ZZC35gOQ/profile-displayphoto-shrink_800_800/B4EZTRT1h9HMAk-/0/1738678427479?e=1751500800&v=beta&t=1d-0-XzTfqWksCDHdsEBTcmCNyeLEecHrBujoK2iVoM',
    isAuthor: false,
    joinedDate: new Date('2022-11-05'),
    following: 87,
    followers: 34
  }
];

export const getCurrentUser = (): User => {
  return users.find(user => user.id === 'current')!;
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};