import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Brain, 
  Code2, 
  Clock, 
  Target,
  Lightbulb,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import CodeEditor from '@/components/ui/code-editor';
import CodingChallenge from './CodingChallenge';

interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  description: string;
}

interface ChallengeData {
  title: string;
  description: string;
  instructions: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'javascript' | 'python' | 'html' | 'css' | 'java' | 'cpp';
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
  timeLimit?: number;
}

/**
 * مكون إنشاء التحديات البرمجية للمدرسين
 */
const CreateChallenge: React.FC = () => {
  const [challenge, setChallenge] = useState<ChallengeData>({
    title: '',
    description: '',
    instructions: '',
    difficulty: 'beginner',
    language: 'javascript',
    starterCode: '',
    solution: '',
    testCases: [],
    hints: [],
    timeLimit: undefined
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // إضافة حالة اختبار جديدة
  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      input: '',
      expectedOutput: '',
      description: ''
    };
    setChallenge(prev => ({
      ...prev,
      testCases: [...prev.testCases, newTestCase]
    }));
  };

  // حذف حالة اختبار
  const removeTestCase = (id: string) => {
    setChallenge(prev => ({
      ...prev,
      testCases: prev.testCases.filter(tc => tc.id !== id)
    }));
  };

  // تحديث حالة اختبار
  const updateTestCase = (id: string, field: keyof TestCase, value: string) => {
    setChallenge(prev => ({
      ...prev,
      testCases: prev.testCases.map(tc => 
        tc.id === id ? { ...tc, [field]: value } : tc
      )
    }));
  };

  // إضافة تلميح جديد
  const addHint = () => {
    setChallenge(prev => ({
      ...prev,
      hints: [...prev.hints, '']
    }));
  };

  // حذف تلميح
  const removeHint = (index: number) => {
    setChallenge(prev => ({
      ...prev,
      hints: prev.hints.filter((_, i) => i !== index)
    }));
  };

  // تحديث تلميح
  const updateHint = (index: number, value: string) => {
    setChallenge(prev => ({
      ...prev,
      hints: prev.hints.map((hint, i) => i === index ? value : hint)
    }));
  };

  // حفظ التحدي
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // هنا سيتم حفظ التحدي في قاعدة البيانات
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('تم حفظ التحدي بنجاح!');
    } catch (error) {
      alert('حدث خطأ أثناء الحفظ');
    } finally {
      setIsSaving(false);
    }
  };

  // محاكاة التصحيح بالذكاء الاصطناعي
  const mockAICorrection = async (code: string) => {
    // محاكاة معالجة بالذكاء الاصطناعي
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const passedTests = Math.floor(Math.random() * challenge.testCases.length);
    const score = Math.round((passedTests / challenge.testCases.length) * 100);
    
    return {
      success: score >= 70,
      feedback: score >= 70 
        ? 'عمل ممتاز! تم حل التحدي بنجاح. الكود نظيف ويحقق جميع المتطلبات.'
        : 'الكود يحتاج إلى تحسينات. راجع التعليمات والتلميحات وحاول مرة أخرى.',
      score,
      passedTests,
      totalTests: challenge.testCases.length,
      suggestions: score < 70 ? [
        'تأكد من فهم المتطلبات بشكل صحيح',
        'راجع حالات الاختبار مرة أخرى',
        'تحقق من منطق الكود وتدفق البيانات'
      ] : undefined
    };
  };

  // قوالب الكود الجاهزة
  const codeTemplates = {
    javascript: `// اكتب كودك هنا
function solve(input) {
    // المنطق الخاص بك
    return result;
}`,
    python: `# اكتب كودك هنا
def solve(input):
    # المنطق الخاص بك
    return result`,
    java: `// اكتب كودك هنا
public class Solution {
    public static void main(String[] args) {
        // المنطق الخاص بك
    }
}`,
    cpp: `// اكتب كودك هنا
#include <iostream>
using namespace std;

int main() {
    // المنطق الخاص بك
    return 0;
}`,
    html: `<!-- اكتب كودك هنا -->
<!DOCTYPE html>
<html>
<head>
    <title>التحدي</title>
</head>
<body>
    <!-- المحتوى الخاص بك -->
</body>
</html>`,
    css: `/* اكتب كودك هنا */
.container {
    /* الأنماط الخاصة بك */
}`
  };

  const handleLanguageChange = (language: string) => {
    setChallenge(prev => ({
      ...prev,
      language: language as any,
      starterCode: codeTemplates[language as keyof typeof codeTemplates] || '',
      solution: ''
    }));
  };

  if (isPreviewMode) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">معاينة التحدي</h2>
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(false)}
          >
            <Code2 className="w-4 h-4 mr-2" />
            العودة للتحرير
          </Button>
        </div>
        
        <CodingChallenge
          challenge={{
            id: 'preview',
            ...challenge
          }}
          onSubmit={mockAICorrection}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إنشاء تحدي برمجي جديد</h1>
          <p className="text-gray-600 mt-1">قم بإنشاء تحدي برمجي تفاعلي مع التصحيح بالذكاء الاصطناعي</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsPreviewMode(true)}
            disabled={!challenge.title || !challenge.description}
          >
            <Eye className="w-4 h-4 mr-2" />
            معاينة
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={isSaving || !challenge.title}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'جاري الحفظ...' : 'حفظ التحدي'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">المعلومات الأساسية</TabsTrigger>
          <TabsTrigger value="code">الكود والحل</TabsTrigger>
          <TabsTrigger value="tests">حالات الاختبار</TabsTrigger>
          <TabsTrigger value="hints">التلميحات</TabsTrigger>
        </TabsList>

        {/* المعلومات الأساسية */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                معلومات التحدي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">عنوان التحدي *</Label>
                  <Input
                    id="title"
                    value={challenge.title}
                    onChange={(e) => setChallenge(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="مثال: حساب مجموع الأرقام"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">مستوى الصعوبة</Label>
                  <Select
                    value={challenge.difficulty}
                    onValueChange={(value) => setChallenge(prev => ({ ...prev, difficulty: value as any }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">مبتدئ</SelectItem>
                      <SelectItem value="intermediate">متوسط</SelectItem>
                      <SelectItem value="advanced">متقدم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">لغة البرمجة</Label>
                  <Select
                    value={challenge.language}
                    onValueChange={handleLanguageChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="java">Java</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="css">CSS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeLimit">الوقت المحدد (بالدقائق)</Label>
                  <Input
                    id="timeLimit"
                    type="number"
                    value={challenge.timeLimit || ''}
                    onChange={(e) => setChallenge(prev => ({ 
                      ...prev, 
                      timeLimit: e.target.value ? Number(e.target.value) : undefined 
                    }))}
                    placeholder="اختياري"
                    min="1"
                    max="180"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">وصف التحدي *</Label>
                <Textarea
                  id="description"
                  value={challenge.description}
                  onChange={(e) => setChallenge(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="اشرح ما هو المطلوب من الطالب إنجازه..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">التعليمات التفصيلية *</Label>
                <Textarea
                  id="instructions"
                  value={challenge.instructions}
                  onChange={(e) => setChallenge(prev => ({ ...prev, instructions: e.target.value }))}
                  placeholder="اكتب تعليمات مفصلة حول كيفية حل التحدي..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* الكود والحل */}
        <TabsContent value="code" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-green-600" />
                  الكود الابتدائي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeEditor
                  value={challenge.starterCode}
                  onChange={(value) => setChallenge(prev => ({ ...prev, starterCode: value }))}
                  language={challenge.language}
                  height={400}
                  label="الكود الذي سيبدأ به الطالب"
                  showLineNumbers
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  الحل النموذجي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CodeEditor
                  value={challenge.solution}
                  onChange={(value) => setChallenge(prev => ({ ...prev, solution: value }))}
                  language={challenge.language}
                  height={400}
                  label="الحل الصحيح للتحدي"
                  showLineNumbers
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* حالات الاختبار */}
        <TabsContent value="tests" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  حالات الاختبار
                </CardTitle>
                <Button onClick={addTestCase} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة اختبار
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenge.testCases.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>لا توجد حالات اختبار بعد</p>
                  <p className="text-sm">اضغط "إضافة اختبار" لإنشاء حالة اختبار جديدة</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {challenge.testCases.map((testCase, index) => (
                    <Card key={testCase.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">اختبار {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTestCase(testCase.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-2">
                          <Label>وصف الاختبار</Label>
                          <Input
                            value={testCase.description}
                            onChange={(e) => updateTestCase(testCase.id, 'description', e.target.value)}
                            placeholder="مثال: اختبار الأرقام الموجبة"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>المدخل</Label>
                            <Textarea
                              value={testCase.input}
                              onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                              placeholder="المدخل للاختبار"
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>النتيجة المتوقعة</Label>
                            <Textarea
                              value={testCase.expectedOutput}
                              onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                              placeholder="النتيجة المتوقعة"
                              rows={3}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* التلميحات */}
        <TabsContent value="hints" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  التلميحات المفيدة
                </CardTitle>
                <Button onClick={addHint} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة تلميح
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenge.hints.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>لا توجد تلميحات بعد</p>
                  <p className="text-sm">اضغط "إضافة تلميح" لإنشاء تلميح جديد</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {challenge.hints.map((hint, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">
                            تلميح {index + 1}
                          </span>
                        </div>
                        <Textarea
                          value={hint}
                          onChange={(e) => updateHint(index, e.target.value)}
                          placeholder="اكتب تلميحاً مفيداً للطلاب..."
                          rows={2}
                          className="bg-white border-yellow-300"
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeHint(index)}
                        className="text-red-600 hover:text-red-700 mt-6"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateChallenge;