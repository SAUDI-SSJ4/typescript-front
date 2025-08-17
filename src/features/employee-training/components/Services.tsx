import { motion } from "framer-motion";
import { Palette, Video, Users } from "lucide-react";

function Services() {
  const services = [
    {
      icon: Palette,
      title: "برامج تدريبية متخصصة",
      description: "محتوى تدريبي شامل مصمم خصيصاً لاحتياجات كل قطاع وتخصص",
      features: [
        "تصميم محتوى تفاعلي",
        "مواد تعليمية معتمدة",
        "تخصيص حسب القطاع",
      ],
      image: "/assets/images/employee-training/services.png",
    },
    {
      icon: Video,
      title: "منصة تعلم إلكترونية",
      description: "نظام إدارة تعلم متطور مع أدوات تفاعلية وتقييم مستمر",
      features: [
        "فيديوهات تدريبية عالية الجودة",
        "محتوى تفاعلي متقدم",
        "تقنيات الواقع الافتراضي",
      ],
      image: "/assets/images/employee-training/create-videos.png",
    },
    {
      icon: Users,
      title: "دعم ومتابعة مستمرة",
      description: "فريق دعم متخصص لضمان نجاح برامج التدريب وتحقيق الأهداف",
      features: [
        "نظام إدارة متطور",
        "تتبع الأداء المباشر",
        "تقارير تفصيلية شاملة",
      ],
      image: "/assets/images/employee-training/manage.png",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-blue-600">خدماتنا</span> في منصة سيان
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات المتخصصة في تدريب وتطوير الموظفين
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-sm hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                {/* Image */}
                <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Icon */}
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-blue-600" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 pt-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
