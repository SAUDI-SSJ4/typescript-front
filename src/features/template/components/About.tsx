import { useState } from "react";
import WebBuilderLayout from "@/components/shared/WebBuilderLayout";
import AcademyAboutForm from "./AcademyAboutForm";
<<<<<<< HEAD
import { useAcademyAbout } from "../hooks/useAboutQueries";
import { Loader } from "@/components/shared";

function About() {
  const { data: about, isPending } = useAcademyAbout();

  if (isPending) {
    return (
      <div className="element-center">
        <Loader />
      </div>
    );
  }
  return (
    !isPending &&
    about && (
      <div className="space-y-6">
        <Header />
        <AcademyAboutForm about={about.data} />
      </div>
    )
  );
}
=======
import CustomCSSProvider from "./CustomCSSProvider";
import HomePreview from "@/templates/template-one/pages/preview";

function About() {
  const [canUndo] = useState(false);
  const [canRedo] = useState(false);
>>>>>>> sketch

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

  return (
<<<<<<< HEAD
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Info className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">قسم من نحن</span>
=======
    <CustomCSSProvider>
      <WebBuilderLayout
        title="قسم من نحن"
        onSave={handleSave}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        previewComponent={
          <div className="w-full h-full bg-white">
            <HomePreview />
          </div>
        }
      >
        <div className="space-y-6">
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-2">تحرير قسم من نحن</h3>
            <p className="text-sm text-purple-700">
              قم بتعديل محتوى ومعلومات قسم "من نحن" للأكاديمية
            </p>
          </div>
          <AcademyAboutForm />
>>>>>>> sketch
        </div>
      </WebBuilderLayout>
    </CustomCSSProvider>
  );
}

export default About;
