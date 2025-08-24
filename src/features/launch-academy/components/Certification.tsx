function Certification() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container">
        <div
          className="flex flex-col gap-10 md:gap-20 rounded-[36px] relative pt-16 pb-6 overflow-hidden bg-gray-50"
        >
          {/* Top Right Image */}
          <div className="absolute top-0 -right-3 rotate-180">
            <img
              src="/assets/images/launch-academy/national_eLearning_center.png"
              alt="المركز الوطني للتعليم الإلكتروني - National eLearning Center"
              className="h-32 w-auto"
              loading="lazy"
            />
          </div>

          {/* Center Content */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl px-4 font-bold text-foreground leading-tight">
              نفتخر بأننا منصة مؤهلة من المركز
              <br />
              الوطني للتعليم الإلكتروني.
            </h2>
          </div>

          {/* Bottom Left Image */}
          <div className="absolute bottom-0 -left-4">
            <img
              src="/assets/images/launch-academy/national_eLearning_center.png"
              alt="المركز الوطني للتعليم الإلكتروني - National eLearning Center"
              className="h-32 w-auto"
              loading="lazy"
            />
          </div>
          <div>
            <img
              src="/assets/images/launch-academy/national_eLearning_center-certification.png"
              alt="المركز الوطني للتعليم الإلكتروني - National eLearning Center"
              className="h-14 w-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certification;
