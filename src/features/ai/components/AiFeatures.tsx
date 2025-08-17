import Features from "@/components/shared/features";

function AiFeatures() {
  const features = [
    {
      icon: (
        <img
          src="/assets/icons/ai/test.svg"
          alt="Test Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "تصحيح الاختبارات",
      description:
        "الذكاء الاصطناعي يوفرى تصحيح الاختبارات ويقدم تحليلات مفصلة لنتائج الطلاب.",
    },
    {
      icon: (
        <img
          src="/assets/icons/ai/question.svg"
          alt="Question Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "خاصية سؤال التركيز",
      description:
        "هذه الخاصية تعزز تركيز الطالب عبر سؤال يطرح فاعلية التقدم في الدرس.",
    },
    {
      icon: (
        <img
          src="/assets/icons/ai/test-me.svg"
          alt="Test Me Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "خاصية اختبارني",
      description: "توفر اختبارات محددة بعد كل درس ليقيس مستوى استيعاب الطالب.",
    },
    {
      icon: (
        <img
          src="/assets/icons/ai/help.svg"
          alt="Help Icon"
          loading="lazy"
          className="w-10 h-10"
        />
      ),
      title: "المساعد الشخصي",
      description:
        "مساعد رقمي ذكي يجاب دائماً لمساعدة الطالب والمعلمين في جميع احتياجاتهم التعليمية.",
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
      title: "الإجابة على أسئلة الطلاب",
      description:
        "الذكاء الاصطناعي يجيب على الاستفسارات، مؤثراً مفهماً أعمق للمواد.",
    },
  ];

  return (
    <section className="py-16 md:py-20 relative">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-blue-600">مميزات</span> الذكاء الاصطناعي
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            اكتشف كيف يحسن الذكاء الاصطناعي تجربة التعليم والتعلم في منصة سيان
          </p>
        </div>

        {/* Features Grid */}
        <Features features={features} />
      </div>
    </section>
  );
}

export default AiFeatures;
