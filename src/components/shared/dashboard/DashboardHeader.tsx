import { Button } from "@/components/ui/button";
import { Globe, Menu } from "lucide-react";
import Searchbar from "./Searchbar";
import { UserMenu } from "./UserMenu";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardHeaderProps {
  onMobileMenuClick: () => void;
}

export function DashboardHeader({ onMobileMenuClick }: DashboardHeaderProps) {
  const { lang, toggleLanguage } = useLanguage();
  return (
    <header className="bg-white border-b border-border" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          <UserMenu />
          <Searchbar />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              title={lang === "ar" ? "Switch to English" : "التبديل للعربية"}
              className="hidden lg:inline-flex"
            >
              <Globe className="w-4 h-4 mr-2" />
              {lang === "ar" ? "English" : "العربية"}
            </Button>
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
      </div>
    </header>
  );
}
