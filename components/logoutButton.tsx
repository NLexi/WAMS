'use client'

import { signOut } from "next-auth/react";

export function LogoutButton() {
    return (
        <button onClick={() => signOut({ callbackUrl: '/auth/signin' })} className="bg-red-500 text-white p-2 px-4 rounded-md">
            Sign out
        </button>
    );
}