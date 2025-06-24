import { Pages, Routes } from "@/constants/enums";
import { Link, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import FormFields from "@/components/shared/formFields/form-fields";
import type { IFormField } from "@/types/app";
import { useForm, type Control, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/shared/Loader";
import { toast } from "sonner";
import { UserType } from "@/constants/enums";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import useFormFields from "../hooks/useFormFields";
import useFormValidations from "../hooks/useFormValidations";

const AuthForm: React.FC<{ slug: string }> = ({ slug }) => {
  const navigate = useNavigate();
  const { getFormFields } = useFormFields({ slug });
  const { getValidationSchema } = useFormValidations({ slug });

  const { signup, isLoading } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DEFAULT_VALUES: any = {};
  for (const field of getFormFields()) {
    DEFAULT_VALUES[field.name] = "";
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(getValidationSchema()),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      try {
        if (slug === Pages.SIGNIN) {
          // await login({
          //   email: data.email as string,
          //   password: data.password as string,
          // });
          toast.success("تم تسجيل الدخول بنجاح");
          navigate("/dashboard");
        } else if (slug === Pages.SIGNUP) {
          await signup({
            name: data.name as string,
            email: data.email as string,
            phone: data.phone as string,
            password: data.password as string,
            confirm_password: data.confirm_password as string,
            user_type: data.user_type as UserType,
            profile_picture: data.profile_picture as File,
          });
          toast.success("تم إنشاء الحساب بنجاح");
          navigate("/");
        }
      } catch (error: unknown) {
        const errorMessage =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "حدث خطأ ما";
        toast.error(errorMessage);
      }
    },
    [slug, signup, navigate]
  );

  const formLoading = isSubmitting || isLoading;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-4">
          <FormFields {...field} control={control} errors={errors} />
        </div>
      ))}

      {slug === Pages.SIGNIN && (
        <ForgotPassword control={control} errors={errors} />
      )}
      <SubmitButton slug={slug} disabled={formLoading} loading={formLoading} />
      <NavigationLink slug={slug} />
    </form>
  );
};

export default AuthForm;

function ForgotPassword({
  control,
  errors,
}: {
  errors: FieldErrors;
  control: Control<Record<string, unknown>>;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <FormFields
        type="checkbox"
        name="remember"
        aria-describedby="remember"
        id="remember"
        label="تذكرني"
        control={control}
        errors={errors}
      />
      <Link
        to={`/${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
        className="text-sm font-medium text-primary hover:underline"
      >
        هل نسيت كلمة المرور؟
      </Link>
    </div>
  );
}

function SubmitButton({
  slug,
  loading,
  ...rest
}: {
  slug: string;
  loading?: boolean;
} & React.ComponentProps<typeof Button>) {
  const renderButtonText = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return "تسجيل الدخول";
      case Pages.SIGNUP:
        return "إنشاء حساب";
      case Pages.FORGOT_PASSWORD:
        return "متابعة";
      case Pages.VERIFY_ACCOUNT:
        return "إعادة إرسال بريد التحقق";
      case Pages.RESET_PASSWORD:
        return "تغيير كلمة المرور";
      case Pages.ENTER_OTP:
        return "تأكيد";
      default:
        return "تسجيل الدخول";
    }
  };

  return (
    <Button
      type="submit"
      className="w-full h-10 text-white font-medium"
      {...rest}
    >
      <LoadingButton
        loading={loading}
        loadingText="جار التحميل..."
        loaderSize="sm"
      >
        {renderButtonText()}
      </LoadingButton>
    </Button>
  );
}

function NavigationLink({ slug }: { slug: string }) {
  const { academySlug } = useParams();

  const getText = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return {
          desc: "ليس لديك حساب؟",
          title: "سجل الآن",
          slug: Pages.SIGNUP,
        };
      case Pages.SIGNUP:
        return {
          desc: "لديك حساب بالفعل؟",
          title: "تسجيل الدخول",
          slug: Pages.SIGNIN,
        };
      default:
        return {
          desc: "هل تحتاج إلى مساعدة؟",
          title: "اتصل بنا",
          slug: Pages.FORGOT_PASSWORD,
        };
    }
  };
  return (
    <div className="mt-6 flex items-center gap-2">
      <p className="text-card-foreground text-sm">{getText().desc}</p>
      <Link
        to={`/academy/${academySlug}/${Routes.AUTH}/${getText().slug}`}
        replace
        className="text-primary hover:underline text-sm font-medium transition-colors duration-200"
      >
        {getText().title}
      </Link>
    </div>
  );
}
