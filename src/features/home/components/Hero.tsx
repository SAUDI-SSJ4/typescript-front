import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 pt-40 pb-20">
      {/* Extra padding for spacing */}
      <div className="pt-16"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwIDEwIEwgNTAgMTAgTCA1MCA1MCBMIDE5IDUwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                أكثر من الف طالب يتعلمون معنا
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
                تعليم يفتح 
                <span className="block" style={{ color: '#00ffce' }}>
                  آفاق المستقبل
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                سيان تقدم لكم تجربة تعليمية متطورة معززة بالذكاء الاصطناعي. 
                أنشئ منصتك التعليمية لبيع محتواك التعليمي بسهولة.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/auth/signup"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                انضم الآن مجاناً
                <Play className="w-5 h-5" />
              </Link>
              
              <Link
                to="/launch-academy"
                className="text-white hover:text-blue-100 px-6 py-4 text-lg font-medium transition-colors duration-300 underline underline-offset-4"
              >
                تعرف على المنصة
              </Link>
            </div>

          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">شهادات</div>
                  <div className="text-xs text-gray-600">عند إكمال الدورة</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Play className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">تعلم تفاعلي</div>
                  <div className="text-xs text-gray-600">مع الذكاء الاصطناعي</div>
                </div>
              </div>
            </div>

            <div className="relative transform translate-y-5 z-0">
              <img
                src="/assets/images/home/hero.png"
                alt="Hero"
                loading="eager"
                className="w-full h-auto scale-150 md:scale-140 lg:scale-125"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
