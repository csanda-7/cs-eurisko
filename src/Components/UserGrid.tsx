import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api/axiosInstance';
import { toast } from 'react-toastify';
import Searchbar from './SearchBar';
import UserCard from './UserCard';
import useAuthStore from '../store/authStore';

// Fetch users
const fetchUsers = async (search: string, token: string) => {
  const response = await api.get('/api/users', {
    params: { search },
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.result.data.users;
};

const UserGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Local search term state
  const queryClient = useQueryClient();
  const { token } = useAuthStore();

  // Fetch users using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ['users', searchTerm], // Include search term in query key
    queryFn: () => fetchUsers(searchTerm, token || ''), // Fetch users based on search term
    enabled: !!token, // Only enable the query if `token` is valid
  });

  // Transform users for display
  const transformedUsers = data?.map((user: any) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName || ''}`.trim(),
    email: user.email,
    status: user.status.toLowerCase() as 'active' | 'locked',
    dob: user.dateOfBirth,
  }));

  // Filter users based on search term
  const filteredUsers = transformedUsers?.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete action
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      queryClient.invalidateQueries(['users'] as any); // Refresh the user list
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error('Failed to delete user');
    }
  };

  // Loading state
  if (isLoading) return <p className="text-center">Loading...</p>;

  // Error state
  if (error) return <p className="text-center text-red-500">Failed to fetch users</p>;

  return (
    <div className="w-full px-6 py-4">
      {/* Search Bar */}
      <Searchbar
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
      />

      {/* User Grid */}
      {filteredUsers && filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredUsers.map((user: any) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={() => handleDelete(user.id)} // Pass delete handler
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">No users found.</p>
      )}
    </div>
  );
};

export default UserGrid;