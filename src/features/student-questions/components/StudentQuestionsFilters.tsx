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
import { Filter, X, ChevronDown, Search, Calendar } from "lucide-react";
import type { StudentQuestionFilters } from "@/types/student-question";

interface StudentQuestionsFiltersProps {
  filters: StudentQuestionFilters;
  onFiltersChange: (filters: Partial<StudentQuestionFilters>) => void;
  onClearFilters: () => void;
  table?: any;
  courses?: string[];
  students?: string[];
}

function StudentQuestionsFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  table,
  courses = [],
  students = [],
}: StudentQuestionsFiltersProps) {
  const hasActiveFilters = 
    filters.search !== "" || 
    filters.course !== "الكل" || 
    filters.student !== "الكل" ||
    filters.isAnswered !== undefined;

  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">فلترة أسئلة الطلاب</h3>
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
            placeholder="البحث في الأسئلة..."
            value={filters.search}
            onChange={(event) =>
              onFiltersChange({ search: event.target.value })
            }
            className="pr-10"
          />
        </div>

        {/* Course Filter */}
        <Select 
          value={filters.course} 
          onValueChange={(value) => onFiltersChange({ course: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="المادة التعليمية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="الكل">جميع المواد</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Student Filter */}
        <Select 
          value={filters.student} 
          onValueChange={(value) => onFiltersChange({ student: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="الطالب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="الكل">جميع الطلاب</SelectItem>
            {students.map((student) => (
              <SelectItem key={student} value={student}>
                {student}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Answer Status Filter */}
        <Select 
          value={filters.isAnswered === undefined ? "الكل" : filters.isAnswered ? "مجاب" : "غير مجاب"} 
          onValueChange={(value) => 
            onFiltersChange({ 
              isAnswered: value === "الكل" ? undefined : value === "مجاب" 
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="حالة الرد" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="الكل">جميع الأسئلة</SelectItem>
            <SelectItem value="مجاب">أسئلة مجابة</SelectItem>
            <SelectItem value="غير مجاب">أسئلة غير مجابة</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-sm font-medium text-gray-600">
            الفلاتر النشطة:
          </span>
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              البحث: {filters.search}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ search: "" })}
              />
            </Badge>
          )}
          {filters.course !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              المادة: {filters.course}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ course: "الكل" })}
              />
            </Badge>
          )}
          {filters.student !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              الطالب: {filters.student}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ student: "الكل" })}
              />
            </Badge>
          )}
          {filters.isAnswered !== undefined && (
            <Badge variant="secondary" className="gap-1">
              الحالة: {filters.isAnswered ? "مجاب" : "غير مجاب"}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onFiltersChange({ isAnswered: undefined })}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentQuestionsFilters;