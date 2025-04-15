// src/layouts/AuthenticatedLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Searchbar from '../components/SearchBar';
import useAuth from '../hooks/useAuth';
import { useThemeStore } from '../components/theme';

const AuthenticatedLayout: React.FC = () => {
  const isAuthenticated = useAuth();
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  if (!isAuthenticated) {
    return null; // Redirection handled inside the useAuth hook
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Navbar />
      <Searchbar />


      <main className="px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
