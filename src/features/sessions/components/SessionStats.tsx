import { Calendar, Users, Clock, DollarSign, TrendingUp } from "lucide-react";

interface Session {
  id: number;
  title: string;
  duration: number;
  price: number;
  instructor: string;
  time: string;
}

interface SessionStatsProps {
  sessions: Session[];
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

function SessionStats({ sessions }: SessionStatsProps) {
  const totalSessions = sessions.length;
  const freeSessions = sessions.filter(session => session.price === 0).length;
  const paidSessions = sessions.filter(session => session.price > 0).length;
  const averagePrice = sessions.length > 0 ? sessions.reduce((sum, session) => sum + session.price, 0) / sessions.length : 0;

  const stats = [
    {
      title: "إجمالي الجلسات",
      value: totalSessions,
      icon: <Calendar className="w-8 h-8" />,
      change: "+5 جلسات جديدة",
      changeType: "positive" as const,
    },
    {
      title: "الجلسات المجانية",
      value: freeSessions,
      icon: <Clock className="w-8 h-8" />,
      change: "جلسات مجانية",
      changeType: "positive" as const,
    },
    {
      title: "الجلسات المدفوعة",
      value: paidSessions,
      icon: <Users className="w-8 h-8" />,
      change: "جلسات مدفوعة",
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

export default SessionStats;