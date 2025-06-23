import { useNavigate } from "react-router-dom";
import AddCourseForm from "@/features/courses/components/AddCourseForm";
import type { ICourseForm } from "@/validations/course";

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            إضافة مادة تعليمية جديدة
          </h1>
          <p className="text-gray-600 mt-2">
            أنشئ مادة تعليمية جديدة وأضفها إلى منصتك التعليمية
          </p>
        </div>

        {/* Form */}
        <AddCourseForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}

export default AddNewCourse;
