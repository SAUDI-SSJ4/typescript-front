import { Star, Users, MapPin, Calendar, Clock } from "lucide-react";

interface InPersonCourse {
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
  deliveryType: "in-person";
  totalSeats: number;
  remainingSeats: number;
  location: string;
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

interface InPersonCourseHeaderProps {
  courseData: InPersonCourse;
}

export default function InPersonCourseHeader({ courseData }: InPersonCourseHeaderProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <span>الرئيسية</span>
        <span className="mx-2">/</span>
        <span>الدورات الحضورية</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{courseData.title}</span>
      </nav>

      {/* Course Title */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
        {courseData.title}
      </h1>

      {/* Course Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{courseData.rating}</span>
          {courseData.totalReviews && (
            <span>({courseData.totalReviews} تقييم)</span>
          )}
        </div>

        {/* Enrolled Students */}
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{courseData.enrolledStudents} متدرب</span>
        </div>

        {/* Course Type */}
        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full">
          <MapPin className="w-4 h-4" />
          <span className="font-medium">دورة حضورية</span>
        </div>

        {/* Remaining Seats */}
        <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full">
          <Users className="w-4 h-4" />
          <span className="font-medium">{courseData.remainingSeats} مقعد متبقي</span>
        </div>

        {/* Schedule */}
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{courseData.schedule.days.join(", ")}</span>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{courseData.duration}</span>
        </div>
      </div>

      {/* Course Description */}
      <p className="text-gray-700 text-base leading-relaxed">
        {courseData.description}
      </p>
    </div>
  );
}