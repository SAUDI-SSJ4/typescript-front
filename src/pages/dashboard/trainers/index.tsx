import { Plus, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import TrainerStats from "@/features/trainers/components/TrainerStats";
import TrainerFilters from "@/features/trainers/components/TrainerFilters";
import { Link } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import type { Trainer } from "@/types/trainer";
import { useState, useMemo } from "react";
import TrainersTable from "@/features/trainers/components/TrainersTable";

const trainers: Trainer[] = [
  {
    id: 1,
    name: "Ethaq Ethaq",
    email: "ethaa6q11@gmail.com",
    phone: "05510056864",
    coursesCount: 3,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    specialization: "تطوير التطبيقات",
    rating: 4.8,
    studentsCount: 450,
  },
  {
    id: 2,
    name: "Ethaq Ethaq",
    email: "ethaaq111@gmail.com",
    phone: "05515005864",
    coursesCount: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    specialization: "تطوير الويب",
    rating: 4.9,
    studentsCount: 680,
  },
  {
    id: 3,
    name: "سارة أحمد",
    email: "sarah.ahmed@example.com",
    phone: "05521234567",
    coursesCount: 4,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    specialization: "تصميم UX/UI",
    rating: 4.7,
    studentsCount: 320,
  },
  {
    id: 4,
    name: "محمد علي",
    email: "mohammed.ali@example.com",
    phone: "05534567890",
    coursesCount: 2,
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    specialization: "الذكاء الاصطناعي",
    rating: 4.9,
    studentsCount: 280,
  },
];

function Trainers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("الكل");
  const [minCoursesCount, setMinCoursesCount] = useState(0);

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) => {
      const matchesSearch =
        trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trainer.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialization =
        selectedSpecialization === "الكل" ||
        trainer.specialization === selectedSpecialization;

      const matchesCoursesCount = trainer.coursesCount >= minCoursesCount;

      return matchesSearch && matchesSpecialization && matchesCoursesCount;
    });
  }, [searchTerm, selectedSpecialization, minCoursesCount]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialization("الكل");
    setMinCoursesCount(0);
  };

  return (
    <div className="space-y-6">
      <Header />
      <TrainerStats trainers={filteredTrainers} />
      <TrainerFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSpecialization={selectedSpecialization}
        onSpecializationChange={setSelectedSpecialization}
        minCoursesCount={minCoursesCount}
        onMinCoursesCountChange={setMinCoursesCount}
        onClearFilters={handleClearFilters}
      />
      <TrainersTable trainers={filteredTrainers} />
    </div>
  );
}

export default Trainers;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            إدارة المدربين
          </span>
        </div>
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-sm font-medium border border-blue-300 shadow-sm">
          المدربين ({trainers.length})
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          to={`${Routes.DASHBOARD}/${Pages.TRAINERS}/${Pages.NEW}`}
          className={buttonVariants()}
        >
          <Plus className="w-4 h-4 mr-2" />
          إضافة مدرب
        </Link>
      </div>
    </div>
  );
}
