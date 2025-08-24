import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  FileQuestion,
  Code,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Clock,
  PlayCircle
} from "lucide-react";
import type { Quiz, QuizQuestion, CodingChallenge } from "@/types/live-stream";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendQuiz: (quiz: Quiz) => void;
  onSendCodingChallenge?: (challenge: CodingChallenge) => void;
  existingQuizzes?: Quiz[];
}

export function QuizModal({
  isOpen,
  onClose,
  onSendQuiz,
  onSendCodingChallenge,
  existingQuizzes = []
}: QuizModalProps) {
  const [step, setStep] = useState<'select' | 'create' | 'coding' | 'preview'>('select');
  const [quizType, setQuizType] = useState<'multiple-choice' | 'coding'>('multiple-choice');
  const [selectedExistingQuiz, setSelectedExistingQuiz] = useState<string>("");
  
  const [newQuiz, setNewQuiz] = useState<Omit<Quiz, 'id' | 'isActive' | 'results'>>({
    title: '',
    description: '',
    type: 'multiple-choice',
    timeLimit: 10,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState<Omit<QuizQuestion, 'id'>>({
    type: 'multiple-choice',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 1
  });

  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  const [codingChallenge, setCodingChallenge] = useState<Omit<CodingChallenge, 'id'>>({
    title: '',
    description: '',
    initialCode: '',
    expectedOutput: '',
    testCases: [],
    difficulty: 'easy',
    tags: [],
    timeLimit: 30
  });

  const resetState = () => {
    setStep('select');
    setQuizType('multiple-choice');
    setSelectedExistingQuiz("");
    setNewQuiz({
      title: '',
      description: '',
      type: 'multiple-choice',
      timeLimit: 10,
      questions: []
    });
    setCurrentQuestion({
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      points: 1
    });
    setEditingQuestionIndex(null);
    setCodingChallenge({
      title: '',
      description: '',
      initialCode: '',
      expectedOutput: '',
      testCases: [],
      difficulty: 'easy',
      tags: [],
      timeLimit: 30
    });
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const startQuizCreation = (type: 'multiple-choice' | 'coding') => {
    setQuizType(type);
    if (type === 'coding') {
      setStep('coding');
    } else {
      setStep('create');
      setNewQuiz(prev => ({ ...prev, type }));
      setCurrentQuestion(prev => ({ ...prev, type }));
    }
  };

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) return;
    
    const questionToAdd = {
      ...currentQuestion,
      id: Date.now().toString()
    };

    if (editingQuestionIndex !== null) {
      const updatedQuestions = [...newQuiz.questions];
      updatedQuestions[editingQuestionIndex] = questionToAdd;
      setNewQuiz(prev => ({ ...prev, questions: updatedQuestions }));
      setEditingQuestionIndex(null);
    } else {
      setNewQuiz(prev => ({ ...prev, questions: [...prev.questions, questionToAdd] }));
    }

    // Reset current question
    setCurrentQuestion({
      type: newQuiz.type as QuizQuestion['type'],
      question: '',
      options: newQuiz.type === 'multiple-choice' ? ['', '', '', ''] : undefined,
      correctAnswer: newQuiz.type === 'multiple-choice' ? 0 : undefined,
      code: newQuiz.type === 'coding' ? '' : undefined,
      expectedOutput: newQuiz.type === 'coding' ? '' : undefined,
      points: 1
    });
  };

  const editQuestion = (index: number) => {
    setCurrentQuestion(newQuiz.questions[index]);
    setEditingQuestionIndex(index);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = newQuiz.questions.filter((_, i) => i !== index);
    setNewQuiz(prev => ({ ...prev, questions: updatedQuestions }));
  };

  const updateQuizOption = (index: number, value: string) => {
    const updatedOptions = [...(currentQuestion.options || [])];
    updatedOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: updatedOptions }));
  };

  const handleSendQuiz = () => {
    if (selectedExistingQuiz) {
      const quiz = existingQuizzes.find(q => q.id === selectedExistingQuiz);
      if (quiz) {
        onSendQuiz(quiz);
      }
    } else {
      const quiz: Quiz = {
        ...newQuiz,
        id: Date.now().toString(),
        isActive: true,
        startTime: new Date().toISOString()
      };
      onSendQuiz(quiz);
    }
    handleClose();
  };

  const handleSendCodingChallenge = () => {
    if (onSendCodingChallenge) {
      const challenge: CodingChallenge = {
        ...codingChallenge,
        id: Date.now().toString()
      };
      onSendCodingChallenge(challenge);
    }
    handleClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-noto">
            {step === 'select' && 'إرسال اختبار للطلاب'}
            {step === 'create' && `إنشاء اختبار ${quizType === 'multiple-choice' ? 'اختيار من متعدد' : 'برمجي'}`}
            {step === 'coding' && 'إنشاء تحدي برمجي'}
            {step === 'preview' && 'معاينة الاختبار'}
          </DialogTitle>
        </DialogHeader>
        
        {/* Step 1: Selection */}
        {step === 'select' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Multiple Choice Quiz */}
              <Button
                onClick={() => startQuizCreation('multiple-choice')}
                className="w-full justify-start h-auto p-6"
                variant="outline"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium font-noto text-lg">اختبار اختيار من متعدد</h4>
                    <p className="text-sm text-gray-500 font-noto">أسئلة مع خيارات متعددة وإجابة واحدة صحيحة</p>
                  </div>
                </div>
              </Button>
              
              {/* Coding Challenge */}
              <Button
                onClick={() => startQuizCreation('coding')}
                className="w-full justify-start h-auto p-6"
                variant="outline"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Code className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium font-noto text-lg">تحدي برمجي</h4>
                    <p className="text-sm text-gray-500 font-noto">تحديات برمجية مع كود للاختبار</p>
                  </div>
                </div>
              </Button>
            </div>
            
            {existingQuizzes.length > 0 && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500 font-noto">أو</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700 font-noto">
                    اختيار من الاختبارات السابقة:
                  </Label>
                  <Select value={selectedExistingQuiz} onValueChange={setSelectedExistingQuiz}>
                    <SelectTrigger className="font-noto">
                      <SelectValue placeholder="اختر اختبار..." />
                    </SelectTrigger>
                    <SelectContent>
                      {existingQuizzes.map((quiz) => (
                        <SelectItem key={quiz.id} value={quiz.id}>
                          <div className="flex items-center gap-2">
                            <FileQuestion className="w-4 h-4" />
                            <div>
                              <div className="font-medium font-noto">{quiz.title}</div>
                              <div className="text-xs text-gray-500 font-noto">
                                {quiz.questions.length} أسئلة • {quiz.timeLimit} دقيقة
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedExistingQuiz && (
                    <Button
                      onClick={handleSendQuiz}
                      className="w-full font-noto"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      إرسال الاختبار المحدد
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Create Quiz */}
        {step === 'create' && (
          <div className="space-y-6">
            {/* Quiz Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quiz-title" className="font-noto">عنوان الاختبار</Label>
                <Input
                  id="quiz-title"
                  placeholder="مثال: اختبار React الأساسي"
                  value={newQuiz.title}
                  onChange={(e) => setNewQuiz(prev => ({ ...prev, title: e.target.value }))}
                  className="font-noto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-limit" className="font-noto">المدة الزمنية (دقيقة)</Label>
                <Input
                  id="time-limit"
                  type="number"
                  min="1"
                  max="60"
                  value={newQuiz.timeLimit}
                  onChange={(e) => setNewQuiz(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 10 }))}
                  className="font-noto"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quiz-description" className="font-noto">وصف الاختبار</Label>
              <Textarea
                id="quiz-description"
                placeholder="وصف مختصر عن محتوى الاختبار..."
                value={newQuiz.description}
                onChange={(e) => setNewQuiz(prev => ({ ...prev, description: e.target.value }))}
                className="font-noto"
                rows={2}
              />
            </div>

            {/* Questions List */}
            {newQuiz.questions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium font-noto">الأسئلة المضافة ({newQuiz.questions.length})</h4>
                <div className="space-y-2">
                  {newQuiz.questions.map((question, index) => (
                    <div key={question.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {question.type === 'multiple-choice' ? 'اختيار متعدد' : 'برمجي'}
                          </Badge>
                          <span className="text-sm text-gray-500">{question.points} نقطة</span>
                        </div>
                        <p className="text-sm font-noto text-gray-800 truncate">{question.question}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => editQuestion(index)}
                        >
                          تعديل
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteQuestion(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Question Form */}
            <div className="border rounded-lg p-4 space-y-4">
              <h4 className="font-medium font-noto">
                {editingQuestionIndex !== null ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
              </h4>
              
              <div className="space-y-2">
                <Label className="font-noto">نص السؤال</Label>
                <Textarea
                  placeholder="اكتب السؤال هنا..."
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                  className="font-noto"
                  rows={2}
                />
              </div>

              {currentQuestion.type === 'multiple-choice' && (
                <div className="space-y-3">
                  <Label className="font-noto">الخيارات</Label>
                  {currentQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correct-answer"
                          checked={currentQuestion.correctAnswer === index}
                          onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: index }))}
                          className="text-green-600"
                        />
                        <span className="text-sm text-gray-600">صحيح</span>
                      </div>
                      <Input
                        placeholder={`الخيار ${index + 1}`}
                        value={option}
                        onChange={(e) => updateQuizOption(index, e.target.value)}
                        className="font-noto"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label className="font-noto">النقاط:</Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={currentQuestion.points}
                    onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 1 }))}
                    className="w-20"
                  />
                </div>
                <div className="flex gap-2 mr-auto">
                  {editingQuestionIndex !== null && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEditingQuestionIndex(null);
                        setCurrentQuestion({
                          type: newQuiz.type as QuizQuestion['type'],
                          question: '',
                          options: newQuiz.type === 'multiple-choice' ? ['', '', '', ''] : undefined,
                          correctAnswer: newQuiz.type === 'multiple-choice' ? 0 : undefined,
                          points: 1
                        });
                      }}
                    >
                      إلغاء
                    </Button>
                  )}
                  <Button
                    onClick={addQuestion}
                    disabled={!currentQuestion.question.trim()}
                    className="font-noto"
                  >
                    {editingQuestionIndex !== null ? 'حفظ التعديل' : 'إضافة السؤال'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep('select')}
                className="font-noto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                رجوع
              </Button>
              <Button
                onClick={() => setStep('preview')}
                disabled={newQuiz.questions.length === 0 || !newQuiz.title.trim()}
                className="font-noto"
              >
                معاينة الاختبار
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Coding Challenge */}
        {step === 'coding' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-noto">عنوان التحدي</Label>
                <Input
                  placeholder="مثال: إنشاء مكون Counter"
                  value={codingChallenge.title}
                  onChange={(e) => setCodingChallenge(prev => ({ ...prev, title: e.target.value }))}
                  className="font-noto"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-noto">المستوى</Label>
                <Select 
                  value={codingChallenge.difficulty} 
                  onValueChange={(value: 'easy' | 'medium' | 'hard') => 
                    setCodingChallenge(prev => ({ ...prev, difficulty: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">سهل</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="hard">صعب</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-noto">وصف التحدي</Label>
              <Textarea
                placeholder="اشرح ما هو مطلوب من الطلاب..."
                value={codingChallenge.description}
                onChange={(e) => setCodingChallenge(prev => ({ ...prev, description: e.target.value }))}
                className="font-noto"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-noto">الكود الأولي</Label>
                <Textarea
                  placeholder="const solution = () => {&#10;  // اكتب الكود هنا&#10;};"
                  value={codingChallenge.initialCode}
                  onChange={(e) => setCodingChallenge(prev => ({ ...prev, initialCode: e.target.value }))}
                  className="font-noto font-mono text-sm"
                  rows={8}
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-noto">النتيجة المتوقعة</Label>
                <Textarea
                  placeholder="النتيجة المتوقعة من تشغيل الكود"
                  value={codingChallenge.expectedOutput}
                  onChange={(e) => setCodingChallenge(prev => ({ ...prev, expectedOutput: e.target.value }))}
                  className="font-noto font-mono text-sm"
                  rows={8}
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep('select')}
                className="font-noto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                رجوع
              </Button>
              <Button
                onClick={handleSendCodingChallenge}
                disabled={!codingChallenge.title.trim() || !codingChallenge.description.trim()}
                className="bg-green-600 hover:bg-green-700 font-noto"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                إرسال التحدي
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Preview */}
        {step === 'preview' && (
          <div className="space-y-6">
            {/* Quiz Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium font-noto text-lg mb-2">{newQuiz.title}</h3>
              {newQuiz.description && (
                <p className="text-sm text-gray-600 font-noto mb-3">{newQuiz.description}</p>
              )}
              <div className="flex gap-4 text-sm text-gray-600">
                <span className="font-noto">📝 {newQuiz.questions.length} سؤال</span>
                <span className="font-noto">⏱️ {newQuiz.timeLimit} دقيقة</span>
                <span className="font-noto">🎯 {newQuiz.questions.reduce((sum, q) => sum + q.points, 0)} نقطة</span>
              </div>
            </div>

            {/* Questions Preview */}
            <div className="space-y-4">
              <h4 className="font-medium font-noto">الأسئلة:</h4>
              {newQuiz.questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      س{index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="font-noto text-gray-800 mb-2">{question.question}</p>
                      
                      {question.type === 'multiple-choice' && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded border-2 ${
                                question.correctAnswer === optionIndex 
                                  ? 'bg-green-100 border-green-500' 
                                  : 'border-gray-300'
                              }`}>
                                {question.correctAnswer === optionIndex && (
                                  <CheckCircle className="w-3 h-3 text-green-600" />
                                )}
                              </div>
                              <span className="text-sm font-noto">{option}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {question.points} نقطة
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Launch Controls */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep('create')}
                className="font-noto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                تعديل
              </Button>
              <Button
                onClick={handleSendQuiz}
                className="bg-green-600 hover:bg-green-700 font-noto"
              >
                🚀 إطلاق الاختبار
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}