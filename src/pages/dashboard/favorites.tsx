import { Heart, Clock, Star, Users, BookOpen, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Dummy favorites data - courses only
const dummyFavorites = [
  {
    id: 1,
    title: "البرمجة المتقدمة بـ JavaScript",
    type: "course",
    instructor: "خالد أحمد",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=240&fit=crop&crop=center",
    price: "399 ريال",
    originalPrice: "599 ريال",
    duration: "20 ساعة",
    rating: 4.9,
    studentsCount: 3500,
    level: "متقدم",
    addedDate: "2024-01-20",
  },
  {
    id: 2,
    title: "تصميم تطبيقات الهاتف المحمول",
    type: "course",
    instructor: "نورا محمد",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=240&fit=crop&crop=center",
    price: "299 ريال",
    originalPrice: "449 ريال",
    duration: "15 ساعة",
    rating: 4.8,
    studentsCount: 2100,
    level: "متوسط",
    addedDate: "2024-02-05",
  },
  {
    id: 3,
    title: "أساسيات التصميم UI/UX",
    type: "course",
    instructor: "سارة أحمد",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=240&fit=crop&crop=center",
    price: "249 ريال",
    originalPrice: "399 ريال",
    duration: "12 ساعة",
    rating: 4.7,
    studentsCount: 1800,
    level: "مبتدئ",
    addedDate: "2024-02-10",
  },
  {
    id: 4,
    title: "إدارة قواعد البيانات MySQL",
    type: "course",
    instructor: "محمد علي",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=240&fit=crop&crop=center",
    price: "199 ريال",
    originalPrice: "299 ريال",
    duration: "18 ساعة",
    rating: 4.6,
    studentsCount: 1500,
    level: "متقدم",
    addedDate: "2024-02-15",
  },
];

function Favorites() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("الأحدث");

  const sortOptions = ["الأحدث", "الأقدم"];



  const getLevelColor = (level: string) => {
    switch (level) {
      case "مبتدئ":
        return "bg-green-100 text-green-700";
      case "متوسط":
        return "bg-yellow-100 text-yellow-700";
      case "متقدم":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
            placeholder="ابحث في المفضلة..."
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

      {/* Favorites Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyFavorites.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Item Header */}
            <div className="relative aspect-[10/6] overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="text-white text-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  دورة تعليمية
                </span>
              </div>
            </div>

            {/* Item Content */}
            <div className="p-4">
              {/* Course stats - moved to top */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{item.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{item.studentsCount}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(item.level)}`}>
                  {item.level}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3">
                بواسطة {item.instructor}
              </p>

              {/* Price Section */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-blue-600">{item.price}</span>
                <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
              </div>



              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <Button 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm font-medium rounded-lg"
                >
                  التسجيل الآن
                </Button>
                <Button 
                  variant="outline"
                  className="px-3 py-2 bg-red-50 border-red-100 hover:bg-red-100"
                >
                  <Heart className="w-4 h-4 fill-red-600 text-red-600" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Heart className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            المفضلة
          </span>
        </div>
      </div>
    </div>
  );
}
