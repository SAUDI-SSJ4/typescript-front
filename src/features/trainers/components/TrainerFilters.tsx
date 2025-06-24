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

interface TrainerFiltersProps {
  selectedSpecialization: string;
  onSpecializationChange: (specialization: string) => void;
  minCoursesCount: number;
  onMinCoursesCountChange: (count: number) => void;
  onClearFilters: () => void;
  table?: any; // للتحكم في الأعمدة
}

function TrainerFilters({
  selectedSpecialization,
  onSpecializationChange,
  minCoursesCount,
  onMinCoursesCountChange,
  onClearFilters,
  table,
}: TrainerFiltersProps) {
  const specializations = [
    "الكل",
    "تطوير التطبيقات",
    "تطوير الويب",
    "تصميم UX/UI",
    "الذكاء الاصطناعي",
    "التسويق الرقمي",
    "إدارة المشاريع",
  ];

  const hasActiveFilters =
    selectedSpecialization !== "الكل" || minCoursesCount > 0;

  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">فلترة المدربين</h3>
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
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في المدربين..."
            value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table?.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pr-10"
          />
        </div>

        {/* Specialization Filter */}
        <Select
          value={selectedSpecialization}
          onValueChange={onSpecializationChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="التخصص" />
          </SelectTrigger>
          <SelectContent>
            {specializations.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Minimum Courses Count */}
        <Select
          value={minCoursesCount.toString()}
          onValueChange={(value) => onMinCoursesCountChange(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="الحد الأدنى للدورات" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">جميع المدربين</SelectItem>
            <SelectItem value="1">دورة واحدة على الأقل</SelectItem>
            <SelectItem value="2">دورتان على الأقل</SelectItem>
            <SelectItem value="3">3 دورات على الأقل</SelectItem>
            <SelectItem value="5">5 دورات على الأقل</SelectItem>
          </SelectContent>
        </Select>

        {/* Columns Filter */}
        {table && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                الأعمدة <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => {
                  const columnHeaders = {
                    image: "الصورة",
                    name: "اسم المدرب",
                    email: "البريد الإلكتروني",
                    phone: "رقم الهاتف",
                    coursesCount: "عدد الدورات",
                  };
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnHeaders[column.id as keyof typeof columnHeaders] ||
                        column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-sm font-medium text-gray-600">
            الفلاتر النشطة:
          </span>
          {selectedSpecialization !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              التخصص: {selectedSpecialization}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onSpecializationChange("الكل")}
              />
            </Badge>
          )}
          {minCoursesCount > 0 && (
            <Badge variant="secondary" className="gap-1">
              الحد الأدنى: {minCoursesCount} دورات
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onMinCoursesCountChange(0)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default TrainerFilters;
