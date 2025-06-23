import { z } from "zod";

export const academyMainSettingsSchema = z.object({
  academyName: z
    .string()
    .min(2, { message: "اسم الأكاديمية يجب أن يكون أكثر من حرفين" })
    .max(100, { message: "اسم الأكاديمية يجب أن يكون أقل من 100 حرف" })
    .regex(/^[\u0600-\u06FFa-zA-Z0-9\s\-_]+$/, {
      message: "اسم الأكاديمية يجب أن يحتوي على أحرف وأرقام فقط",
    }),
  academyLogo: z
    .instanceof(File, { message: "شعار الأكاديمية مطلوب" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "نوع الملف يجب أن يكون JPEG أو PNG أو WebP" }
    ),
  academyIcon: z
    .instanceof(File, { message: "أيقونة الأكاديمية مطلوبة" })
    .refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "حجم الملف يجب أن يكون أقل من 2 ميجابايت",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      { message: "نوع الملف يجب أن يكون JPEG أو PNG أو WebP" }
    ),
  primaryColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "يجب أن يكون اللون بصيغة صحيحة" }),
  secondaryColor: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "يجب أن يكون اللون بصيغة صحيحة" }),
});
export type AcademyMainSettingsFormData = z.infer<
  typeof academyMainSettingsSchema
>;
export const academyMainMenuSchema = z.object({
  mainTitle: z
    .string()
    .min(2, { message: "العنوان الرئيسي يجب أن يكون أكثر من حرفين" })
    .max(100, { message: "العنوان الرئيسي يجب أن يكون أقل من 100 حرف" }),
  subTitle: z
    .string()
    .min(2, { message: "العنوان الفرعي يجب أن يكون أكثر من حرفين" })
    .max(150, { message: "العنوان الفرعي يجب أن يكون أقل من 150 حرف" }),
  description: z
    .string()
    .min(10, { message: "الوصف يجب أن يكون أكثر من 10 أحرف" })
    .max(500, { message: "الوصف يجب أن يكون أقل من 500 حرف" }),
  firstLinkTitle: z
    .string()
    .min(1, { message: "عنوان الرابط الأول مطلوب" })
    .max(50, { message: "عنوان الرابط الأول يجب أن يكون أقل من 50 حرف" }),
  firstLinkUrl: z
    .string()
    .url({ message: "يجب أن يكون رابط صحيح" })
    .min(1, { message: "رابط الرابط الأول مطلوب" }),
  secondLinkTitle: z
    .string()
    .min(1, { message: "عنوان الرابط الثاني مطلوب" })
    .max(50, { message: "عنوان الرابط الثاني يجب أن يكون أقل من 50 حرف" }),
  secondLinkUrl: z
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
    ),
});
export type AcademyMainMenuForm = z.infer<typeof academyMainMenuSchema>;
export const academyAboutSchema = z.object({
  title: z
    .string()
    .min(2, { message: "العنوان يجب أن يكون أكثر من حرفين" })
    .max(100, { message: "العنوان يجب أن يكون أقل من 100 حرف" }),
  subtitle: z
    .string()
    .min(2, { message: "العنوان الفرعي يجب أن يكون أكثر من حرفين" })
    .max(150, { message: "العنوان الفرعي يجب أن يكون أقل من 150 حرف" }),
  description: z
    .string()
    .min(10, { message: "الوصف يجب أن يكون أكثر من 10 أحرف" })
    .max(1000, { message: "الوصف يجب أن يكون أقل من 1000 حرف" }),
  featureOne: z
    .string()
    .min(1, { message: "السمة الأولى مطلوبة" })
    .max(100, { message: "السمة الأولى يجب أن تكون أقل من 100 حرف" }),
  featureTwo: z
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
    ),
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
