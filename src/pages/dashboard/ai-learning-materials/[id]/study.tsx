import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowLeft,
  Send,
  Bot
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: string;
}

const mockFlashcards: Flashcard[] = [
  {
    id: "1",
    front: "ما هو تعريف الخوارزمية؟",
    back: "الخوارزمية هي مجموعة من التعليمات المحددة والواضحة لحل مشكلة معينة أو تنفيذ مهمة محددة",
    category: "تعريفات أساسية",
    difficulty: "easy"
  },
  {
    id: "2", 
    front: "ما هي أنواع البيانات الأساسية في البرمجة؟",
    back: "الأنواع الأساسية تشمل: الأعداد الصحيحة (Integer)، الأعداد العشرية (Float)، النصوص (String)، والقيم المنطقية (Boolean)",
    category: "أنواع البيانات",
    difficulty: "medium"
  },
  {
    id: "3",
    front: "ما الفرق بين الحلقة for والحلقة while؟",
    back: "حلقة for تُستخدم عندما نعرف عدد التكرارات مسبقاً، بينما while تُستخدم عندما التكرار يعتمد على شرط معين",
    category: "حلقات التكرار",
    difficulty: "hard"
  }
];

const mockQuizzes: Quiz[] = [
  {
    id: "1",
    question: "أي من التالي يُعتبر من أنواع البيانات الأساسية؟",
    options: ["Array", "String", "Object", "Function"],
    correctAnswer: 1,
    explanation: "String (النص) هو من أنواع البيانات الأساسية، بينما الباقي هي أنواع بيانات مركبة",
    difficulty: "easy"
  },
  {
    id: "2",
    question: "ما هي تعقد الوقت لخوارزمية البحث الخطي؟",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "البحث الخطي يتطلب فحص كل عنصر في أسوأ الحالات، لذلك تعقد الوقت هو O(n)",
    difficulty: "medium"
  },
  {
    id: "3",
    question: "أي من الهياكل التالية يتبع مبدأ LIFO؟",
    options: ["Queue", "Stack", "LinkedList", "Tree"],
    correctAnswer: 1,
    explanation: "Stack (المكدس) يتبع مبدأ LIFO (Last In, First Out) - آخر داخل أول خارج",
    difficulty: "hard"
  }
];

function StudyMaterial() {
  const { id } = useParams();
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      message: "مرحباً! أنا مساعدك الذكي لهذه المادة التعليمية. يمكنني الإجابة على أي سؤال يخص المحتوى. كيف يمكنني مساعدتك؟",
      timestamp: new Date().toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const material = {
    id: id,
    title: "أساسيات البرمجة والخوارزميات",
    summary: `
      تتناول هذه المادة التعليمية الأسس الأساسية للبرمجة والخوارزميات، بدءاً من المفاهيم الأولية وصولاً إلى التطبيقات العملية.
      
      **المحاور الرئيسية:**
      
      1. **مقدمة في البرمجة**
         - تعريف البرمجة والخوارزميات
         - أهمية البرمجة في العصر الحديث
         - لغات البرمجة المختلفة
      
      2. **أنواع البيانات والمتغيرات**
         - الأعداد الصحيحة والعشرية
         - النصوص والمحارف
         - القيم المنطقية
         - المصفوفات والقوائم
      
      3. **هياكل التحكم**
         - الجمل الشرطية (if, else)
         - حلقات التكرار (for, while)
         - بيانات التحكم (break, continue)
      
      4. **الدوال والإجراءات**
         - تعريف الدوال
         - المعاملات والقيم المُرجعة
         - النطاق المحلي والعام
      
      5. **الخوارزميات الأساسية**
         - خوارزميات البحث
         - خوارزميات الترتيب
         - تحليل تعقد الخوارزميات
      
      **التطبيقات العملية:**
      - أمثلة تطبيقية في JavaScript و Python
      - مشاريع صغيرة لتطبيق المفاهيم
      - تمارين تفاعلية
    `,
    progress: 0,
    flashcardsCompleted: 0,
    quizzesCompleted: 0
  };

  const nextFlashcard = () => {
    if (currentFlashcard < mockFlashcards.length - 1) {
      setCurrentFlashcard(currentFlashcard + 1);
      setShowBack(false);
    }
  };

  const prevFlashcard = () => {
    if (currentFlashcard > 0) {
      setCurrentFlashcard(currentFlashcard - 1);
      setShowBack(false);
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === mockQuizzes[currentQuiz].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuiz = () => {
    if (currentQuiz < mockQuizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: newMessage,
      timestamp: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // محاكاة رد الذكاء الاصطناعي
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        message: `شكراً لسؤالك عن "${newMessage}". هذا سؤال ممتاز! بناءً على محتوى المادة التعليمية، يمكنني أن أوضح لك أن هذا المفهوم مرتبط بالأساسيات التي تم شرحها في المادة. هل تريد المزيد من التفاصيل حول هذا الموضوع؟`,
        timestamp: new Date().toISOString()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setNewMessage("");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'سهل';
      case 'medium':
        return 'متوسط';
      case 'hard':
        return 'صعب';
      default:
        return 'غير محدد';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowRight className="w-4 h-4 mr-2" />
            العودة
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{material.title}</h1>
            <p className="text-gray-600">مادة تعليمية مدعومة بالذكاء الاصطناعي</p>
          </div>
          <Badge className="bg-purple-100 text-purple-800">
            <Brain className="w-4 h-4 mr-1" />
            AI Powered
          </Badge>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">التقدم العام</span>
              <span className="text-sm text-gray-600">{material.progress}%</span>
            </div>
            <Progress value={material.progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Content in Single Page */}
        <div className="space-y-8">
          {/* Summary Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                ملخص المادة التعليمية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {material.summary}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flashcards Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                البطاقات التفاعلية
                <Badge variant="outline">{mockFlashcards.length} بطاقة</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-center">
                <div className="text-sm text-gray-600 mb-4">
                  {currentFlashcard + 1} من {mockFlashcards.length}
                </div>
                
                <div className="mb-4">
                  <Badge className={getDifficultyColor(mockFlashcards[currentFlashcard].difficulty)}>
                    {getDifficultyLabel(mockFlashcards[currentFlashcard].difficulty)}
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    {mockFlashcards[currentFlashcard].category}
                  </Badge>
                </div>
                
                <div className="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-lg p-6">
                  {!showBack ? (
                    <div className="text-center">
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        {mockFlashcards[currentFlashcard].front}
                      </h4>
                      <Button 
                        onClick={() => setShowBack(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        إظهار الإجابة
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h4 className="text-lg font-medium text-gray-600 mb-4">
                        {mockFlashcards[currentFlashcard].front}
                      </h4>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <p className="text-gray-900 leading-relaxed">
                          {mockFlashcards[currentFlashcard].back}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={prevFlashcard}
                    disabled={currentFlashcard === 0}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    السابق
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowBack(false)}
                    disabled={!showBack}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    إعادة
                  </Button>

                  <Button
                    variant="outline"
                    onClick={nextFlashcard}
                    disabled={currentFlashcard === mockFlashcards.length - 1}
                  >
                    التالي
                    <ArrowLeft className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  الاختبار التفاعلي
                  <Badge variant="outline">{mockQuizzes.length} أسئلة</Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    السؤال {currentQuiz + 1} من {mockQuizzes.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">{score}/{mockQuizzes.length}</span>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentQuiz < mockQuizzes.length ? (
                <div>
                  <div className="mb-4">
                    <Badge className={getDifficultyColor(mockQuizzes[currentQuiz].difficulty)}>
                      {getDifficultyLabel(mockQuizzes[currentQuiz].difficulty)}
                    </Badge>
                  </div>

                  <h4 className="text-xl font-semibold text-gray-900 mb-6">
                    {mockQuizzes[currentQuiz].question}
                  </h4>

                  <div className="space-y-3 mb-6">
                    {mockQuizzes[currentQuiz].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={showExplanation}
                        className={`w-full p-4 text-right border rounded-lg transition-colors ${
                          selectedAnswer === index
                            ? index === mockQuizzes[currentQuiz].correctAnswer
                              ? 'bg-green-100 border-green-500 text-green-800'
                              : 'bg-red-100 border-red-500 text-red-800'
                            : showExplanation && index === mockQuizzes[currentQuiz].correctAnswer
                            ? 'bg-green-100 border-green-500 text-green-800'
                            : 'bg-white border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                            {String.fromCharCode(65 + index)}
                          </span>
                          {option}
                        </div>
                      </button>
                    ))}
                  </div>

                  {showExplanation && (
                    <div className="p-4 bg-blue-50 rounded-lg mb-4">
                      <h5 className="font-semibold text-blue-900 mb-2">التفسير:</h5>
                      <p className="text-blue-800">{mockQuizzes[currentQuiz].explanation}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={resetQuiz}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      إعادة الاختبار
                    </Button>

                    {showExplanation && currentQuiz < mockQuizzes.length - 1 && (
                      <Button
                        onClick={nextQuiz}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        السؤال التالي
                        <ArrowLeft className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    مبروك! أكملت الاختبار
                  </h3>
                  <p className="text-gray-600 mb-4">
                    نتيجتك: {score} من {mockQuizzes.length} ({Math.round((score/mockQuizzes.length) * 100)}%)
                  </p>
                  <Button
                    onClick={resetQuiz}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    إعادة الاختبار
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <div className="w-96 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            المساعد الذكي
            <Badge className="bg-purple-100 text-purple-800 text-xs">متاح 24/7</Badge>
          </h3>
          <p className="text-sm text-gray-600 mt-1">اسأل أي سؤال عن هذه المادة</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-purple-600 text-white rounded-br-sm'
                    : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.message}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(message.timestamp).toLocaleTimeString('ar-SA', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              placeholder="اكتب سؤالك هنا..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-xs text-gray-500 mt-2 text-center">
            المساعد مدعوم بالذكاء الاصطناعي ومتخصص في محتوى هذه المادة
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyMaterial;
