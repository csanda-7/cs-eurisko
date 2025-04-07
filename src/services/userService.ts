import { User } from "../types/User";

// src/services/userService.ts
export const fetchUsers = async () => {
    return new Promise<User[]>((resolve) => {
      setTimeout(() => {
        resolve([
          {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            status: "Active",
            dob: "1990-05-15",
          },
          {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@example.com",
            status: "Locked",
            dob: "1988-10-22",
          },
          {
            firstName: "Alice",
            lastName: "Johnson",
            email: "alice.johnson@example.com",
            status: "Active",
            dob: "1995-02-10",
          },
          {
            firstName: "Bob",
            lastName: "Martin",
            email: "bob.martin@example.com",
            status: "Locked",
            dob: "1980-08-05",
          },
          {
            firstName: "Charlie",
            lastName: "Brown",
            email: "charlie.brown@example.com",
            status: "Active",
            dob: "1992-11-30",
          },
          {
            firstName: "David",
            lastName: "Lee",
            email: "david.lee@example.com",
            status: "Locked",
            dob: "1987-07-14",
          },
          {
            firstName: "Eve",
            lastName: "",
            email: "eve.green@example.com",
            status: "Active",
            dob: "1993-09-21",
          },
          {
            firstName: "Frank",
            lastName: "White",
            email: "frank.white@example.com",
            status: "Active",
            dob: "1994-01-25",
          },
          {
            firstName: "Grace",
            lastName: "Black",
            email: "grace.black@example.com",
            status: "Locked",
            dob: "1985-03-17",
          },
          {
            firstName: "Hannah",
            lastName: "",
            email: "hannah.purple@example.com",
            status: "Active",
            dob: "1996-12-03",
          },
        ]);
      }, 1000);
    });
  };