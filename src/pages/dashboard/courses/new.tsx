import { useNavigate } from "react-router-dom";
import AddCourseForm from "@/features/courses/components/AddCourseForm";
import type { ICourseForm } from "@/validations/course";
import { Plus } from "lucide-react";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";

function AddNewCourse() {
  const navigate = useNavigate();

  const handleSubmit = (data: ICourseForm) => {
    console.log("Course created:", data);
    // Here you would typically send the data to your API
    // For now, we'll just navigate back to courses
    navigate("/dashboard/courses");
  };

  const handleCancel = () => {
    navigate("/dashboard/courses");
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader icon={Plus} title="إضافة مادة تعليمية جديدة" />

      {/* Form */}
      <AddCourseForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default AddNewCourse;
