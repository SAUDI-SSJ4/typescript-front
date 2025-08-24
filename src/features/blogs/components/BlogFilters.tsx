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

interface BlogFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
  table?: any; // للتحكم في الأعمدة
}

function BlogFilters({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  searchTerm,
  onSearchChange,
  onClearFilters,
  table,
}: BlogFiltersProps) {
  const categories = [
    "الكل",
    "تقنية",
    "تعليم",
    "أعمال",
    "صحة",
    "رياضة",
    "سفر",
    "طبخ",
    "فن",
  ];

  const statuses = [
    "الكل",
    "منشور",
    "مسودة",
  ];

  const hasActiveFilters = 
    selectedCategory !== "الكل" || 
    selectedStatus !== "الكل" || 
    searchTerm !== "";

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border-0">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        {/* الفلاتر الأساسية */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* البحث */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في المقالات..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* فلتر التصنيف */}
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="التصنيف" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
          {selectedCategory !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              التصنيف: {selectedCategory}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-500"
                onClick={() => onCategoryChange("الكل")}
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

export default BlogFilters;