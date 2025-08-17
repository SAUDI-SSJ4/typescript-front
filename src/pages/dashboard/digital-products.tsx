import { Package, Download, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Dummy digital products data
const dummyProducts = [
  {
    id: 1,
    title: "كتاب البرمجة الحديثة - PDF",
    academy: "أكاديمية التقنية المتقدمة",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=240&fit=crop&crop=center",
    type: "كتاب إلكتروني",
  },
  {
    id: 2,
    title: "قوالب تصميم UI/UX - مجموعة كاملة",
    academy: "مدرسة التصميم الرقمي",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=240&fit=crop&crop=center",
    type: "قوالب تصميم",
  },
  {
    id: 3,
    title: "أكواد JavaScript جاهزة - مكتبة شاملة",
    academy: "معهد البرمجة الحديثة",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop&crop=center",
    type: "أكواد برمجية",
  },
  {
    id: 4,
    title: "دورة الأمن السيبراني - فيديوهات تدريبية",
    academy: "أكاديمية الأمان السيبراني",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=240&fit=crop&crop=center",
    type: "فيديوهات تدريبية",
  },
  {
    id: 5,
    title: "أيقونات الويب الحديثة - مجموعة متكاملة",
    academy: "استوديو التصميم الإبداعي",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=240&fit=crop&crop=center",
    type: "أيقونات",
  },
  {
    id: 6,
    title: "خطوط عربية احترافية - حزمة مميزة",
    academy: "مؤسسة الخطوط العربية",
    academyImage: "/api/placeholder/50/50",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=240&fit=crop&crop=center",
    type: "خطوط",
  },
];

function DigitalProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("الأحدث");

  const sortOptions = ["الأحدث", "الأقدم"];

  const getTypeColor = (type: string) => {
    const colors = {
      "كتاب إلكتروني": "bg-blue-100 text-blue-700",
      "قوالب تصميم": "bg-purple-100 text-purple-700",
      "أكواد برمجية": "bg-green-100 text-green-700",
      "فيديوهات تدريبية": "bg-red-100 text-red-700",
      "أيقونات": "bg-yellow-100 text-yellow-700",
      "خطوط": "bg-pink-100 text-pink-700",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

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

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Product Header */}
            <div className="relative aspect-[10/6] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="text-white text-center">
                  <Package className="w-8 h-8 mx-auto mb-1" />
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(product.type)}`}>
                  {product.type}
                </span>
              </div>
            </div>

            {/* Product Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.title}
              </h3>
              
              {/* Academy Info */}
              <div 
                className="flex items-center gap-2 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                onClick={() => window.location.href = `/academy/${product.id}`}
              >
                <img 
                  src={product.academyImage} 
                  alt={product.academy}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">{product.academy}</span>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-medium rounded-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                تحميل
              </Button>
            </div>
          </div>
        ))}
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