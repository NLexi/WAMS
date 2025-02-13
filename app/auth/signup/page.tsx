"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["USER", "ADMIN", "MANAGER"]),
  departmentId: z.string().optional().or(z.literal("")),
}).refine((data) => data.role === "ADMIN" || data.departmentId, {
  message: "Please select a department",
  path: ["departmentId"],
});

interface Department {
  id: string; 
  name: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "USER",
    departmentId: "",
  });
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
        try {
          const response = await fetch("/api/departments");
          if (!response.ok) {
            throw new Error("Failed to fetch departments");
          }
          const data = await response.json();
          setDepartments(data);
        } catch (error: any) {
          setError("Error fetching departments: " + error.message);
        }
      };

    fetchDepartments();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const validation = signupSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }
  
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const data = await response.json();
        const errorMsg = data.error || "Signup failed";
        throw new Error(errorMsg);
      }
  
      router.push("/auth/signin");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <div className="flex flex-col bg-slate-200 justify-center w-[25%] items-center gap-4 p-6 rounded-lg">
        <h1 className="font-bold text-2xl">Sign Up</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full">
          <input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded mb-2"
            required
          />
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
          </select>
          <select
            value={formData.departmentId}
            onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Select a department (optional)</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-300 text-white px-4 py-2 rounded w-full hover:bg-blue-500 hover:cursor-pointer">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
