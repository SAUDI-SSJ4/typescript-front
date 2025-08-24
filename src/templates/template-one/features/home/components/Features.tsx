import HtmlRenderer from "@/components/shared/HtmlRenderer";
import RemoteImage from "@/components/shared/RemoteImage";
import type { About } from "@/types/academy/about";
import { GraduationCap, Award } from "lucide-react";

function Features({ about }: { about: About }) {
  return (
    <section id="features" className="py-16 relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-20 xl:gap-30 items-center">
          {/* Image Section - Left */}
          <div className="order-last md:order-none">
<<<<<<< HEAD
            <RemoteImage
              src={about.image}
              alt={about.title}
              className="w-full h-auto rounded-lg"
=======
            <img
              src="https://www.sayan-server.com/uploads/academies/about/9EQk0LDP77a0uCJWYukB.png"
              alt="About Us"
              className="w-full h-auto object-contain rounded-lg"
>>>>>>> sketch
              loading="lazy"
              width="600"
            />
          </div>
          {/* Text Content - Right */}
          <div className="text-right">
<<<<<<< HEAD
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              <HtmlRenderer html={about.title} />
            </h2>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8">
              <HtmlRenderer html={about.content} />
            </p>
            <ul className="flex items-center gap-6">
              <li className="flex items-center justify-end gap-3 text-foreground">
                <GraduationCap className="w-6 h-6 text-primary" />
                <span className="text-base font-semibold">
                  {about.feature_one}
                </span>
              </li>
              <li className="flex items-center justify-end gap-3 text-foreground">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-base font-semibold">
                  {about.feature_two}
                </span>
=======
            <h2 className="text-3xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6">
              انجازاتي التدريبية .
            </h2>

            <p className="text-lg lg:text-lg text-muted-foreground leading-relaxed mb-8">
              بفضل الله، قدم المدرب عبدالرحمن أكثر من دورة تدريبية، واستفاد من
              برامجه متدربًا ومتدربة في مختلف مناطق المملكة. شملت إنجازاته تدريب
              جهات حكومية وخاصة، وتطوير محتوى تدريبي متخصص في [المجالات]، إلى
              جانب مساهمته في تمكين الشباب والمهتمين بريادة الأعمال والتطوير
              الذاتي.
            </p>
            <ul className="flex items-center gap-6">
              <li className="flex items-center justify-end gap-3 text-foreground">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xl font-semibold">200 طالب</span>
              </li>
              <li className="flex items-center justify-end gap-3 text-foreground">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xl font-semibold">200 طالب</span>
>>>>>>> sketch
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Features;
