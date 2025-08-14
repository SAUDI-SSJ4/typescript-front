import Layout from "@/features/course/components/Layout";
import Hero from "@/features/course/components/Hero";
import RelatedCourses from "@/features/course/components/RelatedCourses";

export default function CourseDetails() {
  // const { slug } = useParams();
  
  // Mock course data for now
  const courseData = {
    id: "mock-course-id",
    title: "كورس في العادات الصحية لتناول الغذاء",
    price: 1000,
    discount_price: 1200,
    avg_rating: 4.5,
    level: "متوسط",
    lessons_count: 32,
    preview_video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
  } as any;

  return (
    <Layout>
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
    </Layout>
  );
}
