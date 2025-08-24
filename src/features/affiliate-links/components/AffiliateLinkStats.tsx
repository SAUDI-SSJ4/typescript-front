import { TrendingUp, Link2, CheckCircle, Users, DollarSign } from "lucide-react";
import type { AffiliateLink } from "@/types/affiliate-link";

interface AffiliateLinkStatsProps {
  links: AffiliateLink[];
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

export function AffiliateLinkStats({ links }: AffiliateLinkStatsProps) {
  const totalLinks = links.length;
  const activeLinks = links.filter(link => link.status === 'active').length;
  const totalClicks = links.reduce((sum, link) => sum + link.clickCount, 0);

  
  // حساب إجمالي الأرباح
  const totalRevenue = links.reduce((sum, link) => {
    return sum + link.totalCommission;
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="إجمالي الروابط"
        value={totalLinks}
        icon={<Link2 className="w-8 h-8" />}
        change="+15%"
        changeType="positive"
      />
      <StatCard
        title="الروابط النشطة"
        value={activeLinks}
        icon={<CheckCircle className="w-8 h-8" />}
        change="+10%"
        changeType="positive"
      />
      <StatCard
        title="إجمالي النقرات"
        value={totalClicks.toLocaleString()}
        icon={<Users className="w-8 h-8" />}
        change="+32%"
        changeType="positive"
      />
      <StatCard
        title="إجمالي الأرباح"
        value={`${totalRevenue.toLocaleString()} ر.س`}
        icon={<DollarSign className="w-8 h-8" />}
        change="+28%"
        changeType="positive"
      />
    </div>
  );
}
