import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";

const features = [
  {
    icon: "/assets/icons/features/ai.svg",
    title: "الذكاء الاصطناعي",
    description: "استخدم أحدث تقنيات الذكاء الاصطناعي لتحسين تجربة التعلم",
  },
  {
    icon: "/assets/icons/features/analytics.svg",
    title: "تحليلات متقدمة",
    description: "تتبع تقدم الطلاب وتحليل الأداء بشكل تفصيلي",
  },
  {
    icon: "/assets/icons/features/interactive.svg",
    title: "محتوى تفاعلي",
    description: "دروس تفاعلية وتمارين عملية لتعزيز التعلم",
  },
  {
    icon: "/assets/icons/features/certificate.svg",
    title: "شهادة حضور",
    description: "احصل على شهادة حضور عند إكمال الدورات",
  },
];

export default function Features() {
  return (
    <section className="pb-10 bg-card">
      <div className="container">
        <div className="relative bottom-6 bg-card rounded-3xl p-8 lg:p-12 shadow-[0_0_20px_#0000000d]">
          <div className="flex items-center flex-wrap gap-4">
            <h2 className="text-xl lg:text-2xl max-w-64 font-bold text-foreground text-center">
              هنا تبدأ رحلتك من العلم الى العمل
            </h2>

            <Slider />
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider() {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="!flex-1"
    >
      {features.map((feature, index) => (
        <SwiperSlide key={index}>
          <div className="bg-accent lg:bg-transparent hover:bg-accent transition-colors duration-200 rounded-2xl p-6 h-full">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 border border-[#00000008] bg-[#F9F9FF] rounded-[20px] flex items-center justify-center">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  loading="lazy"
                  className="w-6 h-6"
                />
              </div>
              <h3 className="text-xl text-card-foreground font-semibold">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground truncate">
                {feature.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
