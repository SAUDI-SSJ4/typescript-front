import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, CreditCard } from "lucide-react";

function MockPayment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  
  const invoiceId = searchParams.get("invoice_id");
  
  useEffect(() => {
    // Auto-redirect after 3 seconds for demo
    const timer = setTimeout(() => {
      navigate("/dashboard/payment-success?status=paid&transaction_id=" + invoiceId);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [invoiceId, navigate]);

  const handlePaymentSuccess = () => {
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate("/dashboard/payment-success?status=paid&transaction_id=" + invoiceId);
    }, 1500);
  };

  const handlePaymentFailure = () => {
    navigate("/dashboard/payment-success?status=failed&transaction_id=" + invoiceId);
  };

  const handleCancel = () => {
    navigate("/dashboard/shopping-cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-xl font-bold">محاكي دفع ميسر</CardTitle>
          <p className="text-gray-600 text-sm">وضع التطوير - للاختبار فقط</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">معرف الفاتورة:</p>
            <p className="font-mono text-sm break-all">{invoiceId}</p>
          </div>

          <div className="text-center text-sm text-gray-500 mb-4">
            سيتم التوجيه تلقائياً خلال 3 ثوانِ أو يمكنك الاختيار:
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handlePaymentSuccess}
              disabled={processing}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {processing ? "جاري المعالجة..." : "محاكاة دفع ناجح"}
            </Button>
            
            <Button 
              onClick={handlePaymentFailure}
              variant="destructive"
              className="w-full"
            >
              <XCircle className="w-4 h-4 mr-2" />
              محاكاة دفع فاشل
            </Button>
            
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="w-full"
            >
              إلغاء والعودة للسلة
            </Button>
          </div>

          <div className="text-xs text-gray-400 text-center mt-4">
            ⚠️ هذه صفحة للاختبار فقط في وضع التطوير
            <br />
            في الإنتاج سيتم التوجيه إلى ميسر الحقيقي
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MockPayment;

