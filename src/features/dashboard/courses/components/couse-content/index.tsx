import { useState } from "react";
import Header from "./Header";
import LessonPreview from "./LessonPreview";
import LessonSidebar from "./LessonSidebar";
import type { Lesson, Section } from "@/types/couse";
import { useSections } from "../../hooks/useSectionsQueries";
import { useParams } from "react-router-dom";
import Manage from "./manage";

export type SelectedItem = {
  lesson?: Lesson;
  section?: Section;
};
function CourseContent() {
  const { courseId } = useParams();
  const { data: sections } = useSections(courseId as string);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>({
    lesson: sections?.data.items[0]?.lessons[0],
    section: sections?.data.items[0],
  });
  return (
    <div className="space-y-6">
      <Header selectedItem={selectedItem} />
      <div className="flex gap-4">
        <LessonSidebar
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          sections={sections?.data.items || []}
        />
        <div className="flex-1 space-y-6 flex">
          <LessonPreview selectedItem={selectedItem} />
          <Manage selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}

export default CourseContent;
