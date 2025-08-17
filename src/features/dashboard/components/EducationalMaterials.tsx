import { EducationalMaterialsChart } from "@/components/shared/dashboard/EducationalMaterialsChart";
import { useEnrolledCourses } from "@/features/dashboard/educational-materials/hooks/useEducationalMaterials";
import { BookOpen, Users, Clock, DollarSign } from "lucide-react";

function EducationalMaterials() {
  const { data: coursesData } = useEnrolledCourses();

  const stats = coursesData?.statistics || {
    total_enrolled: 0,
    active_courses: 0,
    total_spent: 0,
    certificates_earned: 0
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            إحصائيات المواد التعليمية
          </h2>
          <span className="text-sm text-gray-500">احصائيات</span>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-900">{stats.total_enrolled}</p>
            <p className="text-sm text-blue-600">إجمالي الدورات</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-900">{stats.active_courses}</p>
            <p className="text-sm text-green-600">الدورات النشطة</p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-yellow-900">{stats.total_spent.toFixed(0)}</p>
            <p className="text-sm text-yellow-600">إجمالي الإنفاق</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-900">{stats.certificates_earned}</p>
            <p className="text-sm text-purple-600">الشهادات المكتسبة</p>
          </div>
        </div>

        {/* Chart Component */}
        <EducationalMaterialsChart />
      </div>
    </div>
  );
}

export default EducationalMaterials;
