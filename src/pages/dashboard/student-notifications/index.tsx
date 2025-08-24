import React, { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { 
  Users, 
  Search, 
  Eye, 
  Bell, 
  BookOpen, 
  FileText, 
  Award, 
  MessageSquare,
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Target,
  BarChart
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import type { Student, CourseProgress, StudentExam, StudentCertificate, StudentComment } from "@/types/student-notification";
import SendNotificationModal from "./components/SendNotificationModal";

// StudentStats Component - Similar to BlogStats
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

const StatCard = ({ title, value, icon, change, changeType }: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

interface StudentStatsProps {
  students: Student[];
}

function StudentStats({ students }: StudentStatsProps) {
  const totalStudents = students.length;
  
  // Calculate total sales (sum of all purchased courses prices)
  const totalSales = students.reduce((sum, student) => {
    return sum + student.purchasedCourses.reduce((courseSum, course) => courseSum + course.price, 0);
  }, 0);
  
  // Calculate average course completion
  const totalCompletionPercentages = students.reduce((sum, student) => {
    const studentAvg = student.coursesProgress.reduce((progSum, prog) => progSum + prog.completionPercentage, 0) / (student.coursesProgress.length || 1);
    return sum + studentAvg;
  }, 0);
  const avgCompletion = totalCompletionPercentages / (totalStudents || 1);
  
  // Calculate average improvement rate (mock calculation based on course progress)
  const avgImprovement = students.reduce((sum, student) => {
    const completedCourses = student.coursesProgress.filter(prog => prog.completionPercentage === 100).length;
    const improvementRate = (completedCourses / (student.coursesProgress.length || 1)) * 100;
    return sum + improvementRate;
  }, 0) / (totalStudents || 1);
  
  // Calculate average benefit rate (based on exams and certificates)
  const avgBenefit = students.reduce((sum, student) => {
    const examAvg = student.exams.length > 0 ? 
      student.exams.reduce((examSum, exam) => examSum + (exam.score / exam.maxScore * 100), 0) / student.exams.length : 0;
    const benefitRate = (examAvg + (student.certificates.length * 20)) / 2; // Mock calculation
    return sum + benefitRate;
  }, 0) / (totalStudents || 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="إجمالي الطلاب"
        value={totalStudents}
        icon={<Users className="w-8 h-8" />}
        change="+8%"
        changeType="positive"
      />
      <StatCard
        title="إجمالي المبيعات"
        value={`${totalSales.toLocaleString()} ر.س`}
        icon={<DollarSign className="w-8 h-8" />}
        change="+15%"
        changeType="positive"
      />
      <StatCard
        title="متوسط إكمال الدورات"
        value={`${avgCompletion.toFixed(1)}%`}
        icon={<Target className="w-8 h-8" />}
        change="+5%"
        changeType="positive"
      />
      <StatCard
        title="متوسط التحسن"
        value={`${avgImprovement.toFixed(1)}%`}
        icon={<TrendingUp className="w-8 h-8" />}
        change="+18%"
        changeType="positive"
      />
    </div>
  );
}

// Mock data for students with comprehensive information
const mockStudents: Student[] = [
  {
    id: 1,
    name: "أحمد محمد السعيد",
    email: "ahmed.saeed@example.com",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    joinDate: "2024-01-15",
    totalPurchases: 3,
    purchasedCourses: [
      { id: 1, courseName: "دورة البرمجة المتقدمة", purchaseDate: "2024-01-15", price: 599, category: "تطوير" },
      { id: 2, courseName: "دورة التسويق الرقمي", purchaseDate: "2024-03-10", price: 399, category: "تسويق" },
      { id: 3, courseName: "دورة إدارة المشاريع", purchaseDate: "2024-05-20", price: 499, category: "إدارة" }
    ],
    coursesProgress: [
      { id: 1, courseName: "دورة البرمجة المتقدمة", completionPercentage: 85, enrollmentDate: "2024-01-15", lastAccessDate: "2024-08-20" },
      { id: 2, courseName: "دورة التسويق الرقمي", completionPercentage: 100, enrollmentDate: "2024-03-10", lastAccessDate: "2024-07-25" },
      { id: 3, courseName: "دورة إدارة المشاريع", completionPercentage: 45, enrollmentDate: "2024-05-20", lastAccessDate: "2024-08-18" }
    ],
    exams: [
      { id: 1, examName: "اختبار البرمجة النهائي", courseName: "دورة البرمجة المتقدمة", examType: "final", score: 87, maxScore: 100, completionDate: "2024-08-15" },
      { id: 2, examName: "اختبار التسويق", courseName: "دورة التسويق الرقمي", examType: "midterm", score: 92, maxScore: 100, completionDate: "2024-07-20" }
    ],
    certificates: [
      { id: 1, courseName: "دورة التسويق الرقمي", issueDate: "2024-07-25", certificateUrl: "#" }
    ],
    comments: [
      { id: 1, itemName: "دورة التسويق الرقمي", itemType: "course", comment: "دورة ممتازة ومفيدة جداً، أنصح الجميع بها", rating: 5, commentDate: "2024-07-25" },
      { id: 2, itemName: "كتاب البرمجة الشاملة", itemType: "product", comment: "محتوى رائع ولكن يحتاج لمزيد من الأمثلة العملية", rating: 4, commentDate: "2024-08-10" }
    ]
  },
  {
    id: 2,
    name: "فاطمة علي أحمد",
    email: "fatima.ali@example.com",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
    joinDate: "2024-02-20",
    totalPurchases: 2,
    purchasedCourses: [
      { id: 4, courseName: "دورة تطوير المواقع", purchaseDate: "2024-02-20", price: 799, category: "تطوير" },
      { id: 5, courseName: "دورة التصميم الجرافيكي", purchaseDate: "2024-04-15", price: 599, category: "تصميم" }
    ],
    coursesProgress: [
      { id: 4, courseName: "دورة تطوير المواقع", completionPercentage: 100, enrollmentDate: "2024-02-20", lastAccessDate: "2024-06-30" },
      { id: 5, courseName: "دورة التصميم الجرافيكي", completionPercentage: 60, enrollmentDate: "2024-04-15", lastAccessDate: "2024-08-22" }
    ],
    exams: [
      { id: 3, examName: "اختبار تطوير المواقع", courseName: "دورة تطوير المواقع", examType: "final", score: 95, maxScore: 100, completionDate: "2024-06-25" }
    ],
    certificates: [
      { id: 2, courseName: "دورة تطوير المواقع", issueDate: "2024-06-30", certificateUrl: "#" }
    ],
    comments: [
      { id: 3, itemName: "دورة تطوير المواقع", itemType: "course", comment: "دورة شاملة وممتازة، تعلمت الكثير", rating: 5, commentDate: "2024-06-30" },
      { id: 4, itemName: "مقالة أساسيات التصميم", itemType: "article", comment: "مقالة مفيدة ومبسطة", rating: 4, commentDate: "2024-07-10" }
    ]
  }
];

function StudentNotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      const matchesSearch =
        searchTerm === "" ||
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [searchTerm]);

  const toggleRowExpansion = (studentId: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(studentId)) {
      newExpanded.delete(studentId);
    } else {
      newExpanded.add(studentId);
    }
    setExpandedRows(newExpanded);
  };

  const handleSendNotification = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const renderDetailTable = (title: string, data: any[], columns: any[], icon: React.ReactNode) => {
    if (!data || data.length === 0) {
      return (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            {icon}
            <h4 className="font-medium text-gray-700">{title}</h4>
          </div>
          <p className="text-sm text-gray-500">لا توجد بيانات</p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <h4 className="font-medium text-gray-900">{title}</h4>
          <Badge variant="secondary">{data.length}</Badge>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  {columns.map((col, index) => (
                    <th key={index} className="text-right py-3 px-4 font-semibold text-gray-700 first:rounded-tr-lg last:rounded-tl-lg">
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    {columns.map((col, colIndex) => (
                      <td key={colIndex} className="py-3 px-4 text-gray-600 border-t border-gray-100">
                        {col.render ? col.render(item) : item[col.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-3">
          {data.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
              {columns.map((col, colIndex) => (
                <div key={colIndex} className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-700 min-w-0 flex-1">
                    {col.header}:
                  </span>
                  <div className="text-sm text-gray-600 text-right min-w-0 flex-1">
                    {col.render ? col.render(item) : item[col.accessor]}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const columns: ColumnDef<Student>[] = [
    {
      id: "expand",
      header: "",
      cell: ({ row }) => {
        const student = row.original;
        const isExpanded = expandedRows.has(student.id);
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleRowExpansion(student.id)}
            className="p-1"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "الطالب",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={student.profileImage}
              alt={student.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <div className="font-medium text-gray-900">{student.name}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "joinDate",
      header: "تاريخ الانضمام",
      cell: ({ row }) => {
        const date = new Date(row.getValue("joinDate"));
        return (
          <div className="text-sm text-gray-600">
            {date.toLocaleDateString("ar-SA")}
          </div>
        );
      },
    },
    {
      accessorKey: "totalPurchases",
      header: "عدد المشتريات",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="text-center">
            <Badge variant="secondary">
              {student.totalPurchases} دورة
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSendNotification(student)}
              className="p-2 hover:bg-blue-50"
            >
              <Bell className="w-4 h-4 text-blue-600" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredStudents,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // Define columns for detail tables
  const coursesColumns = [
    { header: "الدورة", accessor: "courseName" },
    { 
      header: "نسبة الاكمال", 
      accessor: "completionPercentage",
      render: (item: CourseProgress) => (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${item.completionPercentage}%` }}
            ></div>
          </div>
          <span className="text-sm">{item.completionPercentage}%</span>
        </div>
      )
    },
    { 
      header: "آخر وصول", 
      accessor: "lastAccessDate",
      render: (item: CourseProgress) => new Date(item.lastAccessDate).toLocaleDateString("ar-SA")
    }
  ];

  const examsColumns = [
    { header: "الاختبار", accessor: "examName" },
    { header: "الدورة", accessor: "courseName" },
    { 
      header: "نوع الاختبار", 
      accessor: "examType",
      render: (item: StudentExam) => (
        <Badge className="bg-blue-100 text-blue-800">
          {item.examType === "quiz" ? "مقتطفات" :
           item.examType === "midterm" ? "نصفي" :
           item.examType === "final" ? "نهائي" : "مهام"}
        </Badge>
      )
    },
    { 
      header: "الدرجة", 
      accessor: "score",
      render: (item: StudentExam) => `${item.score}/${item.maxScore}`
    },
    { 
      header: "تاريخ الاختبار", 
      accessor: "completionDate",
      render: (item: StudentExam) => new Date(item.completionDate).toLocaleDateString("ar-SA")
    }
  ];

  const commentsColumns = [
    { 
      header: "نوع العنصر", 
      accessor: "itemType",
      render: (item: StudentComment) => (
        <Badge className={
          item.itemType === "course" ? "bg-blue-100 text-blue-800" :
          item.itemType === "product" ? "bg-green-100 text-green-800" :
          "bg-purple-100 text-purple-800"
        }>
          {item.itemType === "course" ? "دورة" :
           item.itemType === "product" ? "منتج" : "مقالة"}
        </Badge>
      )
    },
    { header: "اسم العنصر", accessor: "itemName" },
    { 
      header: "التعليق", 
      accessor: "comment",
      render: (item: StudentComment) => (
        <div className="max-w-xs truncate" title={item.comment}>
          {item.comment}
        </div>
      )
    },
    { 
      header: "التقييم", 
      accessor: "rating",
      render: (item: StudentComment) => (
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${
                i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`} 
            />
          ))}
        </div>
      )
    },
    { 
      header: "التاريخ", 
      accessor: "commentDate",
      render: (item: StudentComment) => new Date(item.commentDate).toLocaleDateString("ar-SA")
    }
  ];

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Users}
        title="بيانات الطلاب"
      />

      {/* Statistics Cards */}
      <StudentStats students={mockStudents} />

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border-0">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ابحث باسم الطالب أو البريد الإلكتروني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-right font-semibold text-gray-700 py-4"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const student = row.original;
                const isExpanded = expandedRows.has(student.id);
                
                return (
                  <React.Fragment key={row.id}>
                    <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-right py-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    
                    {/* Expanded Details */}
                    {isExpanded && (
                      <TableRow>
                        <TableCell colSpan={columns.length} className="p-0">
                          <div className="bg-gray-50 p-6 space-y-6">
                            {/* Course Progress */}
                            {renderDetailTable(
                              "التقدم في المواد التعليمية",
                              student.coursesProgress,
                              coursesColumns,
                              <TrendingUp className="w-4 h-4 text-blue-600" />
                            )}
                            
                            {/* Exams */}
                            {renderDetailTable(
                              "الاختبارات",
                              student.exams,
                              examsColumns,
                              <FileText className="w-4 h-4 text-green-600" />
                            )}
                            
                            {/* Comments */}
                            {renderDetailTable(
                              "التعليقات",
                              student.comments,
                              commentsColumns,
                              <MessageSquare className="w-4 h-4 text-purple-600" />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  لا توجد نتائج.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          عرض {table.getFilteredRowModel().rows.length} طالب.
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            السابق
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            التالي
          </Button>
        </div>
      </div>

      {/* Send Notification Modal */}
      {selectedStudent && (
        <SendNotificationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedStudent(null);
          }}
          selectedStudents={[selectedStudent]}
        />
      )}
    </div>
  );
}

export default StudentNotificationsPage;