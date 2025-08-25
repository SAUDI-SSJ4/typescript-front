import { TrendingUp, Ticket, CheckCircle, Users, DollarSign } from "lucide-react";
import type { Coupon } from "@/types/coupon";

interface CouponStatsProps {
  coupons: Coupon[];
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

export function CouponStats({ coupons }: CouponStatsProps) {
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(coupon => coupon.status === 'active').length;
  // const expiredCoupons = coupons.filter(coupon => coupon.status === 'expired').length;
  const totalUsage = coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0);
  
  // حساب إجمالي الايرادات (تقدير)
  const totalSavings = coupons.reduce((sum, coupon) => {
    if (coupon.type === 'percentage') {
      // تقدير مبدئي - يمكن تحسينه لاحقاً
      return sum + (coupon.usedCount * 50 * (coupon.value / 100));
    } else {
      return sum + (coupon.usedCount * coupon.value);
    }
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="إجمالي الكوبونات"
        value={totalCoupons}
        icon={<Ticket className="w-8 h-8" />}
        change="+12%"
        changeType="positive"
      />
      <StatCard
        title="الكوبونات النشطة"
        value={activeCoupons}
        icon={<CheckCircle className="w-8 h-8" />}
        change="+8%"
        changeType="positive"
      />
      <StatCard
        title="إجمالي الاستخدامات"
        value={totalUsage.toLocaleString()}
        icon={<Users className="w-8 h-8" />}
        change="+25%"
        changeType="positive"
      />
      <StatCard
        title="إجمالي الايرادات"
        value={`${totalSavings.toLocaleString()} ر.س`}
        icon={<DollarSign className="w-8 h-8" />}
        change="+18%"
        changeType="positive"
      />
    </div>
  );
}
