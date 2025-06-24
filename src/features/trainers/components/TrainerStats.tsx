import { Users, BookOpen, TrendingUp } from "lucide-react";
import type { Trainer } from "@/types/trainer";

interface TrainerStatsProps {
  trainers: Trainer[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

function StatCard({ title, value, icon, change, changeType }: StatCardProps) {
  return (
          <div className="bg-white rounded-lg border-0 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

function TrainerStats({ trainers }: TrainerStatsProps) {
  const totalTrainers = trainers.length;
  const totalCourses = trainers.reduce(
    (sum, trainer) => sum + trainer.coursesCount,
    0
  );
  const totalStudents = trainers.reduce(
    (sum, trainer) => sum + (trainer.studentsCount || 0),
    0
  );

  const stats = [
    {
      title: "إجمالي المدربين",
      value: totalTrainers,
      icon: <Users className="w-8 h-8" />,
      change: "+2 هذا الشهر",
      changeType: "positive" as const,
    },
    {
      title: "إجمالي الدورات",
      value: totalCourses,
      icon: <BookOpen className="w-8 h-8" />,
      change: "+5 دورات جديدة",
      changeType: "positive" as const,
    },
    {
      title: "إجمالي الطلاب",
      value: totalStudents.toLocaleString(),
      icon: <Users className="w-8 h-8" />,
      change: "+15% من الشهر الماضي",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          changeType={stat.changeType}
        />
      ))}
    </div>
  );
}

export default TrainerStats;
