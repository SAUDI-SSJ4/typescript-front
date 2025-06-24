import { Star } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    id: crypto.randomUUID(),
    name: "أحمد محمد",
    feedback: "دورة رائعة! تعلمت الكثير عن تطوير الويب.",
    image: "https://avatars.githubusercontent.com/u/87553297?v=4",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: "سارة علي",
    feedback: "المحتوى كان مفيدًا جدًا وسهل الفهم.",
    image: "https://avatars.githubusercontent.com/u/87553297?v=4",
    rating: 4,
  },
  {
    id: crypto.randomUUID(),
    name: "محمد حسن",
    feedback: "تجربة تعليمية ممتازة، أنصح الجميع بالانضمام.",
    image: "https://avatars.githubusercontent.com/u/87553297?v=4",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: "ليلى كمال",
    feedback:
      "الدورة كانت شاملة وغطت كل ما أحتاجه.تسهشتيهتشسهتيهشستهيتهشستسيخضصه٠ثهض٠صث",
    image: "https://avatars.githubusercontent.com/u/87553297?v=4",
    rating: 4.5,
  },
];
function Testimonials() {
  return (
    <section id="testimonials" className="py-16">
      <div className="container">
        {/* Header */}
        <h2 className="text-2xl text-center lg:text-3xl font-bold pb-8 text-primary">
          أراء الطلاب
        </h2>
        <TestimonialsList />
      </div>
    </section>
  );
}

export default Testimonials;

function TestimonialsList() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next-testimonials',
          prevEl: '.swiper-button-prev-testimonials',
        }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="!pb-4 !px-1 testimonials-swiper"
      >
        <ul>
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="h-full">
              <li className="bg-card shadow-sm hover:shadow-md transition-colors duration-200 rounded-[20px] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold">{testimonial.name}</h3>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < Math.floor(testimonial.rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {testimonial.feedback}
                </p>
              </li>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
      
      {/* Custom Navigation Buttons - Outside */}
      <div className="swiper-button-prev-testimonials absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="swiper-button-next-testimonials absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
