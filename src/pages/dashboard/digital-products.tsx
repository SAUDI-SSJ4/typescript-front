import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, ChevronDown, Package, Plus } from "lucide-react";

function DigitalProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("الأحدث");

  const sortOptions = [
    "الأحدث",
    "الأقدم",
    "الأعلى سعراً",
    "الأقل سعراً",
    "الأكثر مبيعاً",
  ];

  return (
    <div className="space-y-6">
      <Header />

      {/* Search and Sort Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="ابحث عن المنتجات الرقمية..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 pl-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort Dropdown */}
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px] justify-between"
            >
              <span className="text-gray-700">{sortBy}</span>
              <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onClick={() => setSortBy(option)}
                className={`cursor-pointer ${
                  sortBy === option ? "bg-blue-50 text-blue-700" : ""
                }`}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Empty State */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgb(248, 251, 255) 0%, rgb(232, 244, 255) 100%)",
        }}
        className="flex flex-col items-center justify-center py-16 px-4 rounded-xl border border-dashed border-[rgb(102_126_234)]"
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)",
          }}
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg relative"
        >
          {/* White inner circle */}
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            {/* Blue plus icon */}
            <Plus className="w-6 h-6 text-[rgb(118_75_162)]" strokeWidth={3} />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          لا توجد منتجات رقمية
        </h3>

        <p className="text-gray-500 text-center mb-6 max-w-md">
          ابدأ في إنشاء منتجاتك الرقمية الأولى وابدأ في بيعها عبر المنصة
        </p>
      </div>
    </div>
  );
}

export default DigitalProducts;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Package className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            المنتجات الرقمية
          </span>
        </div>
      </div>
    </div>
  );
}
