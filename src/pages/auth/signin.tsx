import { Pages } from "@/constants/enums";
import AuthForm from "../../features/auth/components/AuthForm";
import { LogIn, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Signin: React.FC = () => {
  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Back Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                  <span className="text-sm font-medium">العودة للرئيسية</span>
                </Link>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  مرحباً بعودتك إلى 
                  <span className="text-blue-600 block mt-2">منصة سيان</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  سعداء برؤيتك مرة أخرى! سجل دخولك لمتابعة رحلتك التعليمية
                </p>
              </div>

              {/* Quick Access Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">استكمل تعلمك</h3>
                    <p className="text-sm text-gray-600">عد إلى دوراتك المحفوظة</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <LogIn className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">وصول سريع</h3>
                    <p className="text-sm text-gray-600">ادخل بضغطة واحدة</p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">محفوظة</div>
                  <div className="text-sm text-gray-600">دوراتك</div>
                </div>
                <div className="text-center border-r border-gray-200">
                  <div className="text-2xl font-bold text-green-600">متقدم</div>
                  <div className="text-sm text-gray-600">تقدمك</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            {/* Mobile Back Button */}
            <div className="mb-4 lg:hidden">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 group"
              >
                <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="text-sm font-medium">العودة للرئيسية</span>
              </Link>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8" dir="rtl">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  تسجيل الدخول
                </h2>
              </div>

              {/* Google Sign In */}
              <SiginWithGoogle />
              
              {/* Divider */}
              <div className="relative my-5 sm:my-6" dir="rtl">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">أو أكمل بالبريد الإلكتروني</span>
                </div>
              </div>

              {/* Form */}
              <AuthForm slug={Pages.SIGNIN} />
            </div>
          </motion.div>
        </div>
      </div>
>>>>>>> sketch
    </div>
  );
};

export default Signin;
<<<<<<< HEAD
=======

function SiginWithGoogle() {
  return (
    <div className="space-y-4">
      <button className="bg-gray-50 hover:bg-gray-100 flex items-center justify-center gap-3 w-full h-12 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md" dir="rtl">
        <span className="text-sm font-medium text-gray-700">
          تسجيل الدخول بـ Google (أسرع طريقة)
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
>>>>>>> sketch
