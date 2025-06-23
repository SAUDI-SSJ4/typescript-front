import { HelpCircle } from "lucide-react";
import StudentFaqsForm from "./StudentFaqsForm";
import StudentFaqsTable from "./StudentFaqsTable";

function StudentFaqs() {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex gap-4 items-center text-foreground">
          <HelpCircle className="text-primary" />
          الاسئلة الشائعة
        </h1>
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
  );
}

export default StudentFaqs;
