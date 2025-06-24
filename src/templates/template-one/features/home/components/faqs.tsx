import { motion } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "كيف يمكنني التسجيل في الدورات؟",
    answer: "يمكنك التسجيل بسهولة من خلال إنشاء حساب جديد على المنصة، ثم اختيار الدورة المناسبة والدفع الآمن عبر الإنترنت.",
  },
  {
    id: 2,
    question: "هل الدورات معتمدة؟",
    answer: "نعم، جميع دوراتنا معتمدة ومعترف بها، وستحصل على شهادة إتمام معتمدة بعد انتهاء الدورة بنجاح.",
  },
  {
    id: 3,
    question: "ما هي مدة الوصول للدورة؟",
    answer: "تحصل على وصول مدى الحياة للدورة بعد التسجيل، مما يتيح لك مراجعة المحتوى في أي وقت تشاء.",
  },
  {
    id: 4,
    question: "هل يمكنني الحصول على استرداد؟",
    answer: "نعم، نوفر ضمان استرداد الأموال خلال 14 يوم من تاريخ الشراء إذا لم تكن راضياً عن الدورة.",
  },
  {
    id: 5,
    question: "هل هناك دعم فني متاح؟",
    answer: "نعم، فريق الدعم الفني متاح على مدار الساعة لمساعدتك في أي استفسارات أو مشاكل تقنية.",
  },
  {
    id: 6,
    question: "كيف يمكنني التواصل مع المدرب؟",
    answer: "يمكنك التواصل مع المدرب من خلال منصة الدورة، أو عبر البريد الإلكتروني، أو من خلال جلسات الأسئلة والأجوبة المباشرة.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function FAQs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ((prevId) => (prevId === id ? null : id));
  };

  return (
    <section id="faqs" className="py-20">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <HelpCircle className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl lg:text-4xl font-bold">
              الأسئلة <span className="text-blue-600">الشائعة</span>
            </h2>
          </motion.div>
          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            إجابات على أكثر الأسئلة شيوعاً حول دوراتنا وخدماتنا
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          className="space-y-4"
        >
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              className="bg-gray-50/50 rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-right flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  {openFAQ === faq.id ? (
                    <Minus className="w-5 h-5 text-blue-600 transition-transform duration-200" />
                  ) : (
                    <Plus className="w-5 h-5 text-blue-600 transition-transform duration-200" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  {faq.question}
                </h3>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openFAQ === faq.id ? "auto" : 0,
                  opacity: openFAQ === faq.id ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FAQs;