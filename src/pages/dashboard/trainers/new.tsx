import { useNavigate } from "react-router-dom";
import AddTrainerForm from "@/features/trainers/components/AddTrainerForm";
import { UserPlus } from "lucide-react";

function AddNewTrainer() {
  return (
    <div className="space-y-6">
      <Header />

      {/* Form */}
      <AddTrainerForm />
    </div>
  );
}

export default AddNewTrainer;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <UserPlus className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            إضافة مدرب جديد
          </span>
        </div>
      </div>
    </div>
  );
}
