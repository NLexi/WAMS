"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.role !== "ADMIN" && !formData.departmentId) {
            setError("Please select a department");
            return;
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Signup failed");
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
                        type="email"
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
                        required
                    >
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="MANAGER">Manager</option>
                    </select>
                    <select
                        value={formData.departmentId}
                        onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                        className="w-full p-2 border rounded mb-2"
                        required={formData.role !== "ADMIN"}
                    >
                        <option value="">Select a department (optional)</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="bg-blue-300 text-white px-4 py-2 rounded w-full hover:bg-blue-500 hover:cursor-pointer" disabled={formData.role != "ADMIN" && !formData.departmentId}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}