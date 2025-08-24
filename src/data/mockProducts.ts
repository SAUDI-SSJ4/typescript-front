// بيانات تجريبية للمنتجات
export interface Product {
  id: number;
  name: string;
  type: 'course' | 'session' | 'digital-product';
  image: string;
  price: number;
  category: string;
}

export const mockProducts: Product[] = [
  // دورات تدريبية
  {
    id: 1,
    name: "دورة تطوير المواقع الشاملة",
    type: "course",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 599,
    category: "برمجة"
  },
  {
    id: 2,
    name: "أساسيات التصميم الجرافيكي",
    type: "course",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 399,
    category: "تصميم"
  },
  {
    id: 3,
    name: "دورة التسويق الرقمي المتقدمة",
    type: "course",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 799,
    category: "تسويق"
  },
  {
    id: 4,
    name: "البرمجة بـ React.js",
    type: "course",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 699,
    category: "برمجة"
  },
  
  // جلسات حضورية
  {
    id: 5,
    name: "جلسة التصميم الإبداعي",
    type: "session",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 199,
    category: "تصميم"
  },
  {
    id: 6,
    name: "ورشة إدارة المشاريع",
    type: "session",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 149,
    category: "إدارة"
  },
  {
    id: 7,
    name: "جلسة استراتيجيات النمو",
    type: "session",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 299,
    category: "أعمال"
  },
  
  // منتجات رقمية
  {
    id: 8,
    name: "كتاب البرمجة المتقدمة",
    type: "digital-product",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 99,
    category: "كتب"
  },
  {
    id: 9,
    name: "قوالب التصميم الاحترافية",
    type: "digital-product",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 149,
    category: "قوالب"
  },
  {
    id: 10,
    name: "أدوات الإنتاجية للمطورين",
    type: "digital-product",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 199,
    category: "أدوات"
  },
  {
    id: 11,
    name: "مجموعة الأيقونات الحديثة",
    type: "digital-product",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 79,
    category: "تصميم"
  }
];

export const getProductsByType = (type: 'course' | 'session' | 'digital-product'): Product[] => {
  return mockProducts.filter(product => product.type === type);
};

export const getProductById = (id: number): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};
