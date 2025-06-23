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
        <h2 className="text-2xl text-center lg:text-3xl font-bold pb-10 text-primary">
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
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="!pb-4 !px-1"
    >
      <ul>
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="h-full">
            <li className="bg-card shadow-sm hover:shadow-md transition-colors duration-200 rounded-[20px] p-8">
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
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
              <p className="text-sm text-gray-600 mt-4 truncate">
                {testimonial.feedback}
              </p>
            </li>
          </SwiperSlide>
        ))}
      </ul>
    </Swiper>
  );
}
