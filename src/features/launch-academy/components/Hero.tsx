import { motion } from "framer-motion";
import { CheckCircle, Rocket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Link } from "react-router-dom";

function Hero() {
  const benefits = [
    "إعداد سريع في 5 دقائق فقط",
    "بدون خبرة تقنية مطلوبة",
    "ابدأ مجاناً بدون بطاقة ائتمانية",
    "دعم فني متخصص 24/7",
  ];

  return (
    <section
      className="pt-[150px] md:pt-[200px] pb-16 md:pb-20 bg-white"
      dir="rtl"
    >
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content - RTL: Text Left (first), Image Right (second) */}
          <div className="grid lg:grid-cols-5 gap-12 items-center mb-12">
            {/* Text Content - Left (في RTL يكون الأول) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 text-center lg:text-right lg:col-span-2"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Rocket className="w-4 h-4" />
                  أكثر من 1,000 منصة تعليمية نشطة
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  حوّل <span className="text-blue-600">خبرتك</span>
                  <span className="block text-blue-600 mt-2">إلى دخل شهري</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed">
                  أنشئ أكاديميتك الرقمية في 5 دقائق فقط وابدأ في تحقيق دخل من
                  خبرتك ومعرفتك اليوم! منصة متكاملة لبناء وإدارة المحتوى
                  التعليمي بكل سهولة.
                </p>

                <div className="flex justify-center lg:justify-start mt-8">
                  <Link
                    to={`${Routes.AUTH}/${Pages.SIGNIN}`}
                    className={`${buttonVariants({
                      size: "lg",
                      className:
                        "text-xl bg-blue-600 hover:bg-blue-700 px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300",
                    })}`}
                  >
                    🚀 انشئ منصتك التعليمية الآن - مجاناً
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Image Section - Right (في RTL يكون الثاني) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:col-span-3"
            >
              <div className="relative bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
                <div className="w-full bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src="/assets/images/launch-academy/Header.png"
                    alt="لوحة تحكم أكاديمية سيان"
                    className="w-full h-auto object-contain"
                    loading="eager"
                  />
                </div>

                {/* Small floating badge */}
                <div className="absolute -top-3 -left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                  لوحة التحكم المتطورة
                </div>
              </div>
            </motion.div>
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Title and Description */}
              <div className="text-center lg:text-right">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  لماذا تختار <span className="text-blue-600">منصة</span> سيان؟
                </h2>
                <p className="text-lg text-gray-600">
                  حلول متطورة لبناء أكاديميتك الرقمية بسهولة ويسر
                </p>
              </div>

              {/* Benefits List */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
