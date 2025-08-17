import { HelpCircle } from "lucide-react";
import StudentFaqsForm from "./StudentFaqsForm";
import StudentFaqsTable from "./StudentFaqsTable";
import { useFAQs } from "../hooks/useFAQsQueries";
import { Loader } from "@/components/shared";

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

function StudentFaqs() {
  const { data: faqsResponse, isLoading, error } = useFAQs();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="text-center py-10 text-red-500">
          حدث خطأ أثناء جلب الأسئلة الشائعة
        </div>
      </div>
    );
  }

  const faqs = faqsResponse?.data.faqs || [];

  return (
    <div className="space-y-6">
      <Header />
      <StudentFaqsTable faqs={faqs.map(faq => ({
        ...faq,
        id: faq.id.toString()
      }))} />
    </div>
  );
}

export default StudentFaqs;
