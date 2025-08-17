import { Pages } from "@/constants/enums";
import AuthForm from "../../features/auth/components/AuthForm";

const Signup: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
          إنشاء حساب جديد
        </h1>
        <p className="text-muted-foreground text-lg">
          قم بإنشاء حساب جديد للبدء في استخدام خدماتنا
        </p>
      </div>

      <AuthForm slug={Pages.SIGNUP} />
    </div>
  );
};

export default Signup;
