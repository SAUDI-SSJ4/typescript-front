import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  BookOpen, 
  Filter, 
  Search, 
  Star, 
  Clock, 
  DollarSign,
  TrendingUp,
  Users,
  Award,
  Video,
  FileText,
  Lightbulb,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CoursesSidebarProps {
  onFilter?: (filters: CourseFilters) => void;
  className?: string;
}

interface CourseFilters {
  search: string;
  categories: string[];
  levels: string[];
  types: string[];
  priceRange: [number, number];
  rating: number;
  duration: string[];
  instructor: string[];
}

const categories = [
  { id: "web-dev", label: "تطوير الويب", count: 45, icon: "🌐" },
  { id: "mobile-dev", label: "تطوير التطبيقات", count: 32, icon: "📱" },
  { id: "design", label: "التصميم", count: 28, icon: "🎨" },
  { id: "marketing", label: "التسويق الرقمي", count: 21, icon: "📈" },
  { id: "ai", label: "الذكاء الاصطناعي", count: 19, icon: "🤖" },
  { id: "business", label: "إدارة الأعمال", count: 15, icon: "💼" },
  { id: "data", label: "علوم البيانات", count: 12, icon: "📊" },
  { id: "security", label: "الأمن السيبراني", count: 8, icon: "🔐" }
];

const levels = [
  { id: "beginner", label: "مبتدئ", count: 67, color: "bg-green-100 text-green-700" },
  { id: "intermediate", label: "متوسط", count: 54, color: "bg-blue-100 text-blue-700" },
  { id: "advanced", label: "متقدم", count: 28, color: "bg-purple-100 text-purple-700" },
  { id: "expert", label: "خبير", count: 12, color: "bg-red-100 text-red-700" }
];

const courseTypes = [
  { id: "interactive", label: "تفاعلية", icon: <Video className="w-4 h-4" /> },
  { id: "theoretical", label: "نظرية", icon: <FileText className="w-4 h-4" /> },
  { id: "practical", label: "عملية", icon: <Lightbulb className="w-4 h-4" /> },
  { id: "workshop", label: "ورشة عمل", icon: <Users className="w-4 h-4" /> }
];

const durations = [
  { id: "short", label: "أقل من 5 ساعات", value: "0-5" },
  { id: "medium", label: "5-20 ساعة", value: "5-20" },
  { id: "long", label: "20-50 ساعة", value: "20-50" },
  { id: "extended", label: "أكثر من 50 ساعة", value: "50+" }
];

const topInstructors = [
  { id: "ahmed", name: "أحمد محمد", courses: 15, rating: 4.9 },
  { id: "sara", name: "سارة أحمد", courses: 12, rating: 4.8 },
  { id: "mohammed", name: "محمد علي", courses: 10, rating: 4.7 },
  { id: "layla", name: "ليلى كمال", courses: 8, rating: 4.9 },
  { id: "khalid", name: "د. خالد إبراهيم", courses: 6, rating: 5.0 }
];

export default function CoursesSidebar({ onFilter, className }: CoursesSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleLevelToggle = (levelId: string) => {
    setSelectedLevels(prev => 
      prev.includes(levelId) 
        ? prev.filter(id => id !== levelId)
        : [...prev, levelId]
    );
  };

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleDurationToggle = (durationId: string) => {
    setSelectedDurations(prev => 
      prev.includes(durationId) 
        ? prev.filter(id => id !== durationId)
        : [...prev, durationId]
    );
  };

  const handleInstructorToggle = (instructorId: string) => {
    setSelectedInstructors(prev => 
      prev.includes(instructorId) 
        ? prev.filter(id => id !== instructorId)
        : [...prev, instructorId]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedTypes([]);
    setPriceRange([0, 1000]);
    setMinRating(0);
    setSelectedDurations([]);
    setSelectedInstructors([]);
  };

  const hasActiveFilters = 
    searchTerm || 
    selectedCategories.length > 0 || 
    selectedLevels.length > 0 || 
    selectedTypes.length > 0 || 
    priceRange[0] > 0 || 
    priceRange[1] < 1000 || 
    minRating > 0 || 
    selectedDurations.length > 0 || 
    selectedInstructors.length > 0;

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg text-gray-900">تصفية الدورات</h3>
        </div>
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4 mr-1" />
            مسح الكل
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">البحث</label>
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="ابحث عن دورة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">التصنيفات</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <label 
                  htmlFor={category.id} 
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                </label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Levels */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">المستوى</h4>
        <div className="space-y-2">
          {levels.map((level) => (
            <div key={level.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={level.id}
                  checked={selectedLevels.includes(level.id)}
                  onCheckedChange={() => handleLevelToggle(level.id)}
                />
                <label htmlFor={level.id} className="text-sm cursor-pointer">
                  {level.label}
                </label>
              </div>
              <Badge className={cn("text-xs", level.color)}>
                {level.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Course Types */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">نوع الدورة</h4>
        <div className="space-y-2">
          {courseTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-3">
              <Checkbox
                id={type.id}
                checked={selectedTypes.includes(type.id)}
                onCheckedChange={() => handleTypeToggle(type.id)}
              />
              <label htmlFor={type.id} className="flex items-center gap-2 text-sm cursor-pointer">
                {type.icon}
                <span>{type.label}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          نطاق السعر (ريال سعودي)
        </h4>
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="من"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-full"
            />
            <Input
              type="number"
              placeholder="إلى"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{priceRange[0]} ر.س</span>
            <span>{priceRange[1]} ر.س</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setPriceRange([0, 0])}
              className={cn(
                "text-xs",
                priceRange[0] === 0 && priceRange[1] === 0 ? "bg-blue-100 text-blue-700" : ""
              )}
            >
              مجاني فقط
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setPriceRange([1, 1000])}
              className={cn(
                "text-xs",
                priceRange[0] >= 1 ? "bg-blue-100 text-blue-700" : ""
              )}
            >
              مدفوع فقط
            </Button>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <Star className="w-4 h-4" />
          التقييم
        </h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={minRating >= rating}
                onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
              />
              <label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm cursor-pointer">
                <span>{rating}</span>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-3 h-3",
                        i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      )} 
                    />
                  ))}
                </div>
                <span className="text-gray-500">فأعلى</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          مدة الدورة
        </h4>
        <div className="space-y-2">
          {durations.map((duration) => (
            <div key={duration.id} className="flex items-center gap-3">
              <Checkbox
                id={duration.id}
                checked={selectedDurations.includes(duration.id)}
                onCheckedChange={() => handleDurationToggle(duration.id)}
              />
              <label htmlFor={duration.id} className="text-sm cursor-pointer">
                {duration.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Top Instructors */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 flex items-center gap-2">
          <Award className="w-4 h-4" />
          المدربون المميزون
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {topInstructors.map((instructor) => (
            <div key={instructor.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={instructor.id}
                  checked={selectedInstructors.includes(instructor.id)}
                  onCheckedChange={() => handleInstructorToggle(instructor.id)}
                />
                <div>
                  <label htmlFor={instructor.id} className="text-sm font-medium cursor-pointer">
                    {instructor.name}
                  </label>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{instructor.courses} دورة</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{instructor.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Filters Button */}
      <div className="pt-4 border-t">
        <Button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => {
            onFilter?.({
              search: searchTerm,
              categories: selectedCategories,
              levels: selectedLevels,
              types: selectedTypes,
              priceRange,
              rating: minRating,
              duration: selectedDurations,
              instructor: selectedInstructors
            });
          }}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          تطبيق الفلاتر ({hasActiveFilters ? 'نشط' : 'غير نشط'})
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 space-y-2">
        <h5 className="font-medium text-gray-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          إحصائيات سريعة
        </h5>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-center p-2 bg-white rounded">
            <div className="font-semibold text-blue-600">161</div>
            <div className="text-gray-600 text-xs">إجمالي الدورات</div>
          </div>
          <div className="text-center p-2 bg-white rounded">
            <div className="font-semibold text-green-600">67</div>
            <div className="text-gray-600 text-xs">دورات مجانية</div>
          </div>
          <div className="text-center p-2 bg-white rounded">
            <div className="font-semibold text-purple-600">4.8</div>
            <div className="text-gray-600 text-xs">متوسط التقييم</div>
          </div>
          <div className="text-center p-2 bg-white rounded">
            <div className="font-semibold text-orange-600">25</div>
            <div className="text-gray-600 text-xs">مدربين خبراء</div>
          </div>
        </div>
      </div>
    </div>
  );
}
