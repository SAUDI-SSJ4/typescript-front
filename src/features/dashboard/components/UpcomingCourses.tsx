import { BookOpen } from "lucide-react";

function UpcomingCourses() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          مادة تعليمية قادمة
        </h3>
      </div>
      
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium mb-1">لا توجد مواد قادمة</p>
        <p className="text-gray-400 text-sm">ستظهر هنا المواد المجدولة للتسجيل</p>
      </div>
    </div>
  );
}
export default UpcomingCourses;
