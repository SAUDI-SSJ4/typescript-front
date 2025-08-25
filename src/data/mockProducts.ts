export interface Product {
  id: number;
  name: string;
  type: 'course' | 'session' | 'digital-product';
  image?: string;
  price?: number;
  description?: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "دورة تطوير المواقع الشاملة",
    type: "course",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 299,
    description: "دورة شاملة لتعلم تطوير المواقع من الصفر"
  },
  {
    id: 2,
    name: "جلسة التصميم الإبداعي",
    type: "session",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 150,
    description: "جلسة فردية مع مصمم محترف"
  },
  {
    id: 3,
    name: "كتاب البرمجة المتقدمة",
    type: "digital-product",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 89,
    description: "كتاب إلكتروني شامل في البرمجة"
  },
  {
    id: 4,
    name: "دورة تصميم الجرافيك",
    type: "course",
    image: "https://i.ibb.co/X4p8fJ3/course-design.png",
    price: 199,
    description: "تعلم أساسيات التصميم الجرافيكي"
  },
  {
    id: 5,
    name: "جلسة التسويق الرقمي",
    type: "session",
    image: "https://i.ibb.co/M6yQzBx/marketing-session.png",
    price: 200,
    description: "استشارة في التسويق الرقمي"
  },
  {
    id: 6,
    name: "دورة الذكاء الاصطناعي",
    type: "course",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 399,
    description: "مقدمة في الذكاء الاصطناعي والتعلم الآلي"
  },
  {
    id: 7,
    name: "جلسة تطوير الأعمال",
    type: "session",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 250,
    description: "استشارة في تطوير الأعمال"
  },
  {
    id: 8,
    name: "دليل إدارة المشاريع",
    type: "digital-product",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 75,
    description: "دليل شامل في إدارة المشاريع"
  },
  {
    id: 9,
    name: "دورة التصوير الفوتوغرافي",
    type: "course",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 179,
    description: "تعلم فن التصوير الفوتوغرافي"
  },
  {
    id: 10,
    name: "جلسة الكتابة الإبداعية",
    type: "session",
    image: "https://i.ibb.co/Zzr165m4/Chat-GPT-Image-8-2025-04-06-00.png",
    price: 120,
    description: "جلسة في الكتابة الإبداعية"
  }
];
