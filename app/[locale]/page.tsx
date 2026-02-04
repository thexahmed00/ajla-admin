"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "./lib/auth";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (isAuthenticated()) {
      router.replace("/dashboard");
    } else {
      // If not authenticated, redirect to login
      router.replace("/login");
    }
  }, [router]);
  
  // Show nothing while redirecting
  return null;
}
