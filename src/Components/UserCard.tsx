// src/components/UserCard.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/button/button';
import ConfirmationModal from './ConfirmationModal'; // Import the modal

interface UserCardUser {
  id: string; // Ensure `id` is included
  name: string;
  email: string;
  status: 'active' | 'locked';
  dob: string;
}

interface UserCardProps {
  user: UserCardUser;
  onDelete: (id: string) => void; // Add onDelete prop
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initials = user.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    onDelete(user.id); // Trigger the onDelete callback
    closeModal(); // Close the modal after deletion
  };

  return (
    <>
      <div className="flex flex-col justify-between h-full p-4 space-y-3 transition-colors bg-white shadow-md dark:bg-gray-800 rounded-xl">
        <div className="flex justify-center">
          <div className="bg-[#3251D0] dark:bg-blue-600 rounded-full h-16 w-16 flex items-center justify-center text-white font-bold text-lg">
            {initials || 'N/A'}
          </div>
        </div>
        <h2 className="text-lg font-bold text-center text-black dark:text-white">
          {user.name || 'Unknown User'}
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p>Email: {user.email}</p>
          <p>Status: {user.status}</p>
          <p>Date of Birth: {user.dob}</p>
        </div>
        <div className="flex justify-end gap-2">
          {/* Link to the edit page with the user's ID */}
          <Link to={`/dashboard/edit/${user.id}`}>
            <Button variant="primary">Edit</Button>
          </Link>
          <Button variant="secondary" onClick={openModal}>
            Delete
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete ${user.name}?`}
      />
    </>
  );
};

export default UserCard;