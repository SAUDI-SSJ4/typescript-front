import FAQs from "../features/home/components/faqs";
import Features from "../features/home/components/Features";
import Hero from "../features/home/components/Hero";
import HomeLayout from "../features/home/components/HomeLayout";
import Testimonials from "../features/home/components/Testimonials";
import { motion } from "framer-motion";
<<<<<<< HEAD
import Courses from "../features/home/components/Courses";
import { Navigate, useParams } from "react-router-dom";
import { useAcademy } from "../features/home/hooks/useAcademyQueries";
import { Routes } from "@/constants/enums";
=======
import Courses from "@/features/home/components/Courses";
import useAcademySettings from "@/hooks/useAcademySettings";
>>>>>>> sketch
import "swiper/css";
import "swiper/css/navigation";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function Home() {
<<<<<<< HEAD
  const { academySlug } = useParams();
  // const subdomain = window.location.hostname.split(".")[0];
  const { data: academyInfo, isPending } = useAcademy({ slug: academySlug });
  if (!isPending && !academyInfo) {
    return <Navigate to={Routes.ROOT} state={{ from: location }} replace />;
  }
  return (
    !isPending &&
    academyInfo && (
      <HomeLayout settings={academyInfo.data?.settings}>
        <main className="bg-[rgb(249_250_251)]">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Hero hero={academyInfo.data?.hero} />
          </motion.div>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Features about={academyInfo.data?.about} />
          </motion.div>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Courses />
          </motion.div>
          {academyInfo.data?.faqs && academyInfo.data.faqs.length > 0 && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Testimonials opinions={academyInfo.data.opinions} />
            </motion.div>
          )}
          {academyInfo.data?.faqs && academyInfo.data.faqs.length > 0 && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <FAQs faqs={academyInfo.data.faqs} />
            </motion.div>
          )}
        </main>
      </HomeLayout>
    )
=======
  const { settings } = useAcademySettings();
  
  return (
    <HomeLayout customCSS={settings.customCSS}>
      <main className="bg-[rgb(249_250_251)]">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Hero />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Features />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Courses />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Testimonials />
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FAQs />
        </motion.div>
      </main>
    </HomeLayout>
>>>>>>> sketch
  );
}

export default Home;
