import { useState } from "react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, CheckCircle } from "lucide-react";

const StudentFaqsForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = () => {
    if (question.trim() && answer.trim()) {
      // Handle form submission logic here
      console.log("FAQ Data:", { question: question.trim(), answer: answer.trim() });
      
      // Reset form and close dialog
      setQuestion("");
      setAnswer("");
      setIsOpen(false);
    }
  };

  const resetForm = () => {
    setQuestion("");
    setAnswer("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة سؤال جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة سؤال شائع جديد</DialogTitle>
          <DialogDescription className="text-right">
            أضف سؤالاً جديداً مع إجابته ليظهر في قائمة الأسئلة الشائعة
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="question" className="text-sm font-medium text-card-foreground">
              السؤال
            </Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="اكتب السؤال هنا..."
              className="!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border h-10 !bg-transparent"
              dir="rtl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="answer" className="text-sm font-medium text-card-foreground">
              الإجابة
            </Label>
            <Textarea
              id="answer"
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
            onClick={() => {
              resetForm();
              setIsOpen(false);
            }}
            className="flex-1 shadow-sm"
          >
            إلغاء
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!question.trim() || !answer.trim()}
            className="flex-1 gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            إضافة السؤال
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentFaqsForm;
