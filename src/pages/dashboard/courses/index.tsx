import { Plus, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import CourseTable from "@/features/courses/components/CourseTable";
import CourseStats from "@/features/courses/components/CourseStats";
import CourseFilters from "@/features/courses/components/CourseFilters";
import { Link } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import { useState, useMemo } from "react";

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
}

const courses: Course[] = [
  {
    id: 1,
    title:
      "دورة تطوير تطبيقات باستخدام Flutter - بناء واجهات احترافية لأنظمة iOS و Android",
    category: "تطوير التطبيقات",
    type: "تفاعلية",
    level: "متوسط",
    instructor: "أحمد محمد",
    price: 299,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 145,
    rating: 4.8,
  },
  {
    id: 2,
    title:
      "دورة تطوير مواقع الويب باستخدام React و Next.js - من المبتدئ إلى المحترف",
    category: "تطوير الويب",
    type: "تقنية",
    level: "متقدم",
    instructor: "سارة أحمد",
    price: 450,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 298,
    rating: 4.9,
  },
  {
    id: 3,
    title: "دورة تصميم واجهات المستخدم UX/UI - إنشاء تجارب مستخدم مميزة",
    category: "تصميم",
    type: "إبداعية",
    level: "مبتدئ",
    instructor: "محمد علي",
    price: 199,
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    students: 89,
    rating: 4.7,
  },
];
function AcademyCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedLevel, setSelectedLevel] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [minPrice, setMinPrice] = useState(0);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "الكل" || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "الكل" || course.level === selectedLevel;

      const matchesType =
        selectedType === "الكل" || course.type === selectedType;

      const matchesPrice =
        minPrice === 0 ||
        (minPrice === -1 && course.price === 0) ||
        (minPrice > 0 && course.price >= minPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesType &&
        matchesPrice
      );
    });
  }, [searchTerm, selectedCategory, selectedLevel, selectedType, minPrice]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("الكل");
    setSelectedLevel("الكل");
    setSelectedType("الكل");
    setMinPrice(0);
  };

  return (
    <div className="space-y-6">
      <Header coursesCount={filteredCourses.length} />
      <CourseStats courses={filteredCourses} />
      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        onClearFilters={handleClearFilters}
      />
      <CourseTable courses={filteredCourses} />
    </div>
  );
}

export default AcademyCourses;

function Header({ coursesCount }: { coursesCount: number }) {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            الدورات التدريبية
          </span>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-sm font-medium border border-blue-300 shadow-sm">
          الدورات ({coursesCount})
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
