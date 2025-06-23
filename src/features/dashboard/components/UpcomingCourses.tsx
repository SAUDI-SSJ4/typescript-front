function UpcomingCourses() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          مادة تعليمية قادمة
        </h3>
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <span className="text-blue-600 text-xl">📚</span>
        </div>
      </div>
      <p className="text-gray-600 text-center py-8">لا توجد دورة قادمة</p>
    </div>
  );
}
export default UpcomingCourses;
