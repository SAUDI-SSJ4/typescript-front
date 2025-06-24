import { Card } from "@/components/ui/card";
import { Wallet, TrendingUp} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useMemo } from "react";
import WithdrawalModal from "@/components/shared/dashboard/WithdrawalModal";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function WalletPage() {
  const [activeTab, setActiveTab] = useState("weekly");

  // Chart data for different time periods - memoized to prevent infinite re-renders
  const chartData = useMemo(
    () => ({
      weekly: {
        labels: [
          "Jun 13",
          "Jun 14",
          "Jun 15",
          "Jun 16",
          "Jun 17",
          "Jun 18",
          "Jun 19",
        ],
        datasets: [
          {
            label: "الإيرادات",
            data: [10, 25, 30, 85, 40, 60, 45],
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderColor: "rgba(59, 130, 246, 0.2)",
            borderWidth: 0,
            borderRadius: 6,
          },
        ],
      },
      monthly: {
        labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"],
        datasets: [
          {
            label: "الإيرادات",
            data: [1200, 1900, 3000, 5000, 2000, 3000],
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderColor: "rgba(59, 130, 246, 0.2)",
            borderWidth: 0,
            borderRadius: 6,
          },
        ],
      },
      yearly: {
        labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: "الإيرادات",
            data: [15000, 25000, 35000, 45000, 55000, 81000],
            backgroundColor: "rgba(59, 130, 246, 0.8)",
            borderColor: "rgba(59, 130, 246, 0.2)",
            borderWidth: 0,
            borderRadius: 6,
          },
        ],
      },
    }),
    []
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          titleColor: "#374151",
          bodyColor: "#374151",
          borderColor: "rgba(59, 130, 246, 0.2)",
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          border: {
            display: false,
          },
          grid: {
            color: "rgba(0, 0, 0, 0.03)",
            lineWidth: 1,
          },
          ticks: {
            color: "#6B7280",
            font: {
              size: 12,
            },
            callback: function (value: number | string) {
              return value + " ﷼";
            },
          },
        },
        x: {
          border: {
            display: false,
          },
          grid: {
            display: false,
          },
          ticks: {
            color: "#6B7280",
            font: {
              size: 12,
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="space-y-6">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Chart Section */}
          <Card className="p-6 bg-white border-gray-100">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">الإيرادات</h3>
                
                {/* Monthly Revenue Card - moved inside chart section */}
                <Card className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white min-w-[280px] border-0 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm mb-1">إيرادات هذا الشهر</p>
                      <div className="flex items-center">
                        <span className="text-2xl font-bold">81,000,019.8</span>
                        <span className="text-lg mr-2">﷼</span>
                      </div>
                      <div className="flex items-center mt-1 text-green-200">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        <span className="text-xs">+0.5% من الشهر السابق</span>
                      </div>
                    </div>
                    <Wallet className="w-8 h-8 text-blue-200" />
                  </div>
                </Card>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-50 border-0">
                  <TabsTrigger value="weekly" className="text-sm">أسبوعي</TabsTrigger>
                  <TabsTrigger value="monthly" className="text-sm">شهري</TabsTrigger>
                  <TabsTrigger value="yearly" className="text-sm">سنوي</TabsTrigger>
                </TabsList>
                <div className="mt-6 h-64">
                  <TabsContent value="weekly" className="h-full">
                    <Bar data={chartData.weekly} options={chartOptions} />
                  </TabsContent>
                  <TabsContent value="monthly" className="h-full">
                    <Bar data={chartData.monthly} options={chartOptions} />
                  </TabsContent>
                  <TabsContent value="yearly" className="h-full">
                    <Bar data={chartData.yearly} options={chartOptions} />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </Card>

          {/* Financial Transactions */}
          <FinancialTransactions />
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Wallet Card */}
          <Card className="p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">كافة رصيد الأكاديمية</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold">81,000,019.8</span>
                  <span className="text-lg mr-2">﷼</span>
                </div>
                <div className="flex items-center mt-1 text-green-200">
                </div>
              </div>
              <Wallet className="w-8 h-8 text-emerald-200" />
            </div>
          </Card>

          {/* Withdrawal Button */}
          <div className="space-y-4">
            <WithdrawalModal availableBalance={81000019.8} />
          </div>

          {/* Withdrawal Requests */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">طلبات السحب</h3>
            <div className="space-y-3">
              <WithdrawalRequestCard 
                status="pending" 
                amount={1111} 
                date="١٤٤٦/١٢/١٣هـ" 
              />
              <WithdrawalRequestCard 
                status="completed" 
                amount={5000} 
                date="١٤٤٦/١٢/١٠هـ" 
              />
              <WithdrawalRequestCard 
                status="completed" 
                amount={2500} 
                date="١٤٤٦/١٢/٠٥هـ" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simplified Withdrawal Request Card Component
function WithdrawalRequestCard({ status, amount, date }: {
  status: 'pending' | 'completed';
  amount: number;
  date: string;
}) {
  const statusConfig = {
    pending: {
      color: 'orange',
      bg: 'bg-orange-50',
      border: 'border-orange-100',
      text: 'text-orange-600',
      label: 'معلق'
    },
    completed: {
      color: 'green',
      bg: 'bg-green-50',
      border: 'border-green-100',
      text: 'text-green-600',
      label: 'مكتمل'
    }
  };

  const config = statusConfig[status];

  return (
    <Card className={`p-4 ${config.bg} ${config.border} shadow-sm`}>
      <div className="flex justify-between items-center">
        <div className={`flex items-center gap-2 ${config.text} text-sm`}>
          <span className={`w-2 h-2 rounded-full bg-${config.color}-500`}></span>
          <span className="font-medium">{config.label}</span>
        </div>
        <div className="text-right">
          <span className="font-bold text-lg">﷼{amount.toLocaleString()}</span>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
    </Card>
  );
}

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Wallet className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            محفظة الأكاديمية
          </span>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;

function FinancialTransactions() {
  const transactions = [
    {
      date: "١٤٤٦/١٢/٢٢هـ",
      type: "إضافة رصيد",
      typeColor: "green",
      product: "-",
      student: "-",
      change: "+1.0",
      after: "81,000,019.8"
    },
    {
      date: "١٤٤٦/١٢/٢٠هـ",
      type: "بيع دورة",
      typeColor: "blue",
      product: "دورة البرمجة المتقدمة",
      student: "أحمد محمد",
      change: "+18.9",
      after: "81,000,018.9"
    },
    {
      date: "١٤٤٦/١٢/١٨هـ",
      type: "بيع دورة",
      typeColor: "blue",
      product: "دورة تصميم الجرافيك",
      student: "فاطمة علي",
      change: "+50",
      after: "81,000,000"
    },
    {
      date: "١٤٤٦/١٢/١٥هـ",
      type: "عمولة شراكة",
      typeColor: "purple",
      product: "برنامج الشراكة",
      student: "سارة أحمد",
      change: "+150",
      after: "80,999,950"
    }
  ];

  return (
    <Card className="p-6 bg-white border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">سجل المعاملات المالية</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50/50">
            <tr className="text-right text-gray-700">
              <th className="px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">التاريخ</th>
              <th className="px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">نوع المعاملة</th>
              <th className="px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">المنتج</th>
              <th className="px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">الطالب</th>
              <th className="px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">التغيير في الرصيد</th>
              <th className="px-4 py-3 font-semibold text-gray-600 border-b border-gray-100">الرصيد</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4 text-gray-900 border-b border-gray-50">{transaction.date}</td>
                <td className="px-4 py-4 border-b border-gray-50">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-${transaction.typeColor}-100 text-${transaction.typeColor}-700`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-600 border-b border-gray-50">{transaction.product}</td>
                <td className="px-4 py-4 text-gray-600 border-b border-gray-50">{transaction.student}</td>
                <td className="px-4 py-4 text-green-600 font-semibold border-b border-gray-50">﷼{transaction.change}</td>
                <td className="px-4 py-4 text-gray-900 font-medium border-b border-gray-50">﷼{transaction.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
