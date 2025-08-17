import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/auth/signin",
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    // Only show loading spinner for initial authentication check
    if (!isLoading) {
      setInitialCheck(false);
    }
  }, [isLoading]);

  // Show loading only during initial authentication check
  if (initialCheck && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (user && !user.verified) {
    // Redirect to verify account page if user is not verified
    return (
      <Navigate to="/auth/verify-account" state={{ from: location }} replace />
    );
  }
  return isAuthenticated && user && user.verified && <>{children}</>;
}

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function PublicRoute({
  children,
  redirectTo = "/dashboard",
}: PublicRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [initialCheck, setInitialCheck] = useState(true);

  useEffect(() => {
    // Only show loading spinner for initial authentication check
    if (!isLoading) {
      setInitialCheck(false);
    }
  }, [isLoading]);

  // Show loading only during initial authentication check
  if (initialCheck && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated && user && user.verified) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
