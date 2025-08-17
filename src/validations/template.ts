import { z } from "zod";

export const academyMainMenuSchema = z.object({
  platform_name: z
    .string()
    .min(2, { message: "اسم الأكاديمية يجب أن يكون أكثر من حرفين" })
    .max(100, { message: "اسم الأكاديمية يجب أن يكون أقل من 100 حرف" }),
  logo: z
    .instanceof(File, { message: "شعار الأكاديمية مطلوب" })
    .optional(),
  primary_color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "يجب أن يكون اللون بصيغة صحيحة" }),
  secondary_color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "يجب أن يكون اللون بصيغة صحيحة" }),
  mainTitle: z.string().optional(),
  subTitle: z.string().optional(),
  firstLinkTitle: z.string().optional(),
  firstLinkUrl: z.string().optional(),
  secondLinkTitle: z.string().optional(),
  secondLinkUrl: z.string().optional(),
});

export type AcademyMainMenuForm = z.infer<typeof academyMainMenuSchema>;

export const academyMainSettingsSchema = z.object({
  platform_name: z
    .string()
    .min(2, { message: "اسم الأكاديمية يجب أن يكون أكثر من حرفين" })
    .max(100, { message: "اسم الأكاديمية يجب أن يكون أقل من 100 حرف" })
    .regex(/^[\u0600-\u06FFa-zA-Z0-9\s\-_]+$/, {
      message: "اسم الأكاديمية يجب أن يحتوي على أحرف وأرقام فقط",
    }),
  logo: z
    .instanceof(File, { message: "شعار الأكاديمية مطلوب" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "نوع الملف يجب أن يكون JPEG أو PNG أو WebP" }
    )
    .optional(),
  favicon: z
    .instanceof(File, { message: "أيقونة الأكاديمية مطلوبة" })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "حجم الملف يجب أن يكون أقل من 2 ميجابايت",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "نوع الملف يجب أن يكون JPEG أو PNG أو WebP" }
    )
    .optional(),
  primary_color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "يجب أن يكون اللون بصيغة صحيحة" }),
  secondary_color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "يجب أن يكون اللون بصيغة صحيحة" }),
  subdomain: z
    .string()
    .min(3, { message: "النطاق الفرعي يجب أن يكون 3 أحرف على الأقل" })
    .max(30, { message: "النطاق الفرعي يجب أن يكون 30 حرفًا أو أقل" })
    .regex(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/, {
      message:
        "النطاق الفرعي يجب أن يكون أحرفًا أو أرقامًا صغيرة فقط، ويمكن أن يحتوي على شرطات، ويجب أن يبدأ وينتهي بحرف أو رقم",
    }),
  // Social Media Fields
  facebook: z
    .string()
    .url({ message: "رابط فيسبوك غير صحيح" })
    .optional()
    .or(z.literal("")),
  twitter: z
    .string()
    .url({ message: "رابط تويتر غير صحيح" })
    .optional()
    .or(z.literal("")),
  instagram: z
    .string()
    .url({ message: "رابط إنستغرام غير صحيح" })
    .optional()
    .or(z.literal("")),
  youtube: z
    .string()
    .url({ message: "رابط يوتيوب غير صحيح" })
    .optional()
    .or(z.literal("")),
  linkedin: z
    .string()
    .url({ message: "رابط لينكد إن غير صحيح" })
    .optional()
    .or(z.literal("")),
});
export type AcademyMainSettingsFormData = z.infer<
  typeof academyMainSettingsSchema
>;
export const academyHeroSchema = z.object({
  title: z
    .string()
    .min(2, { message: "العنوان الرئيسي يجب أن يكون أكثر من حرفين" })
    .max(100, { message: "العنوان الرئيسي يجب أن يكون أقل من 100 حرف" }),
  description: z
    .string()
    .min(10, { message: "الوصف يجب أن يكون أكثر من 10 أحرف" })
    .max(500, { message: "الوصف يجب أن يكون أقل من 500 حرف" }),
  first_link_title: z
    .string()
    .min(1, { message: "عنوان الرابط الأول مطلوب" })
    .max(50, { message: "عنوان الرابط الأول يجب أن يكون أقل من 50 حرف" }),
  first_link_url: z
    .string()
    .url({ message: "يجب أن يكون رابط صحيح" })
    .min(1, { message: "رابط الرابط الأول مطلوب" }),
  second_link_title: z
    .string()
    .min(1, { message: "عنوان الرابط الثاني مطلوب" })
    .max(50, { message: "عنوان الرابط الثاني يجب أن يكون أقل من 50 حرف" }),
  second_link_url: z
    .string()
    .url({ message: "يجب أن يكون رابط صحيح" })
    .min(1, { message: "رابط الرابط الثاني مطلوب" }),
  image: z
    .instanceof(File, { message: "الصورة مطلوبة" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "نوع الملف يجب أن يكون JPEG أو PNG أو WebP" }
    )
    .optional(),
});
export type AcademyHeroForm = z.infer<typeof academyHeroSchema>;

export const academyAboutSchema = z.object({
  title: z
    .string()
    .min(2, { message: "العنوان يجب أن يكون أكثر من حرفين" })
    .max(100, { message: "العنوان يجب أن يكون أقل من 100 حرف" }),
  content: z
    .string()
    .min(10, { message: "الوصف يجب أن يكون أكثر من 10 أحرف" })
    .max(1000, { message: "الوصف يجب أن يكون أقل من 1000 حرف" }),
  feature_one: z
    .string()
    .min(1, { message: "السمة الأولى مطلوبة" })
    .max(100, { message: "السمة الأولى يجب أن تكون أقل من 100 حرف" }),
  feature_two: z
    .string()
    .min(1, { message: "السمة الثانية مطلوبة" })
    .max(100, { message: "السمة الثانية يجب أن تكون أقل من 100 حرف" }),
  image: z
    .instanceof(File, { message: "الصورة مطلوبة" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "نوع الملف يجب أن يكون JPEG أو PNG أو WebP" }
    )
    .optional(),
});
export type AcademyAboutForm = z.infer<typeof academyAboutSchema>;
export const studentReviewSchema = z.object({
  student_name: z
    .string()
    .min(1, { message: "اسم الطالب مطلوب" })
    .min(2, { message: "اسم الطالب يجب أن يكون حرفين على الأقل" }),

  comment: z
    .string()
    .min(1, { message: "التعليق مطلوب" })
    .min(10, { message: "التعليق يجب أن يكون 10 أحرف على الأقل" }),

  rating: z
    .number()
    .min(1, { message: "التقييم مطلوب" })
    .max(5, { message: "التقييم يجب أن يكون بين 1 و 5" }),

  image: z
    .string()
    .url({ message: "رابط الصورة غير صحيح" })
    .optional()
    .or(z.literal("")),
});

export type StudentReviewFormData = z.infer<typeof studentReviewSchema>;
export const studentFaqSchema = z.object({
  question: z
    .string()
    .min(1, { message: "السؤال مطلوب" })
    .min(10, { message: "السؤال يجب أن يكون 10 أحرف على الأقل" }),

  answer: z
    .string()
    .min(1, { message: "الإجابة مطلوبة" })
    .min(10, { message: "الإجابة يجب أن تكون 10 أحرف على الأقل" }),
});

export type StudentFaqFormData = z.infer<typeof studentFaqSchema>;
