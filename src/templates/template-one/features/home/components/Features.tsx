import { GraduationCap, Award } from "lucide-react";

function Features() {
  return (
    <section id="features" className="py-16 relative">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Section - Left */}
          <div className="order-last md:order-none">
            <img
              src="https://www.sayan-server.com/uploads/academies/about/9EQk0LDP77a0uCJWYukB.png"
              alt="About Us"
              className="w-full h-auto rounded-lg"
              loading="lazy"
              width="600"
            />
          </div>
          {/* Text Content - Right */}
          <div className="text-right">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
              انجازاتي التدريبية .
            </h2>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8">
              بفضل الله، قدم المدرب عبدالرحمن أكثر من دورة تدريبية، واستفاد من
              برامجه متدربًا ومتدربة في مختلف مناطق المملكة. شملت إنجازاته تدريب
              جهات حكومية وخاصة، وتطوير محتوى تدريبي متخصص في [المجالات]، إلى
              جانب مساهمته في تمكين الشباب والمهتمين بريادة الأعمال والتطوير
              الذاتي.
            </p>
            <ul className="flex items-center gap-6">
              <li className="flex items-center justify-end gap-3 text-foreground">
                <GraduationCap className="w-6 h-6 text-primary" />
                <span className="text-base font-semibold">200 طالب</span>
              </li>
              <li className="flex items-center justify-end gap-3 text-foreground">
                <Award className="w-6 h-6 text-primary" />
                <span className="text-base font-semibold">200 طالب</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Features;
