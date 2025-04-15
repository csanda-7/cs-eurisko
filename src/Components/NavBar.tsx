import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useThemeStore } from './theme';
import Button from '../atoms/button/button';

const Navbar: React.FC = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);


  return (
    <div className="w-full bg-[#3251D0] dark:bg-gray-900 flex items-center justify-between p-4">
      <h1 className="text-lg font-bold text-white">User Management</h1>
      <div className="flex items-center space-x-3">
      <Link to="/dashboard">
      <Button variant="primary">Create User</Button>
    </Link>
    <Link to="/login">
      <Button variant="secondary">Logout</Button>
    </Link>
        <button onClick={toggleDarkMode} className="p-2">
          {darkMode ? (
            <span role="img" aria-label="Light mode">🌞</span>
          ) : (
            <span role="img" aria-label="Dark mode">🌙</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
