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
import { useMemo, useState } from "react";
import type { Table as TanstackTable } from "@tanstack/react-table";
import type { Course } from "@/types/couse";

interface CourseFiltersProps {
  table: TanstackTable<Course> | null; // للتحكم في الأعمدة
  courses: Course[];
}

function CourseFilters({ table, courses }: CourseFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedLevel, setSelectedLevel] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [minPrice, setMinPrice] = useState(0);
  const [searchValue, setSearchValue] = useState(
    (table?.getColumn("title")?.getFilterValue() as string) ?? ""
  );
  const categories = [
    "الكل",
    "تطوير التطبيقات",
    "تطوير الويب",
    "تصميم",
    "برمجة",
    "تسويق",
    "أعمال",
  ];

  const levels = ["الكل", "مبتدئ", "متوسط", "متقدم"];

  const types = ["الكل", "تفاعلية", "مسجلة", "حضورية"];

  const priceRanges = [
    { label: "جميع الأسعار", value: 0 },
    { label: "مجاني", value: -1 },
    { label: "أكثر من 100 ر.س", value: 100 },
    { label: "أكثر من 200 ر.س", value: 200 },
    { label: "أكثر من 300 ر.س", value: 300 },
    { label: "أكثر من 500 ر.س", value: 500 },
  ];

  const hasActiveFilters =
    selectedCategory !== "الكل" ||
    selectedLevel !== "الكل" ||
    selectedType !== "الكل" ||
    minPrice !== 0 ||
    searchValue !== "";

  useMemo(() => {
    return courses.filter((course) => {
      // const matchesCategory =
      //   selectedCategory === "الكل" || course.category_id === selectedCategory;
      const matchesLevel =
        selectedLevel === "الكل" || course.level === selectedLevel;
      const matchesType =
        selectedType === "الكل" || course.type === selectedType;
      const matchesPrice =
        minPrice === 0 ||
        (minPrice === -1 && course.price === 0) ||
        (minPrice > 0 && course.price >= minPrice);
      return matchesLevel && matchesType && matchesPrice;
    });
  }, [courses, selectedLevel, selectedType, minPrice]);

  const handleClearFilters = () => {
    setSelectedCategory("الكل");
    setSelectedLevel("الكل");
    setSelectedType("الكل");
    setMinPrice(0);
    setSearchValue("");
    table?.getColumn("title")?.setFilterValue("");
  };

  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">فلترة الدورات</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            مسح الفلاتر
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في الدورات..."
            value={searchValue}
            onChange={(event) => {
              const value = event.target.value;
              setSearchValue(value);
              table?.getColumn("title")?.setFilterValue(value);
            }}
            className="pr-10"
          />
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
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

        {/* Level Filter */}
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger>
            <SelectValue placeholder="المستوى" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger>
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

        {/* Price Filter */}
        <Select
          value={minPrice.toString()}
          onValueChange={(value) => setMinPrice(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="السعر" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value.toString()}>
                {range.label}
              </SelectItem>
            ))}
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
                .filter((column) => column.getCanHide())
                .map((column) => {
                  const columnHeaders = {
                    image: "الصورة",
                    title: "اسم المادة",
                    category: "الفئة",
                    type: "النوع",
                    level: "المستوى",
                    instructor: "اسم المدرب",
                    price: "السعر",
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

          {searchValue && (
            <Badge variant="secondary" className="gap-1">
              البحث: {searchValue}
              <button
                onClick={() => {
                  setSearchValue("");
                  table?.getColumn("title")?.setFilterValue("");
                }}
              >
                <X className="w-3 h-3 cursor-pointer" />
              </button>
            </Badge>
          )}
          {selectedCategory !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              التصنيف: {selectedCategory}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setSelectedCategory("الكل")}
              />
            </Badge>
          )}
          {selectedLevel !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              المستوى: {selectedLevel}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setSelectedLevel("الكل")}
              />
            </Badge>
          )}
          {selectedType !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              النوع: {selectedType}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setSelectedType("الكل")}
              />
            </Badge>
          )}
          {minPrice !== 0 && (
            <Badge variant="secondary" className="gap-1">
              السعر: {minPrice === -1 ? "مجاني" : `أكثر من ${minPrice} ر.س`}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => setMinPrice(0)}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default CourseFilters;
