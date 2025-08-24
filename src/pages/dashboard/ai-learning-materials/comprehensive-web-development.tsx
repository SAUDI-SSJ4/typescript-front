import { useState } from "react";
import { CourseHeader } from "@/components/course";
import { LessonsList, LessonContent, MobileLessonsDropdown } from "@/components/lesson";
import { chaptersData } from "@/data/lessons";

// المكون الرئيسي
export default function ComprehensiveWebDevelopment() {
  const [chapters, setChapters] = useState(chaptersData);
  const [activeLessonId, setActiveLessonId] = useState<string | null>('l2-1');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleChapter = (chapterId: string) => {
    setChapters(prev => prev.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, isExpanded: !chapter.isExpanded }
        : chapter
    ));
  };

  const handleSelectLesson = (lessonId: string) => {
    setChapters(prev => prev.map(chapter => ({
      ...chapter,
      lessons: chapter.lessons.map(lesson => ({
        ...lesson,
        isActive: lesson.id === lessonId
      }))
    })));
    setActiveLessonId(lessonId);
    setIsMobileMenuOpen(false); // إغلاق القائمة في الجوال عند اختيار درس
  };

  return (
    <div className="bg-gray-50 min-h-screen relative" dir="rtl">
      <div className="flex flex-col h-screen">
        <CourseHeader chapters={chapters} />
        
        <div className="flex-1 py-4 lg:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-20 gap-6 h-full">
            {/* قائمة الدروس - مخفية في الجوال */}
            <div className="hidden lg:block lg:col-span-4">
              <LessonsList 
                chapters={chapters}
                onToggleChapter={handleToggleChapter}
                onSelectLesson={handleSelectLesson}
              />
            </div>
            
            {/* محتوى الدرس */}
            <div className="col-span-1 lg:col-span-16">
              <LessonContent 
                activeLessonId={activeLessonId}
                chapters={chapters}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            </div>
          </div>
        </div>

        {/* قائمة الدروس المنسدلة للجوال */}
        <MobileLessonsDropdown
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          chapters={chapters}
          onToggleChapter={handleToggleChapter}
          onSelectLesson={handleSelectLesson}
        />
      </div>
    </div>
  );
}