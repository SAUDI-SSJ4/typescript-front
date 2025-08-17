import { z } from "zod";

// File validation helper
const createImageValidation = (
  maxSizeInMB: number,
  allowedTypes: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ]
) => {
  return z
    .union([z.string(), z.instanceof(File)])
    .optional()
    .refine(
      (file) => {
        if (!file) return true; // Optional field
        if (typeof file === "string") return true; // Base64 string or URL
        return allowedTypes.includes(file.type);
      },
      {
        message: `نوع الملف غير مدعوم. الأنواع المدعومة: ${allowedTypes.join(
          ", "
        )}`,
      }
    )
    .refine(
      (file) => {
        if (!file || typeof file === "string") return true;
        return file.size <= maxSizeInMB * 1024 * 1024;
      },
      {
        message: `حجم الملف كبير جداً. الحد الأقصى ${maxSizeInMB} ميجابايت`,
      }
    );
};

export const userSchema = z.object({
  fname: z
    .string()
    .min(2, "الاسم الأول يجب أن يكون أطول من حرفين")
    .max(50, "الاسم الأول يجب أن يكون أقل من 50 حرف")
    .regex(/^[\u0600-\u06FF\s\w]+$/, "الاسم يجب أن يحتوي على حروف صحيحة فقط"),
  lname: z
    .string()
    .min(2, "اسم العائلة يجب أن يكون أطول من حرفين")
    .max(50, "اسم العائلة يجب أن يكون أقل من 50 حرف")
    .regex(/^[\u0600-\u06FF\s\w]+$/, "الاسم يجب أن يحتوي على حروف صحيحة فقط"),
  email: z
    .string()
    .email("البريد الإلكتروني غير صحيح")
    .min(1, "البريد الإلكتروني مطلوب"),
  phone: z
    .string()
    .min(10, "رقم الهاتف يجب أن يكون على الأقل 10 أرقام")
    .max(15, "رقم الهاتف يجب أن يكون أقل من 15 رقم")
    .regex(/^[+]?[\d\s-()]+$/, "رقم الهاتف غير صحيح"),
  gender: z
    .enum(["male", "female"], {
      errorMap: () => ({ message: "الجنس مطلوب" }),
    }),
  avatar: createImageValidation(
    2, // 2MB max
    ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  ),
  coverImage: z
    .union([z.string(), z.instanceof(File)])
    .optional(),
});

// Separate validation schemas for different use cases
export const userProfileSchema = userSchema.extend({
  coverImage: createImageValidation(
    5, // 5MB max
    ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  ).optional(),
});

export const userRegistrationSchema = userSchema.required({
  fname: true,
  lname: true,
  email: true,
  phone: true,
});

export type UserFormData = z.infer<typeof userSchema>;
export type UserProfileFormData = z.infer<typeof userProfileSchema>;
export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>;
