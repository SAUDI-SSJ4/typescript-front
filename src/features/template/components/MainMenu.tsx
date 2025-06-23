import { Menu } from "lucide-react";
import AcademyMainMenuForm from "./AcademyMainMenuForm";

function MainMenu() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold flex gap-4 items-center text-foreground">
          <Menu className="text-primary" />
          القائمة الرئيسية
        </h1>
      </div>
      <AcademyMainMenuForm />
    </div>
  );
}

export default MainMenu;
