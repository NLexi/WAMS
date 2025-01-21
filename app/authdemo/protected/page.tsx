"use client";

import LogoutButton from "@/components/custom/LogoutButton";
import { UserRole } from "@/lib/userRoles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProtectedPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState("")

  useEffect(() => {
    const fetchProtectedData = async () => {
      const res = await fetch("/api/auth/protected", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setUserRole(data.role);
        setMessage(data.message);
      } else {
        setMessage("Access Denied");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="font-bold text-lg">Protected Page</h1>
      <p>{message}</p>
      <div className="flex flex-row gap-4 justify-evenly">
        {
          userRole === UserRole.ADMIN ?
            <button onClick={() => router.push('/authdemo/admin')} className="bg-green-200 p-2 px-4 rounded-md">Admin</button> :
            <></>
        }
        {
          ((userRole === UserRole.ADMIN) || (userRole === UserRole.EDITOR)) ?
            <button onClick={() => router.push('/authdemo/editor')} className="bg-blue-200 p-2 px-4 rounded-md">Editor</button> :
            <></>
        }
      </div>
      <LogoutButton />
    </div>
  );
}
