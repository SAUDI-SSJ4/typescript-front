import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Lightbulb } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function EmployeeFeatures() {
  const features = [
    {
      icon: TrendingUp,
      title: "زيادة الانتاجية",
      description:
        "التدريب يجعل الموظفين أكثر كفاءة وانتاجية، حيث يكونون مدربين بشكل أفضل لمواجهة مهامهم ويكتسبون ثقة أكبر في قدراتهم مما يؤدي إلى تحسين الأداء.",
      color: "bg-blue-50 text-blue-600",
      bgColor: "bg-blue-600",
    },
    {
      icon: Users,
      title: "الاحتفاظ بالموظفين",
      description:
        "75% من الموظفين من المرجح أن يبقوا لفترة أطول في المنظمات التي تستثمر في تدريبهم، مما يعزز رضاهم ووالائهم.",
      color: "bg-green-50 text-green-600",
      bgColor: "bg-green-600",
    },
    {
      icon: Target,
      title: "تحسين المهارات",
      description:
        "يساعد تطوير الموظفين على اكتساب مهارات جديدة، مما يزيد الرضا الوظيفي ويشجع فرص التقدم.",
      color: "bg-purple-50 text-purple-600",
      bgColor: "bg-purple-600",
    },
    {
      icon: Lightbulb,
      title: "الابتكار والقدرة على التكيف",
      description:
        "تطوير الموظفين يعزز القدرة على التكيف مع التغيرات المستمرة ويشجع على الابتكار.",
      color: "bg-orange-50 text-orange-600",
      bgColor: "bg-orange-600",
    },
  ];

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute inset-0 bg-[url('/assets/images/employee-training/pattern.svg')] opacity-5"></div>

      <div className="container relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="w-4 h-4" />
              أهمية التدريب
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              أهمية <span className="text-blue-600">تدريب</span> الموظفين
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اكتشف كيف يمكن لبرامج التدريب المتخصصة أن تحول أداء فريقك وتحقق
              نتائج استثنائية
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-6`}
                  >
                    <feature.icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default EmployeeFeatures;
