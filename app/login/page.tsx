"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();
            window.sessionStorage.setItem("UserRole", data.role)
            router.push('/protected')
            alert("Logged in successfully");
        } else {
            alert("Login failed");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col bg-slate-200 w-[30%] p-6 gap-4 rounded-lg items-center">
                <h1 className="font-bold text-xl">Login</h1>
                <div className="w-full">
                    <label id="email" className="p-1 text-sm">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 rounded-md w-full mb-4"
                    />
                    <label id="password" className="p-1 text-sm">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 rounded-md w-full mb-4"
                    />
                </div>
                <button onClick={handleLogin} className="bg-blue-300 w-[50%] p-2 rounded-md text-white font-bold">
                    Login
                </button>
            </div>
        </div>
    );
}
