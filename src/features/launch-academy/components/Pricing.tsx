import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

function Pricing() {
  const [, setEmail] = useState("");

  const plans = [
    {
      id: 0,
      name: "المجانية",
      price: 0.0,
      originalPrice: null,
      free: true,
      period: "مدى الحياة",
      description:
        "ابدأ رحلتك التعليمية مجاناً واكتشف إمكانيات المنصة الأساسية",
      features: [
        { name: "3 دورات تعليمية مجانية", included: true },
        { name: "دعم فني أساسي", included: true },
        { name: "إمكانية الوصول للمحتوى الأساسي", included: true },
        { name: "تتبع تقدم المتعلمين", included: false },
        { name: "شهادات إتمام", included: false },
      ],
      buttonText: "ابدأ مجانًا الآن",
      isPopular: false,
      isComingSoon: false,
    },
    {
      id: 1,
      name: "الباقة الحالية",
      price: 99.0,
      originalPrice: 299.0,
      period: "شهر",
      description: "عرض محدود! احصل على جميع الميزات المتقدمة بسعر مخفض",
      features: [
        { name: "وصول كامل لجميع الدورات", included: true },
        { name: "دعم فني متقدم 24/7", included: true },
        { name: "تتبع تقدم المتعلمين", included: true },
        { name: "شهادات إتمام معتمدة", included: true },
        { name: "تحليلات متقدمة للأداء", included: true },
      ],
      buttonText: "ابدا الان",
      isPopular: true,
      isComingSoon: false,
      badge: "عرض محدود",
      discount: "67% خصم",
    },
    {
      id: 2,
      name: "الباقة المتقدمة",
      price: null,
      originalPrice: null,
      period: "قريباً",
      description: "مميزات حصرية وأدوات احترافية للمؤسسات التعليمية الكبيرة",
      features: [
        { name: "جميع ميزات الباقة الحالية", included: true },
        { name: "API مخصص للتكامل", included: true },
        { name: "تدريب مخصص للفريق", included: true },
        { name: "دعم مؤسسي متخصص", included: true },
        { name: "تخصيص كامل للمنصة", included: true },
      ],
      buttonText: "أعلمني عند الإطلاق",
      isPopular: false,
      isComingSoon: true,
    },
  ];

  return (
    <section className="py-16 md:py-20 relative">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            اختر الباقة المناسبة{" "}
            <span className="text-primary">لمنصتك التعليمية</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ابدأ مجاناً أو احصل على ميزات متقدمة بعرض محدود، واكتشف المستقبل مع
            باقتنا القادمة
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-8 relative transition-all duration-300 hover:shadow-lg ${
                plan.isPopular
                  ? "ring-2 ring-primary shadow-lg scale-105 z-10"
                  : plan.isComingSoon
                  ? "border-2 border-dashed border-gray-300 opacity-90"
                  : "shadow-sm border border-gray-100"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Coming Soon Badge */}
              {plan.isComingSoon && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gray-500 text-white px-6 py-2 rounded-full text-sm font-medium">
                    قريباً
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {plan.name}
                </h3>

                <div className="mb-4">
                  {plan.isComingSoon ? (
                    <div className="text-2xl font-bold text-gray-500">
                      مميزات حصرية
                    </div>
                  ) : (
                    <>
                      {plan.originalPrice && (
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-lg text-gray-400 line-through">
                            {plan.originalPrice} ر.س
                          </span>
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                            {plan.discount}
                          </span>
                        </div>
                      )}
                      <span className="text-4xl font-bold text-foreground">
                        {plan.free ? "مجاني" : `${plan.price}`}
                      </span>
                      {!plan.free && (
                        <span className="text-lg text-muted-foreground mr-2">
                          ر.س / {plan.period}
                        </span>
                      )}
                    </>
                  )}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included
                            ? "bg-primary text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {feature.included ? (
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-3 h-3 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground line-through"
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              {plan.isComingSoon ? (
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button className="w-full py-3 text-lg rounded-xl bg-gray-500 hover:bg-gray-600 text-white">
                    {plan.buttonText}
                  </Button>
                </div>
              ) : plan.free ? (
                <Button
                  asChild
                  className="w-full py-3 text-lg rounded-xl bg-white border-2 border-primary text-primary hover:bg-primary/10"
                >
                  <Link to="/auth/signup">{plan.buttonText}</Link>
                </Button>
              ) : (
                <Button className="w-full py-3 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white">
                  {plan.buttonText}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
