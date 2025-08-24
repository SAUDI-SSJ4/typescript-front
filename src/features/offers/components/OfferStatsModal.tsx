import React from "react";
import { TrendingUp, DollarSign, Users, Calendar, Package, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Offer } from "@/types/offer";

interface OfferSale {
  id: number;
  customerName: string;
  purchaseDate: string;
  amount: number;
  originalPrice: number;
  savings: number;
}

interface OfferStatistics {
  totalSales: number;
  totalRevenue: number;
  totalSavings: number;
  conversionRate: number;
  averageOrderValue: number;
  sales: OfferSale[];
}

interface OfferStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer | null;
}

// Mock data for offer statistics
const mockOfferStats: Record<number, OfferStatistics> = {
  1: {
    totalSales: 23,
    totalRevenue: 9637,
    totalSavings: 4140,
    conversionRate: 12.5,
    averageOrderValue: 419,
    sales: [
      {
        id: 1,
        customerName: "أحمد محمد علي",
        purchaseDate: "2024-08-20",
        amount: 419,
        originalPrice: 599,
        savings: 180
      },
      {
        id: 2,
        customerName: "فاطمة عبدالله",
        purchaseDate: "2024-08-19",
        amount: 419,
        originalPrice: 599,
        savings: 180
      },
      {
        id: 3,
        customerName: "خالد السعيد",
        purchaseDate: "2024-08-18",
        amount: 419,
        originalPrice: 599,
        savings: 180
      },
      {
        id: 4,
        customerName: "سارة أحمد",
        purchaseDate: "2024-08-17",
        amount: 419,
        originalPrice: 599,
        savings: 180
      },
      {
        id: 5,
        customerName: "محمد عبدالله",
        purchaseDate: "2024-08-16",
        amount: 419,
        originalPrice: 599,
        savings: 180
      }
    ]
  },
  2: {
    totalSales: 78,
    totalRevenue: 5850,
    totalSavings: 5772,
    conversionRate: 25.3,
    averageOrderValue: 75,
    sales: [
      {
        id: 6,
        customerName: "نورا حسن",
        purchaseDate: "2024-08-15",
        amount: 75,
        originalPrice: 149,
        savings: 74
      },
      {
        id: 7,
        customerName: "عمر الخليل",
        purchaseDate: "2024-08-14",
        amount: 75,
        originalPrice: 149,
        savings: 74
      }
    ]
  },
  3: {
    totalSales: 30,
    totalRevenue: 6720,
    totalSavings: 2250,
    conversionRate: 18.7,
    averageOrderValue: 224,
    sales: [
      {
        id: 8,
        customerName: "ليلى محمود",
        purchaseDate: "2024-07-25",
        amount: 224,
        originalPrice: 299,
        savings: 75
      }
    ]
  }
};

// StatCard Component for the modal
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

const StatCard = ({ title, value, icon, change, changeType }: StatCardProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p
              className={`text-xs mt-1 flex items-center gap-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-3 h-3" />
              {change}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
};

function OfferStatsModal({ isOpen, onClose, offer }: OfferStatsModalProps) {
  if (!offer) return null;

  const stats = mockOfferStats[offer.id] || {
    totalSales: 0,
    totalRevenue: 0,
    totalSavings: 0,
    conversionRate: 0,
    averageOrderValue: 0,
    sales: []
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-right flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            إحصائيات العرض
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="إجمالي المبيعات"
              value={stats.totalSales.toLocaleString()}
              icon={<Package className="w-5 h-5" />}
              change="+15%"
              changeType="positive"
            />
            <StatCard
              title="إجمالي الإيرادات"
              value={`${stats.totalRevenue.toLocaleString()} ر.س`}
              icon={<DollarSign className="w-5 h-5" />}
              change="+22%"
              changeType="positive"
            />
            <StatCard
              title="إجمالي الوفورات"
              value={`${stats.totalSavings.toLocaleString()} ر.س`}
              icon={<TrendingUp className="w-5 h-5" />}
              change="+18%"
              changeType="positive"
            />
            <StatCard
              title="متوسط قيمة الطلب"
              value={`${stats.averageOrderValue.toLocaleString()} ر.س`}
              icon={<Users className="w-5 h-5" />}
              change="+8%"
              changeType="positive"
            />
          </div>

          {/* Sales Chart Placeholder */}
          <div className="bg-white rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              مبيعات آخر 30 يوماً
            </h4>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">مخطط المبيعات سيُعرض هنا</p>
                <p className="text-sm text-gray-400">Chart.js أو مكتبة رسوم بيانية أخرى</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default OfferStatsModal;