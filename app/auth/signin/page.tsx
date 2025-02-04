"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
                return;
            }
            const tokenResponse = await fetch("/api/auth/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
                credentials: "include",
            });

            if (!tokenResponse.ok) {
                setError("Failed to set refresh token");
                return;
            }
            window.location.href = "/dashboard";
        } catch (error) {
            setError("An unexpected error occurred. Please try again.");
        }
    };


    return (
        <div className="flex flex-col h-screen justify-center items-center gap-2">
            <div className="flex flex-col bg-slate-200 justify-center w-[25%] items-center gap-4 p-6 rounded-lg">
                <h1 className="font-bold text-2xl">Sign In</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 rounded-md w-full"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 rounded-md w-full mb-4"
                    />
                    <div className="flex w-full flex-row gap-4">
                        <button type="submit" className="bg-blue-300 w-full p-2 rounded-md text-white font-bold hover:bg-blue-500 hover:cursor-pointer">Login</button>
                        <Link href="/auth/signup" className="w-full"><button className="bg-red-300 w-full p-2 rounded-md text-white font-bold hover:bg-red-500 hover:cursor-pointer">Sign Up</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

