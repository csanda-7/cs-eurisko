// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserGrid from './components/UserGrid';
import LoginPage from './pages/LoginPage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import UserProfile from './pages/UserProfile';
import { useThemeStore } from './components/theme'; 

const App: React.FC = () => {
  const setDarkMode = useThemeStore((state) => state.setDarkMode);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');
  }, [setDarkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Authenticated Routes */}
        <Route path="/dashboard/*" element={<AuthenticatedLayout />}>
          <Route index element={<UserGrid />} />
          <Route path="profile/:id" element={<UserProfile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
