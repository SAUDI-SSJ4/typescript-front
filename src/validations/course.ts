import * as z from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "عنوان المادة مطلوب" })
    .min(5, { message: "عنوان المادة يجب أن يكون 5 أحرف على الأقل" }),

  category: z.string().min(1, { message: "الفئة مطلوبة" }),

  type: z.string().min(1, { message: "نوع المادة مطلوب" }),

  instructor: z.string().min(1, { message: "المدرب مطلوب" }),

  level: z.string().min(1, { message: "مستوى الطالب مطلوب" }),

  price: z.number().min(0, { message: "السعر يجب أن يكون 0 أو أكثر" }),

  description: z
    .string()
    .min(1, { message: "الوصف التفصيلي مطلوب" })
    .min(20, { message: "الوصف التفصيلي يجب أن يكون 20 حرف على الأقل" }),

  shortContent: z
    .string()
    .min(1, { message: "المحتوى المختصر مطلوب" })
    .min(10, { message: "المحتوى المختصر يجب أن يكون 10 أحرف على الأقل" }),

  skills: z.string().min(1, { message: "المهارات المكتسبة مطلوبة" }),

  requirements: z.string().min(1, { message: "المتطلبات مطلوبة" }),

  image: z
    .any()
    .refine(
      (file) => {
        if (!file) return false;
        return file instanceof File;
      },
      { message: "صورة المادة مطلوبة" }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024; // 5MB max
      },
      { message: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت" }
    )
    .refine(
      (file) => {
        if (!file) return true;
        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
        ];
        return allowedTypes.includes(file.type);
      },
      { message: "نوع الصورة يجب أن يكون JPEG أو PNG أو JPG أو WEBP" }
    ),

  video: z
    .any()
    .refine(
      (file) => {
        if (!file) return false;
        return file instanceof File;
      },
      { message: "فيديو المادة مطلوب" }
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 100 * 1024 * 1024; // 100MB max
      },
      { message: "حجم الفيديو يجب أن يكون أقل من 100 ميجابايت" }
    )
    .refine(
      (file) => {
        if (!file) return true;
        const allowedTypes = [
          "video/mp4",
          "video/avi",
          "video/mov",
          "video/wmv",
        ];
        return allowedTypes.includes(file.type);
      },
      { message: "نوع الفيديو يجب أن يكون MP4 أو AVI أو MOV أو WMV" }
    ),
});

export type ICourseForm = z.infer<typeof courseSchema>;
