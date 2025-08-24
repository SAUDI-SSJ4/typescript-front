import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  ClipboardCheck, 
  User, 
  Calendar, 
  Clock, 
  Award,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";

// Types for exam details
interface ExamQuestion {
  id: number;
  question: string;
  type: "multiple-choice" | "true-false" | "essay";
  options?: string[];
  correctAnswer: string | number;
  studentAnswer: string | number | null;
  isCorrect: boolean;
  points: number;
}

interface ExamDetails {
  id: number;
  examName: string;
  courseName: string;
  studentName: string;
  studentImage: string;
  examType: string;
  score: number;
  maxScore: number;
  completionDate: string;
  duration: string;
  timeSpent: string;
  passingScore: number;
  isPassed: boolean;
  questions: ExamQuestion[];
}

// Mock data for exam details
const mockExamDetails: Record<string, ExamDetails> = {
  "1": {
    id: 1,
    examName: "اختبار البرمجة النهائي",
    courseName: "دورة البرمجة المتقدمة",
    studentName: "أحمد محمد السعيد",
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    examType: "نهائي",
    score: 87,
    maxScore: 100,
    completionDate: "2024-08-15",
    duration: "120 دقيقة",
    timeSpent: "95 دقيقة",
    passingScore: 70,
    isPassed: true,
    questions: [
      {
        id: 1,
        question: "ما هو التعريف الصحيح للبرمجة الكائنية (Object-Oriented Programming)؟",
        type: "multiple-choice",
        options: [
          "نمط برمجة يعتمد على الدوال فقط",
          "نمط برمجة يعتمد على الكائنات والكلاسات",
          "نمط برمجة يعتمد على قواعد البيانات",
          "نمط برمجة يعتمد على الشبكات"
        ],
        correctAnswer: 1,
        studentAnswer: 1,
        isCorrect: true,
        points: 10
      },
      {
        id: 2,
        question: "هل يمكن للكلاس في JavaScript أن يرث من كلاس آخر؟",
        type: "true-false",
        options: ["صحيح", "خطأ"],
        correctAnswer: 0,
        studentAnswer: 0,
        isCorrect: true,
        points: 5
      },
      {
        id: 3,
        question: "اشرح الفرق بين let و var في JavaScript",
        type: "essay",
        correctAnswer: "let له block scope بينما var له function scope",
        studentAnswer: "let يستخدم في ES6 وله نطاق محدود داخل البلوك، بينما var له نطاق أوسع في الدالة",
        isCorrect: true,
        points: 15
      },
      {
        id: 4,
        question: "أي من هذه المفاهيم ليس من مبادئ البرمجة الكائنية؟",
        type: "multiple-choice",
        options: [
          "التغليف (Encapsulation)",
          "الوراثة (Inheritance)",
          "التعدد الشكلي (Polymorphism)",
          "التسلسل (Recursion)"
        ],
        correctAnswer: 3,
        studentAnswer: 2,
        isCorrect: false,
        points: 10
      },
      {
        id: 5,
        question: "هل يدعم JavaScript البرمجة الكائنية؟",
        type: "true-false",
        options: ["صحيح", "خطأ"],
        correctAnswer: 0,
        studentAnswer: null,
        isCorrect: false,
        points: 5
      }
    ]
  }
};

function ExamDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const exam = id ? mockExamDetails[id] : null;

  if (!exam) {
    return (
      <div className="space-y-6">
        <DashboardPageHeader
          icon={ClipboardCheck}
          title="تفاصيل الاختبار"
          actions={
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/exam-statistics")}
              className="gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              العودة للإحصائيات
            </Button>
          }
        />
        <div className="bg-white rounded-lg p-8 text-center">
          <p className="text-gray-500">لم يتم العثور على الاختبار</p>
        </div>
      </div>
    );
  }

  const answeredQuestions = exam.questions.filter(q => q.studentAnswer !== null).length;
  const correctAnswers = exam.questions.filter(q => q.isCorrect).length;

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={ClipboardCheck}
        title="تفاصيل الاختبار"
        actions={
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/exam-statistics")}
            className="gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للإحصائيات
          </Button>
        }
      />

      {/* Exam Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <img
              src={exam.studentImage}
              alt={exam.studentName}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{exam.examName}</h2>
              <p className="text-gray-600">{exam.courseName}</p>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                <User className="w-4 h-4" />
                {exam.studentName}
              </p>
            </div>
          </div>
          <Badge className={exam.isPassed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {exam.isPassed ? "نجح" : "رسب"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{exam.score}/{exam.maxScore}</div>
            <div className="text-sm text-gray-600">الدرجة النهائية</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{correctAnswers}/{exam.questions.length}</div>
            <div className="text-sm text-gray-600">الإجابات الصحيحة</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{answeredQuestions}/{exam.questions.length}</div>
            <div className="text-sm text-gray-600">الأسئلة المجابة</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{((exam.score / exam.maxScore) * 100).toFixed(1)}%</div>
            <div className="text-sm text-gray-600">النسبة المئوية</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(exam.completionDate).toLocaleDateString("ar-SA")}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            مدة الاختبار: {exam.duration}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            الوقت المستغرق: {exam.timeSpent}
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            درجة النجاح: {exam.passingScore}
          </div>
        </div>
      </div>

      {/* Questions and Answers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">الأسئلة والأجوبة</h3>
        
        {exam.questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {question.studentAnswer === null ? (
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                ) : question.isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">
                    السؤال {index + 1}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{question.points} نقاط</Badge>
                    <Badge className={
                      question.type === "multiple-choice" ? "bg-blue-100 text-blue-800" :
                      question.type === "true-false" ? "bg-green-100 text-green-800" :
                      "bg-purple-100 text-purple-800"
                    }>
                      {question.type === "multiple-choice" ? "اختيار متعدد" :
                       question.type === "true-false" ? "صحيح/خطأ" : "مقالي"}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{question.question}</p>
                
                {question.type === "multiple-choice" && question.options && (
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border-2 ${
                          optionIndex === question.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : optionIndex === question.studentAnswer
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{option}</span>
                          <div className="flex gap-2">
                            {optionIndex === question.correctAnswer && (
                              <Badge className="bg-green-100 text-green-800 text-xs">الإجابة الصحيحة</Badge>
                            )}
                            {optionIndex === question.studentAnswer && (
                              <Badge className={
                                question.isCorrect 
                                  ? "bg-green-100 text-green-800 text-xs" 
                                  : "bg-red-100 text-red-800 text-xs"
                              }>
                                إجابة الطالب
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {question.type === "true-false" && question.options && (
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border-2 ${
                          optionIndex === question.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : optionIndex === question.studentAnswer
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{option}</span>
                          <div className="flex gap-2">
                            {optionIndex === question.correctAnswer && (
                              <Badge className="bg-green-100 text-green-800 text-xs">الإجابة الصحيحة</Badge>
                            )}
                            {optionIndex === question.studentAnswer && (
                              <Badge className={
                                question.isCorrect 
                                  ? "bg-green-100 text-green-800 text-xs" 
                                  : "bg-red-100 text-red-800 text-xs"
                              }>
                                إجابة الطالب
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {question.type === "essay" && (
                  <div className="space-y-3 mb-4">
                    <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">الإجابة النموذجية:</h5>
                      <p className="text-green-700 text-sm">{question.correctAnswer}</p>
                    </div>
                    
                    <div className={`p-4 rounded-lg border-2 ${
                      question.isCorrect 
                        ? "border-green-200 bg-green-50" 
                        : "border-red-200 bg-red-50"
                    }`}>
                      <h5 className={`font-medium mb-2 ${
                        question.isCorrect ? "text-green-800" : "text-red-800"
                      }`}>
                        إجابة الطالب:
                      </h5>
                      <p className={`text-sm ${
                        question.isCorrect ? "text-green-700" : "text-red-700"
                      }`}>
                        {question.studentAnswer || "لم يجب الطالب على هذا السؤال"}
                      </p>
                    </div>
                  </div>
                )}
                
                {question.studentAnswer === null && (
                  <div className="p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                    <p className="text-yellow-700 text-sm">لم يجب الطالب على هذا السؤال</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamDetailsPage;