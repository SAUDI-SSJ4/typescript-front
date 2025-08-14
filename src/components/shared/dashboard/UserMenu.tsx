import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Routes } from "@/constants/enums";
import { useCurrentUserProfile } from "@/features/dashboard/profile/hooks";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { Skeleton } from "@/components/ui/skeleton";

export function UserMenu({ align }: { align?: "start" | "end" | "center" }) {
  const { data: user, isLoading } = useCurrentUserProfile();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  if (isLoading) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }
  return (
    !isLoading &&
    user && (
      <div className="flex items-center gap-4">
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                {(user as any)?.avatar && (
                  <AvatarImage src={(user as any).avatar} alt={user.fname} />
                )}
                <AvatarFallback className="bg-primary text-white">
                  {user?.fname?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 border-border"
            align={align || "end"}
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {`${user.fname} ${user.lname}`}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={Routes.DASHBOARD_PROFILE} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>الملف الشخصي</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>المساعدة والدعم</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer text-red-600 focus:text-red-600"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>تسجيل الخروج</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  );
}
