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
import PaymentIcon from "@/components/payment/PaymentIcons";

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

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

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleApplePayCheckout = async () => {
    try {
      // Check if Apple Pay is available
      if (!window.ApplePaySession || !window.ApplePaySession.canMakePayments()) {
        toast.error("Apple Pay غير متاح على هذا الجهاز");
        return;
      }

      const totalAmount = total;
      const token = localStorage.getItem('token');
      
      // Create Apple Pay payment request
      const request = {
        countryCode: 'SA',
        currencyCode: 'SAR',
        supportedNetworks: ['visa', 'masterCard', 'amex', 'mada'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: 'SAYAN Academy',
          amount: totalAmount.toString(),
          type: 'final'
        }
      };

      const session = new window.ApplePaySession(3, request);

      session.onvalidatemerchant = async (event) => {
        try {
          const validationResponse = await fetch('/api/v1/payment/apple-pay/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              validationURL: event.validationURL,
              merchantIdentifier: 'merchant.com.sayan.applepay'
            })
          });

          const validation = await validationResponse.json();
          if (validation.success) {
            session.completeMerchantValidation(validation.data);
          } else {
            session.abort();
            toast.error("فشل في التحقق من Apple Pay");
          }
        } catch {
          session.abort();
          toast.error("خطأ في التحقق من Apple Pay");
        }
      };

      session.onpaymentauthorized = async (event) => {
        try {
          const paymentResponse = await fetch('/api/v1/payment/apple-pay/process', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              token: event.payment.token,
              amount: totalAmount,
              currency: 'SAR',
              orderId: `order_${Date.now()}`
            })
          });

          const result = await paymentResponse.json();
          
          if (result.success) {
            session.completePayment(window.ApplePaySession!.STATUS_SUCCESS);
            toast.success("تم الدفع بنجاح!");
            // Clear cart and redirect
            clearCart();
            window.location.href = '/dashboard/payment-success';
          } else {
            session.completePayment(window.ApplePaySession!.STATUS_FAILURE);
            toast.error("فشل في معالجة الدفع");
          }
        } catch {
          session.completePayment(window.ApplePaySession!.STATUS_FAILURE);
          toast.error("خطأ في معالجة الدفع");
        }
      };

      session.begin();
    } catch (error) {
      console.error('Apple Pay error:', error);
      toast.error("خطأ في Apple Pay");
    }
  };

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error("السلة فارغة");
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("يرجى اختيار وسيلة دفع");
      return;
    }

    setProcessingCheckout(true);
    try {
      // Handle Apple Pay differently
      if (selectedPaymentMethod === 'applepay') {
        await handleApplePayCheckout();
        setProcessingCheckout(false);
        return;
      }
      
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

  const renderPaymentMethods = () => {
    const paymentMethods = [
      {
        id: 'applepay',
        name: 'Apple Pay',
        nameAr: 'Apple Pay',
        icon: 'applepay',
        description: 'المحفظة الرقمية من آبل - سريعة وآمنة',
        color: 'bg-black hover:bg-gray-800',
        textColor: 'text-white'
      },
      {
        id: 'creditcard',
        name: 'Credit/Debit Cards',
        nameAr: 'بطاقات الائتمان/الخصم',
        icon: 'creditcard',
        description: 'فيزا، ماستركارد، أمريكان إكسبريس، مدى',
        color: 'bg-blue-600 hover:bg-blue-700',
        textColor: 'text-white'
      }
    ];

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">اختر وسيلة الدفع</h4>
        <div className="grid gap-3">
          {paymentMethods.map((method) => {
            const isSelected = selectedPaymentMethod === method.id;
            
            return (
              <button
                key={method.id}
                onClick={() => handlePaymentMethodSelect(method.id)}
                className={`
                  flex items-center p-4 rounded-lg border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center mr-4
                  ${method.color}
                `}>
                  <PaymentIcon 
                    type={method.icon as 'applepay' | 'creditcard'} 
                    className={method.textColor}
                  />
                </div>
                <div className="flex-1 text-right">
                  <h5 className="font-semibold text-gray-900 mb-1">{method.nameAr}</h5>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
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
          {items.map((item) => (
            <div key={item.cart_id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex items-start gap-4">
                <RemoteImage
                  src={item.item_details.image_url}
                  alt={item.item_details.title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1 truncate">
                        {item.item_details.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {item.item_details.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.item_details.type)}`}>
                          {getTypeLabel(item.item_details.type)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {item.item_details.academy_name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="font-semibold text-gray-900 mb-1">
                        {item.item_details.price} {currency}
                      </div>
                      {item.item_details.original_price && item.item_details.original_price > item.item_details.price && (
                        <div className="text-sm text-gray-500 line-through">
                          {item.item_details.original_price} {currency}
                        </div>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(item.cart_id)}
                        className="text-red-600 border-red-300 hover:bg-red-50 mt-2"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

            {/* Payment Methods Section */}
            {renderPaymentMethods()}

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
                disabled={processingCheckout || items.length === 0 || isAcademyUser() || !selectedPaymentMethod}
                onClick={handleCheckout}
              >
                {processingCheckout ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    جاري المعالجة...
                  </>
                ) : (
                  `الدفع بـ ${selectedPaymentMethod === 'applepay' ? 'Apple Pay' : 'بطاقة ائتمان/خصم'}`
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
