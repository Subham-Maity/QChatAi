"use client";
import React, { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { publicRoutes } from "@/links/whitelist-route.constant";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (isLoaded && !userId && !publicRoutes.includes(path)) {
      router.push("/sign-in");
    }
  }, [isLoaded, userId, router, path]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!userId && !publicRoutes.includes(path)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
