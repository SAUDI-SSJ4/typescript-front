import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Clients() {
  // Partners logos data
  const partners = [
    {
      id: 1,
      name: "شريك النجاح الأول",
      logo: "/assets/images/partners/Logo-Files-02.png",
    },
    {
      id: 2,
      name: "شريك النجاح الثاني",
      logo: "/assets/images/partners/Asset 1@2x.png",
    },
    {
      id: 3,
      name: "شريك النجاح الثالث",
      logo: "/assets/images/partners/Screenshot_20250522_171933_Samsung-Internet-750x395-1.jpg",
    },
    {
      id: 4,
      name: "شريك النجاح الرابع",
      logo: "/assets/images/partners/Logo-Files-02.png",
    },
    {
      id: 5,
      name: "شريك النجاح الخامس",
      logo: "/assets/images/partners/Asset 1@2x.png",
    },
    {
      id: 6,
      name: "شريك النجاح السادس",
      logo: "/assets/images/partners/Screenshot_20250522_171933_Samsung-Internet-750x395-1.jpg",
    },
  ];

  return (
    <section className="pt-8 md:pt-12 pb-16 md:pb-20 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-primary">شركاء</span> النجاح
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نفتخر بشراكتنا مع رواد الأعمال والمؤسسات الرائدة في المملكة العربية
            السعودية
          </p>
        </div>

        {/* Clients Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 60,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 60,
              },
            }}
            className="clients-swiper pb-16"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group">
                  <div className="flex items-center justify-center h-20">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Clients;
