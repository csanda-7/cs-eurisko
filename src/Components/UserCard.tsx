// src/components/UserCard.tsx
import React from "react";
import { User } from "../types/User";

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#3251D0] text-white rounded-full flex items-center justify-center text-xl font-bold">
          {initials}
        </div>
        <div>
          <p className="font-semibold">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
          <p className="text-sm">
            Status: {user.status.toLowerCase()}
          </p>
          <p className="text-sm text-gray-600">Date of Birth: {user.dob}</p>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button className="bg-[#3251D0] text-white px-3 py-1 rounded-md">
          Edit
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;