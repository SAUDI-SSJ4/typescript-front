import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CreditCard, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Directions } from "@/constants/enums";
import { formatCurrency } from "@/lib/formatters";

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return formatCurrency(price);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Clear cart and redirect
    clearCart();
    setIsProcessing(false);

    // Navigate to success page or dashboard
    navigate("/dashboard", {
      state: { message: "تم إتمام الشراء بنجاح!" },
    });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8" dir={Directions.RTL}>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h1>
          <p className="text-muted-foreground mb-6">
            أضف بعض الدورات إلى سلة التسوق للمتابعة إلى الدفع.
          </p>
          <Link to="/courses">
            <Button>تصفح الدورات</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir={Directions.RTL}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">الدفع</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.cart_id} className="flex gap-4">
                    <img
                      src={item.item_details.image_url || '/placeholder-course.jpg'}
                      alt={item.item_details.title}
                      className="w-16 h-16 object-contain bg-gray-50 rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-2">
                        {item.item_details.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        المحاضر: {item.item_details.instructor_name || 'غير محدد'}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm">الكمية: 1</span>
                        <span className="font-semibold">
                          {formatPrice(item.item_details.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>المجموع الفرعي:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الضريبة:</span>
                    <span>{formatPrice(totalPrice * 0.1)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>الإجمالي:</span>
                    <span>{formatPrice(totalPrice * 1.1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  معلومات الدفع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      <Input id="firstName" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">اسم العائلة</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" required />
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">رقم البطاقة</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">تاريخ الانتهاء</Label>
                      <Input id="expiry" placeholder="MM/YY" required />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">عنوان الفواتير</Label>
                    <Textarea id="address" rows={3} required />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        "جاري المعالجة..."
                      ) : (
                        <span className="flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          إتمام الشراء - {formatPrice(totalPrice * 1.1)}
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
              <Lock className="h-4 w-4 inline ml-1" />
              معلومات الدفع آمنة ومشفرة
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
