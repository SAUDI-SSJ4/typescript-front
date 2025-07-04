import { Settings } from "lucide-react";
import AcademySettingsForm from "./AcademyMainSettingsForm";

function MainSettings() {
  return (
    <div className="space-y-6">
      <Header />
      <AcademySettingsForm />
    </div>
  );
}

export default MainSettings;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Settings className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            الإعدادات الرئيسية
          </span>
        </div>
      </div>
    </div>
  );
}
