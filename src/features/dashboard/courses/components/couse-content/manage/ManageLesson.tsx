import type { Lesson } from "@/types/couse";
import UploadVideoLesson from "../manage/UploadVideoLesson";
import Exam from "../manage/Exam";
import Tool from "../manage/Tool";

function ManageLesson({ lesson }: { lesson: Lesson }) {
  console.log("lesson", lesson);
  let content;
  switch (lesson.type) {
    case "video":
      content = <UploadVideoLesson lesson={lesson} />;
      break;
    case "exam":
      content = <Exam lesson={lesson} />;
      break;
    case "tool":
      content = <Tool lesson={lesson} />;
      break;

    default:
      content = null;
      break;
  }
  return content;
}

export default ManageLesson;
