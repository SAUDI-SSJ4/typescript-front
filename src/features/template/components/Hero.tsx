<<<<<<< HEAD:src/features/template/components/Hero.tsx
import { Menu } from "lucide-react";
import AcademyHeroForm from "./AcademyHeroForm";
import { useAcademyHero } from "../hooks/useHeroQueries";
import { Loader } from "@/components/shared";

function Hero() {
  const { data: hero, isPending } = useAcademyHero();

  if (isPending) {
    return (
      <div className="element-center">
        <Loader />
      </div>
    );
  }
  return (
    !isPending &&
    hero && (
      <div className="space-y-6">
        <Header />
        <AcademyHeroForm hero={hero.data} />
      </div>
    )
  );
}

export default Hero;
=======
import { useState } from "react";
import WebBuilderLayout from "@/components/shared/WebBuilderLayout";
import AcademyMainMenuForm from "./AcademyMainMenuForm";
import CustomCSSProvider from "./CustomCSSProvider";
import HomePreview from "@/templates/template-one/pages/preview";

function MainMenu() {
  const [canUndo] = useState(false);
  const [canRedo] = useState(false);

  const handleSave = () => {
    // تنفيذ عملية الحفظ
    console.log("حفظ التغييرات");
  };

  const handleUndo = () => {
    // تنفيذ عملية التراجع
    console.log("تراجع");
  };

  const handleRedo = () => {
    // تنفيذ عملية الإعادة
    console.log("إعادة");
  };
>>>>>>> sketch:src/features/template/components/MainMenu.tsx

  return (
<<<<<<< HEAD:src/features/template/components/Hero.tsx
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Menu className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            القسم الرئيسي
          </span>
=======
    <CustomCSSProvider>
      <WebBuilderLayout
        title="القسم الرئيسي"
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        showBuilderControls={false}
        previewComponent={
          <div className="w-full h-full bg-white">
            <HomePreview />
          </div>
        }
      >
        <div className="space-y-6">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">تحرير القسم الرئيسي</h3>
            <p className="text-sm text-green-700">
              قم بتعديل محتوى وعناصر القسم الرئيسي للأكاديمية
            </p>
          </div>
          <AcademyMainMenuForm />
>>>>>>> sketch:src/features/template/components/MainMenu.tsx
        </div>
      </WebBuilderLayout>
    </CustomCSSProvider>
  );
}

export default MainMenu;
