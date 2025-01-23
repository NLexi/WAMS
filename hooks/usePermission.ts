"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function usePermission() {
  const [isValid, setIsValid] = useState("");
  const [actions, setActions] = useState([]);
  const userRole = window.sessionStorage.getItem("UserRole");
  const pathname = usePathname();

  useEffect(() => {
    const checkPermission = async () => {
      try {
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

        const data = await res.json();

        if (res.ok) {
          setIsValid("valid");
          setActions(data.method || []);
        } else {
          setIsValid("invalid");
          setActions(data.method || []);
        }
      } catch (error) {
        console.error("Error checking permissions:", error);
        setIsValid("invalid");
        setActions([]);
      }
    };

    checkPermission();
  }, [userRole, pathname]);

  return { isValid, actions };
}
