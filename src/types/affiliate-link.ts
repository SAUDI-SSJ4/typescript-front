/**
 * رابط التسويق بالعمولة
 * يحتوي على جميع المعلومات الخاصة برابط تسويقي واحد
 */
export interface AffiliateLink {
  /** معرف فريد للرابط */
  id: number;
  /** رمز الرابط المخصص للتسويق */
  code: string;
  /** اسم الرابط التسويقي */
  name: string;
  /** وصف اختياري للرابط */
  description?: string;
  /** الرابط الكامل للتسويق */
  url: string;
  /** نسبة العمولة بالمئة (للنوع percentage فقط) */
  commissionRate: number;
  /** نوع العمولة: نسبة مئوية أو مبلغ ثابت */
  commissionType: 'percentage' | 'fixed';
  /** قيمة العمولة (نسبة مئوية أو مبلغ ثابت حسب النوع) */
  commissionValue: number;
  /** عدد النقرات الكلي */
  clickCount: number;
  /** عدد التحويلات (المبيعات) */
  conversionCount: number;
  /** إجمالي العمولة المكتسبة بالريال السعودي */
  totalCommission: number;
  /** حالة الرابط الحالية */
  status: 'active' | 'inactive' | 'expired';
  /** تاريخ بداية صلاحية الرابط */
  startDate: string;
  /** تاريخ انتهاء صلاحية الرابط (أو null للامحدود) */
  endDate: string | null;
  /** نوع الترويج: عام لجميع المنتجات أو خاص بمنتجات محددة */
  promotionType: 'general' | 'specific';
  /** قائمة المنتجات المطبق عليها الرابط (في حالة specific فقط) */
  applicableProducts?: ApplicableProduct[];
  /** تاريخ إنشاء الرابط */
  createdAt: string;
  /** تاريخ آخر تحديث */
  updatedAt: string;
  /** معرف منشئ الرابط */
  createdBy: string;
  /** إعدادات إضافية للرابط */
  settings?: AffiliateLinkSettings;
}

/**
 * منتج قابل للتطبيق عليه رابط تسويقي
 */
export interface ApplicableProduct {
  /** معرف المنتج */
  id: number;
  /** اسم المنتج */
  name: string;
  /** نوع المنتج */
  type: 'course' | 'session' | 'digital-product' | 'workshop' | 'consultation';
  /** صورة المنتج (اختيارية) */
  image?: string;
  /** سعر المنتج */
  price: number;
  /** خصم إضافي للرابط التسويقي */
  additionalDiscount?: number;
}

/**
 * إعدادات إضافية لرابط التسويق
 */
export interface AffiliateLinkSettings {
  /** الحد الأقصى للاستخدام (-1 للامحدود) */
  maxUsage?: number;
  /** عدد مرات الاستخدام الحالي */
  currentUsage?: number;
  /** إرسال تنبيهات عند النقرات */
  emailNotifications?: boolean;
  /** تتبع المصدر الجغرافي للنقرات */
  geoTracking?: boolean;
  /** إعادة التوجيه المخصص */
  customRedirect?: string;
}

/**
 * إحصائيات الروابط التسويقية
 */
export interface AffiliateStats {
  /** إجمالي الروابط */
  totalLinks: number;
  /** الروابط النشطة */
  activeLinks: number;
  /** الروابط المنتهية الصلاحية */
  expiredLinks: number;
  /** الروابط غير النشطة */
  inactiveLinks: number;
  /** إجمالي النقرات */
  totalClicks: number;
  /** إجمالي التحويلات */
  totalConversions: number;
  /** إجمالي العمولة بالريال السعودي */
  totalCommission: number;
  /** معدل التحويل العام */
  conversionRate: number;
  /** متوسط العمولة لكل تحويل */
  averageCommissionPerConversion: number;
}

/**
 * بيانات إنشاء رابط تسويق جديد
 */
export interface CreateAffiliateLinkData {
  /** رمز الرابط المخصص */
  code: string;
  /** اسم الرابط */
  name: string;
  /** وصف الرابط (اختياري) */
  description?: string;
  /** نسبة العمولة */
  commissionRate: number;
  /** نوع العمولة */
  commissionType: 'percentage' | 'fixed';
  /** قيمة العمولة */
  commissionValue: number;
  /** تاريخ البداية */
  startDate: string;
  /** تاريخ النهاية (أو null للامحدود) */
  endDate: string | null;
  /** نوع الترويج */
  promotionType: 'general' | 'specific';
  /** المنتجات المطبق عليها */
  applicableProducts?: ApplicableProduct[];
  /** الإعدادات الإضافية */
  settings?: Partial<AffiliateLinkSettings>;
}

/**
 * بيانات تحديث رابط تسويق موجود
 */
export interface UpdateAffiliateLinkData extends Partial<CreateAffiliateLinkData> {
  /** معرف الرابط */
  id: number;
}

/**
 * بيانات استخدام رابط التسويق بالعمولة
 * تحتوي على تفاصيل كل عملية شراء تمت عبر الرابط
 */
export interface AffiliateLinkUsage {
  /** معرف فريد لعملية الاستخدام */
  id: number;
  /** اسم المسوق بالعمولة */
  affiliateName: string;
  /** اسم العميل */
  customerName: string;
  /** قيمة الطلب */
  orderAmount: number;
  /** قيمة العمولة المكتسبة */
  commissionAmount: number;
  /** تاريخ النقر على الرابط */
  clickDate: string;
  /** تاريخ إتمام الشراء */
  conversionDate: string;
  /** رقم الطلب */
  orderNumber: string;
  /** رمز الرابط المستخدم */
  linkCode: string;
  /** معلومات إضافية عن العميل */
  customerInfo?: {
    email: string;
    phone?: string;
    location?: string;
  };
  /** حالة العمولة */
  commissionStatus: 'pending' | 'approved' | 'paid' | 'cancelled';
  /** تاريخ دفع العمولة */
  paidDate?: string;
}

/**
 * فلاتر البحث في الروابط التسويقية
 */
export interface AffiliateLinkFilters {
  /** البحث النصي */
  search?: string;
  /** فلترة حسب الحالة */
  status?: AffiliateLink['status'] | 'all';
  /** فلترة حسب نوع العمولة */
  commissionType?: AffiliateLink['commissionType'] | 'all';
  /** فلترة حسب نوع الترويج */
  promotionType?: AffiliateLink['promotionType'] | 'all';
  /** فترة تاريخية من */
  dateFrom?: string;
  /** فترة تاريخية إلى */
  dateTo?: string;
  /** الحد الأدنى للعمولة */
  minCommission?: number;
  /** الحد الأعلى للعمولة */
  maxCommission?: number;
}

/**
 * خيارات ترتيب الروابط التسويقية
 */
export type AffiliateLinkSortBy = 
  | 'createdAt' 
  | 'updatedAt' 
  | 'name' 
  | 'code' 
  | 'clickCount' 
  | 'conversionCount' 
  | 'totalCommission'
  | 'status';

export type SortOrder = 'asc' | 'desc';
