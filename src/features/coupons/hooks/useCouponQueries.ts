import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { couponService } from "../services/couponService";
import type { Coupon, CreateCouponData } from "@/types/coupon";
import { toast } from "sonner";

// بيانات تجريبية للكوبونات (للاختبار)
const mockCoupons: Coupon[] = [
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
];

// الحصول على جميع الكوبونات (بيانات تجريبية فقط حالياً)
export const useCoupons = () => {
  // إرجاع البيانات التجريبية مباشرة بدون API calls
  return {
    data: mockCoupons,
    isLoading: false,
    error: null,
    isSuccess: true,
    isError: false,
  };
};

// الحصول على كوبون واحد
export const useCoupon = (id: number) => {
  return useQuery({
    queryKey: ["coupons", id],
    queryFn: () => couponService.getCoupon(id),
    enabled: !!id,
  });
};

// الحصول على إحصائيات الكوبونات (بيانات تجريبية فقط حالياً)
export const useCouponStats = () => {
  // إرجاع البيانات التجريبية مباشرة بدون API calls
  return {
    data: {
      totalCoupons: 2,
      activeCoupons: 2,
      inactiveCoupons: 0,
      expiredCoupons: 0,
      totalUsage: 690,
      averageUsage: 345,
      totalDiscount: 45600,
      averageDiscount: 22800,
    },
    isLoading: false,
    error: null,
    isSuccess: true,
    isError: false,
  };
};

// إنشاء كوبون جديد
export const useCreateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponService.createCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("تم إنشاء الكوبون بنجاح");
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الكوبون";
      toast.error(errorMessage);
    },
  });
};

// تحديث كوبون
export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateCouponData> }) =>
      couponService.updateCoupon(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      queryClient.invalidateQueries({ queryKey: ["coupons", id] });
      toast.success("تم تحديث الكوبون بنجاح");
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء تحديث الكوبون";
      toast.error(errorMessage);
    },
  });
};

// حذف كوبون
export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponService.deleteCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("تم حذف الكوبون بنجاح");
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء حذف الكوبون";
      toast.error(errorMessage);
    },
  });
};

// تغيير حالة الكوبون
export const useUpdateCouponStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: 'active' | 'inactive' }) =>
      couponService.updateCouponStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      queryClient.invalidateQueries({ queryKey: ["coupons", id] });
      toast.success("تم تحديث حالة الكوبون بنجاح");
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء تحديث حالة الكوبون";
      toast.error(errorMessage);
    },
  });
};

// نسخ كوبون
export const useDuplicateCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: couponService.duplicateCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success("تم نسخ الكوبون بنجاح");
    },
    onError: (error: Error | unknown) => {
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء نسخ الكوبون";
      toast.error(errorMessage);
    },
  });
};
