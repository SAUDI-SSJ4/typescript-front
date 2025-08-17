import { Pages, Routes } from "@/constants/enums";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState, useEffect } from "react";
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
import SiginWithGoogle from "@/components/shared/sigin-with-google";
// import { cookieStorage } from "@/lib/cookies";

const AuthForm: React.FC<{
  slug: string;
}> = ({ slug }) => {
  const navigate = useNavigate();
  const { getFormFields } = useFormFields({ slug });
  const { getValidationSchema } = useFormValidations({ slug });
  const searchParams = useSearchParams();
  const { email: verifiedEmail } = Object.fromEntries(searchParams[0]);
  const { verification_token } = Object.fromEntries(searchParams[0]);

  const {
    login,
    signup,
    isLoading,
    forgotPassword,
    verifyAccount,
    resetPassword,
  } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DEFAULT_VALUES: any = {};
  for (const field of getFormFields()) {
    DEFAULT_VALUES[field.name] = "";
  }

  const {
    handleSubmit,
    control,
    getValues,
    setError,
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
          const { message } = await login({
            email: data.email as string,
            password: data.password as string,
          });

          toast.success(message);
          navigate(Routes.DASHBOARD, {
            replace: true,
          });
        } else if (slug === Pages.SIGNUP) {
          const { message } = await signup({
            fname: data.fname as string,
            lname: data.lname as string,
            email: data.email as string,
            phone_number: data.phone_number as string,
            password: data.password as string,
            password_confirmation: data.confirm_password as string,
            user_type: data.user_type as UserType,
          });
          if (message) {
            toast.success(message);
            navigate(
              `/${Routes.AUTH}/${Pages.VERIFY_ACCOUNT}?email=${data.email}`,
              {
                replace: true,
              }
            );
          }
        } else if (slug === Pages.VERIFY_ACCOUNT) {
          const { message } = await verifyAccount({
            email: verifiedEmail as string,
            otp: data.otp as string,
          });
          if (message) {
            toast.success(message);
            navigate(Routes.DASHBOARD, {
              replace: true,
            });
          }
        } else if (slug === Pages.FORGOT_PASSWORD) {
          const { status_code, message } = await forgotPassword(
            data.email as string
          );
          if (status_code === 200) {
            toast.success(message);
          }
        } else if (slug === Pages.RESET_PASSWORD) {
          const { status_code, message } = await resetPassword({
            email: verifiedEmail as string,
            otp: verification_token as string,
            password: data.password as string,
            password_confirmation: data.confirm_password as string,
          });
          if (status_code === 200) {
            toast.success(message);
            navigate(`/${Routes.AUTH}/${Pages.SIGNIN}`, {
              replace: true,
            });
          }
        } else if (slug === Pages.SIGNIN_WITH_GOOGLE) {
          const { message } = await login({
            email: "google@example.com",
            password: "temp",
            // google_token: cookieStorage.getItem("google_token") as string,
            user_type: data.user_type as UserType,
          });

          toast.success(message);
          navigate(Routes.DASHBOARD, {
            replace: true,
          });
        }
      } catch (error: unknown) {
        console.error("Auth error:", error); // إضافة تسجيل الأخطاء للتشخيص
        
        let errorMessage = "حدث خطأ ما";
        
        if (error && typeof error === 'object') {
          if ('response' in error && error.response && typeof error.response === 'object') {
            if ('data' in error.response && error.response.data && typeof error.response.data === 'object') {
              if ('message' in error.response.data && typeof error.response.data.message === 'string') {
                errorMessage = error.response.data.message;
              }
            }
          }
        }
        
        toast.error(errorMessage);
      }
    },
    [
      slug,
      login,
      navigate,
      signup,
      verifyAccount,
      verifiedEmail,
      forgotPassword,
      resetPassword,
      verification_token,
    ]
  );

  const formLoading = isSubmitting || isLoading;
  const googleConfigured = !!import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const shouldShowGoogleButton =
    googleConfigured && (slug === Pages.SIGNUP || slug === Pages.SIGNIN);
  return (
    <>
      {shouldShowGoogleButton && (
        <>
          <SiginWithGoogle
            userType={getValues("user_type")}
            setError={setError}
          >
            {slug === Pages.SIGNUP
              ? "إنشاء حساب باستخدام"
              : "تسجيل الدخول باستخدام"}
          </SiginWithGoogle>

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-border"></div>
            <span className="text-muted-foreground text-sm px-4">أو</span>
            <div className="flex-grow border-t border-border"></div>
          </div>
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {getFormFields().map((field: IFormField) => (
          <div key={field.name} className="mb-4">
            <FormFields {...field} control={control} errors={errors} />
          </div>
        ))}

        {slug === Pages.SIGNIN && (
          <ForgotPassword control={control} errors={errors} />
        )}
        <SubmitButton
          slug={slug}
          disabled={formLoading}
          loading={formLoading}
        />
        <NavigationLink slug={slug} verifiedEmail={verifiedEmail} />
      </form>
    </>
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
        return "تأكيد";
      case Pages.RESET_PASSWORD:
        return "تغيير كلمة المرور";

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

function NavigationLink({
  slug,
  verifiedEmail,
}: {
  slug: string;
  verifiedEmail: string;
}) {
  const { resendOtp, isLoading } = useAuth();
  const [countdown, setCountdown] = useState(60); // Start with 60 seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && slug === Pages.VERIFY_ACCOUNT) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, slug]);

  const handleResendOtp = async () => {
    try {
      // Using forgotPassword as a placeholder for resend OTP
      const { message } = await resendOtp({ email: verifiedEmail }); // This should be the user's email
      if (message) {
        toast.success(message);
      }

      setCountdown(60); // Reset countdown after successful resend
    } catch (error) {
      console.error("Resend OTP failed:", error);
      toast.error(
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "فشل في إعادة إرسال رمز التحقق"
      );
      // toast.error("فشل في إرسال رمز التحقق");
    }
  };

  const getText = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return {
          desc: "ليس لديك حساب؟",
          title: "سجل الآن",
          href: `/${Routes.AUTH}/${Pages.SIGNUP}`,
          isButton: false,
        };
      case Pages.SIGNUP:
        return {
          desc: "لديك حساب بالفعل؟",
          title: "تسجيل الدخول",
          href: `/${Routes.AUTH}/${Pages.SIGNIN}`,
          isButton: false,
        };
      case Pages.VERIFY_ACCOUNT:
        return {
          desc: "لم تستلم الرمز؟",
          title: countdown > 0 ? `إعادة إرسال (${countdown}s)` : "إعادة إرسال",
          href: "",
          isButton: true,
          disabled: countdown > 0 || isLoading,
          onClick: handleResendOtp,
        };
      case Pages.SIGNIN_WITH_GOOGLE:
        return {
          desc: "لديك حساب بالفعل؟",
          title: "تسجيل الدخول",
          href: `/${Routes.AUTH}/${Pages.SIGNIN}`,
          isButton: false,
        };
      default:
        return {
          desc: "هل تحتاج إلى مساعدة؟",
          title: "اتصل بنا",
          href: Routes.CONTACT,
          isButton: false,
        };
    }
  };

  const linkData = getText();

  return (
    <div className="mt-6 flex items-center gap-2">
      <p className="text-card-foreground text-sm">{linkData.desc}</p>
      {linkData.isButton ? (
        <button
          type="button"
          onClick={linkData.onClick}
          disabled={linkData.disabled}
          className={`text-sm font-medium transition-colors duration-200 ${
            linkData.disabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-primary hover:underline"
          }`}
        >
          {linkData.title}
        </button>
      ) : (
        <Link
          to={linkData.href}
          replace
          className="text-primary hover:underline text-sm font-medium transition-colors duration-200"
        >
          {linkData.title}
        </Link>
      )}
    </div>
  );
}
