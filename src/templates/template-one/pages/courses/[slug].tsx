import Hero from "../../features/course/components/Hero";
import CourseLayout from "../../features/course/components/CourseLayout";
import RelatedCourses from "../../features/course/components/RelatedCourses";

export default function CourseDetails() {
  // const { slug } = useParams();

  const courseData = {
    id: 1,
    title: "تطوير تطبيقات الويب المتقدمة",
    rating: 4.5,
    totalReviews: 128,
    price: 199,
    duration: "12 ساعة",
    lessonsCount: 24,
    enrolledStudents: 1234,
    videoUrl:
      "https://www.sayan-server.com/courses/videos/academy/1/1USaRw3xnc0Xgp8X3xbH.mp4",
    description:
      "تعلم كيفية تطوير تطبيقات الويب المتقدمة باستخدام HTML, CSS, JavaScript, React, Node.js, و MongoDB.",
    image: "/assets/images/courses/course-1.jpg",
    instructor: {
      name: "محمد علي",
      image: "/assets/images/instructors/instructor-1.jpg",
    },
    type: "مجاني",
    category: "تطوير الويب",
    slug: "course-1",
    insteadOf: 1000,
    level: "متقدم",
  };

  return (
    <CourseLayout>
      <main
        style={{
          background:
            "linear-gradient(156.58deg, rgba(15, 232, 232, 0.2) 17.14%, rgba(217, 217, 217, 0) 75.12%)",
        }}
        className="pt-44 pb-20"
      >
        <Hero courseData={courseData} />
        <RelatedCourses />
      </main>
    </CourseLayout>
  );
}
