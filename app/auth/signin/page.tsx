"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "http://localhost:3001/dashboard",
        });
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
                    <button type="submit" className="bg-blue-300 w-full p-2 rounded-md text-white font-bold">Login</button>
                </form>
            </div>
        </div>
    );
}
