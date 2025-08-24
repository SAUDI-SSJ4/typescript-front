import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, ArrowRight, Mail } from "lucide-react";
import AuthForm from "@/features/auth/components/AuthForm";
import { Pages } from "@/constants/enums";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/shared/Loader";
import { toast } from "sonner";

interface LoginDialogProps {
  children?: React.ReactNode;
  triggerText?: string;
  triggerVariant?: "default" | "secondary" | "outline" | "ghost" | "link";
  triggerSize?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

function SignInWithGoogle() {
  return (
    <div className="space-y-4">
      <button className="bg-white hover:bg-gray-50 flex items-center justify-center gap-3 w-full h-12 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md group" dir="rtl">
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
          🚀 تسجيل الدخول بـ Google (أسرع طريقة)
        </span>
        <img
          src="/assets/icons/google.svg"
          alt="Google Icon"
          loading="lazy"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}

// مكون نموذج تسجيل الدخول مع زر استعادة كلمة المرور
function AuthFormWithForgotPassword({ onForgotPassword }: { onForgotPassword: () => void }) {
  return (
    <div className="space-y-6">
      <AuthForm slug={Pages.SIGNIN} />
      <div className="text-center" dir="rtl">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
        >
          هل نسيت كلمة المرور؟
        </button>
      </div>
    </div>
  );
}

// مكون نموذج استعادة كلمة المرور
function ForgotPasswordForm({ onBackToSignIn }: { onBackToSignIn: () => void }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return;
    }
    
    setIsLoading(true);
    try {
      // محاكاة طلب استعادة كلمة المرور
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني");
      onBackToSignIn();
    } catch (error) {
      toast.error("حدث خطأ في إرسال الرابط");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      <div className="space-y-3 text-right">
        <Label
          htmlFor="forgot-email"
          className="text-sm font-medium text-card-foreground text-right flex items-center gap-2"
        >
          <Mail className="w-4 h-4 text-blue-600" />
          البريد الإلكتروني
        </Label>
        <div className="relative">
          <Input
            id="forgot-email"
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-10 !bg-transparent text-right pr-3 pl-8 dir-rtl"
            dir="rtl"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Mail className="w-4 h-4" />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        <LoadingButton
          loading={isLoading}
          loadingText="جار الإرسال..."
          loaderSize="sm"
        >
          إرسال رابط الاستعادة
        </LoadingButton>
      </Button>

      <div className="text-center">
        <button
          type="button"
          className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2 mx-auto"
          onClick={onBackToSignIn}
        >
          <ArrowRight className="w-4 h-4" />
          العودة لتسجيل الدخول
        </button>
      </div>
    </form>
  );
}

export default function LoginDialog({
  children,
  triggerText = "دخول",
  triggerVariant = "link",
  triggerSize = "default",
  className = "",
}: LoginDialogProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"signin" | "forgot-password">("signin");

  const handleForgotPassword = () => {
    setMode("forgot-password");
  };

  const handleBackToSignIn = () => {
    setMode("signin");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        // Reset to signin mode when dialog closes
        setTimeout(() => setMode("signin"), 300);
      }
    }}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={`${className} hover:text-primary transition-colors duration-200`}
          >
            <LogIn className="w-4 h-4 ml-2" />
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent 
        className="sm:max-w-lg w-full mx-4 rounded-2xl shadow-xl border-0"
        dir="rtl"
        showCloseButton={false}
      >
        <DialogHeader className="flex justify-center items-center pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {mode === "signin" ? "مرحباً بك مرة أخرى" : "استعادة كلمة المرور"}
          </DialogTitle>
          {mode === "forgot-password" && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور
            </p>
          )}
        </DialogHeader>
        
        <div className="space-y-6">
          {mode === "signin" ? (
            <>
              <SignInWithGoogle />
              <AuthFormWithForgotPassword onForgotPassword={handleForgotPassword} />
            </>
          ) : (
            <ForgotPasswordForm onBackToSignIn={handleBackToSignIn} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}