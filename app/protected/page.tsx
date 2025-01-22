"use client";

import LogoutButton from "@/components/LogoutButton";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
    const router = useRouter();
    const userRole = window.sessionStorage.getItem("UserRole");

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-2">
            <h1 className="font-bold text-lg">Protected Page</h1>
            <p>Welcome to the protected route</p>
            <div className="flex flex-row gap-4 justify-evenly">
                {
                    userRole === 'ADMIN' ?
                        <button onClick={() => router.push('/protected/admin')} className="bg-green-200 p-2 px-4 rounded-md">Admin</button> :
                        <></>
                }
                {
                    ((userRole === 'ADMIN') || (userRole === 'EDITOR')) ?
                        <button onClick={() => router.push('/protected/editor')} className="bg-blue-200 p-2 px-4 rounded-md">Editor</button> :
                        <></>
                }
            </div>
            <LogoutButton />
        </div>
    );
}
