import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TestEducationalMaterials() {
  const [token, setToken] = useState<string>('');
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get token from localStorage or sessionStorage
    const storedToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const testHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/students/educational-materials/health', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ نجح! ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult(`❌ فشل! ${data.message || 'خطأ غير معروف'}`);
      }
    } catch (error) {
      setTestResult(`❌ خطأ في الاتصال: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testAuth = async () => {
    if (!token) {
      setTestResult('❌ لا يوجد token');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/students/educational-materials/test-auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ نجح! ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult(`❌ فشل! ${data.message || 'خطأ غير معروف'}`);
      }
    } catch (error) {
      setTestResult(`❌ خطأ في الاتصال: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testEnrolledCourses = async () => {
    if (!token) {
      setTestResult('❌ لا يوجد token');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/students/educational-materials/enrolled-courses', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ نجح! ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult(`❌ فشل! ${data.message || 'خطأ غير معروف'}`);
      }
    } catch (error) {
      setTestResult(`❌ خطأ في الاتصال: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testEnrolledCoursesAnyUser = async () => {
    if (!token) {
      setTestResult('❌ لا يوجد token');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/students/educational-materials/test-enrolled-courses-any-user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ نجح! ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult(`❌ فشل! ${data.message || 'خطأ غير معروف'}`);
      }
    } catch (error) {
      setTestResult(`❌ خطأ في الاتصال: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">اختبار المواد التعليمية</h1>
        <p className="text-gray-600">صفحة اختبار شاملة للمواد التعليمية</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>حالة المصادقة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="token">JWT Token:</Label>
            <Input
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="أدخل JWT token هنا..."
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="health">اختبار الصحة</TabsTrigger>
          <TabsTrigger value="auth">اختبار المصادقة</TabsTrigger>
          <TabsTrigger value="enrolled">اختبار الدورات</TabsTrigger>
          <TabsTrigger value="debug">اختبار التصحيح</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>اختبار endpoint الصحة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                اختبار endpoint الصحة - لا يتطلب مصادقة
              </p>
              <Button onClick={testHealth} disabled={loading}>
                {loading ? 'جاري الاختبار...' : 'اختبار الصحة'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>اختبار المصادقة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                اختبار endpoint المصادقة - يتطلب token صحيح
              </p>
              <Button onClick={testAuth} disabled={loading || !token}>
                {loading ? 'جاري الاختبار...' : 'اختبار المصادقة'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>اختبار الدورات المسجلة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                اختبار endpoint الدورات المسجلة - يتطلب token + user_type=student
              </p>
              <Button onClick={testEnrolledCourses} disabled={loading || !token}>
                {loading ? 'جاري الاختبار...' : 'اختبار الدورات المسجلة'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debug" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>اختبار التصحيح</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                اختبار endpoint التصحيح - يعمل مع أي نوع مستخدم ويعطي معلومات مفصلة
              </p>
              <Button onClick={testEnrolledCoursesAnyUser} disabled={loading || !token}>
                {loading ? 'جاري الاختبار...' : 'اختبار التصحيح'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>نتيجة الاختبار</CardTitle>
        </CardHeader>
        <CardContent>
          {testResult ? (
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm whitespace-pre-wrap">
              {testResult}
            </pre>
          ) : (
            <p className="text-gray-500">اختر أحد الاختبارات لبدء الاختبار</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>تعليمات الاختبار</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li><strong>اختبار الصحة</strong>: للتأكد من أن API يعمل (لا يتطلب token)</li>
            <li><strong>اختبار المصادقة</strong>: للتأكد من صحة الـ token ونوع المستخدم</li>
            <li><strong>اختبار الدورات</strong>: لاختبار endpoint الأصلي (يتطلب user_type=student)</li>
            <li><strong>اختبار التصحيح</strong>: لرؤية معلومات مفصلة عن المستخدم والبيانات</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}



