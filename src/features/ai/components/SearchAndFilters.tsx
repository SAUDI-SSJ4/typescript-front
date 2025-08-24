import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  materialsCount: {
    total: number;
    completed: number;
    processing: number;
    failed: number;
  };
}

export function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  materialsCount
}: SearchAndFiltersProps) {
  const statusOptions = [
    { value: "all", label: "جميع الحالات", count: materialsCount.total },
    { value: "completed", label: "مكتمل", count: materialsCount.completed },
    { value: "processing", label: "قيد المعالجة", count: materialsCount.processing },
    { value: "failed", label: "فشل", count: materialsCount.failed }
  ];

  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* البحث */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="ابحث في مواد التعلم الذكية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-12 h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* الفلاتر */}
          <div className="lg:w-80">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex gap-2 flex-wrap">
                {statusOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant={selectedStatus === option.value ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedStatus === option.value
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
                    }`}
                    onClick={() => setSelectedStatus(option.value)}
                  >
                    {option.label}
                    <span className="ml-1 text-xs opacity-75">({option.count})</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
