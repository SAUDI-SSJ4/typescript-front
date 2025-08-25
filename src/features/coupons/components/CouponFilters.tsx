import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, X, ChevronDown, Search } from "lucide-react";

interface CouponFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
  onClearFilters: () => void;
  table?: {
    getAllColumns: () => {
      getCanHide: () => boolean;
      getIsVisible: () => boolean;
      toggleVisibility: (visible: boolean) => void;
      id: string;
      columnDef: { header: string };
    }[];
    setColumnVisibility: (visibility: Record<string, boolean>) => void;
  }; // للتحكم في الأعمدة
}

function CouponFilters({
  selectedStatus,
  onStatusChange,
  selectedType,
  onTypeChange,
  searchTerm,
  onSearchChange,
  onClearFilters,
  table,
}: CouponFiltersProps) {
  const statuses = [
    "الكل",
    "نشط",
    "غير نشط", 
    "منتهي الصلاحية",
  ];

  const types = [
    "الكل",
    "نسبة مئوية",
    "مبلغ ثابت",
  ];

  const hasActiveFilters = 
    selectedStatus !== "الكل" || 
    selectedType !== "الكل" || 
    searchTerm !== "";

  const handleColumnToggle = (columnId: string, checked: boolean) => {
    if (table) {
      const tableInstance = table as { setColumnVisibility: (visibility: Record<string, boolean>) => void };
      const currentVisibility: Record<string, boolean> = {};
      tableInstance.setColumnVisibility({
        ...currentVisibility,
        [columnId]: checked,
      });
    }
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
              placeholder="البحث في الكوبونات..."
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
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* فلتر النوع */}
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="النوع" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* أزرار التحكم */}
        <div className="flex items-center gap-3">
          {/* إظهار/إخفاء الأعمدة */}
          {table && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  الأعمدة
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {table
                  .getAllColumns()
                  .filter((column: { getCanHide: () => boolean }) => column.getCanHide())
                  .map((column: { id: string; columnDef: { header: string }; getIsVisible: () => boolean }) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          handleColumnToggle(column.id, !!value)
                        }
                      >
                        {column.columnDef.header}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* مسح الفلاتر */}
          {hasActiveFilters && (
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
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {selectedStatus !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              الحالة: {selectedStatus}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => onStatusChange("الكل")}
              />
            </Badge>
          )}
          {selectedType !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              النوع: {selectedType}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => onTypeChange("الكل")}
              />
            </Badge>
          )}
          {searchTerm && (
            <Badge variant="secondary" className="gap-1">
              البحث: {searchTerm}
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
}

export { CouponFilters };
