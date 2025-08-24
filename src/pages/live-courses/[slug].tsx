import Layout from "@/features/home/components/Layout";
import LiveCourseHero from "@/templates/template-one/features/live-course/components/LiveCourseHero";
import RelatedCourses from "@/templates/template-one/features/course/components/RelatedCourses";

export default function LiveCourseDetails() {
  // const { slug } = useParams();

  const liveCourseData = {
    id: 1,
    title: "دورة تطوير الويب المباشرة",
    rating: 4.9,
    totalReviews: 328,
    price: 399,
    duration: "6 أسابيع",
    sessionsCount: 12,
    enrolledStudents: 2850,
    videoUrl:
      "https://www.sayan-server.com/courses/videos/academy/1/1USaRw3xnc0Xgp8X3xbH.mp4",
    description:
      "دورة مباشرة شاملة لتعلم تطوير الويب من الصفر حتى الاحتراف مع جلسات تفاعلية مباشرة ومتابعة شخصية من المدرب.",
    image: "/assets/images/courses/web-development.jpg",
    instructor: {
      name: "أ. أحمد محمد",
      image: "/assets/images/instructors/instructor-web.jpg",
      bio: "مطور ويب محترف مع أكثر من 12 سنة من الخبرة في تطوير التطبيقات",
      rating: 4.8,
      students: 15500,
      courses: 12,
    },
    type: "مدفوع",
    category: "برمجة",
    slug: "live-web-development",
    insteadOf: 699,
    level: "متقدم",
    deliveryType: "live-online" as const,
    totalSeats: 30,
    remainingSeats: 8,
    schedule: {
      startDate: "2024-02-15",
      startTime: "19:00",
      endTime: "21:00",
      days: ["الأحد", "الثلاثاء", "الخميس"],
      timezone: "توقيت الرياض"
    },
    learningPoints: [
      "أساسيات HTML و CSS",
      "JavaScript المتقدم",
      "React.js و Next.js",
      "إدارة قواعد البيانات",
      "النشر والاستضافة",
      "مشروع تطبيقي شامل",
    ],
    sessions: [
      {
        title: "أساسيات تطوير الويب",
        sessions: 3,
        duration: "6 ساعات",
        content: [
          "مقدمة في HTML",
          "تنسيق الصفحات بـ CSS",
          "JavaScript للمبتدئين"
        ],
      },
      {
        title: "التطوير المتقدم",
        sessions: 4,
        duration: "8 ساعات",
        content: [
          "React.js الأساسيات",
          "إدارة الحالة",
          "التفاعل مع APIs",
          "التوجيه والملاحة"
        ],
      },
      {
        title: "المشروع التطبيقي",
        sessions: 5,
        duration: "10 ساعات",
        content: [
          "تخطيط المشروع",
          "بناء الواجهات",
          "ربط قاعدة البيانات",
          "الاختبار والتحسين",
          "النشر والاستضافة"
        ],
      },
    ],
  };

  return (
    <Layout>
      <main className="bg-[rgb(249_250_251)] pt-44 pb-20">
        <LiveCourseHero courseData={liveCourseData} />
        <RelatedCourses />
      </main>
    </Layout>
  );
}