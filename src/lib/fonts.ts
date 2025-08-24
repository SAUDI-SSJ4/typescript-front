// ملف مساعد للخطوط
// Font Helper File

export const FONT_FAMILIES = {
  primary: 'Kaff',
  secondary: 'Dubai', 
  fallback: 'Amiri',
  arabic: 'Noto Sans Arabic',
  display: 'Cairo',
  body: 'Almarai',
  decorative: 'Baloo Bhaijaan 2'
} as const;

export const FONT_WEIGHTS = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800
} as const;

// CSS classes للخطوط
export const FONT_CLASSES = {
  // الخط الأساسي
  primary: 'font-kaff',
  
  // خطوط إضافية
  dubai: 'font-dubai',
  amiri: 'font-amiri',
  noto: 'font-noto',
  cairo: 'font-cairo',
  almarai: 'font-almarai',
  baloo: 'font-baloo',
  
  // أوزان الخط
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold'
} as const;

// دالة مساعدة لتطبيق الخط والوزن
export const getFontClass = (
  family: keyof typeof FONT_CLASSES = 'primary',
  weight: keyof typeof FONT_CLASSES = 'normal'
): string => {
  const fontFamily = FONT_CLASSES[family];
  const fontWeight = FONT_CLASSES[weight];
  return `${fontFamily} ${fontWeight}`;
};

// إعدادات الخط للمكونات المختلفة
export const FONT_CONFIGS = {
  heading: {
    h1: 'font-kaff font-bold text-3xl md:text-4xl lg:text-5xl',
    h2: 'font-kaff font-semibold text-2xl md:text-3xl lg:text-4xl',
    h3: 'font-kaff font-semibold text-xl md:text-2xl lg:text-3xl',
    h4: 'font-kaff font-medium text-lg md:text-xl lg:text-2xl',
    h5: 'font-kaff font-medium text-base md:text-lg lg:text-xl',
    h6: 'font-kaff font-medium text-sm md:text-base lg:text-lg'
  },
  body: {
    large: 'font-kaff font-normal text-lg',
    normal: 'font-kaff font-normal text-base',
    small: 'font-kaff font-normal text-sm',
    xs: 'font-kaff font-normal text-xs'
  },
  button: {
    primary: 'font-kaff font-semibold',
    secondary: 'font-kaff font-medium',
    outline: 'font-kaff font-medium'
  },
  form: {
    label: 'font-kaff font-medium text-sm',
    input: 'font-kaff font-normal text-base',
    error: 'font-kaff font-normal text-sm text-red-600',
    helper: 'font-kaff font-normal text-xs text-gray-500'
  }
} as const;

export type FontFamily = keyof typeof FONT_FAMILIES;
export type FontWeight = keyof typeof FONT_WEIGHTS;
export type FontClass = keyof typeof FONT_CLASSES;
