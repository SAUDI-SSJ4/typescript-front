import React from "react";
import AuthForm from "../../features/auth/components/AuthForm";
import { Pages } from "@/constants/enums";
import { ArrowRight, UserPlus, Shield, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Signup: React.FC = () => {
  const benefits = [
    {
      icon: Shield,
      title: "بياناتك آمنة",
      description: "حماية كاملة لمعلوماتك الشخصية"
    },
    {
      icon: Clock,
      title: "دقيقة واحدة",
      description: "التسجيل سريع وسهل"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Section */}
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
                  انضم الآن إلى <span className="text-blue-600">منصة سيان</span>
                </h1>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50K+</div>
                  <div className="text-sm text-gray-600">طالب نشط</div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">دورة تدريبية</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">95%</div>
                  <div className="text-sm text-gray-600">معدل الرضا</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Signup Form */}
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
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    إنشاء حساب جديد
                  </h2>
                </div>
              </div>

              {/* Google Signup */}
              <div className="mb-6">
                <SignupWithGoogle />
                
                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">أو أكمل بالبريد الإلكتروني</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <AuthForm slug={Pages.SIGNUP} />
            </div>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                بالتسجيل، أنت توافق على{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                  شروط الخدمة
                </Link>
                {" و "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                  سياسة الخصوصية
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
<<<<<<< HEAD

      <AuthForm slug={Pages.SIGNUP} />
=======
>>>>>>> sketch
    </div>
  );
};

export default Signup;

function SignupWithGoogle() {
  return (
    <div className="space-y-4">
      <button className="bg-white hover:bg-gray-50 flex items-center justify-center gap-3 w-full h-12 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md group">
        <img
          src="/assets/icons/google.svg"
          alt="Google Icon"
          loading="lazy"
          className="w-5 h-5"
        />
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
          🚀 إنشاء حساب بـ Google (أسرع طريقة)
        </span>
      </button>
    </div>
  );
}
