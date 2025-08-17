import { Star, ShoppingCart, GlobeLockIcon, Check, Loader2 } from "lucide-react";
import type { Course } from "@/types/couse";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Icon from "@/components/shared/Icon";
import { useCart } from "@/hooks/useCart";

type TabId = "brief" | "content" | "learning" | "experience";

interface CourseCardProps {
  price: number;
  level: string;
  lessonsCount: number;
  insteadOf?: number;
}

function Hero({ courseData }: { courseData: Course }) {
  const [activeTab, setActiveTab] = useState<TabId>("brief");

  return (
    <section>
      <div className="container">
        <div className="flex items-center flex-wrap gap-4 justify-between lg:justify-start lg:gap-40">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {courseData.title}
          </h1>
          <CourseRating rating={courseData.avg_rating} />
        </div>

        <div className="flex items-stretch lg:flex-row flex-col gap-6 mt-6 md:mt-10 mb-6">
          <div className="flex-1 bg-card rounded-[20px] shadow-sm p-4 flex flex-col">
            <video
              src={courseData.preview_video}
              className="w-full h-full min-h-[300px] object-contain rounded-lg bg-gray-50"
              controls
              preload="metadata"
            />
            <CourseNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="lg:w-[350px] flex flex-col gap-6">
            <CourseCard
              price={courseData.price || 0}
              level={courseData.level}
              lessonsCount={courseData.lessons_count}
              insteadOf={courseData.discount_price || undefined}
            />
            <AcademyCard />
          </div>
        </div>
        <CourseNavigationContent
          courseData={courseData}
          activeTab={activeTab}
        />
      </div>
    </section>
  );
}

export default Hero;

function CourseRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <span className="text-muted-foreground font-semibold">{rating}</span>
    </div>
  );
}

function CourseCard({
  price,
  level,
  lessonsCount,
  insteadOf,
}: CourseCardProps) {
  const { addToCart, isInCart, loading } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Mock course data for this component
  const mockCourse = {
    id: "mock-course-id",
    title: "Mock Course",
    price: price,
    discount_price: insteadOf
  } as any;
  
  const courseInCart = isInCart(mockCourse.id);
  
  const handleAddToCart = async () => {
    if (courseInCart || loading) {
      return;
    }
    
    try {
      await addToCart(mockCourse);
      setAddedToCart(true);
      
      // Reset the added state after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };
  
  const courseInfo = [
    {
      title: "مستوى متوسط",
      icon: "level.svg",
      value: level,
    },
    {
      title: "32 دروس تعليمية",
      icon: "play.svg",
      value: lessonsCount,
    },
    {
      title: "بإمكانك مشاهدتها في أي وقت",
      icon: "infinite.svg",
    },
    {
      title: "بامكانك مشاهدتها على هاتفك",
      icon: "iphone.svg",
    },
  ];
  return (
    <div className="bg-card rounded-[20px] shadow-sm flex flex-col py-6 md:py-10 px-6 flex-1">
      <div className="flex flex-col justify-between gap-10 h-full">
        {/* Price and Cart Button */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <span className="text-2xl font-bold text-primary">
              {price} ريال
            </span>
            <span className="text-lg text-[#A3AED0] line-through">
              {insteadOf} ريال
            </span>
          </div>
          <Button 
            size="lg" 
            className={`w-full md:h-14 transition-all duration-300 ${
              addedToCart
                ? "bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
                : courseInCart
                ? "bg-green-500 hover:bg-green-600"
                : "bg-primary hover:bg-primary/90"
            }`}
            onClick={handleAddToCart}
            disabled={courseInCart || loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                جاري الإضافة...
              </>
            ) : addedToCart ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                تمت الإضافة للسلة
              </>
            ) : courseInCart ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                في العربة
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 mr-2" />
                اضف الي العربة
              </>
            )}
          </Button>
        </div>

        {/* Course Info */}
        <ul className="space-y-4">
          {courseInfo.map((item) => (
            <li key={item.title} className="flex items-center gap-3 text-sm">
              <img
                src={`/assets/icons/${item.icon}`}
                className="w-4 h-4"
                loading="lazy"
              />
              <span className="text-muted-foreground text-sm md:text-base font-semibold">
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function AcademyCard() {
  return (
    <div className="bg-card rounded-[20px] shadow-sm element-center flex-col gap-6 p-6">
      <div className="flex items-center gap-4">
        <GlobeLockIcon />
        <h3 className="text-lg font-semibold">أكاديمية ضوء</h3>
      </div>
      <span className="text-[#5A6A85] text-sm">Jan.01.2024</span>
    </div>
  );
}

function CourseNavigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}) {
  const tabs = [
    { id: "brief", label: "نبذة", icon: <Icon name="brief" /> },
    { id: "content", label: "المحتوي", icon: <Icon name="content" /> },
    {
      id: "learning",
      label: "ماذا سوف يتعلم الطالب",
      icon: <Icon name="learn" />,
    },
    { id: "experience", label: "تجربة الطلاب", icon: <Icon name="star" /> },
  ] as const;

  return (
    <ul className="flex flex-wrap gap-4 pt-6">
      {tabs.map((tab) => (
        <li key={tab.id}>
          <Button
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`rounded-[16px] font-semibold flex items-center gap-2 ${
              activeTab === tab.id ? "!bg-[#0062ff14]" : ""
            } ${activeTab === tab.id ? "text-primary" : "text-[#A9A9A9]"}`}
            onClick={() => setActiveTab(tab.id as TabId)}
          >
            {tab.icon}
            {tab.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
function CourseNavigationContent({
  courseData,
  activeTab,
}: {
  courseData: Course;
  activeTab: TabId;
}) {
  const renderContent = () => {
    switch (activeTab) {
      case "brief":
        return (
          <div className="prose max-w-none space-y-6">
            <h3 className="text-lg font-bold">نظرة عامة:</h3>
            <p className="text-muted-foreground">{courseData.content}</p>
          </div>
        );
      case "content":
        return (
          <div className="space-y-6">
            {/* Course content sections */}
            <div className="space-y-4">
              {/* Section 1 */}
              <div className="border rounded-2xl overflow-hidden bg-card">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-800">المقدمة (3 دروس)</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>5:30</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <img src="/assets/icons/play.svg" className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-800">مرحباً بك في الدورة</span>
                    </div>
                    <span className="text-sm text-gray-600">5:30</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <img src="/assets/icons/play.svg" className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-800">ما ستتعلمه في هذه ...</span>
                    </div>
                    <span className="text-sm text-gray-600">8:15</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <img src="/assets/icons/play.svg" className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-800">إعداد بيئة العمل</span>
                    </div>
                    <span className="text-sm text-gray-600">12:45</span>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="border rounded-2xl overflow-hidden bg-card">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-gray-800">الأساسيات (2 دروس)</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>25:30</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <img src="/assets/icons/play.svg" className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-800">المفاهيم الأساسية</span>
                    </div>
                    <span className="text-sm text-gray-600">15:20</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <img src="/assets/icons/play.svg" className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="font-medium text-gray-800">التطبيقات المقدمة</span>
                    </div>
                    <span className="text-sm text-gray-600">10:10</span>
                  </div>
                </div>
              </div>

              {/* Add New Section Button */}
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  إضافة قسم
                </div>
              </div>
            </div>
          </div>
        );
      case "learning":
        return (
          <ul className="space-y-4">
            {courseData.learning_outcomes?.split('\n').map((point: string, index: number) => (
              <li key={index} className="flex items-center gap-2">
                <img src="/assets/icons/learn.svg" className="w-4 h-4" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        );
      case "experience":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/assets/images/home/instructor.png"
                  alt="المراجع"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">أحمد محمد</h4>
                  <CourseRating rating={5} />
                </div>
              </div>
              <p className="text-muted-foreground">دورة ممتازة، استفدت كثيراً من المحتوى المقدم. الشرح واضح ومفصل.</p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/assets/images/home/instructor.png"
                  alt="المراجع"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">سارة أحمد</h4>
                  <CourseRating rating={4} />
                </div>
              </div>
              <p className="text-muted-foreground">محتوى جيد جداً، لكن أتمنى لو كان هناك المزيد من التطبيقات العملية.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="rounded-[20px] shadow-sm p-6 mb-14 bg-card">
      {renderContent()}
    </div>
  );
}
