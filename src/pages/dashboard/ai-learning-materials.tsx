import { useState, useRef } from "react";
import { 
  Plus, 
  Brain, 
  Upload,
  Search,
  FileText,
  CheckCircle,
  Clock,
  Trash2,
  MessageSquare,
  BookOpen,
  Code2,
  RadioIcon as Radio,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface LearningMaterial {
  id: string;
  title: string;
  originalFileName: string;
  fileType: 'pdf' | 'docx';
  uploadDate: string;
  processingStatus: 'processing' | 'completed' | 'failed';
  progress: number;
  summary: string;
  flashcardsCount: number;
  quizzesCount: number;
  chatMessages: number;
  fileSize: string;
}

// إضافة واجهة جديدة للمواد الحضورية
interface PhysicalAttendanceMaterial {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor: string;
  maxAttendees: number;
  currentAttendees: number;
  price: number;
  isSubscribed: boolean;
  ticketGenerated: boolean;
  ticketUrl?: string;
  qrCode?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  requirements: string[];
  materials: string[];
}

// إضافة مواد حضورية تجريبية
const physicalMaterials: PhysicalAttendanceMaterial[] = [
  {
    id: "phys-001",
    title: "ورشة تطوير تطبيقات الويب المتقدمة",
    description: "ورشة عملية مكثفة لتطوير تطبيقات ويب متقدمة باستخدام React وNode.js مع تطبيقات عملية",
    date: "2024-02-15",
    time: "09:00",
    duration: "6 ساعات",
    location: "مقر الأكاديمية - قاعة التطوير المتقدم",
    instructor: "الأستاذ أحمد محمد",
    maxAttendees: 25,
    currentAttendees: 18,
    price: 299,
    isSubscribed: false,
    ticketGenerated: false,
    status: 'upcoming',
    requirements: ["لابتوب شخصي", "معرفة أساسية بـ JavaScript", "Node.js مثبت"],
    materials: ["دليل الورشة PDF", "الكود المصدري", "شهادة حضور"]
  },
  {
    id: "phys-002", 
    title: "دورة الذكاء الاصطناعي التطبيقي",
    description: "دورة مكثفة لتعلم تطبيقات الذكاء الاصطناعي في الواقع العملي مع مشاريع حقيقية",
    date: "2024-02-20",
    time: "14:00",
    duration: "8 ساعات",
    location: "مقر الأكاديمية - مختبر الذكاء الاصطناعي",
    instructor: "الدكتورة سارة أحمد",
    maxAttendees: 20,
    currentAttendees: 12,
    price: 399,
    isSubscribed: true,
    ticketGenerated: true,
    ticketUrl: "/tickets/ai-workshop-ticket-001.pdf",
    qrCode: "qr-code-001",
    status: 'upcoming',
    requirements: ["لابتوب شخصي", "Python مثبت", "معرفة أساسية بالبرمجة"],
    materials: ["دليل الدورة PDF", "ملفات البيانات", "شهادة حضور معتمدة"]
  }
  ,
  {
    id: "phys-003",
    title: "محاضرة الأمن السيبراني للحضور",
    description: "محاضرة حضورية تفاعلية تغطي أساسيات الأمن السيبراني وطرق الحماية العملية",
    date: "2024-03-01",
    time: "18:00",
    duration: "3 ساعات",
    location: "مقر الأكاديمية - القاعة الرئيسية",
    instructor: "المهندس خالد علي",
    maxAttendees: 50,
    currentAttendees: 0,
    price: 199,
    isSubscribed: false,
    ticketGenerated: false,
    status: 'upcoming',
    requirements: ["كمبيوتر محمول (اختياري)", "معرفة أساسية بالشبكات"],
    materials: ["عرض تقديمي PDF", "روابط أدوات مجانية", "شهادة حضور"]
  }
];

const mockMaterials: LearningMaterial[] = [
  {
    id: "5",
    title: "تطوير تطبيق ويب متكامل - النسخة الشاملة",
    originalFileName: "comprehensive-web-development.pdf", 
    fileType: "pdf",
    uploadDate: "2024-01-28",
    processingStatus: "completed",
    progress: 100,
    summary: "درس تفاعلي متطور مع 3 أقسام رئيسية: عرض الدروس والفصول، محتوى تفاعلي متنوع (فيديو، اختبارات، أدوات)، ومساعد ذكي للدعم المباشر",
    flashcardsCount: 48,
    quizzesCount: 20,
    chatMessages: 35,
    fileSize: "7.2 MB"
  },
  {
    id: "4",
    title: "تطوير تطبيق ويب متكامل - الدرس المبتكر",
    originalFileName: "fullstack-web-development.pdf",
    fileType: "pdf",
    uploadDate: "2024-01-25",
    processingStatus: "completed",
    progress: 100,
    summary: "درس تفاعلي متطور لتطوير تطبيق ويب متكامل مع أدوات تعليمية مبتكرة: محاكي البيئات، المختبر الافتراضي، خرائط المفاهيم الذكية، والتعلم الجماعي",
    flashcardsCount: 42,
    quizzesCount: 15,
    chatMessages: 28,
    fileSize: "5.8 MB"
  },
  {
    id: "1",
    title: "أساسيات البرمجة والخوارزميات",
    originalFileName: "programming-basics.pdf",
    fileType: "pdf",
    uploadDate: "2024-01-20",
    processingStatus: "completed",
    progress: 100,
    summary: "دليل شامل يغطي أساسيات البرمجة والخوارزميات مع أمثلة عملية",
    flashcardsCount: 24,
    quizzesCount: 8,
    chatMessages: 15,
    fileSize: "2.5 MB"
  },
  {
    id: "2", 
    title: "تصميم قواعد البيانات العلائقية",
    originalFileName: "database-design.docx",
    fileType: "docx",
    uploadDate: "2024-01-18",
    processingStatus: "completed",
    progress: 100,
    summary: "شرح متقدم لتصميم قواعد البيانات العلائقية ومبادئ التطبيع",
    flashcardsCount: 18,
    quizzesCount: 5,
    chatMessages: 23,
    fileSize: "1.8 MB"
  },
  {
    id: "3",
    title: "مقدمة في التعلم الآلي وتطبيقاته",
    originalFileName: "machine-learning-intro.pdf", 
    fileType: "pdf",
    uploadDate: "2024-01-15",
    processingStatus: "processing",
    progress: 78,
    summary: "",
    flashcardsCount: 0,
    quizzesCount: 0,
    chatMessages: 0,
    fileSize: "4.2 MB"
  }
];

// مكون الإحصائيات البسيط
function MaterialStats({ materials }: { materials: LearningMaterial[] }) {
  const totalMaterials = materials.length;
  const completedMaterials = materials.filter(m => m.processingStatus === 'completed').length;
  const totalFlashcards = materials.reduce((sum, m) => sum + m.flashcardsCount, 0);
  
  const stats = [
    {
      title: "إجمالي المواد",
      value: totalMaterials,
      icon: <FileText className="w-8 h-8" />,
      change: `${completedMaterials} مكتمل`,
    },
    {
      title: "البطاقات التفاعلية",
      value: totalFlashcards,
      icon: <Brain className="w-8 h-8" />,
      change: "تم إنشاؤها تلقائياً",
    },
    {
      title: "الاختبارات الذكية",
      value: materials.reduce((sum, m) => sum + m.quizzesCount, 0),
      icon: <CheckCircle className="w-8 h-8" />,
      change: "أسئلة ذكية",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 font-noto">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2 font-noto">{stat.value}</p>
              <p className="text-sm mt-2 text-gray-500 font-noto">{stat.change}</p>
            </div>
            <div className="text-blue-600">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// مكون الفلاتر البسيط
function MaterialFilters({ searchTerm, setSearchTerm, selectedStatus, setSelectedStatus }: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
}) {
  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث في المواد التعليمية..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 font-noto"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-noto"
          >
            <option value="all">جميع الحالات</option>
            <option value="completed">مكتمل</option>
            <option value="processing">قيد المعالجة</option>
            <option value="failed">فشل</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// مكون المادة التعليمية البسيط
function MaterialItem({ material, onDelete }: { 
  material: LearningMaterial; 
  onDelete: (id: string) => void;
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 font-noto">مكتمل</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800 font-noto">قيد المعالجة</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 font-noto">فشل</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 font-noto">غير معروف</Badge>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border-0">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-noto">{material.title}</h3>
          <p className="text-sm text-gray-600 mb-2 font-noto">{material.originalFileName}</p>
          <p className="text-sm text-gray-500 font-noto">{material.uploadDate} • {material.fileSize}</p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(material.processingStatus)}
          <Badge variant="outline" className="text-xs font-noto">
            {material.fileType.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* شريط التقدم للمعالجة */}
      {material.processingStatus === 'processing' && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-noto">معالجة المحتوى...</span>
            <span className="font-noto">{Math.round(material.progress)}%</span>
          </div>
          <Progress value={material.progress} className="h-2" />
        </div>
      )}

      {/* المحتوى للمواد المكتملة */}
      {material.processingStatus === 'completed' && (
        <>
          <p className="text-sm text-gray-700 mb-4 font-noto">{material.summary}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="font-noto">{material.flashcardsCount} بطاقة تفاعلية</span>
            <span className="font-noto">{material.quizzesCount} اختبار</span>
            <span className="font-noto">{material.chatMessages} رسالة</span>
          </div>
        </>
      )}

      {/* الأزرار */}
      <div className="flex items-center gap-2">
        {material.processingStatus === 'completed' ? (
          <>
                            <Link to={
                  material.id === "5" ? `/dashboard/ai-learning-materials/comprehensive-web-development` :
                  material.id === "4" ? `/dashboard/ai-learning-materials/innovative-study` : 
                  `/dashboard/ai-learning-materials/${material.id}/study`
                }>
              <Button size="sm" className="font-noto">
                <BookOpen className="w-4 h-4 mr-2" />
                {material.id === "5" ? "دراسة شاملة" : material.id === "4" ? "دراسة متطورة" : "دراسة"}
              </Button>
            </Link>
            <Button size="sm" variant="outline">
              <MessageSquare className="w-4 h-4" />
            </Button>
          </>
        ) : (
          <Button size="sm" disabled className="font-noto">
            <Clock className="w-4 h-4 mr-2" />
            معالجة جارية...
          </Button>
        )}
        
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => onDelete(material.id)}
          className="text-red-600 hover:text-red-700 ml-auto"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// مكون بطاقة المادة الحضورية
function PhysicalMaterialCard({ 
  material, 
  onSubscribe, 
  onGenerateTicket, 
  onDownloadTicket 
}: { 
  material: PhysicalAttendanceMaterial;
  onSubscribe: (id: string) => void;
  onGenerateTicket: (id: string) => void;
  onDownloadTicket: (id: string) => void;
}) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800 font-noto">قادم</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-800 font-noto">جاري الآن</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800 font-noto">مكتمل</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 font-noto">غير معروف</Badge>;
    }
  };

  const isFull = material.currentAttendees >= material.maxAttendees;
  const availableSpots = material.maxAttendees - material.currentAttendees;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border-0">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-noto">{material.title}</h3>
          <p className="text-sm text-gray-600 mb-3 font-noto">{material.description}</p>
          <div className="flex items-center gap-2 mb-2">
            {getStatusBadge(material.status)}
            <Badge variant="outline" className="text-xs font-noto">
              {material.duration}
            </Badge>
          </div>
        </div>
      </div>

      {/* تفاصيل المادة */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="font-noto">{material.date} في {material.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4" />
          <span className="font-noto">{material.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4" />
          <span className="font-noto">المدرب: {material.instructor}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-4 h-4" />
          <span className="font-noto">
            الحضور: {material.currentAttendees}/{material.maxAttendees}
            {isFull && <span className="text-red-600 mr-1">(مكتمل)</span>}
          </span>
        </div>
      </div>

      {/* المتطلبات والمواد */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2 font-noto">المتطلبات:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {material.requirements.map((req, index) => (
            <li key={index} className="font-noto">• {req}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2 font-noto">المحتويات:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {material.materials.map((item, index) => (
            <li key={index} className="font-noto">• {item}</li>
          ))}
        </ul>
      </div>

      {/* السعر والأزرار */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold text-gray-900">
          {material.price} <span className="text-sm font-normal text-gray-600">ريال</span>
        </div>
        <div className="text-sm text-gray-600">
          {availableSpots} مقاعد متاحة
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex items-center gap-2">
        {!material.isSubscribed ? (
          <Button 
            size="sm" 
            className="font-noto"
            onClick={() => onSubscribe(material.id)}
            disabled={isFull}
          >
            اشترك الآن
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 font-noto">
              مشترك
            </Badge>
            {!material.ticketGenerated ? (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onGenerateTicket(material.id)}
                className="font-noto"
              >
                إنشاء تذكرة
              </Button>
            ) : (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onDownloadTicket(material.id)}
                className="font-noto"
              >
                تحميل التذكرة
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AILearningMaterials() {
  const [materials, setMaterials] = useState<LearningMaterial[]>(mockMaterials);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [physicalList, setPhysicalList] = useState<PhysicalAttendanceMaterial[]>(physicalMaterials);
  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false);
  const [selectedPhysicalId, setSelectedPhysicalId] = useState<string | null>(null);
  const [studentForm, setStudentForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    notes: "",
  });

  // فلترة المواد
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.originalFileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || material.processingStatus === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // رفع الملفات
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      alert('يرجى رفع ملف PDF أو Word فقط');
      return;
    }

    setIsUploading(true);

    // إنشاء مادة جديدة
    const newMaterial: LearningMaterial = {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      originalFileName: file.name,
      fileType: file.type.includes('pdf') ? 'pdf' : 'docx',
      uploadDate: new Date().toISOString().split('T')[0],
      processingStatus: 'processing',
      progress: 0,
      summary: "",
      flashcardsCount: 0,
      quizzesCount: 0,
      chatMessages: 0,
      fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`
    };

    setMaterials(prev => [newMaterial, ...prev]);

    // محاكاة تقدم المعالجة
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setMaterials(prev => prev.map(m => 
          m.id === newMaterial.id 
            ? {
                ...m, 
                processingStatus: 'completed' as const,
                progress: 100,
                summary: "تم إنشاء ملخص تلقائي للمحتوى باستخدام الذكاء الاصطناعي",
                flashcardsCount: Math.floor(Math.random() * 20) + 10,
                quizzesCount: Math.floor(Math.random() * 8) + 3
              }
            : m
        ));
        setIsUploading(false);
      } else {
        setMaterials(prev => prev.map(m => 
          m.id === newMaterial.id ? {...m, progress} : m
        ));
      }
    }, 800);

    event.target.value = '';
  };

  const deleteMaterial = (materialId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذه المادة التعليمية؟')) {
      setMaterials(materials.filter(m => m.id !== materialId));
    }
  };

  // فتح نموذج الاشتراك
  const openSubscribeDialog = (id: string) => {
    setSelectedPhysicalId(id);
    setIsSubscribeDialogOpen(true);
  };

  // تحديث نموذج الطالب
  const updateStudentField = (field: keyof typeof studentForm, value: string) => {
    setStudentForm(prev => ({ ...prev, [field]: value }));
  };

  // تأكيد الاشتراك بعد تعبئة البيانات
  const submitSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhysicalId) return;
    if (!studentForm.fullName.trim() || !studentForm.email.trim() || !studentForm.phone.trim()) {
      alert('يرجى تعبئة الاسم والبريد والهاتف');
      return;
    }
    handleSubscribe(selectedPhysicalId);
    setIsSubscribeDialogOpen(false);
    setStudentForm({ fullName: "", email: "", phone: "", notes: "" });
    alert('تم الاشتراك بنجاح! يمكنك الآن إنشاء/تحميل التذكرة.');
  };

  // اشتراك في مادة حضورية
  const handleSubscribe = (id: string) => {
    setPhysicalList(prev => prev.map(m => {
      if (m.id !== id) return m;
      const isFull = m.currentAttendees >= m.maxAttendees;
      if (isFull || m.isSubscribed) return m;
      return {
        ...m,
        isSubscribed: true,
        currentAttendees: Math.min(m.currentAttendees + 1, m.maxAttendees)
      };
    }));
  };

  // إنشاء تذكرة حضور (ملف نصي بسيط يحتوي تفاصيل التذكرة)
  const handleGenerateTicket = (id: string) => {
    setPhysicalList(prev => prev.map(m => {
      if (m.id !== id) return m;
      const ticketNumber = `${id}-${Date.now()}`;
      const content = `تذكرة حضور\n\nالعنوان: ${m.title}\nالتاريخ: ${m.date} ${m.time}\nالموقع: ${m.location}\nالمدرب: ${m.instructor}\nرقم التذكرة: ${ticketNumber}\n\nيرجى إظهار هذه التذكرة عند الدخول.`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      return {
        ...m,
        ticketGenerated: true,
        ticketUrl: url
      };
    }));
  };

  // تنزيل التذكرة
  const handleDownloadTicket = (id: string) => {
    const material = physicalList.find(m => m.id === id);
    if (!material) return;
    if (!material.ticketGenerated || !material.ticketUrl) {
      // أنشئ التذكرة محلياً ثم قم بالتنزيل مباشرة باستخدام الرابط المحلي
      const ticketNumber = `${id}-${Date.now()}`;
      const content = `تذكرة حضور\n\nالعنوان: ${material.title}\nالتاريخ: ${material.date} ${material.time}\nالموقع: ${material.location}\nالمدرب: ${material.instructor}\nرقم التذكرة: ${ticketNumber}\n\nيرجى إظهار هذه التذكرة عند الدخول.`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      setPhysicalList(prev => prev.map(m => m.id === id ? { ...m, ticketGenerated: true, ticketUrl: url } : m));
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket-${id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      return;
    }

    const a = document.createElement('a');
    a.href = material.ticketUrl;
    a.download = `ticket-${id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(material.ticketUrl!), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header البسيط */}
      <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Brain className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-sm lg:text-base font-noto">
              المواد التعليمية الذكية
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf,.docx"
            className="hidden"
          />
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            variant="outline"
            className="font-noto"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? "جاري الرفع..." : "رفع ملف"}
          </Button>
          <Link to="/dashboard/ai-learning-materials/challenges">
            <Button variant="outline" className="font-noto">
              <Code2 className="w-4 h-4 mr-2" />
              التحديات البرمجية
            </Button>
          </Link>
          <Link to="/dashboard/ai-learning-materials/create-challenge">
            <Button variant="outline" className="font-noto">
              <Plus className="w-4 h-4 mr-2" />
              إنشاء تحدي
            </Button>
          </Link>
          <Link to="/dashboard/ai-learning-materials/live-stream/new">
            <Button variant="outline" className="font-noto">
              <Radio className="w-4 h-4 mr-2" />
              بث مباشر
            </Button>
          </Link>
          <Link to="/dashboard/ai-learning-materials/add">
            <Button className="font-noto">
              <Plus className="w-4 h-4 mr-2" />
              إضافة مادة
            </Button>
          </Link>
          <Link to="/dashboard/physical-courses/new">
            <Button variant="outline" className="font-noto">
              <Calendar className="w-4 h-4 mr-2" />
              إنشاء دورة حضورية
            </Button>
          </Link>
        </div>
      </div>

      {/* الإحصائيات */}
      <MaterialStats materials={filteredMaterials} />

      {/* الفلاتر */}
      <MaterialFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />

      {/* المواد الحضورية */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 font-noto">المواد الحضورية</h3>
          </div>
        </div>
        {physicalList.length === 0 ? (
          <p className="text-sm text-gray-600 font-noto">لا توجد مواد حضورية حالياً.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {physicalList.map((m) => (
              <PhysicalMaterialCard
                key={m.id}
                material={m}
                onSubscribe={openSubscribeDialog}
                onGenerateTicket={handleGenerateTicket}
                onDownloadTicket={handleDownloadTicket}
              />
            ))}
          </div>
        )}
      </div>

      {/* مودال اشتراك الطالب */}
      <Dialog open={isSubscribeDialogOpen} onOpenChange={setIsSubscribeDialogOpen}>
        <DialogContent className="sm:max-w-xl border-0 rounded-2xl shadow-xl" dir="rtl">
          <DialogHeader>
            <DialogTitle className="font-noto text-xl">تأكيد الاشتراك في المادة الحضورية</DialogTitle>
            <DialogDescription className="font-noto">يرجى تعبئة بياناتك لإتمام الاشتراك.</DialogDescription>
          </DialogHeader>
          {/* معلومات المادة المحددة */}
          {selectedPhysicalId && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              {(() => {
                const mat = physicalList.find(m => m.id === selectedPhysicalId);
                if (!mat) return null;
                return (
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 font-noto">{mat.title}</h4>
                      <p className="text-sm text-gray-600 font-noto mt-1">{mat.location}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="font-noto">{mat.date} • {mat.time}</span>
                      </div>
                      <div className="hidden md:block w-px h-4 bg-gray-200" />
                      <span className="font-noto">المدرب: {mat.instructor}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
          <form onSubmit={submitSubscription} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="font-noto">الاسم الكامل</Label>
                <Input id="fullName" value={studentForm.fullName} onChange={(e) => updateStudentField('fullName', e.target.value)} required className="font-noto" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-noto">رقم الجوال</Label>
                <Input id="phone" value={studentForm.phone} onChange={(e) => updateStudentField('phone', e.target.value)} required className="font-noto" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email" className="font-noto">البريد الإلكتروني</Label>
                <Input id="email" type="email" value={studentForm.email} onChange={(e) => updateStudentField('email', e.target.value)} required className="font-noto" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes" className="font-noto">ملاحظات (اختياري)</Label>
                <Textarea id="notes" rows={3} value={studentForm.notes} onChange={(e) => updateStudentField('notes', e.target.value)} className="font-noto" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsSubscribeDialogOpen(false)} className="font-noto">إلغاء</Button>
              <Button type="submit" className="font-noto">تأكيد الاشتراك</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* البثوث المباشرة النشطة */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-semibold text-gray-900 font-noto">البثوث المباشرة النشطة</h3>
            </div>
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              مباشر
            </Badge>
          </div>
          <Link to="/dashboard/ai-learning-materials/live-stream/new">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 font-noto">
              <Radio className="w-4 h-4 mr-2" />
              بدء بث جديد
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* بث تجريبي نشط */}
          <Link to="/dashboard/ai-learning-materials/live-stream/demo">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-red-600 font-noto">مباشر الآن</span>
                <Badge variant="outline" className="text-xs">
                  25 مشاهد
                </Badge>
              </div>
              <h4 className="font-medium text-gray-900 mb-1 font-noto">ورشة تطوير التطبيقات</h4>
              <p className="text-sm text-gray-600 font-noto">مع الأستاذ أحمد محمد</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>بدأ منذ 15 دقيقة</span>
              </div>
            </div>
          </Link>
          
          {/* إضافة المزيد من البثوث هنا */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <Radio className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500 font-noto">لا توجد بثوث أخرى نشطة</p>
            <Button size="sm" variant="outline" className="mt-2 font-noto" asChild>
              <Link to="/dashboard/ai-learning-materials/live-stream/new">
                بدء بث جديد
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* قائمة المواد */}
      {filteredMaterials.length === 0 ? (
        <div className="bg-white p-12 rounded-xl shadow-sm border-0 text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-noto">
            {searchTerm || selectedStatus !== "all" ? "لا توجد مواد مطابقة" : "لا توجد مواد تعليمية"}
          </h3>
          <p className="text-gray-600 mb-6 font-noto">
            {searchTerm || selectedStatus !== "all" 
              ? "جرب تغيير مصطلحات البحث أو الفلاتر"
              : "ابدأ برفع أول ملف PDF أو Word لتحويله إلى مادة تعليمية تفاعلية"
            }
          </p>
          {!searchTerm && selectedStatus === "all" && (
            <Button onClick={() => fileInputRef.current?.click()} className="font-noto">
              <Upload className="w-4 h-4 mr-2" />
              رفع أول ملف
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMaterials.map((material) => (
            <MaterialItem
              key={material.id}
              material={material}
              onDelete={deleteMaterial}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AILearningMaterials;
