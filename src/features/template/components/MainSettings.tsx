import { Settings } from "lucide-react";
import AcademySettingsForm from "./AcademyMainSettingsForm";

function MainSettings() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold flex gap-4 items-center text-foreground">
          <Settings className="text-primary" />
          الإعدادات الرئيسية
        </h1>
      </div>

      <AcademySettingsForm />
    </div>
  );
}

export default MainSettings;
