"use client";

import usePermission from "@/hooks/usePermission";
import { redirect } from "next/navigation";

export default function AdminPage() {
    const isValid = usePermission();

    if (isValid === "invalid") {
        redirect('/unauthorized');
    }

    if (isValid === "valid") {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <h1 className="font-bold text-lg">Admin Page</h1>
                <p>welcome to the admin route</p>
            </div>
        );
    }
    return;
}
