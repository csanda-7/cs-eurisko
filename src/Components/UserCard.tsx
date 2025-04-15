import React from 'react';
import Button from '../atoms/button/button';

interface User {
  name: string;
  email: string;
  status: 'active' | 'locked';
  dob: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const initials = user.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex flex-col justify-between h-full p-4 space-y-3 transition-colors bg-white shadow-md dark:bg-gray-800 rounded-xl">
      <div className="flex justify-center">
        <div className="bg-[#3251D0] dark:bg-blue-600 rounded-full h-16 w-16 flex items-center justify-center text-white font-bold text-lg">
          {initials}
        </div>
      </div>
      <h2 className="text-lg font-bold text-center text-black dark:text-white">{user.name}</h2>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        <p>Email: {user.email}</p>
        <p>Status: {user.status}</p>
        <p>Date of Birth: {user.dob}</p>
      </div>
      <div className="flex justify-end gap-2">
      <Button variant="primary">Edit</Button>
      <Button variant="secondary">Delete</Button>
</div>
    </div>
  );
};

export default UserCard;
