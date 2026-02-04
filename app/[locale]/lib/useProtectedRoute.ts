import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, isAdmin } from "./auth";

export function useProtectedRoute(requireAdmin: boolean = false) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const authenticated = isAuthenticated();

    if (!authenticated) {
      // Redirect to login if not authenticated
      router.replace("/login");
      return;
    }

    // Check if user is admin if required
    if (requireAdmin && !isAdmin()) {
      // Redirect to access denied if not admin
      router.replace("/access-denied");
      return;
    }
  }, [router, requireAdmin]);
}
