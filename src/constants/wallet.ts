import type { TransactionType, TransactionColor } from '@/types/wallet';

// Transaction Type Colors Mapping
export const TRANSACTION_TYPE_COLORS: Record<TransactionType, TransactionColor> = {
  "بيع دورة": "blue",
  "عمولة شراكة": "purple",
  "سحب أرباح": "red",
  "رسوم إدارية": "orange",
  "إضافة رصيد": "green"
};

// Chart Colors
export const CHART_COLORS = {
  REVENUE: {
    WEEKLY: "rgba(59, 130, 246, 0.8)",
    MONTHLY: "rgba(16, 185, 129, 0.8)",
    YEARLY: "rgba(139, 92, 246, 0.8)"
  },
  REVENUE_BORDER: {
    WEEKLY: "rgba(59, 130, 246, 1)",
    MONTHLY: "rgba(16, 185, 129, 1)",
    YEARLY: "rgba(139, 92, 246, 1)"
  },
  EXPENSES: "rgba(239, 68, 68, 0.8)",
  EXPENSES_BORDER: "rgba(239, 68, 68, 1)"
};

// Chart Labels
export const CHART_LABELS = {
  WEEKLY: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
  MONTHLY: ["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة"],
  YEARLY: ["1442هـ", "1443هـ", "1444هـ", "1445هـ", "1446هـ"]
};

// Sample Data
export const SAMPLE_CHART_DATA = {
  WEEKLY: {
    REVENUE: [12000, 19000, 15000, 25000, 22000, 18000, 28000],
    EXPENSES: [2000, 3000, 1500, 4000, 2500, 3500, 5000]
  },
  MONTHLY: {
    REVENUE: [85000, 79000, 95000, 101000, 86000, 92000],
    EXPENSES: [15000, 12000, 18000, 20000, 16000, 14000]
  },
  YEARLY: {
    REVENUE: [580000, 720000, 850000, 920000, 1100000],
    EXPENSES: [120000, 150000, 180000, 200000, 220000]
  }
};

// Pagination
export const ITEMS_PER_PAGE = 10;

// Default Values
export const DEFAULT_VALUES = {
  ACTIVE_TAB: "weekly",
  TRANSACTION_FILTER: "all",
  DATE_RANGE: "this-month",
  CURRENT_PAGE: 1
};

// Status Colors
export const STATUS_COLORS = {
  pending: {
    color: 'orange',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    text: 'text-orange-600',
    label: 'معلق'
  },
  completed: {
    color: 'green',
    bg: 'bg-green-50',
    border: 'border-green-100',
    text: 'text-green-600',
    label: 'مكتمل'
  },
  rejected: {
    color: 'red',
    bg: 'bg-red-50',
    border: 'border-red-100',
    text: 'text-red-600',
    label: 'مرفوض'
  }
};

// Font Configuration
export const FONT_CONFIG = {
  FAMILY: 'Noto Kufi Arabic, sans-serif',
  SIZES: {
    SMALL: 11,
    MEDIUM: 12,
    LARGE: 13,
    EXTRA_LARGE: 14
  }
};