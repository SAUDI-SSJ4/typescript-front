import { z } from "zod";
import { UserType } from "@/constants/enums";

// User invitation form validation schema
export const inviteUserSchema = z.object({
  email: z
    .string()
    .email("يرجى إدخال بريد إلكتروني صحيح")
    .min(1, "البريد الإلكتروني مطلوب"),

  role: z
    .nativeEnum(UserType, {
      errorMap: () => ({ message: "يرجى اختيار نوع الحساب" }),
    }),
});

export type IInviteUserForm = z.infer<typeof inviteUserSchema>;