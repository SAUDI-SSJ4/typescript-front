import About from "@/features/launch-academy/components/About";
import Hero from "@/features/launch-academy/components/Hero";
import WhyUs from "@/features/launch-academy/components/WhyUs";
import Stats from "@/features/launch-academy/components/Stats";
import GoalVision from "@/features/launch-academy/components/GoalVision";
import Layout from "@/features/launch-academy/components/Layout";
import Pricing from "@/features/launch-academy/components/Pricing";
import FAQs from "@/components/shared/faqs";

const faqItems = [
  {
    id: "1",
    question: "هل يمكنني البدء بدون أي خبرة تقنية؟",
    answer: "بالطبع! صممنا منصة سيان لتكون سهلة الاستخدام تماماً. لا تحتاج لأي خبرة تقنية - فقط اتبع خطوات الإعداد البسيطة وستكون جاهزاً للبدء في 5 دقائق. لدينا أيضاً فريق دعم متاح 24/7 لمساعدتك.",
  },
  {
    id: "2",
    question: "كم من الوقت يستغرق إنشاء أكاديميتي وبدء تحقيق الدخل؟",
    answer: "يمكنك إنشاء أكاديميتك في أقل من 5 دقائق والبدء في رفع المحتوى فوراً. معظم مستخدمينا يحققون مبيعاتهم الأولى خلال أسبوع واحد من الإطلاق. المنصة تسوق لك تلقائياً أمام آلاف الطلاب المهتمين.",
  },
  {
    id: "3",
    question: "هل يمكنني تجربة المنصة مجاناً قبل الدفع؟",
    answer: "نعم! يمكنك البدء مجاناً تماماً بدون بطاقة ائتمانية. الباقة المجانية تتيح لك رفع المحتوى وبدء البيع فوراً. يمكنك الترقية لاحقاً عندما تحقق نمواً في أكاديميتك.",
  },
  {
    id: "4",
    question: "ماذا لو لم أكن متأكداً من نوع المحتوى الذي يجب أن أقدمه؟",
    answer: "لا تقلق! لدينا مكتبة شاملة من النصائح وأمثلة لقصص نجاح حقيقية. كما نوفر استشارات مجانية لمساعدتك في تحديد أفضل محتوى يناسب خبرتك ويحقق لك أكبر عائد. ابدأ بأي موضوع تجيده وطور تدريجياً.",
  },
  {
    id: "5",
    question: "هل أحتاج لجمهور كبير قبل البدء؟",
    answer: "لا على الإطلاق! منصة سيان تضم أكثر من 50,000 طالب نشط يبحثون عن محتوى جديد يومياً. نحن نساعدك في الوصول لجمهورك المستهدف من خلال أدوات التسويق المدمجة والظهور في نتائج البحث.",
  },
  {
    id: "6",
    question: "كم يمكنني أن أكسب من أكاديميتي؟",
    answer: "الأرباح تختلف حسب جودة المحتوى ونشاطك، لكن متوسط مستخدمينا يحققون 15,000-50,000 ريال شهرياً. بعض مستخدمينا الناجحين يحققون أكثر من 100,000 ريال شهرياً. الأهم هو البدء والتطوير التدريجي.",
  }
];

function LaunchAcademy() {
  return (
    <Layout>
      <main>
        <Hero />
        <About />
        <WhyUs />
        <Stats />
        <GoalVision />
        <Pricing />
        <FAQs faqItems={faqItems} />
      </main>
    </Layout>
  );
}

export default LaunchAcademy;
