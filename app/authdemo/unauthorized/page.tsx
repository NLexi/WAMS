'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  useEffect(() => {
      setTimeout(() => {
        router.push("/authdemo/protected");
      }, 2500);
  }, [router]);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black">
      <h1 className="font-bold text-2xl text-red-600">Access Denied</h1>
      <p className="text-center text-white">You do not have permission to access this page.</p>
      <p className="text-center text-white">Redirecting to protected....</p>
    </div>
  );
}
