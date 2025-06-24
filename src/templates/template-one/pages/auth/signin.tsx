import { Pages } from "@/constants/enums";
import AuthForm from "../../features/auth/components/AuthForm";

const Signin: React.FC = () => {
  return (
    // <PublicRoute>
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-card-foreground">
          تسجيل الدخول
        </h1>
        <p className="text-muted-foreground text-lg">
          ادخل المعلومات الخاصة بحسابك
        </p>
      </div>
      <SiginWithGoogle />
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-border"></div>
        <span className="text-muted-foreground text-sm px-4">أو</span>
        <div className="flex-grow border-t border-border"></div>
      </div>
      <AuthForm slug={Pages.SIGNIN} />
    </div>
    // </PublicRoute>
  );
};

export default Signin;

function SiginWithGoogle() {
  return (
    <div className="space-y-4">
      <button className="bg-[#F4F7FE] flex items-center justify-center gap-2 w-full h-12 rounded-md hover:bg-[#EAEFF4] transition-colors duration-200">
        <span className="text-sm font-medium text-card-foreground">
          تسجيل الدخول باستخدام{" "}
        </span>
        <img
          src="/assets/icons/google.svg"
          alt="Google Icon"
          loading="lazy"
          className="w-4 h-4"
        />
      </button>
    </div>
  );
}
