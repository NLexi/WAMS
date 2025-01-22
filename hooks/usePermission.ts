"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function usePermission() {
    const [isValid, setIsValid] = useState("");
  const userRole = window.sessionStorage.getItem("UserRole")
  const pathname = usePathname();

  useEffect(() => {
    const checkPermission = async () => {
      const res = await fetch("/api/permission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: userRole,
          path: pathname,
        }),
      });

      if (!res.ok) {
        setIsValid("invalid")
      } else {
        setIsValid("valid")
      }
    };

    checkPermission();
  }, [userRole, pathname]);
  return isValid;
}

