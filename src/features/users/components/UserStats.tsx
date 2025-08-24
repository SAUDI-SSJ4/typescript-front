import { Users, Clock } from "lucide-react";
import type { UserWithInvitation } from "@/types/user-invitation";
import { UserType } from "@/constants/enums";

interface UserStatsProps {
  users: UserWithInvitation[];
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
              {change}
            </p>
          )}
        </div>
        <div className={iconColor}>{icon}</div>
      </div>
    </div>
  );
}

function UserStats({ users }: UserStatsProps) {
  const totalUsers = users.length;
  const acceptedUsers = users.filter(user => user.status === "ACCEPTED").length;
  const pendingInvitations = users.filter(user => user.status === "PENDING").length;
  const rejectedInvitations = users.filter(user => user.status === "REJECTED").length;

  // Remove role counting and acceptance rate calculations

  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: totalUsers,
      icon: <Users className="w-8 h-8" />,
      change: `${acceptedUsers} مفعل`,
      changeType: "positive" as const,
      bgColor: "bg-white",
      iconColor: "text-blue-600",
    },
    {
      title: "الدعوات المعلقة",
      value: pendingInvitations,
      icon: <Clock className="w-8 h-8" />,
      change: pendingInvitations > 0 ? "بانتظار الموافقة" : "لا توجد دعوات معلقة",
      changeType: pendingInvitations > 0 ? "negative" as const : "positive" as const,
      bgColor: "bg-white",
      iconColor: "text-yellow-600",
    },
  ];

  // Remove role stats array

  return (
    <div className="mb-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

export default UserStats;