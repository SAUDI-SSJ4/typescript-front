<<<<<<< HEAD
import type { Opinion } from "@/types/academy/opinion";
import { Star } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function Testimonials({ opinions }: { opinions: Opinion[] }) {
  return (
    <section id="testimonials" className="py-16">
      <div className="container">
        {/* Header */}
        <h2 className="text-2xl text-center lg:text-3xl font-bold pb-8 text-primary">
          أراء الطلاب
        </h2>
        <TestimonialsList opinions={opinions} />
      </div>
    </section>
  );
}
=======
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    id: crypto.randomUUID(),
    name: "أحمد محمد",
    title: "المدير التنفيذي لشركة وصلة",
    feedback: "قم بإحداث ثورة في عملك من خلال خبرتنا في تطوير تطبيقات الهاتف المحمول والويب جيات، وتقديم حلول متقدمة لرفع مستوى عملك التجارية وتعزيز أرباحك.",
    image: "https://avatars.githubusercontent.com/u/87553297?v=4",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: "سارة علي",
    title: "مطورة تطبيقات",
    feedback: "المحتوى كان مفيدًا جدًا وسهل الفهم. تعلمت الكثير من التقنيات الحديثة في تطوير التطبيقات.",
    image: "https://avatars.githubusercontent.com/u/87553297?v=4",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: "محمد حسن",
    title: "مدير المشاريع",
    feedback: "تجربة تعليمية ممتازة، أنصح الجميع بالانضمام. الدورات عملية ومفيدة جداً.",
    image: "https://avatars.githubusercontent.com/u/87553297?v=4",
    rating: 5,
  },
  {
    id: crypto.randomUUID(),
    name: "ليلى كمال",
    title: "مصممة واجهات مستخدم",
    feedback: "الدورة كانت شاملة وغطت كل ما أحتاجه في مجال التصميم والتطوير.",
    image: "https://avatars.githubusercontent.com/u/87553297?v=4",
    rating: 5,
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                اراء <span className="text-primary">الطلاب</span>
              </h2>
            </div>
>>>>>>> sketch

            {/* Navigation */}
            <div className="flex items-center gap-4">
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="hidden md:flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="relative">
            <div className="bg-card border border-border rounded-lg p-6">
              {/* Author Info First */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">
                    {currentTestimonial.name}
                  </h4>

<<<<<<< HEAD
function TestimonialsList({ opinions }: { opinions: Opinion[] }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-testimonials",
          prevEl: ".swiper-button-prev-testimonials",
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
          {opinions.map((opinion) => (
            <SwiperSlide key={opinion.id} className="h-full">
              <li className="bg-card shadow-sm hover:shadow-md transition-colors duration-200 rounded-[20px] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={opinion.image}
                    alt={opinion.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-base font-semibold">{opinion.name}</h3>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < Math.floor(opinion.rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {opinion.content}
                </p>
              </li>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>

      {/* Custom Navigation Buttons - Outside */}
      <div className="swiper-button-prev-testimonials absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div className="swiper-button-next-testimonials absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
=======
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < currentTestimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentTestimonial.feedback}
                </p>
              </div>
            </div>
          </div>
        </div>
>>>>>>> sketch
      </div>
    </section>
  );
}

export default Testimonials;
