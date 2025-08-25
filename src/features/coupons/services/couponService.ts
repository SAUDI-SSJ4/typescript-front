import { api } from "@/lib/axios";
import type { Coupon, CreateCouponData, CouponStats } from "@/types/coupon";

export const couponService = {
  // الحصول على جميع الكوبونات
  getCoupons: async (): Promise<Coupon[]> => {
    const response = await api.get("/coupons");
    return response.data.data;
  },

  // الحصول على كوبون واحد
  getCoupon: async (id: number): Promise<Coupon> => {
    const response = await api.get(`/coupons/${id}`);
    return response.data.data;
  },

  // إنشاء كوبون جديد
  createCoupon: async (data: CreateCouponData): Promise<Coupon> => {
    const response = await api.post("/coupons", data);
    return response.data.data;
  },

  // تحديث كوبون
  updateCoupon: async (id: number, data: Partial<CreateCouponData>): Promise<Coupon> => {
    const response = await api.put(`/coupons/${id}`, data);
    return response.data.data;
  },

  // حذف كوبون
  deleteCoupon: async (id: number): Promise<void> => {
    await api.delete(`/coupons/${id}`);
  },

  // تغيير حالة الكوبون
  updateCouponStatus: async (id: number, status: 'active' | 'inactive'): Promise<Coupon> => {
    const response = await api.patch(`/coupons/${id}/status`, { status });
    return response.data.data;
  },

  // الحصول على إحصائيات الكوبونات
  getCouponStats: async (): Promise<CouponStats> => {
    const response = await api.get("/coupons/stats");
    return response.data.data;
  },

  // الحصول على إحصائيات كوبون معين
  getCouponStatsById: async (id: number): Promise<unknown> => {
    const response = await api.get(`/coupons/${id}/stats`);
    return response.data.data;
  },

  // نسخ كوبون
  duplicateCoupon: async (id: number): Promise<Coupon> => {
    const response = await api.post(`/coupons/${id}/duplicate`);
    return response.data.data;
  },

  // التحقق من صحة كوبون
  validateCoupon: async (code: string, orderAmount: number): Promise<unknown> => {
    const response = await api.post("/coupons/validate", { code, orderAmount });
    return response.data.data;
  },
};
