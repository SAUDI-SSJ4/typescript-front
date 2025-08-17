import { Pages } from "@/constants/enums";
import AuthForm from "@/features/auth/components/AuthForm";

const SigninWithGoogle: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
          الاكمال تسجيل الدخول باستخدام جوجل
        </h1>
      </div>
      <AuthForm slug={Pages.SIGNIN_WITH_GOOGLE} />
    </div>
  );
};

export default SigninWithGoogle;
