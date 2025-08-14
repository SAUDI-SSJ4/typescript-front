import { ShoppingBag, Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { PaymentAPI, type PurchaseHistory } from "@/services/payment-api";
import { toast } from "sonner";

function Purchases() {
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async (reset = true) => {
    if (reset) {
      setLoading(true);
      setPage(0);
    } else {
      setLoadingMore(true);
    }

    try {
      const currentPage = reset ? 0 : page;
      const response = await PaymentAPI.getEnrollmentHistory(currentPage * 10, 10);
      
      if (reset) {
        setPurchaseHistory(response);
      } else {
        setPurchaseHistory(prev => prev ? {
          ...response,
          purchases: [...prev.purchases, ...response.purchases]
        } : response);
      }
      
      setPage(currentPage + 1);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      toast.error("فشل في تحميل المشتريات");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (purchaseHistory && purchaseHistory.purchases.length < purchaseHistory.total) {
      fetchPurchases(false);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "مكتمل":
        return "bg-green-100 text-green-700";
      case "failed":
      case "فشل":
        return "bg-red-100 text-red-700";
      case "pending":
      case "قيد الانتظار":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "مكتمل";
      case "failed":
        return "فشل";
      case "pending":
        return "قيد الانتظار";
      default:
        return status;
    }
  };

  const getTypeLabel = (type: string) => {
    return type === "course" ? "دورة تعليمية" : "منتج رقمي";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Header />
        
        {/* Mobile Card Skeletons */}
        <div className="block lg:hidden space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>

        {/* Desktop Table Skeleton */}
        <div className="hidden lg:block">
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!purchaseHistory || purchaseHistory.purchases.length === 0) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد مشتريات</h3>
          <p className="text-gray-600 mb-6">لم تقم بشراء أي منتجات بعد</p>
          <Button 
            onClick={() => window.location.href = "/"}
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

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {purchaseHistory.purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
          >
            <div className="flex items-start gap-3">
              <img
                src={purchase.course_image || "/api/placeholder/64/48"}
                alt={purchase.course_title}
                className="w-16 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 line-clamp-2">{purchase.course_title}</div>
                <Badge variant="outline" className="text-xs mt-1">
                  {getTypeLabel(purchase.type)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img
                  src={purchase.academy_logo || "/api/placeholder/24/24"}
                  alt={purchase.academy_name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">{purchase.academy_name}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">{formatDate(purchase.purchase_date)}</div>
                <div className="font-semibold text-blue-600">{purchase.price} {purchase.currency}</div>
              </div>
              
              <div className="flex justify-end">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                  {getStatusLabel(purchase.status)}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Load More Button for Mobile */}
        {purchaseHistory.purchases.length < purchaseHistory.total && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              variant="outline"
              className="w-full max-w-sm"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  جاري التحميل...
                </>
              ) : (
                'تحميل المزيد'
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border border-gray-200 bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-b border-gray-200">
              <TableHead className="text-right font-semibold text-gray-700 py-4">الصورة</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">المنتج</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">النوع</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">المُنشئ</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">تاريخ الشراء</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">السعر</TableHead>
              <TableHead className="text-right font-semibold text-gray-700 py-4">الحالة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseHistory.purchases.map((purchase) => (
              <TableRow key={purchase.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <TableCell className="text-right py-4">
                  <img 
                    src={purchase.course_image || "/api/placeholder/64/40"} 
                    alt={purchase.course_title}
                    className="w-16 h-10 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="font-medium text-gray-900 line-clamp-1">{purchase.course_title}</div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <Badge variant="outline" className="text-xs">
                    {getTypeLabel(purchase.type)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src={purchase.academy_logo || "/api/placeholder/24/24"} 
                      alt={purchase.academy_name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-600">{purchase.academy_name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="text-sm text-gray-600">{formatDate(purchase.purchase_date)}</div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <div className="font-semibold text-blue-600">{purchase.price} {purchase.currency}</div>
                </TableCell>
                <TableCell className="text-right py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(purchase.status)}`}>
                    {getStatusLabel(purchase.status)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {/* Load More Button for Desktop */}
        {purchaseHistory.purchases.length < purchaseHistory.total && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              variant="outline"
              className="w-full"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  جاري التحميل...
                </>
              ) : (
                `تحميل المزيد (${purchaseHistory.purchases.length} من ${purchaseHistory.total})`
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Purchases;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <ShoppingBag className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            المشتريات
          </span>
        </div>
      </div>
    </div>
  );
}