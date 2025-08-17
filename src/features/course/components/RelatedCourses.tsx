import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function RelatedCourses() {
  return (
    <div className="container">
      <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
        مواد تعليمية مناسبة لك
      </h3>

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
        {/* <ul>
          {relatedCourses.map((course) => (
            <SwiperSlide key={course.id} className="h-full">
              <li className="bg-card shadow-md hover:shadow-lg transition-colors duration-200 rounded-[20px] p-4">
                <CourseCard course={course} />
              </li>
            </SwiperSlide>
          ))}
        </ul> */}
      </Swiper>
    </div>
  );
}
