import type { CourseCertificate } from "@/types/certificate";
import { List, Users, BarChart3, TrendingUp } from "lucide-react";
import { useMemo } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeType }) => {
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
};


interface CertificateStatsProps {
  certificates: CourseCertificate[];
}

function CertificateStats({ certificates }: CertificateStatsProps) {
  const stats = useMemo(() => {
    if (!certificates || certificates.length === 0) {
      return {
        totalCertificates: 0,
        totalStudents: 0,
        averageCompletion: 0,
      };
    }

    const totalStudents = certificates.reduce(
      (sum, cert) => sum + cert.totalStudents,
      0
    );
    const totalCompletion = certificates.reduce(
      (sum, cert) => sum + cert.completionRate,
      0
    );
    const averageCompletion = certificates.length > 0 ? totalCompletion / certificates.length : 0;

    return {
      totalCertificates: certificates.length,
      totalStudents,
      averageCompletion: averageCompletion.toFixed(1) + "%",
    };
  }, [certificates]);

  const statCards = [
    {
      title: "إجمالي الشهادات",
      value: stats.totalCertificates,
      icon: <List className="w-8 h-8" />,
      change: "+2 هذا الشهر",
      changeType: "positive" as const,
    },
    {
      title: "إجمالي الطلاب",
      value: stats.totalStudents.toLocaleString(),
      icon: <Users className="w-8 h-8" />,
      change: "+15% من الشهر الماضي",
      changeType: "positive" as const,
    },
    {
      title: "متوسط الإكمال",
      value: stats.averageCompletion,
      icon: <BarChart3 className="w-8 h-8" />,
      change: "+5% من الشهر الماضي",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {statCards.map((stat, index) => (
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

export { CertificateStats };
