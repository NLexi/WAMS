"use client";

import usePermission from "@/hooks/usePermission";
import { redirect } from "next/navigation";

export default function EditorPage() {
    const { isValid, actions } = usePermission();

    const renderButton = (action: string) => {
        switch (action) {
            case "POST":
                return <button key={action} className="p-2 bg-slate-200 rounded-md px-4">POST</button>;
            case "GET":
                return <button key={action} className="p-2 bg-slate-200 rounded-md px-4">GET</button>;
            case "PUT":
                return <button key={action} className="p-2 bg-slate-200 rounded-md px-4">PUT</button>;
            case "DELETE":
                return <button key={action} className="p-2 bg-slate-200 rounded-md px-4">DELETE</button>;
            default:
                return null;
        }
    };


    if (isValid === "invalid") {
        redirect('/unauthorized');
    }

    if (isValid === "valid") {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                <h1 className="font-bold text-lg">Editor Page</h1>
                <p>welcome to the editor route</p>
                <div className="mt-4 flex flex-row gap-4 p-4">
                    {actions.map((action: string) => renderButton(action))}
                </div>
            </div>
        );
    };
    return;
}
