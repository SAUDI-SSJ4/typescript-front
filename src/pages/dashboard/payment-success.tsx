import { CheckCircle, ShoppingBag, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PaymentAPI, type Payment } from "@/services/payment-api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface PaymentSuccessData {
  invoice?: any;
  payment?: any;
}

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState<PaymentSuccessData | null>(null);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    // Check if we have data from checkout flow
    if (location.state && (location.state.invoice || location.state.payment)) {
      setPaymentData(location.state as PaymentSuccessData);
    } else {
      // Check for transaction ID in URL params (from payment gateway redirect)
      // Moyasar sends both 'id' (UUID) and 'transaction_id' (our DB ID)
      // We should prioritize 'transaction_id' as it's our actual database ID
      const transactionId = searchParams.get('transaction_id') || searchParams.get('payment_id') || searchParams.get('id');
      
      if (transactionId) {
        // Check if it's a valid transaction ID (numeric) or Moyasar UUID
        const parsedId = parseInt(transactionId, 10);
        
        if (isNaN(parsedId)) {
          // If it's not numeric, it might be a Moyasar UUID
          // Check if we have transaction_id parameter
          const dbTransactionId = searchParams.get('transaction_id');
          if (dbTransactionId) {
            const parsedDbId = parseInt(dbTransactionId, 10);
            if (!isNaN(parsedDbId)) {
              console.log("Using transaction_id from URL:", parsedDbId);
              verifyPayment(parsedDbId);
              return;
            }
          }
          
          console.error("Invalid transaction ID:", transactionId);
          toast.error("معرف المعاملة غير صحيح");
          setTimeout(() => {
            navigate("/dashboard/shopping-cart", { 
              state: { 
                error: "معرف المعاملة غير صحيح. يرجى المحاولة مرة أخرى من السلة." 
              } 
            });
          }, 1500);
          return;
        }
        verifyPayment(parsedId);
      } else {
        // No payment data or ID, redirect to cart
        toast.error("لا توجد بيانات دفع للعرض");
        setTimeout(() => {
          navigate("/dashboard/shopping-cart", { 
            state: { 
              error: "لم يتم العثور على معرف المعاملة. يرجى المحاولة مرة أخرى من السلة." 
            } 
          });
        }, 1500);
      }
    }
  }, [location.state, searchParams, navigate]);

  const verifyPayment = async (transactionId: number) => {
    setVerifying(true);
    try {
      const result = await PaymentAPI.verifyPayment(transactionId);
      
      if (result.success) {
        setPaymentData({ payment: result });
      } else {
        // Payment verification failed
        console.error("Payment verification failed:", result.error);
        toast.error(result.error || "فشل في التحقق من حالة الدفع");
        setTimeout(() => {
          navigate("/dashboard/shopping-cart", { 
            state: { 
              error: "فشل في التحقق من عملية الدفع. يرجى المحاولة مرة أخرى أو التواصل مع الدعم الفني.",
              transaction_id: transactionId 
            } 
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      const errorMessage = error instanceof Error ? error.message : "فشل في التحقق من حالة الدفع";
      toast.error(errorMessage);
      setTimeout(() => {
        navigate("/dashboard/shopping-cart", { 
          state: { 
            error: "حدث خطأ أثناء التحقق من عملية الدفع. يرجى المحاولة مرة أخرى.",
            transaction_id: transactionId 
          } 
        });
      }, 2000);
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-md w-full mx-4">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <h3 className="text-lg font-semibold text-gray-900">جاري التحقق من عملية الدفع...</h3>
            <p className="text-gray-600">يرجى الانتظار بينما نتحقق من حالة الدفع</p>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 max-w-md w-full mx-4 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">لم يتم العثور على بيانات الدفع</h3>
          <p className="text-gray-600 mb-6">لا توجد معلومات عن عملية الدفع</p>
          <Button 
            onClick={() => navigate("/dashboard/shopping-cart")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            العودة إلى السلة
          </Button>
        </div>
      </div>
    );
  }

  const isPaymentSuccessful = paymentData.payment?.payment_status === 'completed' || 
                             paymentData.payment?.status === 'completed' ||
                             paymentData.payment?.status === 'paid' ||
                             paymentData.payment?.success === true;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className={`text-center py-8 px-6 ${isPaymentSuccessful ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isPaymentSuccessful ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <CheckCircle className={`w-8 h-8 ${isPaymentSuccessful ? 'text-green-600' : 'text-red-600'}`} />
            </div>
            <h1 className={`text-2xl font-bold mb-2 ${isPaymentSuccessful ? 'text-green-900' : 'text-red-900'}`}>
              {isPaymentSuccessful ? 'تم الدفع بنجاح!' : 'فشل في عملية الدفع'}
            </h1>
            <p className={`${isPaymentSuccessful ? 'text-green-700' : 'text-red-700'}`}>
              {isPaymentSuccessful 
                ? 'تم إتمام عملية الشراء بنجاح. يمكنك الآن الوصول إلى المحتوى المشترى'
                : 'لم تتم عملية الدفع بنجاح. يرجى المحاولة مرة أخرى'
              }
            </p>
          </div>

          {/* Payment Details */}
          <div className="p-6 space-y-6">
            {/* Invoice Information */}
            {paymentData.invoice && (
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الفاتورة</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">رقم الفاتورة:</span>
                    <div className="font-medium">{paymentData.invoice.invoice_number || paymentData.invoice.id}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">المبلغ:</span>
                    <div className="font-medium text-blue-600">
                      {paymentData.invoice.total_amount} {paymentData.invoice.currency || 'SAR'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">حالة الفاتورة:</span>
                    <div className="font-medium">{paymentData.invoice.status}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">تاريخ الإنشاء:</span>
                    <div className="font-medium">
                      {new Date(paymentData.invoice.created_at).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Information */}
            {paymentData.payment && (
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">تفاصيل الدفع</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">رقم المعاملة:</span>
                    <div className="font-medium font-mono text-xs">
                      {paymentData.payment.transaction_id || paymentData.payment.payment_id || paymentData.payment.id}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">طريقة الدفع:</span>
                    <div className="font-medium">{paymentData.payment.payment_gateway || 'ميسر'}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">حالة الدفع:</span>
                    <div className={`font-medium ${
                      isPaymentSuccessful ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isPaymentSuccessful ? 'مكتمل' : 'فشل'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">تاريخ المعالجة:</span>
                    <div className="font-medium">
                      {paymentData.payment.processed_at || paymentData.payment.verified_at
                        ? new Date(paymentData.payment.processed_at || paymentData.payment.verified_at).toLocaleDateString('ar-SA')
                        : new Date().toLocaleDateString('ar-SA')
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Purchased Items */}
            {(paymentData.invoice?.items || paymentData.payment?.enrollment_result?.items) && (paymentData.invoice?.items?.length > 0 || paymentData.payment?.enrollment_result?.items?.length > 0) && (
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">العناصر المشتراة</h3>
                <div className="space-y-3">
                  {(paymentData.invoice?.items || paymentData.payment?.enrollment_result?.items || []).map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{item.course_title || item.title || 'عنصر مشترى'}</div>
                      </div>
                      <div className="font-semibold text-blue-600">
                        {item.course_price || item.price || 'N/A'} {paymentData.invoice?.currency || 'SAR'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isPaymentSuccessful ? (
                <>
                  <Button 
                    onClick={() => navigate("/dashboard/my-courses")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    مشاهدة الكورسات
                  </Button>
                  <Button 
                    onClick={() => navigate("/dashboard/purchases")}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    عرض المشتريات
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => navigate("/dashboard/shopping-cart")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    العودة إلى السلة
                  </Button>
                  <Button 
                    onClick={() => navigate("/")}
                    variant="outline"
                    className="flex-1"
                  >
                    العودة للرئيسية
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {isPaymentSuccessful && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">معلومات مهمة:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• يمكنك الوصول للمحتوى المشترى من صفحة "المواد التعليمية"</li>
              <li>• في حالة وجود مشاكل، يرجى التواصل مع الدعم الفني</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentSuccess;

