"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      const res = await fetch("/api/auth/admin", {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.message);
      } else {
        setMessage("Access Denied");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-lg">Admin Page</h1>
      <p>{message}</p>
    </div>
  );
}
