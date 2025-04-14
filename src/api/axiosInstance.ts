// src/api/axiosInstance.ts
import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: 'http://localhost:5173', // Vite server's URL
  timeout: 5000,
});


api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;