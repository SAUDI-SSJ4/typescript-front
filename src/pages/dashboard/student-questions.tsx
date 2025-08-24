import { MessageCircle } from "lucide-react";
import { StudentQuestionsStats, StudentQuestionsFilters, StudentQuestionsTable } from "@/features/student-questions";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import type { StudentQuestion, StudentQuestionFilters } from "@/types/student-question";
import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";

// Mock data for demonstration
const mockQuestions: StudentQuestion[] = [
  {
    id: "1",
    studentName: "أحمد محمد",
    studentEmail: "ahmed.mohammed@example.com",
    courseName: "أساسيات البرمجة",
    lessonName: "متغيرات JavaScript",
    question: "ما الفرق بين let و var في JavaScript؟ ولماذا يُفضل استخدام let؟",
    aiResponse: "الفرق الرئيسي بين let و var في JavaScript:\n\n1. النطاق (Scope):\n- var: لها نطاق دالة (function scope)\n- let: لها نطاق كتلة (block scope)\n\n2. إعادة التعريف:\n- var: يمكن إعادة تعريفها في نفس النطاق\n- let: لا يمكن إعادة تعريفها في نفس النطاق\n\n3. Hoisting:\n- var: يتم رفعها وتهيئتها بـ undefined\n- let: يتم رفعها لكن لا يتم تهيئتها\n\nيُفضل استخدام let لأنها أكثر أماناً وتمنع الأخطاء الشائعة.",
    createdAt: new Date("2024-02-20T10:30:00"),
    isAnswered: true,
    category: "programming",
    difficulty: "medium",
  },
  {
    id: "2", 
    studentName: "فاطمة علي",
    studentEmail: "fatma.ali@example.com",
    courseName: "تصميم المواقع",
    lessonName: "CSS Grid Layout",
    question: "كيف يمكنني إنشاء شبكة مرنة باستخدام CSS Grid؟",
    aiResponse: "لإنشاء شبكة مرنة باستخدام CSS Grid:\n\n1. تعيين العنصر الحاوي:\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}\n```\n\n2. خصائص مهمة:\n- repeat(auto-fit, ...): ينشئ أعمدة تلقائياً\n- minmax(250px, 1fr): حد أدنى 250px وحد أقصى مرن\n- gap: المسافة بين العناصر\n\n3. لمزيد من المرونة:\n```css\ngrid-template-rows: masonry; /* قريباً */\n```",
    createdAt: new Date("2024-02-21T14:15:00"),
    isAnswered: true,
    category: "design",
    difficulty: "hard",
  },
  {
    id: "3",
    studentName: "عمر خالد", 
    studentEmail: "omar.khaled@example.com",
    courseName: "قواعد البيانات",
    lessonName: "SQL Joins",
    question: "متى أستخدم INNER JOIN ومتى أستخدم LEFT JOIN؟",
    aiResponse: "استخدام أنواع JOIN في SQL:\n\n1. INNER JOIN:\n- يرجع الصفوف الموجودة في كلا الجدولين\n- استخدمه عندما تريد البيانات المطابقة فقط\n\nمثال:\n```sql\nSELECT * FROM orders o\nINNER JOIN customers c ON o.customer_id = c.id;\n```\n\n2. LEFT JOIN:\n- يرجع جميع الصفوف من الجدول الأيسر + المطابقات من الأيمن\n- استخدمه عندما تريد جميع البيانات من الجدول الأول\n\nمثال:\n```sql\nSELECT * FROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;\n```",
    createdAt: new Date("2024-02-22T09:45:00"),
    isAnswered: true,
    category: "database",
    difficulty: "medium",
  },
  {
    id: "4",
    studentName: "سارة أحمد",
    studentEmail: "sara.ahmed@example.com", 
    courseName: "أساسيات البرمجة",
    lessonName: "Functions",
    question: "ما هي Arrow Functions في JavaScript وما مميزاتها؟",
    aiResponse: "",
    createdAt: new Date("2024-02-23T16:20:00"),
    isAnswered: false,
    category: "programming",
    difficulty: "easy",
  },
  {
    id: "5",
    studentName: "محمد حسن",
    studentEmail: "mohammed.hassan@example.com",
    courseName: "تطوير التطبيقات",
    lessonName: "React Hooks",
    question: "كيف أستخدم useEffect للتعامل مع البيانات من API؟",
    aiResponse: "",
    createdAt: new Date("2024-02-23T11:10:00"),
    isAnswered: false,
    category: "framework",
    difficulty: "hard",
  },
  {
    id: "6",
    studentName: "نور الهدى",
    studentEmail: "noor.alhuda@example.com",
    courseName: "تصميم المواقع", 
    lessonName: "Responsive Design",
    question: "ما أفضل الممارسات لتصميم موقع متجاوب؟",
    aiResponse: "أفضل الممارسات للتصميم المتجاوب:\n\n1. Mobile First Approach:\n- ابدأ بتصميم الهاتف ثم توسع للشاشات الأكبر\n\n2. استخدم وحدات مرنة:\n- rem, em, %, vw, vh بدلاً من px\n\n3. Media Queries الذكية:\n```css\n/* Mobile */\n@media (min-width: 768px) { /* Tablet */ }\n@media (min-width: 1024px) { /* Desktop */ }\n```\n\n4. CSS Grid & Flexbox:\n- للتخطيطات المرنة\n\n5. الصور المتجاوبة:\n```css\nimg { max-width: 100%; height: auto; }\n```",
    createdAt: new Date("2024-02-19T13:30:00"),
    isAnswered: true,
    category: "design",
    difficulty: "medium",
  },
];

function StudentQuestions() {
  const [filters, setFilters] = useState<StudentQuestionFilters>({
    search: "",
    course: "الكل",
    student: "الكل",
    isAnswered: undefined,
  });
  const [table, setTable] = useState<Table<StudentQuestion> | null>(null);

  // Extract unique courses and students for filters
  const courses = useMemo(() => {
    return Array.from(new Set(mockQuestions.map(q => q.courseName)));
  }, []);

  const students = useMemo(() => {
    return Array.from(new Set(mockQuestions.map(q => q.studentName)));
  }, []);

  const filteredQuestions = useMemo(() => {
    return mockQuestions.filter((question) => {
      const matchesSearch = 
        filters.search === "" ||
        question.question.toLowerCase().includes(filters.search.toLowerCase()) ||
        question.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
        question.courseName.toLowerCase().includes(filters.search.toLowerCase()) ||
        question.lessonName.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCourse = 
        filters.course === "الكل" || question.courseName === filters.course;

      const matchesStudent = 
        filters.student === "الكل" || question.studentName === filters.student;

      const matchesAnswered = 
        filters.isAnswered === undefined || question.isAnswered === filters.isAnswered;

      const matchesDateRange = 
        (!filters.dateFrom || new Date(question.createdAt) >= filters.dateFrom) &&
        (!filters.dateTo || new Date(question.createdAt) <= filters.dateTo);

      return matchesSearch && matchesCourse && matchesStudent && matchesAnswered && matchesDateRange;
    });
  }, [filters]);

  const handleFiltersChange = (newFilters: Partial<StudentQuestionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      course: "الكل",
      student: "الكل",
      isAnswered: undefined,
    });
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={MessageCircle}
        title="أسئلة الطلاب"
      />
      
      <StudentQuestionsStats questions={filteredQuestions} />
      
      <StudentQuestionsFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        table={table}
        courses={courses}
        students={students}
      />
      
      <StudentQuestionsTable 
        questions={filteredQuestions} 
        onTableReady={setTable}
      />
    </div>
  );
}

export default StudentQuestions;