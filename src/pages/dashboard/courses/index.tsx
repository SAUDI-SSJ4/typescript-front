import { Plus, Users, MapPin, Video } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import CourseTable from "@/features/courses/components/CourseTable";
import CourseStats from "@/features/courses/components/CourseStats";
import CourseFilters from "@/features/courses/components/CourseFilters";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { Link } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
<<<<<<< HEAD
import { useState } from "react";
import type { Table as TanstackTable } from "@tanstack/react-table";
import { useAcademyCourses } from "@/features/dashboard/courses/hooks/useCoursesQueries";
import { useCurrentUserProfile } from "@/features/dashboard/profile/hooks";
import { getAcademyDetails } from "@/lib/academy";
// import type { User } from "@/types/user";
import type { Course } from "@/types/couse";
import CourseTable from "@/features/dashboard/courses/components/CourseTable";
import CourseFilters from "@/features/dashboard/courses/components/CourseFilters";
=======
import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";
>>>>>>> sketch

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
<<<<<<< HEAD
  const { data: user } = useCurrentUserProfile();
  const academy = getAcademyDetails(user as any);
  const academyId = academy?.academy_id || 0; // Provide a default value of 0
  const { data: courses, isPending, error } = useAcademyCourses(academyId);
  const [table, setTable] = useState<TanstackTable<Course> | null>(null);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">جارٍ تحميل الدورات...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-red-500">حدث خطأ في تحميل الدورات. يرجى المحاولة مرة أخرى.</span>
      </div>
    );
  }

  if (!courses?.data?.courses) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">لا توجد دورات متاحة</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header />
      {/* <CourseStats courses={dummyCourses} /> */}
      <CourseFilters courses={courses.data.courses} table={table} />
      <CourseTable courses={courses.data.courses} onTableReady={setTable} />
    </div>
  );
}
=======
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedLevel, setSelectedLevel] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [minPrice, setMinPrice] = useState(0);
  const [table, setTable] = useState<Table<Course> | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "الكل" || course.category === selectedCategory;
>>>>>>> sketch

      const matchesLevel =
        selectedLevel === "الكل" || course.level === selectedLevel;

      const matchesType =
        selectedType === "الكل" || course.type === selectedType;

      const matchesPrice =
        minPrice === 0 ||
        (minPrice === -1 && course.price === 0) ||
        (minPrice > 0 && course.price >= minPrice);

      return matchesCategory && matchesLevel && matchesType && matchesPrice;
    });
  }, [selectedCategory, selectedLevel, selectedType, minPrice]);

  const handleClearFilters = () => {
    setSelectedCategory("الكل");
    setSelectedLevel("الكل");
    setSelectedType("الكل");
    setMinPrice(0);
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Users}
        title="الدورات التدريبية"
        actions={
          <div className="flex gap-2">
            <Link
              to={`${Routes.DASHBOARD}/${Pages.COURSES}/${Pages.NEW}`}
              className={buttonVariants()}
            >
              <Plus className="w-4 h-4 mr-2" />
              إضافة دورة جديدة
            </Link>
            <Link
              to={`${Routes.DASHBOARD}/physical-courses/new`}
              className={buttonVariants({ variant: "outline" })}
            >
              <MapPin className="w-4 h-4 mr-2" />
              الدورات الحضورية
            </Link>
            <Link
              to={`${Routes.DASHBOARD}/live-courses/new`}
              className={buttonVariants({ variant: "outline" })}
            >
              <Video className="w-4 h-4 mr-2" />
              الدورات المباشرة
            </Link>
          </div>
        }
      />
      <CourseStats courses={filteredCourses} />
      <CourseFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        onClearFilters={handleClearFilters}
        table={table}
      />
      <CourseTable courses={filteredCourses} onTableReady={setTable} />
    </div>
  );
}

export default AcademyCourses;


