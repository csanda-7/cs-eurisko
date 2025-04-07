// src/types/User.ts
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    status: "Active" | "Locked"; // Status can only be "Active" or "Locked"
    dob: string; // Date of Birth
  }