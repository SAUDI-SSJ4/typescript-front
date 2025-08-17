import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
    },
  },
};

function Hero() {
  return (
    <section className="pt-[150px] md:pt-[200px] pb-16 md:pb-20 bg-white">
      <div className="container">
        <div className="element-center gap-20">
          <motion.div
            className="w-32 h-32 md:w-52 md:h-52 hidden md:block"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            {...floatingAnimation}
          >
            <img
              src="/assets/images/ai/stats1.png"
              alt="Statistics 2"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </motion.div>
          <motion.div
            className="w-52 h-52 md:w-80 md:h-80"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            {...floatingAnimation}
          >
            <img
              src="/assets/images/ai/ai.png"
              alt="Book"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </motion.div>

          <motion.div
            className="w-32 h-32 md:w-52 md:h-52 hidden md:block"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            {...floatingAnimation}
          >
            <img
              src="/assets/images/ai/stats2.png"
              alt="Statistics"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            <span className="text-blue-600">الذكاء</span> الاصطناعي
          </h1>
          <div className="flex flex-col gap-4 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            <p>
              في منصة سيان، نعتبر الذكاء الاصطناعي حجر الزاوية في تعزيز تجربة
              التعليم الرقمي. نؤمن بأهمية دمجه كأداة مساعدة وداعمة ليس فقط
              للطلاب، بل أيضًا لمنشئي المحتوى التعليمي، مما يعزز فاعلية التعلم
              والتدريس.
            </p>
            <p>
              في منصة سيان، نقدم مجموعة متنوعة من الميزات الفريدة المدعومة
              بالذكاء الاصطناعي لتحسين وتعزيز تجربة التعلم وإعداد المحتوى.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
