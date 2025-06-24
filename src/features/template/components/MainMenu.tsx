import { Menu } from "lucide-react";
import AcademyMainMenuForm from "./AcademyMainMenuForm";

function MainMenu() {
  return (
    <div className="space-y-6">
      <Header />
      <AcademyMainMenuForm />
    </div>
  );
}

export default MainMenu;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Menu className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
          القسم الرئيسي
          </span>
        </div>
      </div>
    </div>
  );
}
