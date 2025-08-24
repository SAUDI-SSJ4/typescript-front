import * as z from "zod";
import { signinSchema, signupSchema } from "@/validations/auth";
import type { IFormFieldsVariables } from "@/types/app";
import { Pages } from "@/constants/enums";

const useFormValidations = (props: IFormFieldsVariables) => {
  const { slug } = props;

  const getValidationSchema = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return signinSchema;
      case Pages.SIGNUP:
        return signupSchema;
<<<<<<< HEAD
      case Pages.VERIFY_ACCOUNT:
        return verifyAccountSchema;
      case Pages.FORGOT_PASSWORD:
        return forgotPasswordSchema;
      case Pages.RESET_PASSWORD:
        return resetPassordSchema;
      case Pages.SIGNIN_WITH_GOOGLE:
        return z.object({
          user_type: z.string().min(1, "يرجى تحديد نوع المستخدم"),
        });
=======
>>>>>>> sketch

      default:
        return z.object({});
    }
  };

  return { getValidationSchema };
};

export default useFormValidations;
