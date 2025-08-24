import Hero from "@/features/launch-academy/components/Hero";
import Stats from "@/features/launch-academy/components/Stats";
import GoalVision from "@/features/launch-academy/components/GoalVision";
import Layout from "@/features/launch-academy/components/Layout";
import Pricing from "@/features/launch-academy/components/Pricing";
import FAQs from "@/components/shared/faqs";
import Clients from "@/features/launch-academy/components/Clients";
<<<<<<< HEAD
import WhyUs from "@/features/launch-academy/components/WhyUs";
import About from "@/features/launch-academy/components/About";

const faqItems = [
  {
    question: "كم يستغرق إنشاء أكاديميتي الخاصة؟",
    answer:
      "يمكنك إنشاء أكاديميتك في 5 دقائق فقط! بعد التسجيل، ستتمكن من تخصيص الملف التعريفي، رفع المحتوى التعليمي، وإعداد نظام الدفع لتبدأ في استقبال الطلاب فوراً.",
  },
  {
    question: "هل أحتاج خبرة تقنية لإنشاء أكاديميتي؟",
    answer:
      "لا تحتاج أي خبرة تقنية! منصة سيان مصممة لتكون سهلة الاستخدام للجميع. واجهة بديهية، قوالب جاهزة، ودعم فني متواصل لمساعدتك في كل خطوة.",
  },
  {
    question: "كم يمكنني أن أربح من أكاديميتي؟",
    answer:
      "لا يوجد حد أقصى للأرباح! منشئو المحتوى على منصتنا يحققون من 5,000 إلى 50,000 ريال شهرياً أو أكثر، حسب جودة المحتوى وحجم الجمهور. كلما زاد عدد طلابك، زادت أرباحك.",
  },
  {
    question: "ما هي تكلفة إنشاء الأكاديمية؟",
    answer:
      "يمكنك البدء مجاناً تماماً! لا نطلب رسوم إعداد أو اشتراك شهري. نحصل على نسبة صغيرة فقط عند بيع دوراتك، مما يعني أنك لا تدفع شيئاً إلا عندما تحقق أرباحاً.",
=======

const faqItems = [
  {
    question: "ما هي أكاديمية الإطلاق؟",
    answer:
      "أكاديمية الإطلاق هي منصة تعليمية متكاملة تهدف إلى تمكين الأفراد والشركات من خلال توفير دورات تدريبية عالية الجودة في مجالات متنوعة مثل التكنولوجيا والأعمال والتطوير الذاتي.",
  },
  {
    question: "من هم المستفيدون من الأكاديمية؟",
    answer:
      "تستهدف الأكاديمية كل من يسعى لتطوير مهاراته، من الطلاب والخريجين الجدد إلى المهنيين وأصحاب الشركات الذين يرغبون في مواكبة التطورات في سوق العمل.",
  },
  {
    question: "هل الشهادات معتمدة؟",
    answer:
      "نعم، نقدم شهادات إتمام معتمدة من الأكاديمية عند إكمال أي دورة تدريبية بنجاح، مما يعزز من سيرتك الذاتية وفرصك الوظيفية.",
  },
  {
    question: "كيف يمكنني التسجيل في دورة؟",
    answer:
      'يمكنك التسجيل بسهولة من خلال تصفح الدورات المتاحة على موقعنا، واختيار الدورة التي تناسبك، ثم الضغط على زر "سجل الآن" واتباع الخطوات المطلوبة.',
>>>>>>> sketch
  },
];

function LaunchAcademy() {
  return (
    <Layout>
      <Hero />
      <Clients />
      <Stats />
      <GoalVision />
<<<<<<< HEAD
      <About />
      <WhyUs />
      <Pricing />
      <FAQs
        faqItems={faqItems.map((item, index) => ({
          ...item,
          id: `faq-${index + 1}`,
        }))}
      />
=======
      <Pricing />
      <FAQs faqItems={faqItems.map((item, index) => ({
        ...item,
        id: `faq-${index + 1}`
      }))} />
>>>>>>> sketch
    </Layout>
  );
}

export default LaunchAcademy;
