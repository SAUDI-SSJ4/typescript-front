import { Card, CardContent } from "@/components/ui/card";

export function MaterialCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      {/* منطقة الصورة */}
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300"></div>
      
      <CardContent className="p-6">
        {/* العنوان */}
        <div className="h-6 bg-gray-200 rounded-lg mb-4"></div>
        
        {/* معلومات الملف */}
        <div className="space-y-3 mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* الإحصائيات */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="h-20 bg-gray-200 rounded-xl"></div>
          <div className="h-20 bg-gray-200 rounded-xl"></div>
        </div>

        {/* التحليل الذكي */}
        <div className="mb-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded-lg"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-4/5"></div>
          </div>
        </div>

        {/* الأزرار */}
        <div className="flex gap-3">
          <div className="flex-1 h-9 bg-gray-200 rounded-lg"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
          <div className="w-9 h-9 bg-gray-200 rounded-lg"></div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MaterialsGridSkeletonProps {
  count?: number;
}

export function MaterialsGridSkeleton({ count = 6 }: MaterialsGridSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <MaterialCardSkeleton key={index} />
      ))}
    </div>
  );
}
