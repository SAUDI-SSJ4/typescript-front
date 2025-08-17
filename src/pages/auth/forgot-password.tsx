import { Pages } from "@/constants/enums";
import AuthForm from "@/features/auth/components/AuthForm";

function ForgotPassword() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
          استعادة كلمة المرور
        </h1>
        <p className="text-muted-foreground text-lg">
          أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور الخاصة
          بك.
        </p>
      </div>
      <AuthForm slug={Pages.FORGOT_PASSWORD} />
    </div>
  );
}

export default ForgotPassword;
