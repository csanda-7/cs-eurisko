// src/components/SearchInput.jsx
import React from "react";

const SearchInput = () => {
  return (
    <div className="mt-4 mb-6">
      <input
        type="text"
        placeholder="Search users..."
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#3251D0]"
      />
    </div>
  );
};

export default SearchInput;