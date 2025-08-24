import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, Download, Calendar } from "lucide-react";
import type { Table } from "@tanstack/react-table";
import type { SessionAppointment } from "@/types/session";

interface AppointmentFiltersProps {
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onClearFilters: () => void;
  table?: Table<SessionAppointment> | null;
  onExportData?: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

function AppointmentFilters({
  selectedStatus,
  onStatusChange,
  selectedDate,
  onDateChange,
  onClearFilters,
  table,
  onExportData,
  searchTerm,
  onSearchChange,
}: AppointmentFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    onSearchChange(value);
    // Search in appointment notes or session title if available
    table?.getColumn("notes")?.setFilterValue(value);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedStatus !== "الكل") count++;
    if (selectedDate !== "") count++;
    if (searchTerm) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="البحث في الملاحظات..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            الفلاتر
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          {onExportData && (
            <Button
              variant="outline"
              onClick={onExportData}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              تصدير البيانات
            </Button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                حالة الموعد
              </label>
              <Select value={selectedStatus} onValueChange={onStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الكل">جميع الحالات</SelectItem>
                  <SelectItem value="available">متاح</SelectItem>
                  <SelectItem value="booked">محجوز</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="cancelled">ملغي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                التاريخ
              </label>
              <div className="relative">
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => onDateChange(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            {/* Clear Filters */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 opacity-0">
                إجراءات
              </label>
              <Button
                variant="outline"
                onClick={() => {
                  onClearFilters();
                  onSearchChange("");
                  handleSearch("");
                }}
                className="w-full flex items-center gap-2"
                disabled={activeFiltersCount === 0}
              >
                <X className="h-4 w-4" />
                مسح الفلاتر
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <span className="text-sm text-gray-600">الفلاتر النشطة:</span>
              {selectedStatus !== "الكل" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  الحالة: {selectedStatus === "available" ? "متاح" : 
                           selectedStatus === "booked" ? "محجوز" :
                           selectedStatus === "completed" ? "مكتمل" : "ملغي"}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => onStatusChange("الكل")}
                  />
                </Badge>
              )}
              {selectedDate && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  التاريخ: {new Date(selectedDate).toLocaleDateString('ar-SA')}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => onDateChange("")}
                  />
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  البحث: {searchTerm}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => {
                      onSearchChange("");
                      handleSearch("");
                    }}
                  />
                </Badge>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AppointmentFilters;