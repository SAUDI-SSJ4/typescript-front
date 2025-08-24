import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code2, 
  Play, 
  Edit, 
  Trash2, 
  Users, 
  Clock, 
  Trophy,
  Target,
  Search,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'javascript' | 'python' | 'html' | 'css' | 'java' | 'cpp';
  timeLimit?: number;
  studentsAttempted: number;
  averageScore: number;
  createdAt: string;
  status: 'active' | 'draft' | 'archived';
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'حساب مجموع الأرقام',
    description: 'اكتب دالة تحسب مجموع جميع الأرقام في مصفوفة',
    difficulty: 'beginner',
    language: 'javascript',
    timeLimit: 30,
    studentsAttempted: 45,
    averageScore: 87,
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    title: 'فرز المصفوفات',
    description: 'تطبيق خوارزمية الفرز السريع لترتيب عناصر المصفوفة',
    difficulty: 'intermediate',
    language: 'python',
    timeLimit: 45,
    studentsAttempted: 23,
    averageScore: 64,
    createdAt: '2024-01-10',
    status: 'active'
  },
  {
    id: '3',
    title: 'صفحة ويب تفاعلية',
    description: 'إنشاء صفحة ويب بسيطة مع عناصر تفاعلية',
    difficulty: 'beginner',
    language: 'html',
    studentsAttempted: 67,
    averageScore: 92,
    createdAt: '2024-01-08',
    status: 'active'
  },
  {
    id: '4',
    title: 'برنامج حاسبة متقدم',
    description: 'إنشاء حاسبة علمية مع وظائف متقدمة',
    difficulty: 'advanced',
    language: 'java',
    timeLimit: 90,
    studentsAttempted: 12,
    averageScore: 45,
    createdAt: '2024-01-05',
    status: 'draft'
  }
];

/**
 * مكون عرض قائمة التحديات البرمجية
 */
const ChallengesList: React.FC = () => {
  const [challenges] = useState<Challenge[]>(mockChallenges);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'draft': return 'مسودة';
      case 'archived': return 'مؤرشف';
      default: return status;
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || challenge.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (challengeId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا التحدي؟')) {
      // هنا سيتم حذف التحدي
      console.log('Delete challenge:', challengeId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">التحديات البرمجية</h1>
          <p className="text-gray-600 mt-1">إدارة التحديات البرمجية التفاعلية</p>
        </div>
        
        <Link to="/dashboard/ai-learning-materials/create-challenge">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            إنشاء تحدي جديد
          </Button>
        </Link>
      </div>

      {/* البحث والفلاتر */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="ابحث في التحديات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">الكل</TabsTrigger>
                <TabsTrigger value="active">نشط</TabsTrigger>
                <TabsTrigger value="draft">مسودة</TabsTrigger>
                <TabsTrigger value="archived">مؤرشف</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* قائمة التحديات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg line-clamp-2">{challenge.title}</CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {getDifficultyText(challenge.difficulty)}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Code2 className="w-3 h-3" />
                      {challenge.language.toUpperCase()}
                    </Badge>
                    <Badge className={getStatusColor(challenge.status)}>
                      {getStatusText(challenge.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm line-clamp-3">
                {challenge.description}
              </p>
              
              {/* الإحصائيات */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">{challenge.studentsAttempted} طالب</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600">{challenge.averageScore}% متوسط</span>
                </div>
                
                {challenge.timeLimit && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-600">{challenge.timeLimit} دقيقة</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">{challenge.createdAt}</span>
                </div>
              </div>
              
              {/* الأزرار */}
              <div className="flex items-center gap-2 pt-2">
                <Link 
                  to={`/dashboard/ai-learning-materials/challenge/${challenge.id}`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    معاينة
                  </Button>
                </Link>
                
                <Link 
                  to={`/dashboard/ai-learning-materials/edit-challenge/${challenge.id}`}
                >
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDelete(challenge.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* رسالة عدم وجود نتائج */}
      {filteredChallenges.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Code2 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد تحديات</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'لا توجد تحديات تطابق البحث الحالي' : 'لم يتم إنشاء أي تحديات بعد'}
            </p>
            <Link to="/dashboard/ai-learning-materials/create-challenge">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                إنشاء أول تحدي
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChallengesList;