import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/shared/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/shared/dashboard/DashboardHeader";
import { useState } from "react";
import { UserType } from "@/constants/enums";

export function DashboardLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar userType={UserType.ACADEMY} />
      <DashboardSidebar
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        userType={UserType.ACADEMY}
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
