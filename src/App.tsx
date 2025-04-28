import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from './pages/LoginPage';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import UserProfile from './pages/UserProfile';

import UserGrid from './Components/UserGrid';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import { useThemeStore } from './Components/theme';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const setDarkMode = useThemeStore((state) => state.setDarkMode);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');
  }, [setDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ToastContainer /> 
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          {/* Authenticated Routes */}
          <Route path="/dashboard/*" element={<AuthenticatedLayout />}>
            <Route index element={<UserGrid />} />
            <Route path="profile/:id" element={<UserProfile />} />
            <Route path="new" element={<AddUser />} />
            <Route path="edit/:id" element={<EditUser />} />
          </Route>
          {/* Fallback */}
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;