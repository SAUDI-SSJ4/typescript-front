import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/shared/dashboard/DashboardHeader";
import { useState } from "react";
import { DashboardLoading } from "@/components/shared/dashboard";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { UserType } from "@/constants/enums";
import type { User } from "@/types/user";

// Mock user data for development
const mockUser: User = {
  id: "1",
  email: "academy@example.com",
  fname: "أكاديمية",
  lname: "سايان",
  user_type: UserType.ACADEMY,
  verified: true,
  phone_number: "+966501234567",
  gender: "غير محدد",
  academy_memberships: [
    {
      membership_id: 1,
      academy_id: 1,
      academy_name: "أكاديمية سايان",
      academy_slug: "sayan-academy",
      user_role: "owner",
      is_active: true,
      joined_at: "2024-01-01T00:00:00Z",
      academy_details: {
        about: "أكاديمية رائدة في مجال التعليم الإلكتروني",
        image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
        email: "academy@example.com",
        phone: "+966501234567",
        address: "الرياض، المملكة العربية السعودية",
        status: "active",
        created_at: "2024-01-01T00:00:00Z",
      },
      settings: {
        logo: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
      },
    },
  ],
};

function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();
  
  // Use mock user for development if no user from API or if user doesn't have academy_memberships
  const displayUser = (user && user.academy_memberships && user.academy_memberships.length > 0) ? user : mockUser;
  
  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <DashboardSidebar
        userType={displayUser.user_type}
        isMobile={false}
        user={displayUser}
      />

      {/* Mobile Sidebar */}
      <DashboardSidebar
        userType={displayUser.user_type}
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        user={displayUser}
      />

      <div className="flex-1 flex flex-col">
        <DashboardHeader
          onMobileMenuClick={() => setIsMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-4 lg:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
