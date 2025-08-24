import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import type { Table } from "@tanstack/react-table";

interface ProductPackageFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  onClearFilters: () => void;
  table: Table<any> | null;
}

const ProductPackageFilters: React.FC<ProductPackageFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
}) => {
  const hasActiveFilters = searchTerm !== "" || selectedStatus !== "الكل";

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-1 block">
            البحث في العناوين والأوصاف
          </Label>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="ابحث في العناوين والأوصاف..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pr-10 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div>
          <Label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1 block">
            الحالة
          </Label>
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="focus:outline-none focus:ring-0 focus:border-gray-300">
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="الكل">الكل</SelectItem>
              <SelectItem value="منشور">منشور</SelectItem>
              <SelectItem value="مسودة">مسودة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              مسح الفلاتر
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPackageFilters;