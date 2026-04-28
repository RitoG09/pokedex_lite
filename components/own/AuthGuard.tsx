"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoadingScreen } from "@/components/own/LoadingScreen";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isGuest, setIsGuest] = useState<boolean | null>(null);

  useEffect(() => {
    setIsGuest(localStorage.getItem("guest") === "true");
  }, []);

  // Wait for both session and guest check to resolve
  if (status === "loading" || isGuest === null) {
    return <LoadingScreen />;
  }

  // If not authenticated and not a guest, redirect to login
  if (!session && !isGuest) {
    router.replace("/login");
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
