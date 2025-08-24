import { useState, useMemo } from "react";
import { Plus, Users, BookOpen, Eye, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CoursesSidebar from "@/components/shared/courses/CoursesSidebar";
import { Link } from "react-router-dom";
import { Routes, Pages } from "@/constants/enums";
import { cn } from "@/lib/utils";

interface Course {
  id: number;
  title: string;
  category: string;
  type: string;
  level: string;
  instructor: string;
  price: number;
  image: string;
  students?: number;
  rating?: number;
  duration?: string;
  lessonsCount?: number;
  description?: string;
  tags?: string[];
}

const courses: Course[] = [
  {
    id: 1,
    title: "دورة تطوير تطبيقات باستخدام Flutter",
    description: "بناء واجهات احترافية لأنظمة iOS و Android",
    category: "تطوير التطبيقات",
    type: "تفاعلية",
    level: "متوسط",
    instructor: "أحمد محمد",
    price: 299,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 145,
    rating: 4.8,
    duration: "15 ساعة",
    lessonsCount: 32,
    tags: ["Flutter", "Mobile", "Cross-platform"]
  },
  {
    id: 2,
    title: "دورة تطوير مواقع الويب باستخدام React و Next.js",
    description: "من المبتدئ إلى المحترف",
    category: "تطوير الويب",
    type: "تقنية",
    level: "متقدم",
    instructor: "سارة أحمد",
    price: 450,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 298,
    rating: 4.9,
    duration: "25 ساعة",
    lessonsCount: 48,
    tags: ["React", "Next.js", "JavaScript"]
  },
  {
    id: 3,
    title: "دورة تصميم واجهات المستخدم UX/UI",
    description: "إنشاء تجارب مستخدم مميزة",
    category: "التصميم",
    type: "إبداعية",
    level: "مبتدئ",
    instructor: "محمد علي",
    price: 199,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 89,
    rating: 4.7,
    duration: "12 ساعة",
    lessonsCount: 24,
    tags: ["UX", "UI", "Design", "Figma"]
  },
  {
    id: 4,
    title: "دورة الذكاء الاصطناعي وتعلم الآلة",
    description: "مقدمة شاملة في عالم الذكاء الاصطناعي",
    category: "الذكاء الاصطناعي",
    type: "تقنية",
    level: "متقدم",
    instructor: "د. خالد إبراهيم",
    price: 0,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 256,
    rating: 4.9,
    duration: "30 ساعة",
    lessonsCount: 60,
    tags: ["AI", "Machine Learning", "Python"]
  },
  {
    id: 5,
    title: "دورة التسويق الرقمي الشامل",
    description: "استراتيجيات وأدوات التسويق الحديثة",
    category: "التسويق الرقمي",
    type: "نظرية",
    level: "متوسط",
    instructor: "ليلى كمال",
    price: 350,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 178,
    rating: 4.6,
    duration: "18 ساعة",
    lessonsCount: 36,
    tags: ["Marketing", "Social Media", "SEO"]
  },
  {
    id: 6,
    title: "دورة أمان المعلومات والأمن السيبراني",
    description: "حماية البيانات والشبكات من التهديدات",
    category: "الأمن السيبراني",
    type: "تقنية",
    level: "متقدم",
    instructor: "عمر حسن",
    price: 599,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 92,
    rating: 4.8,
    duration: "22 ساعة",
    lessonsCount: 44,
    tags: ["Security", "Cybersecurity", "Network"]
  }
];

export default function CoursesWithSidebar() {
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleFilter = (filters: any) => {
    let filtered = courses;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description?.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      // Map category IDs to course categories
      const categoryMap: { [key: string]: string } = {
        'web-dev': 'تطوير الويب',
        'mobile-dev': 'تطوير التطبيقات',
        'design': 'التصميم',
        'marketing': 'التسويق الرقمي',
        'ai': 'الذكاء الاصطناعي',
        'security': 'الأمن السيبراني'
      };
      
      const selectedCategories = filters.categories.map((id: string) => categoryMap[id]).filter(Boolean);
      filtered = filtered.filter(course => selectedCategories.includes(course.category));
    }

    // Level filter
    if (filters.levels.length > 0) {
      const levelMap: { [key: string]: string } = {
        'beginner': 'مبتدئ',
        'intermediate': 'متوسط',
        'advanced': 'متقدم',
        'expert': 'خبير'
      };
      
      const selectedLevels = filters.levels.map((id: string) => levelMap[id]).filter(Boolean);
      filtered = filtered.filter(course => selectedLevels.includes(course.level));
    }

    // Price range filter
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      filtered = filtered.filter(course => 
        course.price >= filters.priceRange[0] && course.price <= filters.priceRange[1]
      );
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(course => (course.rating || 0) >= filters.rating);
    }

    setFilteredCourses(filtered);
  };

  const stats = useMemo(() => {
    return {
      total: courses.length,
      free: courses.filter(c => c.price === 0).length,
      paid: courses.filter(c => c.price > 0).length,
      avgRating: courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length,
      totalStudents: courses.reduce((sum, c) => sum + (c.students || 0), 0)
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Header />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي الدورات</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">مجاني</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">دورات مجانية</p>
                <p className="text-2xl font-bold text-gray-900">{stats.free}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي الطلاب</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-bold">★</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">متوسط التقييم</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <CoursesSidebar onFilter={handleFilter} />
        </div>

        {/* Courses Grid */}
        <div className="lg:col-span-3">
          <div className="space-y-4">
            {/* View Controls */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">عرض</span>
                <span className="font-medium text-gray-900">{filteredCourses.length}</span>
                <span className="text-sm text-gray-600">من {courses.length} دورة</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  شبكة
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  قائمة
                </Button>
              </div>
            </div>

            {/* Courses */}
            {filteredCourses.length > 0 ? (
              <div className={cn(
                viewMode === 'grid' 
                  ? "flex flex-wrap justify-center gap-6"
                  : "space-y-4"
              )}>
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد دورات متطابقة</h3>
                <p className="text-gray-600">جرب تعديل فلاتر البحث للعثور على دورات أخرى</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            استعراض الدورات التدريبية
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to={`${Routes.DASHBOARD}/${Pages.COURSES}/${Pages.NEW}`}
          className={buttonVariants()}
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة دورة جديدة
        </Link>
      </div>
    </div>
  );
}

interface CourseCardProps {
  course: Course;
  viewMode: 'grid' | 'list';
}

function CourseCard({ course, viewMode }: CourseCardProps) {
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <img
              src={course.image}
              alt={course.title}
              className="w-24 h-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>بواسطة {course.instructor}</span>
                    <span>{course.duration}</span>
                    <span>{course.lessonsCount} درس</span>
                    <div className="flex items-center gap-1">
                      <span>★</span>
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="text-left">
                    <div className="font-bold text-lg text-gray-900">
                      {course.price === 0 ? 'مجاني' : `${course.price} ر.س`}
                    </div>
                    <div className="text-sm text-gray-500">{course.students} طالب</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        عرض
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        تحرير
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        حذف
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            className={cn(
              course.price === 0 
                ? "bg-green-100 text-green-700" 
                : "bg-blue-100 text-blue-700"
            )}
          >
            {course.price === 0 ? 'مجاني' : `${course.price} ر.س`}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                عرض
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                تحرير
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {course.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {course.level}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {course.category}
            </Badge>
          </div>

          <div className="text-sm text-gray-600">
            <div>بواسطة {course.instructor}</div>
            <div className="flex items-center justify-between mt-1">
              <span>{course.duration} • {course.lessonsCount} درس</span>
              <div className="flex items-center gap-1">
                <span>★</span>
                <span>{course.rating}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-sm text-gray-500">
              {course.students} طالب مسجل
            </div>
            <Button size="sm">
              عرض التفاصيل
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
