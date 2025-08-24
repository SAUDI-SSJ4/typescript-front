import { useState } from "react";
import { Star, ShoppingCart, Play, Clock, Users, Award, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ExtendedCourse {
  id: number;
  title: string;
  rating: number;
  totalReviews?: number;
  price: number;
  duration: string;
  lessonsCount: number;
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
  learningPoints?: string[];
  curriculum?: {
    title: string;
    lessons: number;
    duration: string;
    content: string[];
  }[];
  reviews?: {
    name: string;
    avatar: string;
    rating: number;
    comment: string;
  }[];
}

interface EnhancedCourseViewProps {
  courseData: ExtendedCourse;
}

export default function EnhancedCourseView({ courseData }: EnhancedCourseViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSection, setExpandedSection] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Mobile Optimized */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 lg:py-12">
          {/* Mobile-First Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
            {/* Video and Main Content */}
            <div className="flex-1">
              {/* Course Title - Mobile First */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-primary-foreground text-primary">
                    {courseData.category}
                  </Badge>
                  <Badge variant="outline">{courseData.level}</Badge>
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {courseData.title}
                </h1>
                
                {/* Rating and Stats - Mobile Optimized */}
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(courseData.rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{courseData.rating}</span>
                    <span className="text-gray-600">({courseData.totalReviews} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{courseData.enrolledStudents.toLocaleString()} طالب</span>
                  </div>
                </div>
              </div>

              {/* Video Player - Responsive */}
              <div className="relative bg-black rounded-lg overflow-hidden mb-6">
                <div className="aspect-video">
                  <video
                    src={courseData.videoUrl}
                    className="w-full h-full object-cover"
                    controls
                    poster={courseData.image}
                  />
                </div>
              </div>

              {/* Mobile Navigation Tabs */}
              <div className="lg:hidden mb-6">
                <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                  {[
                    { id: "overview", label: "نظرة عامة" },
                    { id: "curriculum", label: "المنهج" },
                    { id: "instructor", label: "المدرب" },
                    { id: "reviews", label: "التقييمات" }
                  ].map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? "default" : "outline"}
                      size="sm"
                      className="whitespace-nowrap"
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Desktop */}
            <div className="lg:w-80">
              <div className="sticky top-6">
                <CourseCard courseData={courseData} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Desktop Navigation */}
            <div className="hidden lg:block mb-8">
              <div className="flex gap-4 border-b">
                {[
                  { id: "overview", label: "نظرة عامة" },
                  { id: "curriculum", label: "المنهج" },
                  { id: "instructor", label: "المدرب" },
                  { id: "reviews", label: "التقييمات" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`pb-4 px-2 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === "overview" && <OverviewTab courseData={courseData} />}
              {activeTab === "curriculum" && courseData.curriculum && (
                <CurriculumTab 
                  curriculum={courseData.curriculum} 
                  expandedSection={expandedSection}
                  setExpandedSection={setExpandedSection}
                />
              )}
              {activeTab === "instructor" && <InstructorTab instructor={courseData.instructor} />}
              {activeTab === "reviews" && courseData.reviews && <ReviewsTab reviews={courseData.reviews} />}
            </div>
          </div>

          {/* Sidebar Content - Mobile */}
          <div className="lg:hidden">
            <CourseCard courseData={courseData} />
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseCard({ courseData }: { courseData: ExtendedCourse }) {
  return (
    <Card className="p-6 shadow-lg">
      <CardContent className="p-0">
        {/* Price */}
        <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl font-bold text-primary">
            {courseData.price} ريال
          </span>
            {courseData.insteadOf && (
              <span className="text-lg text-gray-500 line-through">
                {courseData.insteadOf} ريال
              </span>
            )}
          </div>
          <Button size="lg" className="w-full">
            <ShoppingCart className="w-5 h-5 ml-2" />
            اشترك في الدورة
          </Button>
        </div>

        {/* Course Info */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 mb-3">تشمل هذه الدورة:</h3>
          {[
            { icon: Clock, label: `${courseData.duration} من المحتوى` },
            { icon: Play, label: `${courseData.lessonsCount} درس تفاعلي` },
            { icon: Award, label: "شهادة إتمام معتمدة" },
            { icon: BookOpen, label: "وصول مدى الحياة" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function OverviewTab({ courseData }: { courseData: ExtendedCourse }) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold mb-4">وصف الدورة</h2>
        <p className="text-gray-700 leading-relaxed">{courseData.description}</p>
      </div>

      {/* What You'll Learn */}
      <div>
        <h2 className="text-2xl font-bold mb-4">ماذا ستتعلم</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {courseData.learningPoints?.map((point: string, index: number) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CurriculumTab({ 
  curriculum, 
  expandedSection, 
  setExpandedSection 
}: { 
  curriculum: ExtendedCourse['curriculum'];
  expandedSection: number | null;
  setExpandedSection: (index: number | null) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">منهج الدورة</h2>
      {curriculum?.map((section, index) => (
        <Card key={index} className="overflow-hidden">
          <button
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setExpandedSection(expandedSection === index ? null : index)}
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{section.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {section.lessons} دروس • {section.duration}
              </p>
            </div>
            {expandedSection === index ? (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
          
          {expandedSection === index && (
            <div className="border-t bg-gray-50 p-4">
              <ul className="space-y-2">
                {section.content?.map((lesson: string, lessonIndex: number) => (
                  <li key={lessonIndex} className="flex items-center gap-3">
                    <Play className="w-4 h-4 text-primary" />
                    <span className="text-gray-700">{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function InstructorTab({ instructor }: { instructor: ExtendedCourse['instructor'] }) {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-32 flex-shrink-0">
          <img
            src={instructor.image || "/assets/images/default-avatar.jpg"}
            alt={instructor.name}
            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{instructor.name}</h2>
          <p className="text-gray-600 mb-4">{instructor.bio}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center md:text-right">
              <div className="text-2xl font-bold text-primary">{instructor.rating}</div>
              <div className="text-sm text-gray-600">تقييم المدرب</div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-2xl font-bold text-primary">{instructor.students?.toLocaleString()}</div>
              <div className="text-sm text-gray-600">طالب</div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-2xl font-bold text-primary">{instructor.courses}</div>
              <div className="text-sm text-gray-600">دورة</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ReviewsTab({ reviews }: { reviews: ExtendedCourse['reviews'] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">تقييمات الطلاب</h2>
      <div className="space-y-4">
        {reviews?.map((review, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start gap-4">
              <img
                src={review.avatar || "/assets/images/default-avatar.jpg"}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold">{review.name}</h4>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
