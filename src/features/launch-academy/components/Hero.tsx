import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="pt-40 pb-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container">
        {/* Images Section */}
        <div className="flex justify-center items-center gap-8 md:gap-20 mb-16">
          <div className="w-32 h-32 md:w-52 md:h-52 hidden md:block">
            <img
              src="/assets/images/launch-academy/stats2.png"
              alt="Statistics 2"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-52 h-52 md:w-80 md:h-80">
            <img
              src="/assets/images/launch-academy/book.png"
              alt="Book"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-32 h-32 md:w-52 md:h-52 hidden md:block">
            <img
              src="/assets/images/launch-academy/stats.png"
              alt="Statistics"
              loading="eager"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-2 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-primary">🚀 أكثر من 1,000 منصة تعليمية</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
            حوّل <span className="text-primary">خبرتك</span>
            <br />
            إلى <span className="text-primary">دخل شهري</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-4 max-w-4xl mx-auto">
            <strong className="text-foreground">أنشئ أكاديميتك الرقمية في 5 دقائق فقط</strong> 
            <br />
            وابدأ في تحقيق دخل من خبرتك ومعرفتك اليوم!
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10 text-lg">
            <div className="flex items-center gap-2 text-green-600">
              <span>✅</span>
              <span>بدون خبرة تقنية</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <span>✅</span>
              <span>إعداد سريع</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <span>✅</span>
              <span>ابدأ مجاناً</span>
            </div>
          </div>

          <div className="space-y-4">
            <Link
              to={`${Routes.AUTH}/${Pages.SIGNIN}`}
              className={`${buttonVariants({
                size: "lg",
                className: "text-xl bg-primary hover:bg-primary/90 px-12 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300",
              })}`}
            >
              🚀 انشئ منصتك التعليمية الآن - مجاناً
            </Link>

            <p className="text-sm text-muted-foreground mt-4">
              💡 ما تحتاج لبطاقة ائتمانية • جاهز في 5 دقائق • الآن مباشرة  
            </p>

            {/* Success Stories */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">ريال تم تحقيقها شهرياً</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">90%</div>
                <div className="text-sm text-muted-foreground">معدل رضا المستخدمين</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">دعم فني متواصل</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
