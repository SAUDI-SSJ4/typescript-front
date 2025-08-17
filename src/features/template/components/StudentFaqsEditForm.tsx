import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { useUpdateFAQ } from "../hooks/useFAQsMutations";
import type { FAQ } from "@/types/faq";

interface StudentFaqsEditFormProps {
  faq: FAQ | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StudentFaqsEditForm = ({ faq, open, onOpenChange }: StudentFaqsEditFormProps) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const updateFAQMutation = useUpdateFAQ();

  // تحميل البيانات عند فتح الفورم
  useEffect(() => {
    if (faq && open) {
      setQuestion(faq.question || "");
      setAnswer(faq.answer || "");
    }
  }, [faq, open]);

  const handleSubmit = async () => {
    if (question.trim() && answer.trim() && faq) {
      try {
        await updateFAQMutation.mutateAsync({
          id: faq.id,
          data: {
            question: question.trim(),
            answer: answer.trim(),
          },
        });
        
        // إغلاق النافذة بعد النجاح
        onOpenChange(false);
      } catch (error) {
        // Error handling is done in the mutation hook
        console.error("Error updating FAQ:", error);
      }
    }
  };

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">تعديل السؤال الشائع</DialogTitle>
          <DialogDescription className="text-right">
            قم بتعديل السؤال والإجابة حسب الحاجة
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-question" className="text-sm font-medium text-card-foreground">
              السؤال
            </Label>
            <Input
              id="edit-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="اكتب السؤال هنا..."
              className="!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border h-10 !bg-transparent"
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-answer" className="text-sm font-medium text-card-foreground">
              الإجابة
            </Label>
            <Textarea
              id="edit-answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="اكتب الإجابة هنا..."
              rows={4}
              className="!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border !bg-transparent resize-none"
              dir="rtl"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1 shadow-sm"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!question.trim() || !answer.trim() || updateFAQMutation.isPending}
            className="flex-1 gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            {updateFAQMutation.isPending ? "جاري التحديث..." : "تحديث السؤال"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentFaqsEditForm; 