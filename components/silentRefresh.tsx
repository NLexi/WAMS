"use client";

import { useEffect } from "react";

const SilentRefresh = () => {
  useEffect(() => {
    
    const refreshSession = async () => {
      try {
        await fetch("/protected/ping", { credentials: "include" });
      } catch (error) {
        console.error("Session refresh failed:", error);
      }
    };

    refreshSession();
    const interval = setInterval(refreshSession, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SilentRefresh;
