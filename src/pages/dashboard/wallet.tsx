import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";
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
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
            borderRadius: 4,
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
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
            borderRadius: 4,
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
            borderColor: "rgba(59, 130, 246, 1)",
            borderWidth: 1,
            borderRadius: 4,
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
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: "white",
          bodyColor: "white",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 1,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            callback: function (value: number | string) {
              return value + " ﷼";
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header with Tabs */}
            <div className="border-b border-gray-200">
              <h1 className="text-center text-2xl font-bold text-blue-600 mb-4">
                الإيراد
              </h1>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3 rounded-none bg-transparent">
                  <TabsTrigger
                    value="yearly"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none"
                  >
                    السنة السابقة
                  </TabsTrigger>
                  <TabsTrigger
                    value="monthly"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none"
                  >
                    شهري
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekly"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none rounded-none bg-blue-100 text-blue-700"
                  >
                    أسبوعي
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Income/Expense Overview */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    المصروفات الشهرية
                  </h3>
                  <p className="text-3xl font-bold mt-1 flex items-center">
                    <span>﷼</span>
                    <span className="mr-1">0</span>
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">
                    الإيرادات الشهرية
                  </h3>
                  <p className="text-3xl font-bold mt-1 flex items-center text-right">
                    <span>﷼</span>
                    <span className="mr-1">81,000,019.8</span>
                    <span className="text-green-500 text-sm font-medium mr-2">
                      +0.5%
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 text-right">
                    مقارنة بالشهر السابق
                  </p>
                </div>
              </div>
              <div className="mt-8 mb-4">
                <h4 className="mb-4 font-bold">طلبات سحب معتمدة</h4>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsContent value="weekly" className="h-full">
                    <Bar data={chartData.weekly} options={chartOptions} />
                  </TabsContent>
                  <TabsContent value="monthly" className="h-full">
                    <Bar data={chartData.monthly} options={chartOptions} />
                  </TabsContent>
                  <TabsContent value="yearly" className="h-full">
                    <Bar data={chartData.yearly} options={chartOptions} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <FinancialTransactions />
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Balance Overview */}
            <Card className="p-6 text-right shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="flex items-center justify-between mb-4">
                <Wallet className="w-8 h-8 text-blue-600" />
                <h2 className="text-gray-600 text-lg font-semibold">
                  رصيد المحفظة
                </h2>
              </div>
              <div className="flex items-center justify-end mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  81,000,019.8
                </span>
                <span className="mr-2 text-2xl text-gray-700">﷼</span>
              </div>
              <div className="flex items-center justify-end gap-4 mb-6">
                <p className="text-green-500 text-sm font-medium">
                  <span>+%0.5</span>
                  <span className="mr-1">الفوائد الشهرية</span>
                </p>
                <div className="flex items-center text-green-500">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <WithdrawalModal availableBalance={81000019.8} />
            </Card>

            {/* Credit Card Visualization */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white p-8 shadow-xl">
              <div className="absolute top-4 right-4">
                <div className="flex space-x-2">
                  <div className="w-8 h-6 bg-white bg-opacity-80 rounded"></div>
                  <div className="w-12 h-8 bg-white bg-opacity-60 rounded-md"></div>
                </div>
              </div>
              <div className="absolute top-4 left-4">
                <Wallet className="w-8 h-8 opacity-70" />
              </div>
              <div className="mt-12">
                <h3 className="text-xl font-medium opacity-90 mb-2">
                  محفظة الأكاديمية
                </h3>
                <p className="text-4xl font-bold tracking-wider mb-8">
                  <span className="text-2xl">﷼</span>
                  <span className="mr-2">81,000,019.8</span>
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div className="opacity-70">
                  <p className="text-sm">رقم المحفظة</p>
                  <p className="font-mono text-lg tracking-wider">
                    1890 **** **** ****
                  </p>
                </div>
                <div className="text-right opacity-70">
                  <p className="text-sm">تاريخ الانتهاء</p>
                  <p className="font-mono text-lg">12/29</p>
                </div>
              </div>
            </div>
            {/* Withdrawal Requests */}
            <div>
              <h2 className="text-xl font-bold mb-4">طلبات سحب الأرباح</h2>
              <div className="space-y-3">
                <Card className="p-4 border-orange-200 bg-orange-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-orange-600 text-sm gap-2">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      <span className="font-medium">معلق</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg">﷼1,111</span>
                      <span className="text-sm text-gray-500 block">
                        طلب سحب الأرباح
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">١٤٤٦/١٢/١٣هـ</div>
                  </div>
                </Card>
                <Card className="p-4 border-green-200 bg-green-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-green-600 text-sm gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="font-medium">مكتمل</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg">﷼5,000</span>
                      <span className="text-sm text-gray-500 block">
                        سحب الأرباح
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">١٤٤٦/١٢/١٠هـ</div>
                  </div>
                </Card>
                <Card className="p-4 border-green-200 bg-green-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-green-600 text-sm gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span className="font-medium">مكتمل</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg">﷼2,500</span>
                      <span className="text-sm text-gray-500 block">
                        سحب الأرباح
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm">١٤٤٦/١٢/٠٥هـ</div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;

function FinancialTransactions() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">سجل المعاملات المالية</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-right text-gray-700">
                <th className="px-4 py-4 font-semibold">التاريخ</th>
                <th className="px-4 py-4 font-semibold">نوع المعاملة</th>
                <th className="px-4 py-4 font-semibold">المنتج</th>
                <th className="px-4 py-4 font-semibold">الطالب</th>
                <th className="px-4 py-4 font-semibold">قبل</th>
                <th className="px-4 py-4 font-semibold">التغيير</th>
                <th className="px-4 py-4 font-semibold">بعد</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-gray-900">١٤٤٦/١٢/٢٢هـ</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    إضافة رصيد
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-500">-</td>
                <td className="px-4 py-4 text-gray-500">-</td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  ﷼81,000,018.9
                </td>
                <td className="px-4 py-4 text-green-600 font-bold">+﷼1.0</td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  ﷼81,000,019.8
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-gray-900">١٤٤٦/١٢/٢٠هـ</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    بيع دورة
                  </span>
                </td>
                <td className="px-4 py-4 text-blue-600">
                  دورة البرمجة المتقدمة
                </td>
                <td className="px-4 py-4 text-gray-900">أحمد محمد</td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  ﷼81,000,000
                </td>
                <td className="px-4 py-4 text-green-600 font-bold">+﷼18.9</td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  ﷼81,000,018.9
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-gray-900">١٤٤٦/١٢/١٨هـ</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    بيع دورة
                  </span>
                </td>
                <td className="px-4 py-4 text-blue-600">دورة تصميم الجرافيك</td>
                <td className="px-4 py-4 text-gray-900">فاطمة علي</td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  ﷼80,999,950
                </td>
                <td className="px-4 py-4 text-green-600 font-bold">+﷼50</td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  ﷼81,000,000
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 text-gray-900">١٤٤٦/١٢/١٥هـ</td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    عمولة شراكة
                  </span>
                </td>
                <td className="px-4 py-4 text-orange-600">برنامج الشراكة</td>
                <td className="px-4 py-4 text-gray-900">سارة أحمد</td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  ﷼80,999,800
                </td>
                <td className="px-4 py-4 text-green-600 font-bold">+﷼150</td>
                <td className="px-4 py-4 text-gray-900 font-medium">
                  ﷼80,999,950
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
