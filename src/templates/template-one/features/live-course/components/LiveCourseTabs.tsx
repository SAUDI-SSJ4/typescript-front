import { useState } from "react";
import { BookOpen, CheckCircle, User, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LiveCourseTabContent from "./LiveCourseTabContent";

type TabId = "overview" | "sessions" | "instructor";

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

interface LiveCourseTabsProps {
  courseData: LiveCourse;
}

export default function LiveCourseTabs({ courseData }: LiveCourseTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <>
      {/* Navigation Tabs */}
      <div className="mb-4 md:mb-6">
        <nav className="flex gap-1 bg-gray-50 p-1 rounded-xl">
          {[
            { id: "overview", label: "نظرة عامة", icon: BookOpen },
            { id: "sessions", label: "الجلسات", icon: Calendar },
            { id: "instructor", label: "ماذا سوف تتعلم", icon: User }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 flex-1 justify-center ${
                activeTab === tab.id
                  ? "bg-white text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <Card className="border border-gray-200 bg-white">
        <CardContent className="p-8">
          <LiveCourseTabContent courseData={courseData} activeTab={activeTab} />
        </CardContent>
      </Card>
    </>
  );
}