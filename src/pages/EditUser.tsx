import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import UserForm from '../Components/UserForm';
import useAuthStore from '../store/authStore';

// Define types
interface User {
  status: "active" | "locked";
  firstName: string;
  email: string;
  dateOfBirth: string;
  lastName?: string | undefined;
}

// Fetch user data
const fetchUser = async (id: string, token: string): Promise<User> => {
  const response = await api.get(`/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.result.data.user;
};

// Update user data
const updateUser = async (
  id: string,
  userData: Partial<User>,
  token: string
): Promise<User> => {
  const response = await api.put(`/api/users/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.result.data.user;
};

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  // Fetch user data using useQuery
  const { data, isLoading, error } = useQuery<
    User, // Response type
    Error
  >({
    queryKey: ['user', id], // Query key
    queryFn: () => fetchUser(id || '', token || ''), // Query function
    enabled: !!token && !!id, // Only enable the query if `token` and `id` are valid
  });

  // Properly type the useMutation options
  const mutation = useMutation<
    User, // Response type of the mutation
    Error, // Error type
    Partial<User> // Input type (userData)
  >({
    mutationFn: (userData: Partial<User>) =>
      updateUser(id || '', userData, token || ''), // Mutation function
    onSuccess: () => {
      queryClient.invalidateQueries(['users'] as any); // Refresh the user list
      toast.success('User updated successfully'); // Success toast
      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Failed to update user'); // Error toast
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load user</p>;

  const handleSubmit = (formData: Partial<User>) => {
    mutation.mutate(formData);
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Card Container */}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md max-h-min dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">Edit User</h1>
        <UserForm onSubmit={handleSubmit} defaultValues={data} />
      </div>
    </div>
  );
};

export default EditUser;