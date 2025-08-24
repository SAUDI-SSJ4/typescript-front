import LiveCoursePricingCard from "./LiveCoursePricingCard";
import AcademyCard from "../../course/components/AcademyCard";
import LearningPointsCard from "../../course/components/LearningPointsCard";

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

interface LiveCourseSidebarProps {
  courseData: LiveCourse;
}

export default function LiveCourseSidebar({ courseData }: LiveCourseSidebarProps) {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="sticky top-6 space-y-6">
        <LiveCoursePricingCard courseData={courseData} />
        <AcademyCard academy={{ name: "أكاديمية إبداع", image: "/assets/images/logo.svg", slug: "ebdaa-academy" }} />
        <LearningPointsCard />
      </div>
    </div>
  );
}