import { UserType } from "@/constants/enums";
import AcademySidebar from "./AcademySidebar";
import StudentSidebar from "./StudentSidebar";
import type { User } from "@/types/user";
import { Home } from "lucide-react";

interface DashboardSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  user: User;
}

const baseSidebarItems = [
    {
      id: "dashboard",
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
];

function DashboardSidebar({
  isMobile = false,
  isOpen = true,
  onClose,
  user,
}: DashboardSidebarProps) {
  // Render appropriate sidebar based on user type
  if (user.user_type === UserType.ACADEMY) {
      return (
      <AcademySidebar
        baseSidebarItems={baseSidebarItems}
        isMobile={isMobile}
        isOpen={isOpen}
        onClose={onClose}
        user={user}
      />
      );
    }

    return (
    <StudentSidebar
      baseSidebarItems={baseSidebarItems}
      isMobile={isMobile}
      isOpen={isOpen}
      onClose={onClose}
      user={user}
    />
  );
}

export default DashboardSidebar;
