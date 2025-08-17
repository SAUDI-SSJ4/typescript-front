import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddLesson from "./AddLesson";
import AddSection from "./AddSection";
import LessonItem from "./LessonItem";
import type { Section } from "@/types/couse";
import type { SelectedItem } from ".";

interface LessonSidebarProps {
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectedItem | null>>;
  sections: Section[];
  selectedItem: SelectedItem | null;
}

function LessonSidebar({
  selectedItem,
  sections,
  setSelectedItem,
}: LessonSidebarProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border-0 h-full min-w-xs">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">محتوى الدورة</h2>
        <div className="text-sm text-gray-600">
          {sections.reduce(
            (total, section) => total + section.statistics.total_lessons,
            0
          )}{" "}
          درس
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={`section-${section.id}`}
            className="border-0 bg-gray-50 rounded-xl overflow-hidden"
          >
            <AccordionTrigger
              className={`px-4 py-3 hover:no-underline hover:bg-gray-100 ${
                section.id === selectedItem?.section?.id ? "bg-gray-200" : ""
              } transition-colors`}
              onClick={() =>
                setSelectedItem({
                  section,
                })
              }
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-800">
                    {section.title}
                  </span>
                </div>
                <span className="text-sm text-gray-500 mr-2">
                  {section.lessons_count} درس
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 bg-white">
              <div className="space-y-2 pt-2">
                {section.lessons?.map((lesson) => (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    isSelected={selectedItem?.lesson?.id === lesson.id}
                    onSelect={() =>
                      setSelectedItem({
                        lesson,
                      })
                    }
                  />
                ))}
                <AddLesson sectionId={section.id} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6 pt-4 border-t">
        <AddSection />
      </div>
    </div>
  );
}

export default LessonSidebar;
