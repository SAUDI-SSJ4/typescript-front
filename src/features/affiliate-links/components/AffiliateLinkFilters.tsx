import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, FileSpreadsheet } from "lucide-react";
import type { Table } from "@tanstack/react-table";
import type { AffiliateLink } from "@/types/affiliate-link";

interface AffiliateLinkFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedCommissionType: string;
  onCommissionTypeChange: (type: string) => void;
  selectedPromotionType: string;
  onPromotionTypeChange: (type: string) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
  table?: Table<AffiliateLink> | null;
}

const AffiliateLinkFilters = ({
  selectedStatus,
  onStatusChange,
  selectedCommissionType,
  onCommissionTypeChange,
  selectedPromotionType,
  onPromotionTypeChange,
  searchTerm,
  onSearchChange,
  onClearFilters,
}: AffiliateLinkFiltersProps) => {
  // حساب عدد الفلاتر النشطة
  const activeFiltersCount = [
    selectedStatus !== "الكل",
    selectedCommissionType !== "الكل", 
    selectedPromotionType !== "الكل",
    searchTerm !== "",
  ].filter(Boolean).length;

  const exportToExcel = () => {
    console.log("تصدير بيانات الروابط إلى Excel");
    // يمكن إضافة منطق التصدير هنا
  };

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border-0">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* الفلاتر الأساسية */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* البحث */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              placeholder="ابحث بالكود، الاسم، الوصف..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* فلتر الحالة */}
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">جميع الحالات</SelectItem>
              <SelectItem value="نشط">نشط</SelectItem>
              <SelectItem value="غير نشط">غير نشط</SelectItem>
              <SelectItem value="منتهي">منتهي</SelectItem>
            </SelectContent>
          </Select>

          {/* فلتر نوع العمولة */}
          <Select value={selectedCommissionType} onValueChange={onCommissionTypeChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="نوع العمولة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">جميع الأنواع</SelectItem>
              <SelectItem value="percentage">نسبة مئوية</SelectItem>
              <SelectItem value="fixed">مبلغ ثابت</SelectItem>
            </SelectContent>
          </Select>

          {/* فلتر نوع الترويج */}
          <Select value={selectedPromotionType} onValueChange={onPromotionTypeChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="نوع الترويج" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">جميع الأنواع</SelectItem>
              <SelectItem value="general">عام</SelectItem>
              <SelectItem value="specific">منتجات محددة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* أزرار التحكم */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={exportToExcel}
            className="gap-2"
          >
            <FileSpreadsheet className="w-4 h-4" />
            تصدير Excel
          </Button>
          
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="gap-2 text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
              مسح الفلاتر
            </Button>
          )}
        </div>
      </div>

      {/* عرض الفلاتر النشطة */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {selectedStatus !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              حالة: {selectedStatus}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => onStatusChange("الكل")}
              />
            </Badge>
          )}
          {selectedCommissionType !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              عمولة: {selectedCommissionType === "percentage" ? "نسبة مئوية" : "مبلغ ثابت"}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => onCommissionTypeChange("الكل")}
              />
            </Badge>
          )}
          {selectedPromotionType !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              ترويج: {selectedPromotionType === "general" ? "عام" : "منتجات محددة"}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => onPromotionTypeChange("الكل")}
              />
            </Badge>
          )}
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              بحث: {searchTerm}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => onSearchChange("")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default AffiliateLinkFilters;