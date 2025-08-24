import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Brain, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  Play,
  Pause,
  Users,
  Microscope,
  Network,
  Monitor,
  Lightbulb,
  Target,
  BarChart3,
  Settings,
  Zap,
  Sparkles,
  Code2,
  Database,
  Globe,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// محاكي البيئة التفاعلي
function InteractiveEnvironmentSimulator() {
  const [activeEnvironment, setActiveEnvironment] = useState("frontend");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const environments = {
    frontend: {
      name: "واجهة المستخدم",
      icon: <Monitor className="w-5 h-5" />,
      color: "bg-blue-500",
      tools: ["React", "HTML", "CSS", "JavaScript"],
      simulation: "محاكاة تطوير واجهة تفاعلية"
    },
    backend: {
      name: "الخادم",
      icon: <Database className="w-5 h-5" />,
      color: "bg-green-500", 
      tools: ["Node.js", "Express", "MongoDB", "API"],
      simulation: "محاكاة تطوير خادم وقواعد البيانات"
    },
    network: {
      name: "الشبكة",
      icon: <Network className="w-5 h-5" />,
      color: "bg-purple-500",
      tools: ["HTTP", "WebSocket", "SSL", "DNS"],
      simulation: "محاكاة اتصال الشبكة والبروتوكولات"
    },
    deployment: {
      name: "النشر",
      icon: <Globe className="w-5 h-5" />,
      color: "bg-orange-500",
      tools: ["Docker", "AWS", "CI/CD", "Nginx"],
      simulation: "محاكاة عملية نشر التطبيق"
    }
  };

  const startSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-noto">
          <Layers className="w-5 h-5 text-blue-600" />
          محاكي البيئات التفاعلي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(environments).map(([key, env]) => (
            <Button
              key={key}
              variant={activeEnvironment === key ? "default" : "outline"}
              className="h-16 flex-col gap-1 font-noto"
              onClick={() => setActiveEnvironment(key)}
            >
              <div className={`p-2 rounded-lg ${env.color} text-white`}>
                {env.icon}
              </div>
              <span className="text-xs">{env.name}</span>
            </Button>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 font-noto">
            {environments[activeEnvironment].name}
          </h4>
          <p className="text-sm text-gray-600 mb-3 font-noto">
            {environments[activeEnvironment].simulation}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {environments[activeEnvironment].tools.map((tool, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs font-noto">
                {tool}
              </Badge>
            ))}
          </div>

          {isRunning ? (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-gray-600 font-noto">جاري المحاكاة... {progress}%</p>
            </div>
          ) : (
            <Button 
              onClick={startSimulation}
              className="w-full font-noto"
              size="sm"
            >
              <Play className="w-4 h-4 mr-2" />
              بدء المحاكاة
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// خريطة المفاهيم الذكية
function SmartConceptMap() {
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [completedConcepts, setCompletedConcepts] = useState(new Set(["html", "css"]));

  const concepts = {
    html: { name: "HTML", x: 100, y: 100, connections: ["css", "js"] },
    css: { name: "CSS", x: 250, y: 80, connections: ["html", "responsive"] },
    js: { name: "JavaScript", x: 150, y: 200, connections: ["html", "react", "api"] },
    react: { name: "React", x: 50, y: 300, connections: ["js", "components"] },
    api: { name: "API", x: 300, y: 250, connections: ["js", "backend"] },
    backend: { name: "Backend", x: 400, y: 300, connections: ["api", "database"] },
    database: { name: "Database", x: 450, y: 180, connections: ["backend"] },
    responsive: { name: "Responsive", x: 350, y: 100, connections: ["css"] },
    components: { name: "Components", x: 100, y: 400, connections: ["react"] }
  };

  const toggleConcept = (conceptId) => {
    const newCompleted = new Set(completedConcepts);
    if (newCompleted.has(conceptId)) {
      newCompleted.delete(conceptId);
    } else {
      newCompleted.add(conceptId);
    }
    setCompletedConcepts(newCompleted);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-noto">
          <Target className="w-5 h-5 text-green-600" />
          خريطة المفاهيم الذكية
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg overflow-hidden">
          <svg className="w-full h-full">
            {/* الروابط */}
            {Object.entries(concepts).map(([id, concept]) =>
              concept.connections.map(connId => (
                <line
                  key={`${id}-${connId}`}
                  x1={concept.x}
                  y1={concept.y}
                  x2={concepts[connId]?.x}
                  y2={concepts[connId]?.y}
                  stroke={completedConcepts.has(id) && completedConcepts.has(connId) ? "#10b981" : "#e5e7eb"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              ))
            )}
            
            {/* العقد */}
            {Object.entries(concepts).map(([id, concept]) => (
              <g key={id}>
                <circle
                  cx={concept.x}
                  cy={concept.y}
                  r="20"
                  fill={completedConcepts.has(id) ? "#10b981" : "#e5e7eb"}
                  className="cursor-pointer transition-all duration-300 hover:scale-110"
                  onClick={() => toggleConcept(id)}
                />
                <text
                  x={concept.x}
                  y={concept.y + 5}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-white pointer-events-none"
                >
                  {concept.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-noto">التقدم الإجمالي:</span>
            <span className="font-noto">{completedConcepts.size}/{Object.keys(concepts).length}</span>
          </div>
          <Progress 
            value={(completedConcepts.size / Object.keys(concepts).length) * 100} 
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}

// المختبر الافتراضي
function VirtualLab() {
  const [activeExperiment, setActiveExperiment] = useState("api-test");
  const [experimentResults, setExperimentResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const experiments = {
    "api-test": {
      name: "اختبار API",
      description: "قم بإنشاء واختبار API endpoint",
      tools: ["Postman", "JSON", "HTTP"],
      setup: "إعداد خادم محلي وتصميم API"
    },
    "db-query": {
      name: "استعلام قاعدة البيانات",
      description: "تجربة استعلامات مختلفة",
      tools: ["MongoDB", "SQL", "Aggregation"],
      setup: "إنشاء قاعدة بيانات واختبار الاستعلامات"
    },
    "security-test": {
      name: "اختبار الأمان",
      description: "فحص الثغرات الأمنية",
      tools: ["JWT", "HTTPS", "Validation"],
      setup: "تطبيق طرق الحماية واختبارها"
    }
  };

  const runExperiment = () => {
    setIsRunning(true);
    setTimeout(() => {
      setExperimentResults({
        success: true,
        data: "تم تنفيذ التجربة بنجاح!",
        insights: ["النتيجة متوقعة", "الأداء ممتاز", "لا توجد أخطاء"]
      });
      setIsRunning(false);
    }, 2000);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-noto">
          <Microscope className="w-5 h-5 text-purple-600" />
          المختبر الافتراضي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <select
          value={activeExperiment}
          onChange={(e) => setActiveExperiment(e.target.value)}
          className="w-full p-2 border rounded-lg font-noto"
        >
          {Object.entries(experiments).map(([id, exp]) => (
            <option key={id} value={id}>{exp.name}</option>
          ))}
        </select>

        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
          <h4 className="font-semibold font-noto">
            {experiments[activeExperiment].name}
          </h4>
          <p className="text-sm text-gray-600 font-noto">
            {experiments[activeExperiment].description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {experiments[activeExperiment].tools.map((tool, idx) => (
              <Badge key={idx} variant="outline" className="text-xs font-noto">
                {tool}
              </Badge>
            ))}
          </div>

          <div className="text-xs text-gray-500 font-noto">
            الإعداد: {experiments[activeExperiment].setup}
          </div>
        </div>

        {isRunning ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600 font-noto">جاري تنفيذ التجربة...</p>
          </div>
        ) : experimentResults ? (
          <div className="bg-green-50 p-4 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-4 h-4" />
              <span className="font-semibold font-noto">نتائج التجربة</span>
            </div>
            <p className="text-sm text-green-700 font-noto">{experimentResults.data}</p>
            <div className="space-y-1">
              {experimentResults.insights.map((insight, idx) => (
                <div key={idx} className="text-xs text-green-600 font-noto">
                  • {insight}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Button 
            onClick={runExperiment}
            className="w-full font-noto"
          >
            <Play className="w-4 h-4 mr-2" />
            تشغيل التجربة
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// التعلم الجماعي الافتراضي
function VirtualCollaborativeLearning() {
  const [activeRoom, setActiveRoom] = useState("project-1");
  const [participants, setParticipants] = useState([
    { id: 1, name: "أحمد محمد", role: "Frontend Developer", online: true },
    { id: 2, name: "فاطمة أحمد", role: "Backend Developer", online: true },
    { id: 3, name: "عبدالله سالم", role: "UI/UX Designer", online: false },
    { id: 4, name: "مريم خالد", role: "Project Manager", online: true }
  ]);

  const rooms = {
    "project-1": {
      name: "مشروع التجارة الإلكترونية",
      progress: 75,
      tasks: ["تصميم قاعدة البيانات", "تطوير API", "واجهة المستخدم"]
    },
    "project-2": {
      name: "تطبيق إدارة المهام",
      progress: 45,
      tasks: ["التخطيط", "النموذج الأولي", "التطوير"]
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-noto">
          <Users className="w-5 h-5 text-orange-600" />
          التعلم الجماعي الافتراضي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <select
          value={activeRoom}
          onChange={(e) => setActiveRoom(e.target.value)}
          className="w-full p-2 border rounded-lg font-noto"
        >
          {Object.entries(rooms).map(([id, room]) => (
            <option key={id} value={id}>{room.name}</option>
          ))}
        </select>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2 font-noto">
            {rooms[activeRoom].name}
          </h4>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-noto">تقدم المشروع:</span>
            <span className="font-noto">{rooms[activeRoom].progress}%</span>
          </div>
          <Progress value={rooms[activeRoom].progress} className="h-2 mb-3" />
          
          <div className="space-y-1">
            <h5 className="font-medium text-sm font-noto">المهام:</h5>
            {rooms[activeRoom].tasks.map((task, idx) => (
              <div key={idx} className="text-xs text-gray-600 font-noto">
                • {task}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="font-medium text-sm font-noto">المشاركون ({participants.filter(p => p.online).length}/{participants.length})</h5>
          {participants.map(participant => (
            <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${participant.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm font-noto">{participant.name}</span>
              </div>
              <Badge variant="outline" className="text-xs font-noto">
                {participant.role}
              </Badge>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1 font-noto">
            <MessageSquare className="w-4 h-4 mr-2" />
            دردشة
          </Button>
          <Button size="sm" variant="outline" className="flex-1 font-noto">
            <Monitor className="w-4 h-4 mr-2" />
            شاشة مشتركة
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// الفيديو التفاعلي
function InteractiveVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  const videoSegments = [
    { time: 0, title: "مقدمة المشروع", quiz: false },
    { time: 30, title: "إعداد البيئة", quiz: true },
    { time: 60, title: "تطوير Frontend", quiz: false },
    { time: 90, title: "تطوير Backend", quiz: true },
    { time: 120, title: "ربط النظام", quiz: false }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          // تحقق من وجود مسابقة في هذا الوقت
          const segment = videoSegments.find(s => Math.abs(s.time - newTime) < 1 && s.quiz);
          if (segment && !showQuiz) {
            setIsPlaying(false);
            setShowQuiz(true);
          }
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, showQuiz]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-noto">
          <Play className="w-5 h-5 text-red-600" />
          الفيديو التفاعلي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-black aspect-video rounded-lg flex items-center justify-center">
          {showQuiz ? (
            <div className="bg-white p-4 rounded-lg m-4 w-full">
              <h4 className="font-semibold mb-2 font-noto">سؤال سريع</h4>
              <p className="text-sm mb-3 font-noto">ما هي أفضل طريقة لإعداد بيئة التطوير؟</p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full text-right font-noto"
                  onClick={() => {setShowQuiz(false); setIsPlaying(true);}}
                >
                  استخدام Docker containers
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full text-right font-noto"
                  onClick={() => {setShowQuiz(false); setIsPlaying(true);}}
                >
                  التثبيت المحلي
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-white">
              <div className="text-6xl mb-4">📹</div>
              <p className="font-noto">تطوير تطبيق ويب متكامل</p>
              <p className="text-sm opacity-75 font-noto">
                {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Progress value={(currentTime / 150) * 100} className="h-2" />
          <div className="flex items-center justify-between">
            <Button
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={showQuiz}
              className="font-noto"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "إيقاف" : "تشغيل"}
            </Button>
            <div className="text-sm text-gray-600 font-noto">
              {videoSegments.find(s => currentTime >= s.time)?.title || "جاري التحميل..."}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1 text-xs">
          {videoSegments.map((segment, idx) => (
            <div
              key={idx}
              className={`p-2 rounded flex items-center justify-between ${
                currentTime >= segment.time ? 'bg-blue-100' : 'bg-gray-50'
              }`}
            >
              <span className="font-noto">{segment.title}</span>
              <div className="flex items-center gap-2">
                <span className="font-noto">{Math.floor(segment.time / 60)}:{(segment.time % 60).toString().padStart(2, '0')}</span>
                {segment.quiz && <Badge variant="secondary" className="font-noto">اختبار</Badge>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function InnovativeStudyMaterial() {
  const [activeTab, setActiveTab] = useState("environment");
  const [overallProgress, setOverallProgress] = useState(35);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/ai-learning-materials">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-noto">
              تطوير تطبيق ويب متكامل - الدرس المبتكر
            </h1>
            <p className="text-gray-600 font-noto">
              أدوات تعليمية تفاعلية متطورة لتعلم تطوير الويب الشامل
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800 font-noto">متقدم</Badge>
          <Badge variant="outline" className="font-noto">5.8 MB</Badge>
        </div>
      </div>

      {/* التقدم الإجمالي */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold font-noto">التقدم الإجمالي في الدرس</span>
            <span className="font-noto">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">6</div>
              <div className="text-sm text-gray-600 font-noto">أدوات تفاعلية</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">42</div>
              <div className="text-sm text-gray-600 font-noto">بطاقة ذكية</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">15</div>
              <div className="text-sm text-gray-600 font-noto">اختبار تفاعلي</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">4</div>
              <div className="text-sm text-gray-600 font-noto">مشاريع عملية</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* الأدوات التعليمية التفاعلية */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1">
          <TabsTrigger value="environment" className="font-noto">محاكي البيئات</TabsTrigger>
          <TabsTrigger value="concepts" className="font-noto">خريطة المفاهيم</TabsTrigger>
          <TabsTrigger value="lab" className="font-noto">المختبر الافتراضي</TabsTrigger>
          <TabsTrigger value="collaborative" className="font-noto">التعلم الجماعي</TabsTrigger>
          <TabsTrigger value="video" className="font-noto">فيديو تفاعلي</TabsTrigger>
          <TabsTrigger value="chat" className="font-noto">المساعد الذكي</TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TabsContent value="environment" className="col-span-full lg:col-span-1">
            <InteractiveEnvironmentSimulator />
          </TabsContent>
          
          <TabsContent value="concepts" className="col-span-full lg:col-span-1">
            <SmartConceptMap />
          </TabsContent>

          <TabsContent value="lab" className="col-span-full lg:col-span-1">
            <VirtualLab />
          </TabsContent>

          <TabsContent value="collaborative" className="col-span-full lg:col-span-1">
            <VirtualCollaborativeLearning />
          </TabsContent>

          <TabsContent value="video" className="col-span-full">
            <InteractiveVideoPlayer />
          </TabsContent>

          <TabsContent value="chat" className="col-span-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-noto">
                  <Brain className="w-5 h-5 text-blue-600" />
                  المساعد الذكي التفاعلي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-3 max-h-64 overflow-y-auto">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <p className="text-sm font-noto">
                      مرحباً! أنا مساعدك الذكي المتخصص في تطوير الويب. يمكنني مساعدتك في:
                    </p>
                    <ul className="text-xs mt-2 space-y-1 font-noto">
                      <li>• شرح المفاهيم التقنية</li>
                      <li>• حل مشاكل البرمجة</li>
                      <li>• تقديم أمثلة عملية</li>
                      <li>• مراجعة الكود</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Input 
                    placeholder="اكتب سؤالك هنا..."
                    className="flex-1 font-noto"
                  />
                  <Button>
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="font-noto">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    اقتراحات
                  </Button>
                  <Button variant="outline" size="sm" className="font-noto">
                    <Code2 className="w-4 h-4 mr-2" />
                    أمثلة كود
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* إنجازات ومكافآت */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-noto">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            الإنجازات والمكافآت
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-sm font-semibold font-noto">مطور مبتدئ</div>
              <div className="text-xs text-gray-600 font-noto">أكمل أول بيئة</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">🔬</div>
              <div className="text-sm font-semibold font-noto">عالم التجارب</div>
              <div className="text-xs text-gray-600 font-noto">نفذ 3 تجارب</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg opacity-50">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-sm font-semibold font-noto">لاعب فريق</div>
              <div className="text-xs text-gray-600 font-noto">شارك في مشروع</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg opacity-50">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-semibold font-noto">خبير المفاهيم</div>
              <div className="text-xs text-gray-600 font-noto">أكمل جميع المفاهيم</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}