import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

function FAQs({
  faqItems,
}: {
  faqItems: { id: string; question: string; answer: string }[];
}) {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12">
          <div className="md:w-2/5 mb-10 md:mb-0 space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground flex items-end gap-2">
              <span className="leading-tight">
                <span className="text-primary">الأسئلة</span> <br />
                الشائعة
              </span>
              <span className="text-primary text-5xl ml-4">؟</span>
            </h2>
            <div
              style={{ background: "rgba(0, 98, 255, 0.15)" }}
              className="flex justify-center rounded-[16px] w-fit px-4 sm:px-8 py-4 gap-4"
            >
              <img
                src="/assets/icons/sound.svg"
                alt="Icon"
                className="w-6 h-6"
                loading="lazy"
              />
              <span className="text-lg font-medium text-foreground">
                إذا لديك سؤال اطلب دعم فني
              </span>
            </div>
          </div>
          <div className="md:w-3/5">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  style={{ boxShadow: "0px 0px 25px rgba(0, 60, 86, 0.03)" }}
                  className="mb-4 bg-white rounded-[32px] overflow-hidden border-none [&>div>svg]:hidden !shadow-sm"
                >
                  <AccordionTrigger className="text-base sm:text-lg text-foreground md:text-xl font-medium py-6 px-6 text-right group">
                    <div className="flex flex-row-reverse justify-between items-center w-full">
                      <div className="h-10 w-10 bg-[#F7F7FF] rounded-full element-center group-data-[state=open]:bg-primary group-data-[state=open]:text-white group-data-[state=open]:rotate-180 transition-all duration-200">
                        <ChevronDown />
                      </div>
                      <span className="flex-1">{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 px-6 pb-6 pt-0 text-right leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
