export interface Coupon {
  id: number;
  code: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  status: 'active' | 'inactive' | 'expired';
  startDate: string;
  endDate: string;
  applicationType: 'general' | 'specific'; // عام أو خاص بمنتج
  applicableProducts?: {
    id: number;
    name: string;
    type: 'course' | 'session' | 'digital-product';
    image?: string;
  }[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CouponStats {
  totalCoupons: number;
  activeCoupons: number;
  expiredCoupons: number;
  totalUsage: number;
  totalSavings: number;
}

export interface CreateCouponData {
  code: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  startDate: string;
  endDate: string;
  applicationType: 'general' | 'specific';
  applicableProducts?: {
    id: number;
    name: string;
    type: 'course' | 'session' | 'digital-product';
    image?: string;
  }[];
}
