import { MessageCircle, TrendingUp } from "lucide-react";
import type { StudentQuestion } from "@/types/student-question";

interface StudentQuestionsStatsProps {
  questions: StudentQuestion[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
  bgColor?: string;
  iconColor?: string;
}

function StatCard({ 
  title, 
  value, 
  icon, 
  change, 
  changeType, 
  bgColor = "bg-white",
  iconColor = "text-blue-600" 
}: StatCardProps) {
  return (
    <div className={`${bgColor} rounded-lg border-0 shadow-sm p-6`}>
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
        <div className={iconColor}>{icon}</div>
      </div>
    </div>
  );
}

function StudentQuestionsStats({ questions }: StudentQuestionsStatsProps) {
  const totalQuestions = questions.length;
  
  // Questions today
  const today = new Date();
  const questionsToday = questions.filter(q => {
    const questionDate = new Date(q.createdAt);
    return questionDate.toDateString() === today.toDateString();
  }).length;

  const stats = [
    {
      title: "إجمالي الأسئلة",
      value: totalQuestions,
      icon: <MessageCircle className="w-8 h-8" />,
      change: `${questionsToday} أسئلة اليوم`,
      changeType: "positive" as const,
      bgColor: "bg-white",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="mb-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType}
            bgColor={stat.bgColor}
            iconColor={stat.iconColor}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentQuestionsStats;