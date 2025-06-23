import EducationalMaterials from "./EducationalMaterials";
import UpcomingCourses from "./UpcomingCourses";
import Classes from "./Classes";

function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <EducationalMaterials />
      <div className="flex flex-col gap-6">
        <UpcomingCourses />
        <Classes />
      </div>
    </div>
  );
}

export default StudentDashboard;
