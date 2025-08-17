import Features from "@/components/shared/features";

function WhyUs() {
  const features = [
    {
      icon: (
        <img
          src="/assets/icons/why-us/high.svg"
          alt="High Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "نقلة نوعية في المبيعات",
      description:
        "استفد من أدواتنا الذكية لتعزيز مبيعاتك وتحسين أداء الطلاب، مما يساعدك على تحقيق أهدافك التجارية بفعالية.",
    },
    {
      icon: (
        <img
          src="/assets/icons/why-us/support.svg"
          alt="Support Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "دعم فني متواصل",
      description:
        "تمتع بالطمأنينة مع دعمنا الفني المتاح على مدار الساعة، مهما كان استفسارك أو تحديثك.",
    },
    {
      icon: (
        <img
          src="/assets/icons/why-us/ai.svg"
          alt="Ai Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "الريادة مع الذكاء الاصطناعي",
      description:
        "منصة سيان الرائدة في تقديم تجارب تعليمية ذكية ومتطورة تتجاوز التوقعات.",
    },
    {
      icon: (
        <img
          src="/assets/icons/why-us/education.svg"
          alt="Education Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "بناء المواد التعليمية الاحترافي",
      description:
        "نظام يتيح بناء مواد تعليمية عالية الجودة وتفاعلية باستخدام الذكاء الاصطناعي.",
    },
    {
      icon: (
        <img
          src="/assets/icons/why-us/success.svg"
          alt="Success Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "توسيع آفاق النجاح",
      description:
        "اغتنم فرصة التسويق والبيع لمحتواك الرقمي عبر منصة تتيح لك الوصول إلى جمهور أوسع.",
    },
    {
      icon: (
        <img
          src="/assets/icons/improve.svg"
          alt="Improve Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "تحسين تجربة التعليم",
      description:
        "استكشف قوة الذكاء الاصطناعي في تعزيز فهم الطلاب وتلبية احتياجاتهم التعليمية بدقة.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center">
          لماذا <span className="text-primary">نختار</span> منصة سيان؟
        </h2>
        <Features features={features} />
      </div>
    </section>
  );
}

export default WhyUs;
