import type { SelectedItem } from "..";
import ManageLesson from "../manage/ManageLesson";
import ManageSection from "../manage/ManageSection";

function Manage({ selectedItem }: { selectedItem: SelectedItem | null }) {
  return (
    <div className={selectedItem?.lesson?.video_id ? "" : "flex-1"}>
      {selectedItem && selectedItem.section && (
        <ManageSection section={selectedItem?.section} />
      )}
      {selectedItem && selectedItem.lesson && (
        <ManageLesson lesson={selectedItem?.lesson} />
      )}
    </div>
  );
}

export default Manage;
