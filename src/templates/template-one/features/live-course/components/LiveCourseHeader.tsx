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

interface LiveCourseHeaderProps {
  courseData: LiveCourse;
}

export default function LiveCourseHeader({ courseData }: LiveCourseHeaderProps) {
  return (
    <div className="mb-4 md:mb-6">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
        {courseData.title}
      </h1>
    </div>
  );
}