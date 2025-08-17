import { Pages } from "@/constants/enums";
import AuthForm from "../../features/auth/components/AuthForm";

const Signin: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
          تسجيل الدخول
        </h1>
        <p className="text-muted-foreground text-lg">
          ادخل المعلومات الخاصة بحسابك
        </p>
      </div>
      <AuthForm slug={Pages.SIGNIN} />
    </div>
  );
};

export default Signin;
