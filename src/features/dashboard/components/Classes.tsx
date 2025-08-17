import { GraduationCap } from "lucide-react";

function Classes() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          الفصول الدراسية
        </h3>
      </div>
      
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium mb-1">لا توجد فصول دراسية</p>
        <p className="text-gray-400 text-sm">سجل في فصل دراسي لبدء رحلتك التعليمية</p>
      </div>
    </div>
  );
}

export default Classes;