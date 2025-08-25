import { useState } from "react";
import { Plus, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateCouponModal } from "@/features/coupons/components/CreateCouponModal";
import { CouponTable } from "@/features/coupons/components/CouponTable";
import { CouponStats } from "@/features/coupons/components/CouponStats";
import { CouponFilters } from "@/features/coupons/components/CouponFilters";
import { useCoupons } from "@/features/coupons/hooks/useCouponQueries";
import type { Coupon } from "@/types/coupon";

export default function CouponsPage() {
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: coupons = [] } = useCoupons();
  
  // فلترة الكوبونات
  const filteredCoupons = coupons.filter((coupon: Coupon) => {
    const matchesStatus = selectedStatus === "الكل" || 
      (selectedStatus === "نشط" && coupon.status === "active") ||
      (selectedStatus === "غير نشط" && coupon.status === "inactive") ||
      (selectedStatus === "منتهي الصلاحية" && coupon.status === "expired");

    const matchesType = selectedType === "الكل" ||
      (selectedType === "نسبة مئوية" && coupon.type === "percentage") ||
      (selectedType === "مبلغ ثابت" && coupon.type === "fixed");

    const matchesSearch = searchTerm === "" ||
      coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  const handleClearFilters = () => {
    setSelectedStatus("الكل");
    setSelectedType("الكل");
    setSearchTerm("");
  };

  return (
    <div className="p-6 space-y-6">
      {/* العنوان وأزرار التحكم */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة الكوبونات</h1>
          <p className="text-gray-600 mt-1">
            إنشاء وإدارة كوبونات الخصم للعملاء
          </p>
        </div>
        <CreateCouponModal
          trigger={
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              إنشاء كوبون جديد
            </Button>
          }
          onCreateCoupon={(data) => {
            console.log("New coupon data:", data);
          }}
        />
      </div>

      {/* إحصائيات الكوبونات */}
      <CouponStats coupons={coupons} />

      {/* فلاتر الكوبونات */}
      <CouponFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearFilters={handleClearFilters}
      />

      {/* رسالة إذا لم توجد نتائج بعد الفلترة */}
      {coupons.length > 0 && filteredCoupons.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-blue-800">
            <Ticket className="w-12 h-12 mx-auto text-blue-300 mb-3" />
            <h3 className="text-lg font-medium mb-2">لا توجد نتائج</h3>
            <p className="text-blue-600 mb-4">
              لا توجد كوبونات تطابق معايير البحث المحددة
            </p>
            <Button onClick={handleClearFilters} variant="outline" className="gap-2">
              مسح الفلاتر
            </Button>
          </div>
        </div>
      )}

      {/* جدول الكوبونات */}
      {filteredCoupons.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border-0">
          <CouponTable
            coupons={filteredCoupons}
            onTableReady={() => {}}
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border-0 p-8 text-center">
          <div className="text-gray-500">
            <Ticket className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد كوبونات</h3>
            <p className="text-gray-600 mb-4">ابدأ بإنشاء كوبونات خصم لجذب العملاء</p>
            <CreateCouponModal
              trigger={
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  إنشاء كوبون جديد
                </Button>
              }
              onCreateCoupon={(data) => {
                console.log("New coupon data:", data);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
