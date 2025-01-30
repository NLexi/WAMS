import bcrypt from "bcryptjs";

export const users = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "ADMIN",
    permissions: ["POST", "DELETE", "PUT", "GET"],
  },
  {
    id: "2",
    name: "Editor",
    email: "editor@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "EDITOR",
    permissions: ["PUT", "GET"],
  },
  {
    id: "3",
    name: "Contributor",
    email: "user@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "USER",
    permissions: ["POST", "PUT", "GET"],
  },
];
