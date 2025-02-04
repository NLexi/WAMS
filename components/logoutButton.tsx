"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
    const handleLogout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        });
        await signOut({ callbackUrl: "/auth/signin" });
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 px-4 rounded-md hover:bg-red-700"
        >
            Sign out
        </button>
    );
}
