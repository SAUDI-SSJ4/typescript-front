import { useMemo } from "react";
import { Tag, Calendar, TrendingUp, DollarSign } from "lucide-react";
import type { Offer } from "@/types/offer";

interface OfferStatsProps {
  offers: Offer[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const StatCard = ({ title, value, icon, color, bgColor }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border-0">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${bgColor} ${color} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default function OfferStats({ offers }: OfferStatsProps) {
  const stats = useMemo(() => {
    const now = new Date();
    
    const totalOffers = offers.length;
    
    const activeOffers = offers.filter(offer => {
      const expiryDate = new Date(offer.expiryDate);
      return offer.status === 'active' && expiryDate > now;
    }).length;
    
    const expiredOffers = offers.filter(offer => {
      const expiryDate = new Date(offer.expiryDate);
      return offer.status === 'expired' || expiryDate <= now;
    }).length;
    
    const totalSales = offers.reduce((sum, offer) => {
      return sum + (offer.currentPurchases * offer.discountedPrice);
    }, 0);
    
    const totalSavings = offers.reduce((sum, offer) => {
      const savingsPerItem = offer.originalPrice - offer.discountedPrice;
      return sum + (offer.currentPurchases * savingsPerItem);
    }, 0);
    
    return {
      totalOffers,
      activeOffers,
      expiredOffers,
      totalSales,
      totalSavings
    };
  }, [offers]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      <StatCard
        title="إجمالي العروض"
        value={stats.totalOffers}
        icon={<Tag className="w-6 h-6" />}
        color="text-blue-600"
        bgColor="bg-blue-50"
      />
      
      <StatCard
        title="العروض النشطة"
        value={stats.activeOffers}
        icon={<TrendingUp className="w-6 h-6" />}
        color="text-green-600"
        bgColor="bg-green-50"
      />
      
      <StatCard
        title="العروض المنتهية"
        value={stats.expiredOffers}
        icon={<Calendar className="w-6 h-6" />}
        color="text-red-600"
        bgColor="bg-red-50"
      />
    </div>
  );
}