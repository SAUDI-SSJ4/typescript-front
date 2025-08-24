import { useState } from "react";
import WebBuilderLayout from "@/components/shared/WebBuilderLayout";
import StudentFaqsForm from "./StudentFaqsForm";
import StudentFaqsTable from "./StudentFaqsTable";
import CustomCSSProvider from "./CustomCSSProvider";
import HomePreview from "@/templates/template-one/pages/preview";

function StudentFaqs() {
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
<<<<<<< HEAD
    <div className="space-y-6">
      <Header />
      <StudentFaqsTable faqs={faqs.map(faq => ({
        ...faq,
        id: faq.id.toString()
      }))} />
    </div>
=======
    <CustomCSSProvider>
      <WebBuilderLayout
        title="الأسئلة الشائعة"
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
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="font-semibold text-indigo-900 mb-2">إدارة الأسئلة الشائعة</h3>
            <p className="text-sm text-indigo-700">
              قم بإدارة وتحرير الأسئلة الشائعة المعروضة على الموقع
            </p>
          </div>
          
          <div className="mb-4">
            <StudentFaqsForm />
          </div>
          
          <StudentFaqsTable
            faqs={[
              {
                question: "ما هي مدة المادة التعليمية؟",
                answer:
                  "مدة المادة التعليمية تعتمد على نوع الدورة والمحتوى المقدم. عادةً ما تتراوح بين 4 إلى 8 أسابيع.",
              },
              {
                question: "كيف يمكنني الوصول إلى المحتوى التعليمي؟",
                answer:
                  "يمكنك الوصول إلى المحتوى التعليمي من خلال منصة الدورة بعد التسجيل. ستتلقى تعليمات مفصلة عبر البريد الإلكتروني.",
              },
              {
                question: "هل هناك دعم فني متاح؟",
                answer:
                  "نعم، نحن نقدم دعمًا فنيًا على مدار الساعة عبر البريد الإلكتروني والدردشة المباشرة.",
              },
            ]}
          />
        </div>
      </WebBuilderLayout>
    </CustomCSSProvider>
>>>>>>> sketch
  );
}

export default StudentFaqs;
