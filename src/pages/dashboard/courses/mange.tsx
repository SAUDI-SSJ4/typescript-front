import { DashboardLoading } from "@/components/shared/dashboard";
import CourseForm from "@/features/dashboard/courses/components/CourseForm";
import { useCourse } from "@/features/dashboard/courses/hooks/useCoursesQueries";
import { useNavigate, useParams } from "react-router-dom";

function ManageCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { data: course, isPending } = useCourse(courseId as string);

  if (isPending) {
    return <DashboardLoading />;
  }
  if (!course) {
    navigate("/dashboard/courses");
    return null;
  }
  return <CourseForm course={course.data} />;
}

export default ManageCourse;
