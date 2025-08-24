import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { UserType } from "@/constants/enums";
import { LogoutButton } from "./LogoutButton";

export function UserProfile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-pulse flex space-x-2">
          <div className="rounded-full bg-gray-300 h-8 w-8"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-24"></div>
            <div className="h-3 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getUserTypeLabel = (userType: UserType) => {
    switch (userType) {
      case UserType.STUDENT:
        return "طالب";
      case UserType.ACADEMY:
        return "أكاديمية";
      default:
        return userType;
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex-shrink-0">
          {user.profile_picture ? (
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={user.profile_picture}
              alt={user.name}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground truncate">
            {user.name}
          </p>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
          <p className="text-xs text-muted-foreground">
            {getUserTypeLabel(user.user_type)}
          </p>
        </div>
      </div>
      <LogoutButton variant="outline" size="sm" />
    </div>
  );
}
