import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    id: crypto.randomUUID(),
    question: "كيف يمكنني إنشاء أكاديميتي الخاصة على منصة سيان؟",
    answer:
      "يمكنك إنشاء أكاديميتك الخاصة بسهولة من خلال التسجيل على المنصة واختيار الباقة المناسبة لاحتياجاتك، ثم اتباع خطوات الإعداد البسيطة التي تتضمن تخصيص الملف التعريفي، وإضافة المحتوى التعليمي، وتعيين المدربين والإداريين إذا لزم الأمر.",
  },
  {
    id: crypto.randomUUID(),
    question: "ما نوع المحتوى الذي يمكنني تقديمه عبر أكاديميتي؟",
    answer:
      "تتيح لك منصة سيان تقديم مجموعة متنوعة من المحتوى التعليمي بما في ذلك مقاطع الفيديو، والملفات الصوتية، والعروض التقديمية، والمستندات النصية، والاختبارات التفاعلية، ودورات تدريبية كاملة. كما يمكنك تنظيم المحتوى في وحدات ودروس لتسهيل عملية التعلم.",
  },
  {
    id: crypto.randomUUID(),
    question: "هل تقدم المنصة شهادات معتمدة؟",
    answer:
      "نعم، منصة سيان معتمدة من المركز الوطني للتعليم الإلكتروني في المملكة العربية السعودية، مما يتيح لك إصدار شهادات معتمدة للمتعلمين بعد إكمال الدورات التدريبية بنجاح. هذه الشهادات معترف بها رسمياً وتضيف قيمة حقيقية لمحتواك التعليمي.",
  },
  {
    id: crypto.randomUUID(),
    question: "هل توجد عمولة على مبيعات الدورات؟",
    answer:
      "تعتمد العمولة على نوع الباقة التي تشترك بها. الباقة المجانية تحتوي على نسبة عمولة أعلى، بينما تقل هذه النسبة في الباقات المدفوعة. يمكنك الاطلاع على تفاصيل العمولات المحددة لكل باقة من صفحة التسعير، وتختلف النسب بحسب حجم الأكاديمية ومستوى الاشتراك.",
  },
];
function FAQs() {
  return (
    <section id="faq" className="py-10 md:py-14 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start justify-between mb-10">
          <div className="md:w-2/5 mb-10 md:mb-0 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground flex items-end gap-2">
              <span className="leading-tight">
                الأسئلة <br />
                الشائعة
              </span>
              <span className="text-primary text-7xl ml-4">؟</span>
            </h2>
            <span className="text-lg font-medium text-muted-foreground">
              إجابات شاملة على أكثر الأسئلة تكراراً
            </span>
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
