import { useNavigate } from "react-router-dom";
import AddCourseForm from "@/features/courses/components/AddCourseForm";
import type { ICourseForm } from "@/validations/course";
import { Plus } from "lucide-react";

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
      <Header />

      {/* Form */}
      <AddCourseForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

export default AddNewCourse;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Plus className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            إضافة مادة تعليمية جديدة
          </span>
        </div>
      </div>
    </div>
  );
}
