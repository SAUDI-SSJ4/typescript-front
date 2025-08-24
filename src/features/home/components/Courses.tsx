import CourseCard from "@/components/shared/CourseCard";
import { useState } from "react";
import { Filter, ChevronDown, Search } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "تطوير تطبيقات الويب باستخدام React.js",
    description: "تعلم كيفية بناء تطبيقات ويب تفاعلية باستخدام React.js",
    image:
      "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
    price: 0,
    rating: 4.8,
    instructor: {
      name: "أحمد محمد",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
    },
    type: "تطوير الويب",
    category: "برمجة",
    slug: "react-js",
    videoUrl: "https://example.com/video.mp4",
    duration: "8 ساعات",
    lessonsCount: 24,
    enrolledStudents: 1200,
    level: "متوسط",
    deliveryType: "recorded-online" as const,
  },
  {
    id: 2,
    title: "تعلم تصميم واجهات المستخدم UI/UX",
    description: "دورة شاملة في تصميم واجهات المستخدم وتجربة المستخدم",
    image:
      "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm3ku6p8w0001zw88iw0jzsq9%2Fnextjs-14.jpeg&w=828&q=75",
    price: 299,
    rating: 4.9,
    instructor: {
      name: "سارة أحمد",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
    },
    type: "تصميم",
    category: "تصميم",
    insteadOf: 350,
    slug: "ui-ux",
    videoUrl: "https://example.com/video.mp4",
    duration: "8 ساعات",
    lessonsCount: 24,
    enrolledStudents: 1200,
    level: "متوسط",
    deliveryType: "in-person" as const,
    totalSeats: 30,
    remainingSeats: 8,
  },
  {
    id: 3,
    title: "التسويق الرقمي الشامل",
    description: "استراتيجيات وأدوات التسويق الرقمي الحديثة",
    image:
      "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2lmnwqy0001n5p52l97up8w%2Fairbnb-thumb.png&w=828&q=75",
    price: 199,
    rating: 4.7,
    instructor: {
      name: "محمد علي",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
    },
    type: "تسويق رقمي",
    category: "تسويق",
    insteadOf: 400,
    slug: "live-digital-marketing",
    videoUrl: "https://example.com/video.mp4",
    duration: "8 ساعات",
    lessonsCount: 24,
    enrolledStudents: 1200,
    level: "متوسط",
    deliveryType: "live-online" as const,
    totalSeats: 50,
    remainingSeats: 12,
  },
  {
    id: 4,
    title: "الذكاء الاصطناعي وتعلم الآلة",
    description: "مقدمة في الذكاء الاصطناعي وتطبيقاته العملية",
    image:
      "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
    price: 399,
    rating: 4.9,
    instructor: {
      name: "د. خالد إبراهيم",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
    },
    type: "ذكاء اصطناعي",
    category: "برمجة",
    insteadOf: 539,
    slug: "ai-and-machine-learning",
    videoUrl: "https://example.com/video.mp4",
    duration: "8 ساعات",
    lessonsCount: 24,
    enrolledStudents: 1200,
    level: "متوسط",
    deliveryType: "private-session" as const,
    isAvailable: true,
  },
  {
    id: 5,
    title: "تطوير تطبيقات الموبايل",
    description: "تعلم تطوير تطبيقات الهواتف الذكية باستخدام React Native",
    image:
      "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
    price: 0,
    rating: 4.6,
    instructor: {
      name: "عمر حسن",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
    },
    type: "تطوير الويب",
    category: "برمجة",
    slug: "mobile-development",
    videoUrl: "https://example.com/video.mp4",
    duration: "8 ساعات",
    lessonsCount: 24,
    enrolledStudents: 1200,
    level: "متوسط",
    deliveryType: "recorded-online" as const,
  },
  {
    id: 6,
    title: "إدارة المشاريع الاحترافية",
    description: "منهجيات وأدوات إدارة المشاريع الحديثة",
    image:
      "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
    price: 299,
    rating: 4.8,
    instructor: {
      name: "ليلى كمال",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
    },
    type: "إدارة",
    category: "أعمال",
    insteadOf: 350,
    slug: "project-management",
    videoUrl: "https://example.com/video.mp4",
    duration: "8 ساعات",
    lessonsCount: 24,
    enrolledStudents: 1200,
    level: "متوسط",
    deliveryType: "digital-product" as const,
  },
  {
    id: 7,
    title: "حزمة تعلم البرمجة الشاملة",
    description: "مجموعة شاملة من الدورات والمواد التعليمية",
    image:
      "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
    price: 599,
    rating: 4.9,
    instructor: {
      name: "محمد أحمد",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
    },
    type: "تطوير الويب",
    category: "برمجة",
    insteadOf: 799,
    slug: "programming-bundle",
    videoUrl: "https://example.com/video.mp4",
    duration: "40 ساعة",
    lessonsCount: 120,
    enrolledStudents: 800,
    level: "متوسط",
    deliveryType: "product-bundle" as const,
  },
  {
    id: 8,
    title: "استشارة تقنية متخصصة",
    description: "جلسة استشارة تقنية شخصية مع خبير متخصص",
    image:
      "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2hcqdzp0001myux1n5yfli7%2Freacjs-thumb.jpg&w=828&q=75",
    price: 199,
    rating: 4.7,
    instructor: {
      name: "د. سامي حسن",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
    },
    type: "استشارة",
    category: "أعمال",
    slug: "tech-consultation",
    videoUrl: "https://example.com/video.mp4",
    duration: "1 ساعة",
    lessonsCount: 1,
    enrolledStudents: 45,
    level: "متقدم",
    deliveryType: "private-session" as const,
    isAvailable: false,
  },
  {
    id: 9,
    title: "دورة التسويق الرقمي الحضورية",
    description: "دورة حضورية شاملة لتعلم التسويق الرقمي من الصفر حتى الاحتراف مع جلسات تفاعلية مباشرة ومتابعة شخصية من المدرب في مقر الأكاديمية",
    image:
      "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Fsimplearabcode.lon1.cdn.digitaloceanspaces.com%2Fimages%2Fcourses%2Fcm2lmnwqy0001n5p52l97up8w%2Fairbnb-thumb.png&w=828&q=75",
    price: 399,
    rating: 4.9,
    instructor: {
      name: "أ. أحمد محمد",
      image:
        "https://www.simplearabcode.org/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocI0kDfW6-61gVst1BeQM-hWw13fEfiXS_NtYApQFdH-YMbVQEvS%3Ds96-c&w=128&q=75",
    },
    type: "تسويق رقمي",
    category: "تسويق",
    insteadOf: 699,
    slug: "digital-marketing",
    videoUrl: "https://example.com/video.mp4",
    duration: "6 أسابيع",
    lessonsCount: 12,
    enrolledStudents: 2850,
    level: "متقدم",
    deliveryType: "in-person" as const,
    totalSeats: 30,
    remainingSeats: 8,
  },
] as const;

<<<<<<< HEAD
  const { data: courses, isPending, error } =
    usePublicCourses({
      filters,
    });
  const { data: categories, isPending: categoriesPending } =
    useCategories();
=======
export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isFreeOnly, setIsFreeOnly] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
>>>>>>> sketch

  const categories = [
    { value: "all", label: "الكل" },
    { value: "برمجة", label: "برمجة" },
    { value: "تصميم", label: "تصميم" },
    { value: "تسويق", label: "تسويق" },
    { value: "أعمال", label: "أعمال" },
  ];

  const deliveryTypes = [
    { value: "all", label: "جميع الأنواع" },
    { value: "recorded-online", label: "دورة مسجلة أون لاين" },
    { value: "in-person", label: "دورة حضورية" },
    { value: "live-online", label: "دورة مباشرة أون لاين" },
    { value: "private-session", label: "جلسة خصوصية" },
    { value: "digital-product", label: "منتج رقمي" },
    { value: "product-bundle", label: "حزمة منتجات" },
  ];

<<<<<<< HEAD
  const handleTypeChange = (
    typeValue: string,
    checked: boolean
  ) => {
    setSelectedTypes((prev) =>
      checked
        ? [...prev, typeValue]
        : prev.filter(
            (value) =>
              value !== typeValue
          )
    );
  };
  if (isPending || categoriesPending) {
    return (
      <div className="text-center">
        جارٍ تحميل الدورات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        حدث خطأ في تحميل الدورات. يرجى المحاولة مرة أخرى.
      </div>
    );
  }

  const staticFilters = {
    price: [
      {
        title: "مجاني",
        value: "free",
      },
      {
        title: "مدفوع",
        value: "paid",
      },
    ],
    type: [
      {
        title: "حضوري",
        value: "attend",
      },
      {
        title: "مباشر",
        value: "live",
      },
      {
        title: "تفاعلي",
        value: "recorded",
      },
    ],
  };
=======
  const levels = [
    { value: "all", label: "الكل" },
    { value: "مبتدئ", label: "مبتدئ" },
    { value: "متوسط", label: "متوسط" },
    { value: "متقدم", label: "متقدم" },
  ];

  // Filter courses based on selected filters
  const filteredCourses = courses.filter(course => {
    // Search filter
    if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !course.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (selectedCategory !== "all" && course.category !== selectedCategory) return false;
    
    // Type filter
    if (selectedType !== "all" && course.deliveryType !== selectedType) return false;
    
    // Level filter
    if (selectedLevel !== "all" && course.level !== selectedLevel) return false;
    
    // Price filter
    if (isFreeOnly && course.price !== 0) return false;
    
    if (!isFreeOnly) {
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : Infinity;
      if (course.price < min || course.price > max) return false;
    }
    
    return true;
  });
>>>>>>> sketch
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl text-foreground font-bold">
            كل المواد التدريبية
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من الدورات التدريبية المصممة لتطوير مهاراتك المهنية
          </p>
        </div>

<<<<<<< HEAD
        {/* Content */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="bg-card rounded-[20px] p-6 md:col-span-1 space-y-6">
            {/* Category Filter */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-card-foreground">
                التصنيف
              </h3>
              <div className="space-y-2">
                {categories?.data && categories.data.length > 0 ? (
                  categories.data.map(
                    (category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          className="rounded"
                          checked={selectedCategories.includes(
                            String(
                              category.id
                            )
                          )}
                          onChange={(e) =>
                            handleCategoryChange(
                              String(
                                category.id
                              ),
                              e.target
                                .checked
                            )
                          }
                        />
                        <span className="text-sm">
                          {category.title}
                        </span>
                      </label>
                    )
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">
                    لا توجد تصنيفات متاحة
                  </p>
                )}
=======
        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full bg-primary text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Filter className="w-5 h-5" />
              {showMobileFilters ? "إخفاء التصفية" : "عرض التصفية"}
            </button>
          </div>

          {/* Filter Sidebar */}
          <div className={`w-full lg:w-80 lg:flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm p-6 lg:sticky lg:top-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Filter className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">تصفية الدورات</h3>
              </div>

              {/* Search Filter */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-foreground mb-3">بحث</label>
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="ابحث عن دورة..."
                    className="w-full pr-12 pl-3 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-base"
                  />
                </div>
              </div>

              {/* Category and Level Filters - Same Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-base font-semibold text-foreground mb-3">التصنيف</label>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-base"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>{category.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-base font-semibold text-foreground mb-3">المستوى</label>
                  <select 
                    value={selectedLevel} 
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full p-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-base"
                  >
                    {levels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
>>>>>>> sketch
              </div>

              {/* Course Type Filter */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-foreground mb-3">نوع الدورة</label>
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-base"
                >
                  {deliveryTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-base font-semibold text-foreground mb-3">السعر</label>
                
               
                {/* Price Range Inputs */}
                {!isFreeOnly && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">الحد الأدنى (ريال)</label>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="0"
                        min="0"
                        className="w-full p-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">الحد الأعلى (ريال)</label>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="لا حد أقصى"
                        min="0"
                        className="w-full p-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white transition-all text-base"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Results Count - Removed */}
            </div>
<<<<<<< HEAD
          </aside>
          {courses?.data?.courses && courses.data.courses.length > 0 ? (
            <CoursesList
              courses={courses.data.courses}
            />
          ) : !isPending ? (
            <div className="md:col-span-3 text-center text-muted-foreground">
              لا توجد دورات متاحة
            </div>
          ) : null}
=======
          </div>

          {/* Courses Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="w-full">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>
            
            {/* No Results Message */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">لا توجد دورات تطابق معايير البحث</p>
              </div>
            )}
          </div>
>>>>>>> sketch
        </div>
      </div>
    </section>
  );
}
