import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodingChallenge from '@/features/ai/components/CodingChallenge';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock challenge data - في التطبيق الحقيقي، سيتم جلب هذا من API
const mockChallenges = {
  '1': {
    id: '1',
    title: 'مجموع رقمين',
    description: 'اكتب دالة تأخذ رقمين وترجع مجموعهما',
    instructions: 'في هذا التحدي، عليك كتابة دالة JavaScript تسمى sum تأخذ معاملين (a و b) وترجع مجموعهما. تأكد من أن دالتك تعمل مع جميع أنواع الأرقام: الموجبة، السالبة، والصفر.',
    difficulty: 'beginner' as const,
    language: 'javascript' as const,
    starterCode: `function sum(a, b) {
  // اكتب الكود هنا
  
}`,
    solution: `function sum(a, b) {
  return a + b;
}`,
    testCases: [
      {
        id: '1',
        input: 'sum(1, 2)',
        expectedOutput: '3',
        description: 'اختبار أرقام موجبة صغيرة'
      },
      {
        id: '2', 
        input: 'sum(-1, 1)',
        expectedOutput: '0',
        description: 'اختبار أرقام سالبة وموجبة'
      },
      {
        id: '3',
        input: 'sum(0, 0)',
        expectedOutput: '0', 
        description: 'اختبار الصفر'
      }
    ],
    hints: [
      'استخدم عامل الجمع + في JavaScript',
      'تأكد من إرجاع النتيجة باستخدام return',
      'الدالة يجب أن تأخذ معاملين a و b'
    ],
    timeLimit: 30
  },
  '2': {
    id: '2',
    title: 'إيجاد أكبر رقم',
    description: 'اكتب دالة تجد أكبر رقم في مصفوفة',
    instructions: 'قم بكتابة دالة تسمى findMax تأخذ مصفوفة من الأرقام وترجع أكبر رقم فيها. تأكد من التعامل مع المصفوفات الفارغة.',
    difficulty: 'intermediate' as const,
    language: 'javascript' as const,
    starterCode: `function findMax(numbers) {
  // اكتب الكود هنا
  
}`,
    solution: `function findMax(numbers) {
  if (numbers.length === 0) return null;
  return Math.max(...numbers);
}`,
    testCases: [
      {
        id: '1',
        input: 'findMax([1, 5, 3, 9, 2])',
        expectedOutput: '9',
        description: 'اختبار مصفوفة أرقام عادية'
      },
      {
        id: '2', 
        input: 'findMax([-1, -5, -3])',
        expectedOutput: '-1',
        description: 'اختبار أرقام سالبة'
      },
      {
        id: '3',
        input: 'findMax([])',
        expectedOutput: 'null', 
        description: 'اختبار مصفوفة فارغة'
      }
    ],
    hints: [
      'يمكنك استخدام Math.max() مع spread operator',
      'تحقق من حالة المصفوفة الفارغة أولاً',
      'يمكنك أيضاً استخدام حلقة for للمقارنة'
    ],
    timeLimit: 45
  },
  '3': {
    id: '3',
    title: 'عكس النص',
    description: 'اكتب دالة تعكس نص مُعطى',
    instructions: 'قم بكتابة دالة تسمى reverseString تأخذ نص وترجعه معكوساً. على سبيل المثال: "hello" يصبح "olleh".',
    difficulty: 'beginner' as const,
    language: 'javascript' as const,
    starterCode: `function reverseString(str) {
  // اكتب الكود هنا
  
}`,
    solution: `function reverseString(str) {
  return str.split('').reverse().join('');
}`,
    testCases: [
      {
        id: '1',
        input: 'reverseString("hello")',
        expectedOutput: '"olleh"',
        description: 'اختبار نص إنجليزي'
      },
      {
        id: '2', 
        input: 'reverseString("مرحبا")',
        expectedOutput: '"ابحرم"',
        description: 'اختبار نص عربي'
      },
      {
        id: '3',
        input: 'reverseString("")',
        expectedOutput: '""', 
        description: 'اختبار نص فارغ'
      }
    ],
    hints: [
      'يمكنك استخدام split() و reverse() و join()',
      'أو يمكنك استخدام حلقة for من النهاية للبداية',
      'تذكر التعامل مع النص الفارغ'
    ],
    timeLimit: 20
  }
};

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل التحدي من API
    if (id && mockChallenges[id as keyof typeof mockChallenges]) {
      setTimeout(() => {
        setChallenge(mockChallenges[id as keyof typeof mockChallenges]);
        setLoading(false);
      }, 500);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-gray-600">جار تحميل التحدي...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!id || !challenge) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">تحدي غير موجود</h1>
          <p className="text-gray-600 mb-6">معرف التحدي غير صحيح أو التحدي غير متوفر</p>
          <Link to="/dashboard/ai-learning-materials/challenges">
            <Button>
              <ArrowRight className="w-4 h-4 mr-2" />
              العودة للتحديات
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/ai-learning-materials/challenges">
            <Button variant="outline" size="sm">
              <ArrowRight className="w-4 h-4 mr-2" />
              العودة للتحديات
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{challenge.title}</h1>
            <p className="text-gray-600">اختبر مهاراتك البرمجية واحصل على تصحيح ذكي</p>
          </div>
        </div>
      </div>

      {/* Challenge Component */}
      <CodingChallenge challenge={challenge} />
    </div>
  );
}