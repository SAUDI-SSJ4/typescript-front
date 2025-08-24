import { TrendingUp, Users, DollarSign, Clock, Target } from "lucide-react";
import type { AffiliateApplication } from "@/types/affiliate-application";

interface AffiliateApplicationStatsProps {
  applications: AffiliateApplication[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

const StatCard = ({ title, value, icon, change, changeType }: StatCardProps) => {
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

export function AffiliateApplicationStats({ applications }: AffiliateApplicationStatsProps) {
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === 'pending').length;
  
  // حساب إجمالي العمولات من المقبولين
  const totalCommissions = applications
    .filter(app => app.status === 'approved' && app.performanceStats)
    .reduce((sum, app) => sum + (app.performanceStats?.totalCommission || 0), 0);
  
  // حساب عدد النشطين (آخر نشاط خلال 30 يوم)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const activeAffiliates = applications.filter(app => {
    if (app.status !== 'approved' || !app.performanceStats) return false;
    const lastActivity = new Date(app.performanceStats.lastActivityDate);
    return lastActivity >= thirtyDaysAgo;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="إجمالي الطلبات"
        value={totalApplications}
        icon={<Users className="w-8 h-8" />}
        change="+12%"
        changeType="positive"
      />
      <StatCard
        title="قيد المراجعة"
        value={pendingApplications}
        icon={<Clock className="w-8 h-8" />}
        change="+5%"
        changeType="positive"
      />
      <StatCard
        title="النشطين حالياً"
        value={activeAffiliates}
        icon={<Target className="w-8 h-8" />}
        change="+15%"
        changeType="positive"
      />
      <StatCard
        title="إجمالي العمولات"
        value={`${totalCommissions.toLocaleString()} ر.س`}
        icon={<DollarSign className="w-8 h-8" />}
        change="+25%"
        changeType="positive"
      />
    </div>
  );
}