import { Plus, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import { useState } from "react";
import type { Table as TanstackTable } from "@tanstack/react-table";
import { useAcademyCourses } from "@/features/dashboard/courses/hooks/useCoursesQueries";
import { useCurrentUserProfile } from "@/features/dashboard/profile/hooks";
import { getAcademyDetails } from "@/lib/academy";
// import type { User } from "@/types/user";
import type { Course } from "@/types/couse";
import CourseTable from "@/features/dashboard/courses/components/CourseTable";
import CourseFilters from "@/features/dashboard/courses/components/CourseFilters";

function AcademyCourses() {
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

export default AcademyCourses;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            الدورات التدريبية
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
