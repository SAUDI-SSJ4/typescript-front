import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <section id="home" className="pt-40">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-end">
          <div className="flex flex-col gap-6 py-10 lg:py-24">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-foreground">
              المدرب عبدالرحمن .
            </h1>
            <p className="text-lg text-muted-foreground">
              المدرب عبدالرحمن يتميز بشغفه الكبير في نقل المعرفة وتمكين الآخرين،
              بخبرة عملية تجمع بين التدريب والتطوير الشخصي والمهني. عرف بأسلوبه
              المبسط والجاذب، وقدرته على تحفيز المتدربين لتحقيق أهدافهم بثقة
              وفعالية. ترك بصمة واضحة في مسيرته التدريبية من خلال تقديم برامج
              عالية الجودة تُلهم وتُحدث فرقاً حقيقياً.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/auth/signup"
                className={`${buttonVariants({ size: "lg" })}`}
              >
                مدونتي
              </Link>
              <Link
                to="/auth/signup"
                className={`${buttonVariants({
                  size: "lg",
                  variant: "secondary",
                })} border border-border hover:border-primary hover:text-primary transition-colors`}
              >
                قناتي في اليوتيوب
              </Link>
            </div>
          </div>
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="https://www.sayan-server.com/uploads/academies/sliders/FT288bmUcvJCtXwng9s9.png"
              alt="Hero"
              loading="eager"
              className="w-full min-h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
