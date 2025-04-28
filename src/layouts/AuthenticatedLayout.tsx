// src/layouts/AuthenticatedLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Navbar from '../Components/NavBar';
import { useThemeStore } from '../Components/theme';

const AuthenticatedLayout: React.FC = () => {
  const isAuthenticated = useAuth();
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  if (!isAuthenticated) {
    return null; // Redirection handled inside the useAuth hook
  }

  return (
    <div className="min-h-screen text-black bg-white dark:bg-black dark:text-white">
      <Navbar />


      <main className="px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
