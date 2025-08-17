import { Play, FileQuestion, Code } from "lucide-react";
import type { Lesson } from "@/types/couse";

function LessonItem({
  lesson,
  isSelected,
  onSelect,
}: {
  lesson: Lesson;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const handleClick = () => {
    onSelect();
    // onItemSelect({
    //   ...lesson,
    //   type: "lesson",
    //   lessonType: lesson.type === "tool" ? "tool" : lesson.type,
    //   toolType: lesson.toolType,
    //   questions: lesson.questions,
    //   cards: lesson.cards,
    //   content: lesson.content,
    // });
  };

  const getIcon = () => {
    switch (lesson.type) {
      case "video":
        return (
          <Play
            className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-600"}`}
          />
        );
      case "exam":
        return (
          <FileQuestion
            className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-600"}`}
          />
        );
      case "tool":
        // if (lesson.toolType === "flashcards") {
        //   return (
        //     <CreditCard
        //       className={`w-4 h-4 ${
        //         isSelected ? "text-white" : "text-gray-600"
        //       }`}
        //     />
        //   );
        // }
        return (
          <Code
            className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-600"}`}
          />
        );
      default:
        return (
          <Play
            className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-600"}`}
          />
        );
    }
  };

  return (
    <div
      className={`group relative p-3 rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-blue-50 border-2 border-blue-200"
          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isSelected ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            {getIcon()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={`font-medium text-sm truncate ${
                isSelected ? "text-blue-700" : "text-gray-800"
              }`}
            >
              {lesson.title}
            </h4>
          </div>
          <p className="text-xs text-gray-500">{lesson.duration}</p>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* أزرار التعديل والحذف محذوفة */}
        </div>
      </div>
    </div>
  );
}

export default LessonItem;
