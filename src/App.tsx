// src/App.jsx
import React, { useEffect, useState } from "react";
import SearchInput from "./Components/SearchInput";
import UserGrid from "./Components/UserGrid";
import Navbar from "./Components/NavBar";
import { fetchUsers } from "./services/userService";
import { User } from "./types/User";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <Navbar />
      <SearchInput />
      <UserGrid users={users} />
    </div>
  );
}

export default App;