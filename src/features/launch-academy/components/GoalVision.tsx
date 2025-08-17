import { motion } from "framer-motion";

function GoalVision() {
  const cards = [
    {
      id: 1,
      image: "/assets/images/launch-academy/goal.png",
      alt: "هدفنا",
      title: "هدفنا",
      description:
        "بناء جيل متعلم ومبدع، مجهز بالمعرفة والمهارات لقيادة عصر جديد من التقدم",
    },
    {
      id: 2,
      image: "/assets/images/launch-academy/vision.png",
      alt: "رؤيتنا",
      title: "رؤيتنا",
      description:
        "نؤمن بأن التعليم هو القوة الحقيقية لمستقبل مشرق يسوده الإبداع والابتكار",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container">
        <div className="w-full">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              <span className="text-primary">هدفنا</span> ورؤيتنا
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نسعى لبناء جيل متعلم ومبدع، ونؤمن بأن التعليم هو القوة الحقيقية
              للمستقبل
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Content - Left Side */}
                  <div className="flex-1 text-center md:text-right order-2 md:order-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                      {card.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Image - Right Side */}
                  <div className="flex justify-center order-1 md:order-2">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="w-40 h-40 md:w-48 md:h-48 object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoalVision;
