import { EducationalMaterialsChart } from "@/components/shared/dashboard/EducationalMaterialsChart";

function EducationalMaterials() {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            إحصائيات المواد التعليمية
          </h2>
          <span className="text-sm text-gray-500">احصائيات</span>
        </div>

        {/* Chart Component */}
        <EducationalMaterialsChart />
      </div>
    </div>
  );
}
export default EducationalMaterials;
