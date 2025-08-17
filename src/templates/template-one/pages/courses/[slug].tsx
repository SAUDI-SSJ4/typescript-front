// import Hero from "../../features/course/components/Hero";
import CourseLayout from "../../features/course/components/CourseLayout";
import RelatedCourses from "../../features/course/components/RelatedCourses";

export default function CourseDetails() {
  // const { slug } = useParams();

  return (
    <CourseLayout>
      <main
        style={{
          background:
            "linear-gradient(156.58deg, rgba(15, 232, 232, 0.2) 17.14%, rgba(217, 217, 217, 0) 75.12%)",
        }}
        className="pt-44 pb-20"
      >
        {/* <Hero courseData={courseData} /> */}
        <RelatedCourses />
      </main>
    </CourseLayout>
  );
}
