import Layout from "@/features/home/components/Layout";
import InPersonCourseHero from "@/templates/template-one/features/in-person-course/components/InPersonCourseHero";
import RelatedCourses from "@/templates/template-one/features/course/components/RelatedCourses";
import MobileFloatingSection from "@/templates/template-one/features/course/components/MobileFloatingSection";

export default function InPersonCourseDetails() {
  // const { slug } = useParams();

  const inPersonCourseData = {
    id: 1,
    title: "دورة التسويق الرقمي الحضورية",
    rating: 4.9,
    totalReviews: 328,
    price: 399,
    duration: "6 أسابيع",
    sessionsCount: 12,
    enrolledStudents: 2850,
    videoUrl:
      "https://www.sayan-server.com/courses/videos/academy/1/1USaRw3xnc0Xgp8X3xbH.mp4",
    description:
      "دورة حضورية شاملة لتعلم التسويق الرقمي من الصفر حتى الاحتراف مع جلسات تفاعلية مباشرة ومتابعة شخصية من المدرب في مقر الأكاديمية.",
    image: "/assets/images/courses/digital-marketing.jpg",
    instructor: {
      name: "أ. أحمد محمد",
      image: "/assets/images/instructors/instructor-marketing.jpg",
      bio: "خبير تسويق رقمي مع أكثر من 15 سنة من الخبرة في التسويق الإلكتروني",
      rating: 4.8,
      students: 15500,
      courses: 12,
    },
    type: "مدفوع",
    category: "تسويق",
    slug: "in-person-digital-marketing",
    insteadOf: 699,
    level: "متقدم",
    deliveryType: "in-person" as const,
    totalSeats: 30,
    remainingSeats: 8,
    location: "مقر الأكاديمية - قاعة التسويق الرقمي - الدور الثالث",
    schedule: {
      startDate: "2024-02-15",
      startTime: "19:00",
      endTime: "21:00",
      days: ["الأحد", "الثلاثاء", "الخميس"],
      timezone: "توقيت الرياض"
    },
    learningPoints: [
      "أساسيات التسويق الرقمي",
      "إدارة وسائل التواصل الاجتماعي",
      "التسويق عبر محركات البحث",
      "إنشاء المحتوى التسويقي",
      "تحليل البيانات والإحصائيات",
      "مشروع تطبيقي شامل",
    ],
    sessions: [
      {
        title: "أساسيات التسويق الرقمي",
        sessions: 3,
        duration: "6 ساعات",
        content: [
          "مقدمة في التسويق الرقمي",
          "استراتيجيات التسويق الحديثة",
          "أدوات التسويق الأساسية"
        ],
      },
      {
        title: "التسويق عبر وسائل التواصل",
        sessions: 4,
        duration: "8 ساعات",
        content: [
          "إدارة صفحات التواصل الاجتماعي",
          "إنشاء المحتوى الجذاب",
          "الإعلانات المدفوعة",
          "تحليل الأداء"
        ],
      },
      {
        title: "المشروع التطبيقي",
        sessions: 5,
        duration: "10 ساعات",
        content: [
          "تخطيط الحملة التسويقية",
          "تنفيذ الاستراتيجية",
          "قياس النتائج",
          "التحسين والتطوير",
          "العرض النهائي"
        ],
      },
    ],
  };

  return (
    <Layout>
      <main className="bg-[rgb(249_250_251)] pt-44 pb-20">
        <InPersonCourseHero courseData={inPersonCourseData} />
        <RelatedCourses />
        <MobileFloatingSection courseData={inPersonCourseData} />
      </main>
    </Layout>
  );
}