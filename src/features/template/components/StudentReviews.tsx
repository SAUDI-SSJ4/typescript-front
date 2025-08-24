import { useState } from "react";
import WebBuilderLayout from "@/components/shared/WebBuilderLayout";
import StudentReviewForm from "./StudentReviewForm";
import StudentReviewsTable from "./StudentReviewsTable";
import CustomCSSProvider from "./CustomCSSProvider";
import HomePreview from "@/templates/template-one/pages/preview";

function StudentReviews() {
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

  return (
    <CustomCSSProvider>
      <WebBuilderLayout
        title="تقييمات الطلاب"
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
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-900 mb-2">إدارة تقييمات الطلاب</h3>
            <p className="text-sm text-yellow-700">
              قم بإدارة وتحرير تقييمات الطلاب المعروضة على الموقع
            </p>
          </div>
          
          <div className="mb-4">
            <StudentReviewForm />
          </div>
          
          <StudentReviewsTable
            reviews={[
              {
                student_name: "أحمد محمد",
                comment: "دورة رائعة! تعلمت الكثير.",
                rating: 5,
                image: "https://avatars.githubusercontent.com/u/87553297?v=4",
              },
              {
                student_name: "سارة علي",
                comment: "المحتوى كان مفيدًا جدًا.",
                rating: 4,
                image: "https://avatars.githubusercontent.com/u/87553297?v=4",
              },
              {
                student_name: "محمد حسن",
                comment: "تجربة تعليمية ممتازة.",
                rating: 5,
                image: "https://avatars.githubusercontent.com/u/87553297?v=4",
              },
            ]}
          />
        </div>
      </WebBuilderLayout>
    </CustomCSSProvider>
  );
}

export default StudentReviews;
