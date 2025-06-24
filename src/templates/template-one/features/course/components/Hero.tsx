import { Star, ShoppingCart, GlobeLockIcon } from "lucide-react";
import type { Course } from "@/types/couse";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Icon from "@/components/shared/Icon";

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
          <CourseRating rating={courseData.rating} />
        </div>

        <div className="flex items-stretch lg:flex-row flex-col gap-6 mt-6 md:mt-10 mb-6">
          <div className="flex-1 bg-card rounded-[20px] shadow-sm p-4 flex flex-col">
            <video
              src={courseData.videoUrl}
              className="w-full h-full object-cover rounded-lg"
              controls
            />
            <CourseNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="lg:w-[350px] flex flex-col gap-6">
            <CourseCard
              price={courseData.price}
              level={courseData.level}
              lessonsCount={courseData.lessonsCount}
              insteadOf={courseData.insteadOf}
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
          <Button size="lg" className="w-full md:h-14">
            <span>اضف الي العربة</span>
            <ShoppingCart className="w-5 h-5" />
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
            <p className="text-muted-foreground">{courseData.description}</p>
          </div>
        );
      case "content":
        return (
          <div className="space-y-4">
            {/* Course content sections will go here */}
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">القسم الأول: مقدمة</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <img src="/assets/icons/play.svg" className="w-4 h-4" />
                  <span>مقدمة عن الدورة</span>
                </li>
              </ul>
            </div>
          </div>
        );
      case "learning":
        return (
          <ul className="space-y-4">
            {courseData.learningPoints?.map((point: string, index: number) => (
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
            {courseData.reviews?.map((review, index: number) => (
              <div key={index} className="bg-card p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <CourseRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </div>
            ))}
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
