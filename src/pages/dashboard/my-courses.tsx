import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Clock, Play, Search, ChevronDown, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEnrolledCourses } from "@/features/dashboard/educational-materials/hooks/useEducationalMaterials";
import { formatDate } from "@/lib/utils";

function MyCourses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("الأحدث");

  const { data: coursesData, isLoading, error } = useEnrolledCourses();

  const sortOptions = ["الأحدث", "الأقدم"];

  const getLevelColor = (progress: number) => {
    if (progress >= 80) return "bg-green-100 text-green-700";
    if (progress >= 50) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getLevelText = (progress: number) => {
    if (progress >= 80) return "متقدم";
    if (progress >= 50) return "متوسط";
    return "مبتدئ";
  };

  // Filter and sort courses
  const filteredAndSortedCourses = coursesData?.courses
    ?.filter(course => 
      course.course_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.academy_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortBy === "الأحدث") {
        return new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime();
      } else {
        return new Date(a.enrolled_at).getTime() - new Date(b.enrolled_at).getTime();
      }
    }) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">جاري تحميل المواد التعليمية...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <p className="text-gray-600 mb-2">حدث خطأ في تحميل المواد التعليمية</p>
            <Button onClick={() => window.location.reload()}>إعادة المحاولة</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header />

      {/* Search and Sort Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="ابحث في المواد التعليمية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px] justify-between"
            >
              <span className="text-gray-700">{sortBy}</span>
              <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSortBy(option)}
                className={`cursor-pointer ${
                  sortBy === option ? "bg-blue-50 text-blue-700" : ""
                }`}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Courses Grid */}
      {filteredAndSortedCourses.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مواد تعليمية مسجلة</h3>
          <p className="text-gray-500 mb-6">ابدأ بالتسجيل في دورة لرؤية المواد التعليمية هنا</p>
          <Button onClick={() => navigate("/courses")} className="bg-blue-600 hover:bg-blue-700">
            استكشف الدورات
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedCourses.map((course) => (
            <div key={course.enrollment_id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              {/* Course Image */}
              <div className="relative aspect-[10/6] overflow-hidden">
                <img 
                  src={course.course_thumbnail || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop&crop=center"} 
                  alt={course.course_title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="text-white text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-2" />
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.progress)}`}>
                    {getLevelText(course.progress)}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {course.course_title}
                </h3>
                
                {/* Academy Info */}
                <div 
                  className="flex items-center gap-2 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => navigate(`/academy/${course.academy_id}`)}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">
                      {course.academy_name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{course.academy_name}</span>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">التقدم</span>
                    <span className="text-xs font-medium text-blue-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{course.lessons_count} درس</span>
                  </div>
                </div>

                {/* Enrollment Date */}
                <div className="text-xs text-gray-500 mb-4">
                  تاريخ التسجيل: {formatDate(course.enrolled_at)}
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-medium rounded-lg"
                  onClick={() => navigate(`/course/${course.course_slug}`)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  المتابعة 
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyCourses;
function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            المواد التعليمية
          </span>
        </div>
      </div>
    </div>
  );
}

