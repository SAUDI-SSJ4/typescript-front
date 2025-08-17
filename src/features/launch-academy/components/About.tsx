function About() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
              <span>🎯</span>
              <span className="text-sm font-medium text-primary">
                الفرصة الذهبية
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              لماذا <span className="text-primary">الآن</span> الوقت المثالي؟
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  📈 السوق في نمو متسارع
                </h3>
                <p className="text-muted-foreground">
                  سوق التعليم الإلكتروني في السعودية ينمو بنسبة 25% سنوياً.
                  الطلب على التعلم الرقمي في أعلى مستوياته والجميع يبحث عن محتوى
                  عالي الجودة.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  💰 دخل سلبي مضمون
                </h3>
                <p className="text-muted-foreground">
                  أنشئ دورتك مرة واحدة واكسب منها مدى الحياة. لا حدود لعدد
                  الطلاب أو المبيعات. كل دقيقة تستثمرها اليوم ستحقق لك عائداً
                  لسنوات قادمة.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  🚀 تقنيات متطورة بدون تعقيد
                </h3>
                <p className="text-muted-foreground">
                  ذكاء اصطناعي يساعدك في إدارة المحتوى والتسويق التلقائي لزيادة
                  مبيعاتك.
                </p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src="/assets/images/launch-academy/about.png"
              alt="About Us"
              className="w-full max-w-lg h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
