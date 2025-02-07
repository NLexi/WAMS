"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth/signin");
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <div className="flex flex-col bg-slate-200 justify-center w-[25%] items-center gap-4 p-6 rounded-lg">
        <h1 className="font-bold text-2xl">Authentication Error</h1>
        <p className="text-red-500 text-center font-semibold">Incorrect sign in details. Redirecting to sign-in page...</p>
      </div>
    </div>
  );
}