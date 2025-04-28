import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import useAuthStore from '../store/authStore';
import UserForm from '../Components/UserForm';

// Add user data
const addUser = async (userData: any, token: string) => {
  const response = await api.post('/api/users', userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.result.data.user;
};

const AddUser: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { token } = useAuthStore();

  // Properly type the useMutation options
  const mutation = useMutation<
    any, // Response type of the mutation
    Error, // Error type
    any // Input type (userData)
  >({
    mutationFn: (userData: any) => addUser(userData, token || ''), // Mutation function
    onSuccess: () => {
      queryClient.invalidateQueries(['users'] as any); // Refresh the user list
      toast.success('User created successfully'); // Success toast
      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Failed to create user'); // Error toast
    },
  });

  const handleSubmit = (formData: any) => {
    mutation.mutate(formData);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Card Container */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md max-h-min dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">Add New User</h1>
        <UserForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default AddUser;