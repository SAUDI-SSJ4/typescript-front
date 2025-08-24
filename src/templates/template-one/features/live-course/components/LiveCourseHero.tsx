import LiveCourseHeader from "./LiveCourseHeader";
import CourseVideo from "../../course/components/CourseVideo";
import LiveCourseTabs from "./LiveCourseTabs";
import LiveCourseSidebar from "./LiveCourseSidebar";
import MobileFloatingSection from "../../course/components/MobileFloatingSection";

interface LiveCourse {
  id: number;
  title: string;
  rating: number;
  totalReviews?: number;
  price: number;
  duration: string;
  sessionsCount: number;
  enrolledStudents: number;
  videoUrl: string;
  description: string;
  image: string;
  instructor: {
    name: string;
    image: string;
    bio?: string;
    rating?: number;
    students?: number;
    courses?: number;
  };
  type: string;
  category: string;
  slug: string;
  insteadOf?: number;
  level: string;
  deliveryType: "live-online";
  totalSeats: number;
  remainingSeats: number;
  schedule: {
    startDate: string;
    startTime: string;
    endTime: string;
    days: string[];
    timezone: string;
  };
  learningPoints?: string[];
  sessions?: {
    title: string;
    sessions: number;
    duration: string;
    content: string[];
  }[];
}

function LiveCourseHero({ courseData }: { courseData: LiveCourse }) {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="container mx-auto py-3 md:py-6 lg:py-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <LiveCourseHeader courseData={courseData} />
              <CourseVideo courseData={courseData} />
              <LiveCourseTabs courseData={courseData} />
            </div>

            <LiveCourseSidebar courseData={courseData} />
          </div>
        </div>
      </section>

      <MobileFloatingSection courseData={courseData} />
    </div>
  );
}

export default LiveCourseHero;