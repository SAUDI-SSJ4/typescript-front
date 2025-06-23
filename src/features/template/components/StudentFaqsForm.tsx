import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  studentFaqSchema,
  type StudentFaqFormData,
} from "@/validations/template";

function StudentFaqsForm() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StudentFaqFormData>({
    resolver: zodResolver(studentFaqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const onSubmit = async (data: StudentFaqFormData) => {
    try {
      console.log("Student FAQ Data:", data);
      // TODO: Add your API call here to submit the FAQ
      // await submitFaq(data);

      setOpen(false);
      reset();
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
          <PlusCircle />
          إضافة سؤال شائع جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-bold">
            إضافة سؤال شائع جديد
          </DialogTitle>
          <DialogDescription className="text-right text-gray-600">
            قم بإضافة سؤال شائع مع إجابته التفصيلية
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Question Field */}
          <div className="space-y-2">
            <Label htmlFor="question" className="text-right block">
              السؤال الشائع
            </Label>
            <Input
              id="question"
              {...register("question")}
              placeholder="مثال: ما هي مدة المادة التعليمية"
              className="text-right"
              dir="rtl"
            />
            {errors.question && (
              <span className="text-red-500 text-sm text-right block">
                {errors.question.message}
              </span>
            )}
          </div>

          {/* Answer Field */}
          <div className="space-y-2">
            <Label htmlFor="answer" className="text-right block">
              الإجابة التفصيلية
            </Label>
            <Textarea
              id="answer"
              {...register("answer")}
              placeholder="اكتب إجابة شاملة ومفصلة للسؤال..."
              className="text-right min-h-[120px]"
              dir="rtl"
            />
            {errors.answer && (
              <span className="text-red-500 text-sm text-right block">
                {errors.answer.message}
              </span>
            )}
            <p className="text-sm text-gray-500 text-right">
              قدم إجابة واضحة ومفصلة تساعد المستخدمين على فهم الموضوع
            </p>
          </div>

          <DialogFooter className="flex gap-2 justify-start">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري الحفظ..." : "حفظ السؤال"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default StudentFaqsForm;
