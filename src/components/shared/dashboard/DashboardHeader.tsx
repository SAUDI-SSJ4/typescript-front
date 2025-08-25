import { Button } from "@/components/ui/button";
import { Eye, Menu } from "lucide-react";
import Searchbar from "./Searchbar";
import { UserMenu } from "./UserMenu";
import { Link } from "react-router-dom";
import { useCurrentUserProfile } from "@/features/dashboard/profile/hooks";
import { getAcademyDetails } from "@/lib/academy";
import AddItemModal from "./AddItemModal";
import { NotificationsDropdown } from "./NotificationsDropdown";
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

interface DashboardHeaderProps {
  onMobileMenuClick: () => void;
}

export function DashboardHeader({ onMobileMenuClick }: DashboardHeaderProps) {
  const { data: user } = useCurrentUserProfile();
  
  // Use mock user for development if no user from API
  const displayUser = user || mockUser;

  return (
    <header className="bg-white border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <div className="flex items-center gap-4">
            <UserMenu align="start" />
            {displayUser?.academy_memberships && (
              <>
                <Link
                  to={`/academy/${getAcademyDetails(displayUser)?.academy_slug}`}
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative"
                    title="معاينة الأكاديمية"
                  >
                    <Eye className="w-5 h-5" />
                  </Button>
                </Link>
                <AddItemModal />
              </>
            )}

            <NotificationsDropdown />
          </div>
          <Searchbar />
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onMobileMenuClick}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
