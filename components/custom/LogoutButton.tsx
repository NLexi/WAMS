'use client'

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/authdemo/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 px-4 rounded-md">
      Logout
    </button>
  );
}
