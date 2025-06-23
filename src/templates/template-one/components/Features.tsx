import { GraduationCap, Award } from "lucide-react";

function Features() {
  return (
    <section id="features" className="py-14 sm:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section - Left */}
          <div className="order-last md:order-none">
            <img
              src="https://www.sayan-server.com/uploads/academies/about/9EQk0LDP77a0uCJWYukB.png"
              alt="About Us"
              className="w-full h-auto"
              loading="lazy"
              width="600"
            />
          </div>
          {/* Text Content - Right */}
          <div className="text-right">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-10">
              انجازاتي التدريبية .
            </h2>

            <p className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              بفضل الله، قدم المدرب عبدالرحمن أكثر من دورة تدريبية، واستفاد من
              برامجه متدربًا ومتدربة في مختلف مناطق المملكة. شملت إنجازاته تدريب
              جهات حكومية وخاصة، وتطوير محتوى تدريبي متخصص في [المجالات]، إلى
              جانب مساهمته في تمكين الشباب والمهتمين بريادة الأعمال والتطوير
              الذاتي.
            </p>
            <ul className="flex items-center gap-6 mt-10">
              <li className="flex items-center justify-end gap-3 text-foreground">
                <GraduationCap className="w-8 h-8" />
                <span className="text-lg font-semibold">200 طالب</span>
              </li>
              <li className="flex items-center justify-end gap-3 text-foreground">
                <Award className="w-8 h-8" />
                <span className="text-lg font-semibold">200 طالب</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
