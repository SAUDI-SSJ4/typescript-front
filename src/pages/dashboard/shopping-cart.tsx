import { ShoppingCart as ShoppingCartIcon, Trash2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useShoppingCart } from "@/store/shopping-cart";
import { PaymentAPI } from "@/services/payment-api";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import RemoteImage from "@/components/shared/RemoteImage";

function ShoppingCart() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    items, 
    loading, 
    total, 
    count, 
    currency,
    removeItem, 
    clearCart, 
    fetchCart 
  } = useShoppingCart();

  const [discountCode, setDiscountCode] = useState("");
  const [processingCheckout, setProcessingCheckout] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Check for payment error from navigation state
  useEffect(() => {
    if (location.state?.error) {
      setPaymentError(location.state.error);
      toast.error(location.state.error);
      // Clear the error from navigation state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Check if user is academy (not allowed to purchase)
  const isAcademyUser = () => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (!token) return false;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user_type === 'academy';
    } catch {
      return false;
    }
  };

  const handleRemoveItem = async (cartId: string) => {
    await removeItem(cartId);
  };

  const handleClearCart = async () => {
    if (window.confirm("هل أنت متأكد من رغبتك في مسح جميع العناصر من السلة؟")) {
      await clearCart();
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("السلة فارغة");
      return;
    }

    setProcessingCheckout(true);
    try {
      
      // 271: Process checkout with custom success and back URLs for payment gateway
      const checkoutResponse = await PaymentAPI.processCheckout({
        coupon_code: discountCode || undefined,
        success_url: `${window.location.origin}/dashboard/payment-success`,
        back_url: `${window.location.origin}/dashboard/shopping-cart`,
      });

      
      // style: look for redirect_url directly in response
      if (checkoutResponse.redirect_url) {

        
        toast.success("تم إنشاء فاتورة الدفع! سيتم توجيهك لبوابة الدفع...");
        
        // Go directly to Moyasar like style
        window.location.href = checkoutResponse.redirect_url;
      } else {

        toast.error("لم يتم الحصول على رابط الدفع من بوابة الدفع");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "فشل في معالجة الطلب");
    } finally {
      setProcessingCheckout(false);
    }
  };

  const getTotalOriginalPrice = () => {
    return items.reduce((total, item) => total + (item.item_details.original_price || item.item_details.price), 0);
  };

  const getSavings = () => {
    // حساب الخصم الحقيقي للعناصر التي لديها خصم
    return items.reduce((totalSavings, item) => {
      const originalPrice = item.item_details.original_price || item.item_details.price;
      const currentPrice = item.item_details.price;
      return totalSavings + (originalPrice > currentPrice ? originalPrice - currentPrice : 0);
    }, 0);
  };



  const getTypeLabel = (type: string) => {
    return type === "course" ? "دورة تعليمية" : "منتج رقمي";
  };

  const getTypeColor = (type: string) => {
    return type === "course" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700";
  };



  if (loading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <div className="lg:col-span-1">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingCartIcon className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">السلة فارغة</h3>
          <p className="text-gray-600 mb-6">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
          {isAcademyUser() && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md">
              <p className="text-blue-800 text-sm">
                💡 <strong>ملاحظة:</strong> سلة التسوق مخصصة للطلاب فقط. كصاحب أكاديمية، يمكنك إنشاء وإدارة الدورات من لوحة التحكم.
              </p>
            </div>
          )}
          <Button 
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            تصفح المنتجات
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header />

      {/* Payment Error Alert */}
      {paymentError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-red-800 font-semibold mb-1">فشل في عملية الدفع</h4>
              <p className="text-red-700 text-sm">{paymentError}</p>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPaymentError(null)}
                  className="text-red-700 border-red-300 hover:bg-red-100"
                >
                  إغلاق
                </Button>
                {location.state?.transaction_id && (
                  <Button
                    size="sm"
                    onClick={() => navigate(`/dashboard/payment-success?transaction_id=${location.state.transaction_id}`)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    إعادة المحاولة
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <div key={`${item.cart_id}-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex">
                {/* Item Image */}
                <div className="w-32 h-24 relative overflow-hidden">
                  <RemoteImage
                    src={item.item_details.image_url || "courses/default-course.jpg"}
                    alt={item.item_details.title}
                    className="w-full h-full object-cover"
                    onError={() => {
                      console.error("Failed to load image:", item.item_details.image_url);
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.item_details.type)}`}>
                      {getTypeLabel(item.item_details.type)}
                    </span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-1 mb-2">
                        {item.item_details.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {item.item_details.type === "course" ? (
                          <>
                            {item.item_details.academy_name && (
                              <span className="text-blue-600">
                                {item.item_details.academy_name}
                              </span>
                            )}
                            {item.item_details.instructor_name && (
                              <span>{item.item_details.instructor_name}</span>
                            )}
                            {item.item_details.duration && (
                              <span>{item.item_details.duration}</span>
                            )}
                            {item.item_details.rating && (
                              <span>{item.item_details.rating} ⭐</span>
                            )}
                            {item.item_details.students_count && (
                              <span>{item.item_details.students_count} طالب</span>
                            )}
                          </>
                        ) : (
                          <>
                            {item.item_details.academy_name && (
                              <span className="text-purple-600">
                                {item.item_details.academy_name}
                              </span>
                            )}
                            {item.item_details.rating && (
                              <span>{item.item_details.rating} ⭐</span>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.cart_id)}
                        className="text-red-600 hover:bg-red-50"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                      <div className="text-right">
                        <span className="text-lg font-bold text-blue-600">
                          {item.item_details.price} {currency}
                        </span>
                        {item.item_details.original_price && item.item_details.original_price > item.item_details.price && (
                          <div className="text-sm text-gray-500 line-through">
                            {item.item_details.original_price} {currency}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Clear Cart Button */}
          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 border-red-300 hover:bg-red-50"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              مسح السلة
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص الطلب</h3>
            
            {/* Discount Code Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كود الخصم
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="أدخل كود الخصم"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  className="px-4 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  تطبيق
                </Button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">عدد العناصر:</span>
                <span className="font-medium">{count}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">المجموع:</span>
                <span className="font-medium">{getTotalOriginalPrice()} {currency}</span>
              </div>
              {getSavings() > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>الخصم:</span>
                  <span className="font-medium">-{getSavings()} {currency}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>المجموع الكلي:</span>
                  <span className="text-blue-600">{total || getTotalOriginalPrice() - getSavings()} {currency}</span>
                </div>
              </div>

            </div>



            <div className="space-y-3">
              {isAcademyUser() && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <p className="text-amber-800 text-sm text-center">
                    ⚠️ أصحاب الأكاديميات لا يمكنهم الشراء. سلة التسوق مخصصة للطلاب فقط.
                  </p>
                </div>
              )}
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-medium rounded-lg"
                disabled={processingCheckout || items.length === 0 || isAcademyUser()}
                onClick={handleCheckout}
              >
                {processingCheckout ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    جاري المعالجة...
                  </>
                ) : (
                  isAcademyUser() ? 'غير متاح لأصحاب الأكاديميات' : 'الدفع الآن'
                )}
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-3 font-medium rounded-lg"
                onClick={() => navigate("/")}
              >
                متابعة التسوق
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <ShoppingCartIcon className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            سلة التسوق
          </span>
        </div>
      </div>
    </div>
  );
}
