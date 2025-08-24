import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "ar" | "en";

type Dictionary = Record<string, string>;

interface LanguageContextValue {
  lang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const dictionaries: Record<Language, Dictionary> = {
    ar: {
      "dashboard.title": "لوحة التحكم",
      "search.placeholder": "ابحث...",
      "sidebar.dashboard": "لوحة التحكم",
      "sidebar.profile": "الملف الشخصي",
      "sidebar.content-management": "ادارة المحتوى",
      "sidebar.courses": "الدورات التدريبية",
      "sidebar.sessions": "الجلسات الخصوصية",
      "sidebar.appointments": "إدارة المواعيد",
      "sidebar.certificates-editing": "تحرير الشهادات",
      "sidebar.digital-products": "المنتجات الرقمية",
      "sidebar.product-packages": "حزم المنتجات",
      "sidebar.blogs": "المدونات",
      "sidebar.student-information": "معلومات الطلاب",
      "sidebar.student-data": "بيانات الطلاب",
      "sidebar.exams": "الاختبارات",
      "sidebar.certificates-management": "الشهادات",
      "sidebar.comments": "التعليقات",
      "sidebar.student-certificates": "شهادات الطلاب",
      "sidebar.student-questions": "أسئلة الطلاب",
      "sidebar.student-chat": "محادثات الطلاب",
      "sidebar.academy-interface-editing": "تعديل واجهات الأكاديمية",
      "sidebar.template": "الاعدادات الرئيسية",
      "sidebar.main-menu": "القسم الرئيسي",
      "sidebar.about": "قسم من نحن",
      "sidebar.student-reviews": "تقييمات الطلاب",
      "sidebar.faqs": "الأسئلة الشائعة",
      "sidebar.ai-learning-materials": "المواد التعليمية الذكية",
      "sidebar.wallet": "المحفظة",
      "sidebar.users": "إدارة المستخدمين",
      "sidebar.trainers": "ادارة المدربين",
      "sidebar.menu": "القائمة",
      "sidebar.visit-academy": "زيارة الأكاديمية",
      "sidebar.back-home": "العودة للرئيسية",
      "chip.soon": "قريباً",
      "add.header": "إضافة عنصر جديد",
      "add.blog.title": "مدونة جديدة",
      "add.blog.desc": "أنشئ مقال جديد لمشاركة المعرفة",
      "add.course.title": "دورة جديدة",
      "add.course.desc": "إنشاء دورة تدريبية شاملة",
      "add.session.title": "جلسة مباشرة",
      "add.session.desc": "جدولة جلسة تدريبية مباشرة",
      "add.product.title": "منتج رقمي",
      "add.product.desc": "إضافة منتج رقمي للبيع",
      "add.bundle.title": "حزمة منتجات",
      "add.bundle.desc": "إنشاء حزمة من المنتجات المختلفة",
      "user.profile": "الملف الشخصي",
      "user.settings": "الإعدادات",
      "user.help": "المساعدة والدعم",
      "user.logout": "تسجيل الخروج",
      "user.preview": "معاينة الأكاديمية",
      "notifications.title": "الإشعارات",
      "notifications.markAll": "تعيين الكل كمقروء",
      "notifications.tab.all": "الكل",
      "notifications.tab.read": "المقروء",
      "notifications.empty": "لا توجد إشعارات",
      "notifications.emptyRead": "لا توجد إشعارات مقروءة",
      "notif.course": "دورة جديدة متاحة",
      "notif.course.msg": "تم إضافة دورة React المتقدمة إلى منصتك",
      "notif.upload": "تم إكمال التحميل",
      "notif.upload.msg": "تم تحميل الفيديو الجديد بنجاح",
      "notif.student": "طالب جديد مسجل",
      "notif.student.msg": "انضم طالب جديد إلى دورة JavaScript الأساسية",
      "notif.appointment": "موعد استشارة قريب",
      "notif.appointment.msg": "لديك موعد استشارة بعد ساعة واحدة",
      "notif.review": "تقييم جديد",
      "notif.review.msg": "تم إضافة تقييم 5 نجوم لدورة CSS",
      "time.5m": "منذ 5 دقائق",
      "time.15m": "منذ 15 دقيقة",
      "time.30m": "منذ 30 دقيقة",
      "time.1h": "منذ ساعة",
      "time.2h": "منذ ساعتين",
    },
    en: {
      "dashboard.title": "Dashboard",
      "search.placeholder": "Search...",
      "sidebar.dashboard": "Dashboard",
      "sidebar.profile": "Profile",
      "sidebar.content-management": "Content Management",
      "sidebar.courses": "Courses",
      "sidebar.sessions": "Sessions",
      "sidebar.appointments": "Appointments",
      "sidebar.certificates-editing": "Certificates Editing",
      "sidebar.digital-products": "Digital Products",
      "sidebar.product-packages": "Product Packages",
      "sidebar.blogs": "Blogs",
      "sidebar.student-information": "Students Information",
      "sidebar.student-data": "Students Data",
      "sidebar.exams": "Exams",
      "sidebar.certificates-management": "Certificates",
      "sidebar.comments": "Comments",
      "sidebar.student-certificates": "Student Certificates",
      "sidebar.student-questions": "Student Questions",
      "sidebar.student-chat": "Student Chat",
      "sidebar.academy-interface-editing": "Academy UI Editing",
      "sidebar.template": "Main Settings",
      "sidebar.main-menu": "Main Menu",
      "sidebar.about": "About Section",
      "sidebar.student-reviews": "Student Reviews",
      "sidebar.faqs": "FAQs",
      "sidebar.ai-learning-materials": "AI Learning Materials",
      "sidebar.wallet": "Wallet",
      "sidebar.users": "Users Management",
      "sidebar.trainers": "Trainers Management",
      "sidebar.menu": "Menu",
      "sidebar.visit-academy": "Visit Academy",
      "sidebar.back-home": "Back to Home",
      "chip.soon": "Coming soon",
      "add.header": "Add New Item",
      "add.blog.title": "New Blog",
      "add.blog.desc": "Create a new article to share knowledge",
      "add.course.title": "New Course",
      "add.course.desc": "Create a comprehensive training course",
      "add.session.title": "Live Session",
      "add.session.desc": "Schedule a live training session",
      "add.product.title": "Digital Product",
      "add.product.desc": "Add a digital product for sale",
      "add.bundle.title": "Product Bundle",
      "add.bundle.desc": "Create a bundle of different products",
      "user.profile": "Profile",
      "user.settings": "Settings",
      "user.help": "Help & Support",
      "user.logout": "Sign out",
      "user.preview": "Preview Academy",
      "notifications.title": "Notifications",
      "notifications.markAll": "Mark all as read",
      "notifications.tab.all": "All",
      "notifications.tab.read": "Read",
      "notifications.empty": "No notifications",
      "notifications.emptyRead": "No read notifications",
      "notif.course": "New course available",
      "notif.course.msg": "Advanced React course has been added to your platform",
      "notif.upload": "Upload completed",
      "notif.upload.msg": "New video uploaded successfully",
      "notif.student": "New student registered",
      "notif.student.msg": "A new student joined the JavaScript Basics course",
      "notif.appointment": "Upcoming consultation",
      "notif.appointment.msg": "You have a consultation in one hour",
      "notif.review": "New review",
      "notif.review.msg": "A 5-star review was added to the CSS course",
      "time.5m": "5 minutes ago",
      "time.15m": "15 minutes ago",
      "time.30m": "30 minutes ago",
      "time.1h": "1 hour ago",
      "time.2h": "2 hours ago",
    },
  };
  const [lang, setLang] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem("lang");
      if (stored === "ar" || stored === "en") return stored;
    } catch {}
    return "ar";
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {}
    const root = document.documentElement;
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLanguage: setLang,
      toggleLanguage: () => setLang((prev) => (prev === "ar" ? "en" : "ar")),
      t: (key: string, fallback?: string) => {
        const dict = dictionaries[lang] || {};
        return dict[key] ?? fallback ?? key;
      },
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}


