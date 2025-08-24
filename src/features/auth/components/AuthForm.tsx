import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import FormFields from "@/components/shared/formFields/form-fields";
import type { IFormField } from "@/types/app";
import { useForm, type Control, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/shared/Loader";
import { toast } from "sonner";
import { UserType, Pages, Routes } from "@/constants/enums";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import useFormFields from "../hooks/useFormFields";
import useFormValidations from "../hooks/useFormValidations";
<<<<<<< HEAD
import SiginWithGoogle from "@/components/shared/sigin-with-google";
// import { cookieStorage } from "@/lib/cookies";
=======
import LoginDialog from "@/components/ui/login-dialog";
>>>>>>> sketch

const AuthForm: React.FC<{
  slug: string;
}> = ({ slug }) => {
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
<<<<<<< HEAD
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
=======
          // await login({
          //   email: data.email as string,
          //   password: data.password as string,
          // });
          toast.success("تم تسجيل الدخول بنجاح");
          navigate("/dashboard");
        } else if (slug === Pages.SIGNUP) {
          await signup({
            name: data.name as string,
>>>>>>> sketch
            email: data.email as string,
            phone: data.phone as string,
            password: data.password as string,
            password_confirmation: data.confirm_password as string,
            user_type: data.user_type as UserType,
          });
<<<<<<< HEAD
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
          const response = await forgotPassword(
            data.email as string
          );
          if (response && typeof response === 'object' && 'status_code' in response && response.status_code === 200) {
            const message = (response as any).message || 'تم إرسال رابط إعادة تعيين كلمة المرور';
            toast.success(message);
          }
        } else if (slug === Pages.RESET_PASSWORD) {
          const response = await resetPassword({
            email: verifiedEmail as string,
            otp: verification_token as string,
            password: data.password as string,
            password_confirmation: data.confirm_password as string,
          });
          if (response && typeof response === 'object' && 'status_code' in response && response.status_code === 200) {
            const message = (response as any).message || 'تم إعادة تعيين كلمة المرور بنجاح';
            toast.success(message);
            navigate(`/${Routes.AUTH}/${Pages.SIGNIN}`, {
              replace: true,
            });
          }
        } else if (slug === Pages.SIGNIN_WITH_GOOGLE) {
          const response = await login({
            email: "google@example.com",
            password: "temp",
            // google_token: cookieStorage.getItem("google_token") as string,
            user_type: data.user_type as UserType,
          });

          const message = response && typeof response === 'object' && 'message' in response ? (response as any).message : 'تم تسجيل الدخول بنجاح';
          toast.success(message);
          navigate(Routes.DASHBOARD, {
            replace: true,
          });
=======
          toast.success("تم إنشاء الحساب بنجاح");
          navigate("/");
>>>>>>> sketch
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
    [slug, signup, navigate]
  );

  const formLoading = isSubmitting || isLoading;
<<<<<<< HEAD
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
=======

  const renderFormFields = () => {
    const fields = getFormFields();
    
    if (slug === Pages.SIGNUP) {
      // All fields visible except profile picture (optional)
      return (
        <div className="space-y-5">
          {/* Account Type and Name on same row - for all screen sizes */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <FormFields {...fields[0]} control={control} errors={errors} />
            <FormFields {...fields[2]} control={control} errors={errors} />
          </div>
          
          {/* Email and Phone on same row - for all screen sizes */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <FormFields {...fields[4]} control={control} errors={errors} />
            <FormFields {...fields[3]} control={control} errors={errors} />
          </div>
          
          {/* Password - for all screen sizes */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <FormFields {...fields[5]} control={control} errors={errors} />
            <FormFields {...fields[6]} control={control} errors={errors} />
          </div>
          
          {/* Profile Picture - Optional */}
          <div className="border-t border-gray-200 pt-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-4 h-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-500">+</span>
                  </span>
                  الصورة الشخصية (اختياري)
                </span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              
              <div className="mt-4 bg-gray-50 rounded-xl p-4">
                <FormFields {...fields[1]} control={control} errors={errors} />
              </div>
            </details>
          </div>
        </div>
      );
    } else {
      // Enhanced signin layout
      return (
        <div className="space-y-5 text-right" dir="rtl">
          {fields.map((field: IFormField) => (
            <div key={field.name} className="space-y-2">
              <FormFields {...field} control={control} errors={errors} />
              {/* Add helpful hints for certain fields */}
 
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
       {renderFormFields()}
 
       <SubmitButton slug={slug} disabled={formLoading} loading={formLoading} />
       
       {/* تم نقل زر "هل نسيت كلمة المرور؟" إلى مكون AuthFormWithForgotPassword */}
       
       <NavigationLink slug={slug} />
     </form>
   );
>>>>>>> sketch
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
    <div className="flex items-center justify-between p-3 rounded-md bg-accent border border-border">
      <div className="flex items-center gap-2">
        <FormFields
          type="checkbox"
          name="remember"
          aria-describedby="remember"
          id="remember"
          label="تذكرني"
          control={control}
          errors={errors}
        />
      </div>
      <Link
        to={`/${Routes.AUTH}/${Pages.FORGOT_PASSWORD}`}
        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
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
        return "تسجيل";
      case Pages.FORGOT_PASSWORD:
        return "متابعة";
      case Pages.VERIFY_ACCOUNT:
        return "إعادة إرسال بريد التحقق";
      case Pages.RESET_PASSWORD:
        return "تغيير كلمة المرور";
<<<<<<< HEAD

=======
      case Pages.ENTER_OTP:
        return "تأكيد";
>>>>>>> sketch
      default:
        return "تسجيل الدخول";
    }
  };



  const getLoadingText = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return "جار تسجيل الدخول...";
      case Pages.SIGNUP:
        return "جار التسجيل...";
      default:
        return "جار التحميل...";
    }
  };

  return (
    <Button
      type="submit"
      size="lg"
      className="w-full"
      disabled={loading}
      {...rest}
    >
      <LoadingButton
        loading={loading}
        loadingText={getLoadingText()}
        loaderSize="sm"
      >
        {renderButtonText()}
      </LoadingButton>
    </Button>
  );
}

<<<<<<< HEAD
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
      const response = await resendOtp({ email: verifiedEmail }); // This should be the user's email
      if (response && typeof response === 'object' && 'message' in response) {
        const message = (response as any).message;
        if (message) {
          toast.success(message);
        }
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

=======
function NavigationLink({ slug }: { slug: string }) {
>>>>>>> sketch
  const getText = () => {
    switch (slug) {
      case Pages.SIGNIN:
        return {
          desc: "ليس لديك حساب؟",
          title: "سجل الآن مجاناً",
          slug: Pages.SIGNUP,
        };
      case Pages.SIGNUP:
        return {
          desc: "",
          title: "تسجيل الدخول",
          slug: Pages.SIGNIN,
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
          slug: Pages.FORGOT_PASSWORD,
        };
    }
  };
  
  // تم إزالة "أو" و "سجل الآن مجاناً" كما طلب المستخدم
  return null;
}
