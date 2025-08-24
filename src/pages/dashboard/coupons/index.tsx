import { buttonVariants } from "@/components/ui/button";
import CouponTable from "@/features/coupons/components/CouponTable";
import { CouponStats } from "@/features/coupons/components/CouponStats";
import CouponFilters from "@/features/coupons/components/CouponFilters";
import { CreateCouponModal } from "@/features/coupons/components/CreateCouponModal";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";
import type { Coupon, CreateCouponData } from "@/types/coupon";
import { Plus, Ticket } from "lucide-react";

// بيانات تجريبية للكوبونات
const coupons: Coupon[] = [
  {
    id: 1,
    code: "WELCOME20",
    name: "خصم ترحيبي للعملاء الجدد",
    description: "خصم 20% للعملاء الجدد على أول عملية شراء",
    type: "percentage",
    value: 20,
    minOrderAmount: 100,
    maxDiscount: 200,
    usageLimit: 1000,
    usedCount: 456,
    status: "active",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    applicationType: "general",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
    createdBy: "أحمد محمد",
  },
  {
    id: 2,
    code: "SUMMER50",
    name: "خصم الصيف الكبير",
    description: "خصم 50 ريال على الطلبات التي تزيد عن 300 ريال",
    type: "fixed",
    value: 50,
    minOrderAmount: 300,
    usageLimit: 500,
    usedCount: 234,
    status: "active",
    startDate: "2024-06-01T00:00:00Z",
    endDate: "2024-08-31T23:59:59Z",
    applicationType: "specific",
    applicableProducts: [
      {
        id: 1,
        name: "دورة تطوير المواقع الشاملة",
        type: "course",
        image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png"
      }
    ],
    createdAt: "2024-05-25T09:15:00Z",
    updatedAt: "2024-06-01T12:00:00Z",
    createdBy: "سارة أحمد",
  },
  {
    id: 3,
    code: "STUDENT15",
    name: "خصم الطلاب",
    description: "خصم خاص للطلاب المسجلين في الجامعات",
    type: "percentage",
    value: 15,
    minOrderAmount: 150,
    maxDiscount: 100,
    usageLimit: 2000,
    usedCount: 1876,
    status: "active",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    applicationType: "specific",
    applicableProducts: [
      {
        id: 2,
        name: "جلسة التصميم الإبداعي",
        type: "session",
        image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png"
      }
    ],
    createdAt: "2024-01-01T11:30:00Z",
    updatedAt: "2024-07-10T16:45:00Z",
    createdBy: "محمد علي",
  },
  {
    id: 4,
    code: "FLASH30",
    name: "خصم البرق - منتهي الصلاحية",
    description: "خصم سريع لمدة محدودة",
    type: "percentage",
    value: 30,
    minOrderAmount: 200,
    maxDiscount: 150,
    usageLimit: 100,
    usedCount: 98,
    status: "expired",
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-03-07T23:59:59Z",
    applicationType: "general",
    createdAt: "2024-02-28T14:20:00Z",
    updatedAt: "2024-03-07T23:59:59Z",
    createdBy: "فاطمة الزهراء",
  },
  {
    id: 5,
    code: "VIP100",
    name: "كوبون VIP - غير نشط",
    description: "كوبون خاص للعملاء المميزين",
    type: "fixed",
    value: 100,
    minOrderAmount: 500,
    usageLimit: 50,
    usedCount: 12,
    status: "inactive",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    applicationType: "specific",
    applicableProducts: [
      {
        id: 3,
        name: "كتاب البرمجة المتقدمة",
        type: "digital-product",
        image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png"
      }
    ],
    createdAt: "2024-01-10T08:45:00Z",
    updatedAt: "2024-05-15T13:20:00Z",
    createdBy: "عبدالله الأحمد",
  },
  {
    id: 6,
    code: "MULTI25",
    name: "خصم المنتجات المتعددة",
    type: "percentage",
    value: 25,
    maxDiscount: 300,
    usageLimit: 200,
    usedCount: 87,
    status: "active",
    startDate: "2024-01-01T00:00:00Z",
    endDate: "2024-12-31T23:59:59Z",
    applicationType: "specific",
    applicableProducts: [
      {
        id: 1,
        name: "دورة تطوير المواقع الشاملة",
        type: "course",
        image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png"
      },
      {
        id: 4,
        name: "دورة تصميم الجرافيك",
        type: "course",
        image: "https://i.ibb.co/X4p8fJ3/course-design.png"
      },
      {
        id: 5,
        name: "جلسة التسويق الرقمي",
        type: "session",
        image: "https://i.ibb.co/M6yQzBx/marketing-session.png"
      }
    ],
    createdAt: "2024-02-15T10:30:00Z",
    updatedAt: "2024-08-20T15:45:00Z",
    createdBy: "نورا السالم",
  },
];

function AcademyCoupons() {
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");
  const [table, setTable] = useState<Table<Coupon> | null>(null);

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const matchesStatus =
        selectedStatus === "الكل" || 
        (selectedStatus === "نشط" && coupon.status === "active") ||
        (selectedStatus === "غير نشط" && coupon.status === "inactive") ||
        (selectedStatus === "منتهي الصلاحية" && coupon.status === "expired");

      const matchesType =
        selectedType === "الكل" || 
        (selectedType === "نسبة مئوية" && coupon.type === "percentage") ||
        (selectedType === "مبلغ ثابت" && coupon.type === "fixed");

      const matchesSearch =
        searchTerm === "" ||
        coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coupon.createdBy.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [selectedStatus, selectedType, searchTerm]);

  const handleClearFilters = () => {
    setSelectedStatus("الكل");
    setSelectedType("الكل");
    setSearchTerm("");
  };

  const handleCreateCoupon = (data: CreateCouponData) => {
    console.log("إنشاء كوبون جديد:", data);
    // هنا يمكن إضافة منطق إرسال البيانات إلى الخادم
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Ticket}
        title="إدارة كوبونات الخصم"
        actions={
          <CreateCouponModal 
            onCreateCoupon={handleCreateCoupon}
            trigger={
              <div className={buttonVariants()}>
                <Plus className="w-4 h-4 mr-2" />
                كوبون جديد
              </div>
            }
          />
        }
      />
      <CouponStats coupons={filteredCoupons} />
      <CouponFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearFilters={handleClearFilters}
        table={table}
      />
      <CouponTable coupons={filteredCoupons} onTableReady={setTable} />
    </div>
  );
}

export default AcademyCoupons;
