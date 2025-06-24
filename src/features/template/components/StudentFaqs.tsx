import { HelpCircle } from "lucide-react";
import StudentFaqsForm from "./StudentFaqsForm";
import StudentFaqsTable from "./StudentFaqsTable";

function StudentFaqs() {
  return (
    <div className="space-y-6">
      <Header />
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
  );
}

export default StudentFaqs;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            الأسئلة الشائعة
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <StudentFaqsForm />
      </div>
    </div>
  );
}
