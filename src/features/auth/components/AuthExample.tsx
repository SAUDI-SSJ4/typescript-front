import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export function AuthExample() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg border">
      <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>

      {isAuthenticated ? (
        <div className="space-y-4">
          <div className="text-green-600">✅ User is authenticated</div>

          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Type:</strong> {user?.user_type}
            </p>
            {user?.phone && (
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            )}
          </div>

          <LogoutButton variant="destructive" className="w-full" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-red-600">❌ User is not authenticated</div>

          <div className="space-y-2">
            <a
              href="/auth/signin"
              className="block w-full text-center bg-primary text-white py-2 px-4 rounded hover:bg-primary/90"
            >
              Sign In
            </a>
            <a
              href="/auth/signup"
              className="block w-full text-center border border-primary text-primary py-2 px-4 rounded hover:bg-primary/10"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
