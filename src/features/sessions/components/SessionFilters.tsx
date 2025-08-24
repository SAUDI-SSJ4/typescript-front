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
import { Search, Filter, X, Download } from "lucide-react";
import type { Table } from "@tanstack/react-table";

interface Session {
  id: number;
  title: string;
  duration: number;
  price: number;
  instructor: string;
  time: string;
}

interface SessionFiltersProps {
  minPrice: number;
  onMinPriceChange: (price: number) => void;
  onClearFilters: () => void;
  table: Table<Session> | null;
}

function SessionFilters({
  minPrice,
  onMinPriceChange,
  onClearFilters,
  table,
}: SessionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    table?.getColumn("title")?.setFilterValue(value);
  };

  const exportData = () => {
    if (!table) return;
    
    const data = table.getFilteredRowModel().rows.map(row => row.original);
    const csvContent = [
      ["العنوان", "المدة", "السعر", "المدرب", "الوقت"],
      ...data.map(session => [
        session.title,
        `${session.duration} دقيقة`,
        `${session.price} ر.س`,
        session.instructor,
        session.time
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "sessions.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0 space-y-4">
      {/* Search and Filter Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في الجلسات..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "إخفاء الفلاتر" : "إظهار الفلاتر"}
          </Button>
          <Button
            variant="outline"
            onClick={exportData}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">السعر الأدنى</label>
            <Select
              value={minPrice.toString()}
              onValueChange={(value) => onMinPriceChange(Number(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر السعر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">جميع الأسعار</SelectItem>
                <SelectItem value="-1">مجاني</SelectItem>
                <SelectItem value="100">100 ر.س فأكثر</SelectItem>
                <SelectItem value="200">200 ر.س فأكثر</SelectItem>
                <SelectItem value="500">500 ر.س فأكثر</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {(minPrice > 0 || searchTerm) && (
        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-gray-600">
            الفلاتر النشطة: {(minPrice > 0 ? 1 : 0) + (searchTerm ? 1 : 0)}
          </span>
          <Button
            variant="ghost"
            onClick={() => {
              onClearFilters();
              setSearchTerm("");
              table?.getColumn("title")?.setFilterValue("");
            }}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4" />
            مسح جميع الفلاتر
          </Button>
        </div>
      )}
    </div>
  );
}

export default SessionFilters;