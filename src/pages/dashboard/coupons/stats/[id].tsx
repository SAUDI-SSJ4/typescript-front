import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import CouponFilters from "@/features/coupons/components/CouponFilters";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Coupon } from "@/types/coupon";
import { 
  ArrowLeft, 
  BarChart3, 
  Calendar,
  Users,
  BarChart,
  DollarSign,
} from "lucide-react";

// نوع البيانات لاستخدام الكوبون
interface CouponUsage {
  id: number;
  studentName: string;
  orderAmount: number;
  discountAmount: number;
  usedAt: string;
  orderNumber: string;
}

// بيانات تجريبية لاستخدام الكوبون
const couponUsageData: CouponUsage[] = [
  {
    id: 1,
    studentName: "أحمد محمد علي",
    orderAmount: 500,
    discountAmount: 100,
    usedAt: "2024-01-15T14:30:00Z",
    orderNumber: "ORD-001234"
  },
  {
    id: 2,
    studentName: "فاطمة الزهراء",
    orderAmount: 300,
    discountAmount: 60,
    usedAt: "2024-01-14T10:15:00Z",
    orderNumber: "ORD-001235"
  },
  {
    id: 3,
    studentName: "محمد السعيد",
    orderAmount: 750,
    discountAmount: 150,
    usedAt: "2024-01-13T16:45:00Z",
    orderNumber: "ORD-001236"
  },
  {
    id: 4,
    studentName: "نورا أحمد",
    orderAmount: 200,
    discountAmount: 40,
    usedAt: "2024-01-12T12:20:00Z",
    orderNumber: "ORD-001237"
  },
  {
    id: 5,
    studentName: "علي حسن",
    orderAmount: 450,
    discountAmount: 90,
    usedAt: "2024-01-11T09:10:00Z",
    orderNumber: "ORD-001238"
  },
  {
    id: 6,
    studentName: "سارة أحمد",
    orderAmount: 600,
    discountAmount: 120,
    usedAt: "2024-01-16T08:20:00Z",
    orderNumber: "ORD-001239"
  },
  {
    id: 7,
    studentName: "خالد يوسف",
    orderAmount: 350,
    discountAmount: 70,
    usedAt: "2024-01-16T10:45:00Z",
    orderNumber: "ORD-001240"
  },
  {
    id: 8,
    studentName: "مريم عبدالله",
    orderAmount: 400,
    discountAmount: 80,
    usedAt: "2024-01-16T15:30:00Z",
    orderNumber: "ORD-001241"
  }
];

// بيانات الكوبون التجريبية
const couponData: Coupon = {
  id: 1,
  code: "WELCOME20",
  name: "خصم ترحيبي للعملاء الجدد",
  type: "percentage",
  value: 20,
  usageLimit: 1000,
  usedCount: 456,
  status: "active",
  startDate: "2024-01-01T00:00:00Z",
  endDate: "2024-12-31T23:59:59Z",
  applicationType: "general",
  createdAt: "2024-01-01T10:00:00Z",
  updatedAt: "2024-01-15T14:30:00Z",
  createdBy: "أحمد محمد"
};

// مكون بطاقات الإحصائيات المخصص
const CouponStatsCards = ({ usageData }: { usageData: CouponUsage[] }) => {
  // حساب الإحصائيات
  const today = new Date().toDateString();
  const todayUsage = usageData.filter(usage => 
    new Date(usage.usedAt).toDateString() === today
  ).length;
  
  const currentUsage = usageData.length;
  const totalUsage = 456; // المجموع الكلي للكوبون
  const totalRevenue = usageData.reduce((sum, usage) => sum + usage.orderAmount, 0);

  const StatCard = ({ title, value, icon, color }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }) => (
    <div className="bg-white rounded-lg border-0 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={color}>{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="استخدامات الكوبون اليوم"
        value={todayUsage}
        icon={<Calendar className="w-8 h-8" />}
        color="text-orange-600"
      />
      <StatCard
        title="استخدامات الكوبون هذا الشهر"
        value={currentUsage}
        icon={<Users className="w-8 h-8" />}
        color="text-blue-600"
      />
      <StatCard
        title="إجمالي استخدامات الكوبون"
        value={totalUsage}
        icon={<BarChart className="w-8 h-8" />}
        color="text-purple-600"
      />
      <StatCard
        title="إجمالي الإيرادات"
        value={`${totalRevenue.toLocaleString()} ر.س`}
        icon={<DollarSign className="w-8 h-8" />}
        color="text-green-600"
      />
    </div>
  );
};

export default function CouponStatsPage() {
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsage = useMemo(() => {
    return couponUsageData.filter((usage) =>
      usage.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usage.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleClearFilters = () => {
    setSelectedStatus("الكل");
    setSelectedType("الكل");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardPageHeader
        icon={BarChart3}
        title={`إحصائيات الكوبون: ${couponData.code}`}
        actions={
          <Link to="/dashboard/coupons">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة للكوبونات
            </Button>
          </Link>
        }
      />



      {/* إحصائيات الاستخدام */}
      <CouponStatsCards usageData={couponUsageData} />

      {/* فلاتر البحث */}
      <CouponFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearFilters={handleClearFilters}
        
      />

      {/* جدول استخدامات الكوبون */}
      <div className="w-full">
        {/* Mobile Card View */}
        <div className="block lg:hidden space-y-4">
          {filteredUsage?.length ? (
            filteredUsage.map((usage) => (
              <div
                key={usage.id}
                className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm leading-5 text-right">
                      {usage.studentName}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 text-right">
                      {usage.orderNumber}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{usage.orderAmount.toLocaleString()} ر.س</span>
                  </div>
                  <div className="text-sm text-green-600">
                    <span className="font-medium">{usage.discountAmount.toLocaleString()} ر.س</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {new Date(usage.usedAt).toLocaleDateString("ar-SA")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد استخدامات.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block rounded-lg border-0 shadow-sm bg-white overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b border-gray-200">
                <TableHead className="text-right font-semibold text-gray-700 py-4">الطالب</TableHead>
                <TableHead className="text-right font-semibold text-gray-700 py-4">رقم الطلب</TableHead>
                <TableHead className="text-right font-semibold text-gray-700 py-4">قيمة الطلب</TableHead>
                <TableHead className="text-right font-semibold text-gray-700 py-4">مبلغ الخصم</TableHead>
                <TableHead className="text-right font-semibold text-gray-700 py-4">تاريخ الاستخدام</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsage?.length ? (
                filteredUsage.map((usage) => (
                  <TableRow
                    key={usage.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-right py-4">
                      <div className="font-medium text-gray-900">{usage.studentName}</div>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {usage.orderNumber}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <span className="font-medium">{usage.orderAmount.toLocaleString()} ر.س</span>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <span className="font-medium text-green-600">
                        {usage.discountAmount.toLocaleString()} ر.س
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4">
                      <span className="text-sm text-gray-600">
                        {new Date(usage.usedAt).toLocaleDateString("ar-SA")} - {new Date(usage.usedAt).toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-24 text-center text-gray-500"
                  >
                    لا توجد استخدامات.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
