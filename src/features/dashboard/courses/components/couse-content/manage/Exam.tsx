import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { FileQuestion, Plus, Trash2 } from "lucide-react";
import type { Lesson } from "@/types/couse";

function Exam({ lesson }: { lesson: Lesson }) {
  type Question =
    | {
        id: number;
        type: "mcq";
        question: string;
        options: string[];
        correctAnswer: number;
      }
    | {
        id: number;
        type: "qa";
        question: string;
        answer: string;
      };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestionType, setNewQuestionType] = useState<"mcq" | "qa">("mcq");
  const [examTitle, setExamTitle] = useState(lesson?.title || "");

  const handleAddQuestion = () => {
    if (newQuestionType === "mcq") {
      const newQuestion: Question = {
        id: Date.now(),
        type: "mcq",
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      };
      setQuestions((prev) => [...prev, newQuestion]);
    } else {
      const newQuestion: Question = {
        id: Date.now(),
        type: "qa",
        question: "",
        answer: "",
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }
  };

  const handleDeleteQuestion = (questionId: number) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const updateQuestion = (questionId: number, updates: Partial<Question>) => {
    const updated = questions.map((q) => {
      if (q.id !== questionId) return q;
      if (q.type === "mcq" && updates.type !== "qa") {
        return {
          ...q,
          ...(updates as Partial<Extract<Question, { type: "mcq" }>>),
        };
      }
      if (q.type === "qa" && updates.type !== "mcq") {
        return {
          ...q,
          ...(updates as Partial<Extract<Question, { type: "qa" }>>),
        };
      }
      return q;
    });
    setQuestions(updated);
  };

  const updateMCQOption = (
    questionId: number,
    optionIndex: number,
    value: string
  ) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.type === "mcq") {
      const newOptions = [...question.options];
      newOptions[optionIndex] = value;
      updateQuestion(questionId, { options: newOptions });
    }
  };

  const mcqQuestions = questions.filter((q) => q.type === "mcq");
  const qaQuestions = questions.filter((q) => q.type === "qa");

  return (
    <Card className="p-6 shadow-sm border-0 h-fit">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <FileQuestion className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">إنشاء اختبار</h3>
        </div>

        {/* Edit Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            عنوان الاختبار
          </label>
          <Input
            value={examTitle}
            onChange={(e) => setExamTitle(e.target.value)}
            placeholder="أدخل عنوان الاختبار"
            className="border-gray-200 focus:border-blue-500"
          />
        </div>

        {/* Question Controls */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">
              نوع السؤال:
            </span>
            <Select
              value={newQuestionType}
              onValueChange={(value: "mcq" | "qa") => setNewQuestionType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر نوع السؤال" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">اختيار من متعدد</SelectItem>
                <SelectItem value="qa">سؤال وجواب</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleAddQuestion}
          >
            <Plus className="w-4 h-4 ml-1" />
            إضافة سؤال
          </Button>
        </div>

        {/* Questions Summary */}
        {questions.length > 0 && (
          <div className="flex gap-4 text-sm text-gray-600">
            <span>إجمالي الأسئلة: {questions.length}</span>
            <span>اختيار من متعدد: {mcqQuestions.length}</span>
            <span>سؤال وجواب: {qaQuestions.length}</span>
          </div>
        )}

        {/* All Questions Display */}
        <div className="space-y-6">
          {questions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <FileQuestion className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">لا توجد أسئلة في الاختبار</p>
              <p className="text-xs text-gray-400 mt-1">
                اضغط على "إضافة سؤال" لبدء إنشاء الاختبار
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-800">
                أسئلة الاختبار ({questions.length})
              </h4>

              <Accordion type="single" collapsible className="w-full">
                {questions.map((question, globalIndex) => (
                  <AccordionItem
                    key={question.id}
                    value={`question-${question.id}`}
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full mr-4">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-gray-800">
                            السؤال {globalIndex + 1}
                          </span>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              question.type === "mcq"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {question.type === "mcq"
                              ? "اختيار من متعدد"
                              : "سؤال وجواب"}
                          </span>
                          {question.question && (
                            <span className="text-sm text-gray-500 truncate max-w-xs">
                              {question.question.substring(0, 50)}
                              {question.question.length > 50 ? "..." : ""}
                            </span>
                          )}
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="text-xs px-2 py-1 ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteQuestion(question.id);
                          }}
                        >
                          <Trash2 className="w-3 h-3 ml-1" />
                          حذف
                        </Button>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pb-4">
                      <div className="space-y-4 pt-2">
                        {/* Question Input */}
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            نص السؤال
                          </label>
                          <Input
                            value={question.question}
                            onChange={(e) =>
                              updateQuestion(question.id, {
                                question: e.target.value,
                              })
                            }
                            placeholder="اكتب نص السؤال هنا..."
                            className="w-full"
                          />
                        </div>

                        {/* MCQ Options */}
                        {question.type === "mcq" && (
                          <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">
                              الخيارات
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {question.options.map((option, optIdx) => (
                                <div key={optIdx} className="space-y-1">
                                  <label className="text-xs text-gray-500">
                                    الخيار {optIdx + 1}
                                  </label>
                                  <Input
                                    value={option}
                                    onChange={(e) =>
                                      updateMCQOption(
                                        question.id,
                                        optIdx,
                                        e.target.value
                                      )
                                    }
                                    placeholder={`الخيار ${optIdx + 1}`}
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Correct Answer Selection */}
                            <div className="flex items-center gap-2">
                              <label className="text-sm font-medium text-gray-700">
                                الإجابة الصحيحة:
                              </label>
                              <Select
                                value={question.correctAnswer.toString()}
                                onValueChange={(value) =>
                                  updateQuestion(question.id, {
                                    correctAnswer: Number(value),
                                  })
                                }
                              >
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="اختر الإجابة" />
                                </SelectTrigger>
                                <SelectContent>
                                  {question.options.map((_, optIdx) => (
                                    <SelectItem
                                      key={optIdx}
                                      value={optIdx.toString()}
                                    >
                                      الخيار {optIdx + 1}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}

                        {/* Q&A Answer */}
                        {question.type === "qa" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              الإجابة المتوقعة
                            </label>
                            <Input
                              value={question.answer}
                              onChange={(e) =>
                                updateQuestion(question.id, {
                                  answer: e.target.value,
                                })
                              }
                              placeholder="اكتب الإجابة المتوقعة هنا..."
                            />
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t">
          <div className="flex gap-3">
            <Button
              type="button"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => {
                console.log("Saving exam:", { title: examTitle, questions });
                // Add your save logic here
              }}
              disabled={questions.length === 0 || !examTitle.trim()}
            >
              حفظ الاختبار ({questions.length} سؤال)
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQuestions([]);
                setExamTitle("");
              }}
              disabled={questions.length === 0}
            >
              مسح الكل
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Exam;
