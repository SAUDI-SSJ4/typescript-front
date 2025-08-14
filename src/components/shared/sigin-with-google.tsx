import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "./Loader";
import { Pages, Routes, type UserType } from "@/constants/enums";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuthStore";
import { cookieStorage } from "@/lib/cookies";

function SiginWithGoogle({
  children,
  userType,
  setError,
}: {
  children: React.ReactNode;
  userType?: UserType | null;
  setError: (name: string, error: { type: string; message: string }) => void;
}) {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const isSignupPage = window.location.pathname.includes("signup");
  const [loading, setLoading] = useState(false);
  
  // Check if Google OAuth is configured
  const isGoogleOAuthConfigured = !!import.meta.env.VITE_GOOGLE_CLIENT_ID;
  
  if (!isGoogleOAuthConfigured) {
    return (
      <button
        type="button"
        disabled
        className="bg-gray-300 flex items-center justify-center gap-2 w-full h-12 rounded-md cursor-not-allowed opacity-50"
      >
        <img src="/google.svg" alt="Google" className="w-5 h-5" />
        <span className="text-gray-600">Google OAuth غير مُكوّن</span>
      </button>
    );
  }
  
  const sigin = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        if (isSignupPage && userType) {
          const { message } = await signup({
            google_token: access_token,
            user_type: userType as UserType,
          });
          toast.success(message || "تم التسجيل بنجاح");
          navigate(Routes.DASHBOARD, {
            replace: true,
          });
          return;
        }
        cookieStorage.setItem("google_token", access_token);
        const { message, status_code } = await login({
          google_token: access_token,
        });
        if (status_code !== 200) {
          setLoading(false);
          navigate(`/${Routes.AUTH}/${Pages.SIGNIN_WITH_GOOGLE}`, {
            replace: true,
          });
          return;
        }

        toast.success(message || "تم تسجيل الدخول بنجاح");
        navigate(Routes.DASHBOARD, {
          replace: true,
        });

        return;
      } catch (error) {
        setLoading(false);
        // Check if it's a 400 error that requires redirect to Google signup
        const axiosError = error as {
          response?: { status?: number; data?: { message?: string } };
        };
        if (axiosError.response?.status === 400) {
          navigate(`/${Routes.AUTH}/${Pages.SIGNIN_WITH_GOOGLE}`, {
            replace: true,
          });
          return;
        }
        toast.error(
          axiosError?.response?.data?.message ||
            "فشل في تسجيل الدخول باستخدام جوجل"
        );
        console.error("Google login failed:", error);
        throw error;
      }
    },
    onError: () => {
      toast.error("فشل في تسجيل الدخول باستخدام جوجل");
      console.log("Login Failed");
    },
  });

  const handleLoginClick = () => {
    setLoading(true);
    if (!userType && isSignupPage) {
      toast.error("يرجى تحديد نوع المستخدم قبل البدء في التسجيل");
      setLoading(false);
      setError("user_type", {
        type: "manual",
        message: "يرجى تحديد نوع المستخدم",
      });
      return;
    }
    sigin();
  };

  return (
    <button
      type="button"
      onClick={handleLoginClick}
      disabled={loading}
      className="bg-[#F4F7FE] flex items-center justify-center gap-2 w-full h-12 rounded-md hover:bg-[#EAEFF4] transition-colors duration-200"
    >
      {loading ? (
        <Loader size="sm" />
      ) : (
        <>
          <span className="text-sm font-medium text-card-foreground">
            {children}
          </span>
          <img
            src="/assets/icons/google.svg"
            alt="Google Icon"
            loading="lazy"
            className="w-4 h-4"
          />
        </>
      )}
    </button>
  );
}

export default SiginWithGoogle;
