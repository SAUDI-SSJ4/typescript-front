import { z } from "zod";

// Trainer form validation schema
export const trainerSchema = z.object({
  name: z
    .string()
    .min(2, "اسم المدرب يجب أن يكون أكثر من حرفين")
    .max(100, "اسم المدرب يجب أن يكون أقل من 100 حرف"),

  email: z
    .string()
    .email("يرجى إدخال بريد إلكتروني صحيح")
    .min(1, "البريد الإلكتروني مطلوب"),

  phone: z
    .string()
    .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
    .max(15, "رقم الهاتف يجب أن يكون أقل من 15 رقم")
    .regex(/^[0-9+\-\s()]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),

  image: z
    .any()
    .optional()
    .refine((file) => {
      if (!file) return true; // Optional field
      return file instanceof File;
    }, "يجب أن تكون الصورة ملف صحيح")
    .refine((file) => {
      if (!file) return true;
      return file.size <= 5 * 1024 * 1024; // 5MB
    }, "حجم الصورة يجب أن يكون أقل من 5 ميجابايت")
    .refine((file) => {
      if (!file) return true;
      return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.type
      );
    }, "نوع الصورة يجب أن يكون JPEG, PNG, JPG, أو WebP"),
});

export type ITrainerForm = z.infer<typeof trainerSchema>;
