// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#3251D0] text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">User Management</h1>
      <div className="flex gap-4">
        <button className="bg-white text-[#3251D0] px-4 py-2 rounded-md">
          Create User
        </button>
        <button className="bg-red-500 text-[#ffffff] px-4 py-2 rounded-md">
          Logout
        </button>
        <button className="bg-white text-[#3251D0] px-4 py-2 rounded-md">
          <i className="fa fa-moon-o" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;