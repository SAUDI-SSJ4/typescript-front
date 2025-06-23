import { useNavigate } from "react-router-dom";
import AddTrainerForm from "@/features/trainers/components/AddTrainerForm";
import type { ITrainerForm } from "@/validations/trainer";

function AddNewTrainer() {
  const navigate = useNavigate();

  const handleSubmit = (data: ITrainerForm) => {
    console.log("Trainer created:", data);
    // Here you would typically send the data to your API
    // For now, we'll just navigate back to trainers
    navigate("/dashboard/trainers");
  };

  const handleCancel = () => {
    navigate("/dashboard/trainers");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إضافة مدرب جديد</h1>
          <p className="text-gray-600 mt-2">
            أضف مدرب جديد إلى منصتك التعليمية
          </p>
        </div>

        {/* Form */}
        <AddTrainerForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}

export default AddNewTrainer;
