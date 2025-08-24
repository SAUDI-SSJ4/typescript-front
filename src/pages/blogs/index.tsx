import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Search, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Layout from "@/features/launch-academy/components/Layout";
import type { Blog } from "@/types/blog";

// Sample blog data - replace with API call
const blogData: Blog[] = [
  {
    id: 1,
    title: "مستقبل الذكاء الاصطناعي في التعليم: كيف ستغير التقنية وجه التعلم؟",
    content: "محتوى المقال الكامل...",
    excerpt: "استكشاف كيفية تأثير الذكاء الاصطناعي على مستقبل التعليم والتعلم الرقمي وكيف يمكن للتقنيات الحديثة أن تحسن من تجربة التعلم",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["ذكاء اصطناعي", "تعليم", "تقنية"],
    category: "تقنية",
    status: "published",
    author: "أحمد محمد",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    views: 1250,
    likes: 89,
  },
  {
    id: 2,
    title: "أفضل الممارسات في تصميم واجهات المستخدم للتطبيقات التعليمية",
    content: "محتوى المقال الكامل...",
    excerpt: "دليل شامل لتصميم واجهات مستخدم فعالة وجذابة للمنصات التعليمية مع التركيز على تجربة المستخدم",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["تصميم", "واجهات المستخدم", "تطبيقات"],
    category: "تصميم",
    status: "published",
    author: "سارة أحمد",
    createdAt: "2024-01-12T14:30:00Z",
    updatedAt: "2024-01-12T14:30:00Z",
    views: 890,
    likes: 67,
  },
  {
    id: 3,
    title: "كيفية بناء استراتيجية تسويق رقمي ناجحة للمحتوى التعليمي",
    content: "محتوى المقال الكامل...",
    excerpt: "خطوات عملية لتطوير استراتيجية تسويق رقمي فعالة تساعد في الوصول إلى الجمهور المستهدف",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["تسويق", "محتوى", "استراتيجية"],
    category: "تسويق",
    status: "published",
    author: "محمد علي",
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-10T09:15:00Z",
    views: 654,
    likes: 45,
  },
  {
    id: 4,
    title: "أهمية ريادة الأعمال في العصر الرقمي",
    content: "محتوى المقال الكامل...",
    excerpt: "كيف يمكن للريادة أن تشكل المستقبل وما هي الفرص المتاحة في العصر الرقمي الحالي",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["ريادة أعمال", "أعمال", "مشاريع"],
    category: "أعمال",
    status: "published",
    author: "فاطمة الزهراء",
    createdAt: "2024-01-08T16:45:00Z",
    updatedAt: "2024-01-08T16:45:00Z",
    views: 532,
    likes: 38,
  },
  {
    id: 5,
    title: "تطوير المهارات الشخصية في بيئة العمل الحديثة",
    content: "محتوى المقال الكامل...",
    excerpt: "استراتيجيات فعالة لتطوير المهارات الشخصية والمهنية في عالم سريع التغير",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    keywords: ["تطوير شخصي", "مهارات", "عمل"],
    category: "تطوير شخصي",
    status: "published",
    author: "خالد إبراهيم",
    createdAt: "2024-01-05T11:20:00Z",
    updatedAt: "2024-01-05T11:20:00Z",
    views: 723,
    likes: 52,
  },
];

const categories = [
  "الكل",
  "تقنية",
  "تصميم", 
  "تسويق",
  "أعمال",
  "تطوير شخصي",
  "برمجة",
  "ذكاء اصطناعي",
  "أمن سيبراني",
  "تحليل البيانات",
  "إدارة المشاريع",
  "ريادة الأعمال",
  "تطوير الويب",
  "تطوير التطبيقات",
  "التجارة الإلكترونية",
  "التسويق الرقمي",
  "إدارة الأعمال",
  "المحاسبة والمالية",
  "الموارد البشرية",
  "اللغات",
  "التصوير",
  "التعليم الإلكتروني"
];

export default function PublicBlogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return blogData.filter((blog) => {
      const matchesSearch = searchTerm === "" ||
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "الكل" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory && blog.status === "published";
    });
  }, [searchTerm, selectedCategory]);

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoriesRef.current) {
      const scrollAmount = 200;
      const currentScroll = categoriesRef.current.scrollLeft;
      const targetScroll = direction === 'right' 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount;
      
      categoriesRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (categoriesRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - categoriesRef.current.offsetLeft);
      setScrollLeft(categoriesRef.current.scrollLeft);
      categoriesRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (categoriesRef.current) {
      categoriesRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (categoriesRef.current) {
      categoriesRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !categoriesRef.current) return;
    e.preventDefault();
    const x = e.pageX - categoriesRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    categoriesRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[rgb(249_250_251)]">
        {/* Hero Section */}
        <section className="pt-32 md:pt-36 pb-8 md:pb-12 bg-[rgb(249_250_251)]">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Tag className="w-4 h-4" />
                مدونة سيان التعليمية
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                مدونة <span className="text-blue-600">سيان</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                اكتشف أحدث المقالات والرؤى حول التعليم الرقمي، التقنية، وريادة الأعمال
              </p>
              
              {/* Search */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="ابحث في المقالات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 pr-12 py-3 text-right border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl bg-white"
                    dir="rtl"
                  />
                </div>
              </div>

              {/* Horizontal Categories with Navigation */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-5xl">
                  {/* All Devices - Unified Design */}
                  <div className="flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => scrollCategories('left')}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-md hover:bg-gray-50 z-10 mx-1 sm:mx-2"
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    
                    <div 
                      ref={categoriesRef}
                      className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide px-2 sm:px-4 scroll-smooth max-w-[300px] sm:max-w-[400px] md:max-w-5xl cursor-grab select-none"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      onMouseDown={handleMouseDown}
                      onMouseLeave={handleMouseLeave}
                      onMouseUp={handleMouseUp}
                      onMouseMove={handleMouseMove}
                    >
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={`whitespace-nowrap rounded-full px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm transition-all duration-200 ${
                            selectedCategory === category 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => scrollCategories('right')}
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-white shadow-md hover:bg-gray-50 z-10 mx-1 sm:mx-2"
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Articles */}
        <section className="py-4 md:py-8 bg-[rgb(249_250_251)]">
          <div className="container">
            {filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">لم يتم العثور على مقالات</h3>
                <p className="text-gray-600">جرب البحث بكلمات مختلفة أو غير الفئة المحددة</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} formatDate={formatDate} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

function BlogCard({ blog, formatDate }: { blog: Blog; formatDate: (date: string) => string }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full aspect-[10/6] object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-blue-100 text-blue-700 border-0">
            {blog.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <Link to={`/blogs/${blog.id}`}>
            <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-relaxed">
              {blog.title}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {blog.excerpt}
          </p>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="w-4 h-4" />
              {formatDate(blog.createdAt)}
            </span>
            <Link to={`/blogs/${blog.id}`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                اقرأ المزيد
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}