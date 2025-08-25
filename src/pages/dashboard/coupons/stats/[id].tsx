import { useParams } from "react-router-dom";
import { ArrowLeft, TrendingUp, Users, DollarSign, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCoupon } from "@/features/coupons/hooks/useCouponQueries";

export default function CouponStatsPage() {
  const { id } = useParams();
  const couponId = parseInt(id || "0");

  const { data: coupon, isLoading: couponLoading } = useCoupon(couponId);

  if (couponLoading) {
    return (
      <div className="p-6">
        <div className="text-center">جاري التحميل...</div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">لم يتم العثور على الكوبون</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* رأس الصفحة */}
      <div className="flex items-center gap-4">
        <Link to="/dashboard/coupons">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            العودة للكوبونات
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            إحصائيات الكوبون: {coupon.code}
          </h1>
          <p className="text-gray-600 mt-1">{coupon.name}</p>
        </div>
      </div>

      {/* معلومات الكوبون الأساسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">نوع الخصم</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {coupon.type === "percentage" ? `${coupon.value}%` : `${coupon.value} ر.س`}
              </p>
            </div>
            <div className="text-blue-600">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">عدد الاستخدامات</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {coupon.usedCount}
              </p>
            </div>
            <div className="text-green-600">
              <Users className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الحد الأقصى</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {coupon.usageLimit || "∞"}
              </p>
            </div>
            <div className="text-purple-600">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الحالة</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {coupon.status === "active" ? "نشط" : 
                 coupon.status === "inactive" ? "غير نشط" : "منتهي"}
              </p>
            </div>
            <div className="text-orange-600">
              <Calendar className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* تفاصيل إضافية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الكوبون</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">الوصف:</span>
              <span className="text-gray-900">{coupon.description || "لا يوجد وصف"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الحد الأدنى للطلب:</span>
              <span className="text-gray-900">
                {coupon.minOrderAmount ? `${coupon.minOrderAmount} ر.س` : "لا يوجد حد أدنى"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الحد الأقصى للخصم:</span>
              <span className="text-gray-900">
                {coupon.maxDiscount ? `${coupon.maxDiscount} ر.س` : "لا يوجد حد أقصى"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">نوع التطبيق:</span>
              <span className="text-gray-900">
                {coupon.applicationType === "general" ? "عام" : "خاص بمنتجات معينة"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">تواريخ الكوبون</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">تاريخ البداية:</span>
              <span className="text-gray-900">
                {new Date(coupon.startDate).toLocaleDateString("ar-SA")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">تاريخ الانتهاء:</span>
              <span className="text-gray-900">
                {new Date(coupon.endDate).toLocaleDateString("ar-SA")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">تاريخ الإنشاء:</span>
              <span className="text-gray-900">
                {new Date(coupon.createdAt).toLocaleDateString("ar-SA")}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">آخر تحديث:</span>
              <span className="text-gray-900">
                {new Date(coupon.updatedAt).toLocaleDateString("ar-SA")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* المنتجات المشمولة */}
      {coupon.applicableProducts && coupon.applicableProducts.length > 0 && (
        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">المنتجات المشمولة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coupon.applicableProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <img
                  src={product.image || "https://via.placeholder.com/50x50"}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.type === "course" ? "دورة" :
                     product.type === "session" ? "جلسة" : "منتج رقمي"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
