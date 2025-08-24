import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Eye } from "lucide-react";

interface Product {
  id: number;
  name: string;
  type: 'course' | 'session' | 'digital-product';
  image?: string;
}

interface CouponProductsModalProps {
  products: Product[];
  couponCode: string;
  trigger?: React.ReactNode;
}

export function CouponProductsModal({ products, couponCode, trigger }: CouponProductsModalProps) {
  const [open, setOpen] = useState(false);

  const productTypeMap = {
    course: "دورة تدريبية",
    session: "جلسة حضورية",
    "digital-product": "منتج رقمي"
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'session':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'digital-product':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            عرض المنتجات
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden" dir="rtl">
        <DialogHeader className="border-b border-gray-100 pb-4">
          <DialogTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            المنتجات المشمولة في الكوبون {couponCode}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              إجمالي المنتجات المشمولة: <span className="font-medium text-blue-600">{products.length}</span>
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-3">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <img
                  src={product.image || "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png"}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <Badge className={`text-xs ${getTypeColor(product.type)}`}>
                    {productTypeMap[product.type as keyof typeof productTypeMap]}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <p>لا توجد منتجات مشمولة في هذا الكوبون</p>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <Button variant="outline" onClick={() => setOpen(false)}>
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}






