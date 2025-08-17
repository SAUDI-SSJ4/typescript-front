import { Loader2 } from "lucide-react";

function DashboardLoading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <Loader2 className="w-10 h-10 animate-spin mx-auto text-primary" />
        <p className="text-base text-gray-600">جاري تحميل لوحة التحكم...</p>
      </div>
    </div>
  );
}

export default DashboardLoading;
