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

interface CertificateFiltersProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
  table?: any; // للتحكم في الأعمدة
}

function CertificateFilters({
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  searchTerm,
  onSearchChange,
  onClearFilters,
  table,
}: CertificateFiltersProps) {
  const types = [
    "الكل",
    "إنجاز",
    "تميز",
    "مشاركة",
  ];

  const statuses = [
    "الكل",
    "نشط",
    "غير نشط",
    "مسودة",
  ];

  const hasActiveFilters = 
    selectedType !== "الكل" || 
    selectedStatus !== "الكل" || 
    searchTerm !== "";

  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">فلترة الشهادات</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            مسح الفلاتر
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* البحث */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في الشهادات..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* فلتر النوع */}
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="نوع الشهادة" />
          </SelectTrigger>
          <SelectContent>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* فلتر الحالة */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger>
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
                .filter((column: any) => column.getCanHide())
                .map((column: any) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.columnDef.header}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* عرض الفلاتر النشطة */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
          {selectedType !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              النوع: {selectedType}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => onTypeChange("الكل")}
              />
            </Badge>
          )}
          {selectedStatus !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              الحالة: {selectedStatus}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => onStatusChange("الكل")}
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

export default CertificateFilters;