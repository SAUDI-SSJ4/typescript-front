import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Brain, 
  Code2, 
  Target, 
  Lightbulb,
  Trophy,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import CodeEditor from '@/components/ui/code-editor';

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description: string;
}

interface CodingChallengeProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    instructions: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    language: 'javascript' | 'python' | 'html' | 'css' | 'java' | 'cpp';
    starterCode: string;
    solution: string;
    testCases: TestCase[];
    hints: string[];
    timeLimit?: number; // بالدقائق
  };
  isStudentView?: boolean;
  onSubmit?: (code: string) => Promise<{
    success: boolean;
    feedback: string;
    score: number;
    passedTests: number;
    totalTests: number;
    suggestions?: string[];
  }>;
}

/**
 * مكون التحدي البرمجي التفاعلي مع الذكاء الاصطناعي
 */
const CodingChallenge: React.FC<CodingChallengeProps> = ({
  challenge,
  isStudentView = true,
  onSubmit
}) => {
  const [userCode, setUserCode] = useState(challenge.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [currentHint, setCurrentHint] = useState(0);
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit ? challenge.timeLimit * 60 : 0);
  const [showSolution, setShowSolution] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  // بدء المؤقت
  React.useEffect(() => {
    if (challenge.timeLimit && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [challenge.timeLimit, timeLeft]);

  const handleTimeUp = () => {
    alert('انتهى الوقت المحدد للتحدي!');
    handleSubmit();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'مبتدئ';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'متقدم';
      default: return difficulty;
    }
  };

  const handleRun = async (code: string) => {
    setIsRunning(true);
    
    try {
      // محاكاة تشغيل الكود
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // هنا سيتم التكامل مع الذكاء الاصطناعي
      const mockResults = {
        success: Math.random() > 0.3,
        output: 'النتيجة: تم تشغيل الكود بنجاح',
        executionTime: `${(Math.random() * 100).toFixed(0)}ms`
      };
      
      setResults(mockResults);
    } catch (error) {
      setResults({
        success: false,
        output: 'خطأ في تشغيل الكود',
        error: 'خطأ في الصيغة'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!onSubmit) return;
    
    setIsRunning(true);
    
    try {
      const result = await onSubmit(userCode);
      setResults(result);
    } catch (error) {
      setResults({
        success: false,
        feedback: 'حدث خطأ أثناء التصحيح',
        score: 0,
        passedTests: 0,
        totalTests: challenge.testCases.length
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setUserCode(challenge.starterCode);
    setResults(null);
    setCurrentHint(0);
    setShowSolution(false);
  };

  const handleNextHint = () => {
    if (currentHint < challenge.hints.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <CardTitle className="text-xl">{challenge.title}</CardTitle>
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {getDifficultyText(challenge.difficulty)}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Code2 className="w-3 h-3" />
                  {challenge.language.toUpperCase()}
                </Badge>
              </div>
              
              {challenge.timeLimit && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className={timeLeft < 300 ? 'text-red-600 font-bold' : 'text-gray-600'}>
                    الوقت المتبقي: {formatTime(timeLeft)}
                  </span>
                </div>
              )}
            </div>

            {results && (
              <div className="flex items-center gap-2">
                {results.success ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">نجح!</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">فشل</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* المحتوى الرئيسي */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* الوصف والتعليمات */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                وصف التحدي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{challenge.description}</p>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">📋 التعليمات:</h4>
                <div className="text-sm text-blue-800 whitespace-pre-line">
                  {challenge.instructions}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* الاختبارات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                حالات الاختبار
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {challenge.testCases.map((testCase, index) => (
                  <div key={testCase.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      اختبار {index + 1}: {testCase.description}
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div><strong>المدخل:</strong> <code className="bg-gray-200 px-1 rounded">{testCase.input}</code></div>
                      <div><strong>النتيجة المتوقعة:</strong> <code className="bg-gray-200 px-1 rounded">{testCase.expectedOutput}</code></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* التلميحات */}
          {challenge.hints.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  تلميحات مفيدة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800 text-sm mb-3">
                    💡 {challenge.hints[currentHint]}
                  </p>
                  {currentHint < challenge.hints.length - 1 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleNextHint}
                      className="text-yellow-700 border-yellow-300"
                    >
                      تلميح إضافي ({currentHint + 1}/{challenge.hints.length})
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* محرر الكود والنتائج */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-600" />
                  محرر الكود
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    disabled={isRunning}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    إعادة تعيين
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CodeEditor
                value={userCode}
                onChange={setUserCode}
                language={challenge.language}
                height={400}
                showRunButton
                showResetButton={false}
                onRun={handleRun}
                disabled={isRunning}
                showLineNumbers
              />
              
              <div className="flex items-center gap-3 mt-4">
                <Button
                  onClick={() => handleRun(userCode)}
                  disabled={isRunning || !userCode.trim()}
                  variant="outline"
                  className="flex-1"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? 'جاري التشغيل...' : 'تشغيل الكود'}
                </Button>
                
                <Button
                  onClick={handleSubmit}
                  disabled={isRunning || !userCode.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  {isRunning ? 'جاري التصحيح...' : 'إرسال للتصحيح'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* النتائج */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {results.success ? (
                    <Trophy className="w-5 h-5 text-yellow-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  نتائج التصحيح
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* نتيجة إجمالية */}
                {results.score !== undefined && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">النتيجة</span>
                      <span className="text-lg font-bold text-blue-600">
                        {results.score}%
                      </span>
                    </div>
                    <Progress value={results.score} className="h-2" />
                  </div>
                )}

                {/* الاختبارات المُجتازة */}
                {results.passedTests !== undefined && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm">
                      <strong>الاختبارات المُجتازة:</strong> {results.passedTests} من {results.totalTests}
                    </div>
                  </div>
                )}

                {/* التغذية الراجعة */}
                <div className={`p-4 rounded-lg border ${
                  results.success 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <p className="text-sm leading-relaxed">
                    {results.feedback || results.output}
                  </p>
                </div>

                {/* اقتراحات التحسين */}
                {results.suggestions && results.suggestions.length > 0 && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">💡 اقتراحات للتحسين:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      {results.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* الحل النموذجي */}
                {!results.success && !showSolution && (
                  <Button
                    variant="outline"
                    onClick={() => setShowSolution(true)}
                    className="w-full"
                  >
                    <Code2 className="w-4 h-4 mr-2" />
                    عرض الحل النموذجي
                  </Button>
                )}

                {showSolution && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">الحل النموذجي:</h4>
                    <CodeEditor
                      value={challenge.solution}
                      language={challenge.language}
                      height={200}
                      readOnly
                      showLineNumbers
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;