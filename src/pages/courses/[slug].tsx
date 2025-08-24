import Layout from "@/features/home/components/Layout";
import Hero from "@/templates/template-one/features/course/components/Hero";
import RelatedCourses from "@/templates/template-one/features/course/components/RelatedCourses";

export default function CourseDetails() {
  // const { slug } = useParams();
  
  // Mock course data for now
  const courseData = {
<<<<<<< HEAD
    id: "mock-course-id",
    title: "كورس في العادات الصحية لتناول الغذاء",
    price: 1000,
    discount_price: 1200,
    avg_rating: 4.5,
    level: "متوسط",
    lessons_count: 32,
    preview_video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  } as any;
=======
    id: 1,
    title: "تصميم واجهات المستخدم UI/UX",
    rating: 4.9,
    totalReviews: 328,
    price: 399,
    duration: "18 ساعة",
    lessonsCount: 45,
    enrolledStudents: 2850,
    videoUrl:
      "https://www.sayan-server.com/courses/videos/academy/1/1USaRw3xnc0Xgp8X3xbH.mp4",
    description:
      "تعلم تصميم واجهات المستخدم وتجربة المستخدم من الصفر حتى الاحتراف. احصل على المهارات اللازمة لتصميم تطبيقات ومواقع جذابة وسهلة الاستخدام.",
    image: "/assets/images/courses/ui-ux-design.jpg",
    instructor: {
      name: "أ. ليلى حسام",
      image: "/assets/images/instructors/instructor-ui.jpg",
      bio: "مصممة UI/UX محترفة مع أكثر من 10 سنوات من الخبرة في أفضل الشركات التقنية",
      rating: 4.8,
      students: 15500,
      courses: 12,
    },
    type: "مدفوع",
    category: "تصميم",
    slug: "ui-ux",
    insteadOf: 699,
    level: "متقدم",
    learningPoints: [
      "أساسيات تصميم واجهات المستخدم",
      "مبادئ تجربة المستخدم",
      "استخدام أدوات التصميم الحديثة",
      "تصميم نماذج أولية تفاعلية",
      "اختبار وتحليل تجربة المستخدم",
      "التطبيق على مشاريع حقيقية",
    ],
    curriculum: [],
    reviews: [],
  };
>>>>>>> sketch

  return (
    <Layout>
      <main className="bg-[rgb(249_250_251)] pt-44 pb-20">
        <Hero courseData={courseData} />
        <RelatedCourses />
      </main>
    </Layout>
  );
}
