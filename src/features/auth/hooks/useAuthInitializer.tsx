import { useEffect, useRef } from "react";
import { useAuthStore } from "@/features/auth/store";

// Hook to refresh authentication state on app startup
// Note: The Zustand store with persist middleware handles loading from cookies
// This hook only refreshes user data from the server if already authenticated
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthInitializer() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const refreshUser = useAuthStore((state) => state.refreshUser);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only refresh once on mount if user is already authenticated
    if (isAuthenticated && !hasInitialized.current) {
      hasInitialized.current = true;
      refreshUser();
    }
  }, [isAuthenticated, refreshUser]);
}

// Auth initialization component to be used at app level
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  useAuthInitializer();
  return <>{children}</>;
}
