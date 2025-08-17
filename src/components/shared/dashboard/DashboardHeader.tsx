import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Searchbar from "./Searchbar";
import { UserMenu } from "./UserMenu";

interface DashboardHeaderProps {
  onMobileMenuClick: () => void;
}

export function DashboardHeader({ onMobileMenuClick }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-border">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <UserMenu align="start" />
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
