import { motion } from "framer-motion";
import { Settings, Shield, Zap, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function Features() {
  const features = [
    {
      icon: Settings,
      title: "نظام إدارة شامل",
      description:
        "نظام متكامل لإدارة ومتابعة المتدربين مع تقارير مفصلة عن الأداء والتقدم",
      benefits: [
        "إدارة المستخدمين والصلاحيات",
        "تتبع التقدم في الوقت الفعلي",
        "تقارير شاملة ومخصصة",
      ],
    },
    {
      icon: Shield,
      title: "أمان البيانات",
      description: "حماية متقدمة لبيانات الموظفين والمحتوى التدريبي",
      benefits: [
        "تشفير البيانات من الطرف للطرف",
        "امتثال لمعايير الحماية الدولية",
        "نسخ احتياطية آمنة",
      ],
    },
    {
      icon: Zap,
      title: "سهولة الاستخدام",
      description: "واجهة مستخدم بديهية تسهل عملية التدريب والتعلم",
      benefits: [
        "تصميم متجاوب لجميع الأجهزة",
        "تكامل مع الأنظمة الموجودة",
        "دعم فني مستمر",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              مميزات المنصة
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">مميزات</span> منصة سيان التقنية
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              منصة متطورة مبنية خصيصاً لتلبية احتياجات الشركات الكبيرة في
              التدريب والتطوير
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits List */}
                    <div className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                جاهز لبدء تطوير مهارات فريقك؟
              </h3>
              <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
                احصل على عرض توضيحي مخصص لاحتياجات شركتك واكتشف كيف يمكن لمنصة
                سيان تحويل برامج التدريب لديك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-3 text-lg bg-white text-blue-600 hover:bg-gray-50"
                >
                  شاهد العرض التوضيحي
                  <ArrowLeft className="w-5 h-5 mr-2" />
                </Button>
                <Button
                  size="lg"
                  className="px-8 py-3 text-lg bg-[#00ffcc] text-blue-600 border-[#00ffcc] hover:bg-white hover:text-blue-600 hover:border-[#00ffcc] transition-all duration-200"
                >
                  تحدث مع خبير
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Features;
