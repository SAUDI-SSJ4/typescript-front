import Hero from "@/features/employee-training/components/Hero";
import Layout from "@/features/employee-training/components/Layout";
import FAQs from "@/components/shared/faqs";
import EmployeeFeatures from "@/features/employee-training/components/EmployeeFeatures";
import Features from "@/features/employee-training/components/Features";
import Services from "@/features/employee-training/components/Services";

const faqItems = [
  {
    id: crypto.randomUUID(),
    question: "كيف يمكن لشركتنا البدء باستخدام منصة سيان لتدريب الموظفين؟",
    answer:
      "يمكن لشركتكم البدء بطلب عرض توضيحي مخصص حيث سيقوم فريقنا بفهم احتياجاتكم التدريبية وتقديم خطة مناسبة. بعدها سنقوم بإعداد المنصة وتخصيصها لتناسب هيكل شركتكم وإضافة الموظفين والمدربين المعتمدين.",
  },
  {
    id: crypto.randomUUID(),
    question: "ما أنواع البرامج التدريبية المتاحة للشركات الكبيرة؟",
    answer:
      "نقدم برامج تدريبية شاملة تشمل التدريب التقني، المهارات الناعمة، القيادة والإدارة، الأمان والسلامة، والامتثال. جميع البرامج قابلة للتخصيص حسب قطاع شركتكم ومتطلباتكم الخاصة مع إمكانية إضافة محتوى مخصص.",
  },
  {
    id: crypto.randomUUID(),
    question: "ما مستوى الدعم الفني والمتابعة المقدم للشركات؟",
    answer:
      "نقدم دعماً فنياً متخصصاً على مدار الساعة، مدير حساب مخصص لشركتكم، تدريب للفرق الإدارية، ومتابعة دورية لضمان تحقيق أهدافكم التدريبية. كما نوفر خدمات استشارية لتطوير استراتيجية التدريب.",
  },
];

function EmployeeTraining() {
  return (
    <Layout>
      <main>
        <Hero />
        <Features />
        <Services />
        <EmployeeFeatures />
        <FAQs faqItems={faqItems} />
      </main>
    </Layout>
  );
}

export default EmployeeTraining;
