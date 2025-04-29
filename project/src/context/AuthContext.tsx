import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { getCurrentUser } from '../data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // In a real app, we'd check localStorage or cookies for a token
    // and validate it with the backend
    return getCurrentUser();
  });

  const login = async (email: string, password: string) => {
    // Mock login - would be replaced with actual API call
    if (email && password) {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Set the current user after successful login
      setUser(getCurrentUser());
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    // Mock logout - would clear tokens and session in a real app
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration - would be replaced with actual API call
    if (name && email && password) {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // In a real app, the backend would create a new user and return it
      // Here we'll just use our mock current user
      setUser(getCurrentUser());
    } else {
      throw new Error('Please fill in all required fields');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout, 
      register 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};