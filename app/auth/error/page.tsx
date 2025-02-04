"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthErrorPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth/signin");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-2">
      <div className="flex flex-col bg-slate-200 justify-center w-[25%] items-center gap-4 p-6 rounded-lg">
        <h1 className="font-bold text-2xl">Authentication Error</h1>
        <p className="text-red-500">An error occurred during sign-in. Redirecting to sign-in page...</p>
      </div>
    </div>
  );
}