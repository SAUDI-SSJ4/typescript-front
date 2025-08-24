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
  ClipboardCheck, 
  Search, 
  Eye,
  User,
  TrendingUp,
  FileText,
  Award,
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
import { useNavigate } from "react-router-dom";

// Types for exam data
interface ExamResult {
  id: number;
  studentId: number;
  studentName: string;
  studentImage: string;
  examName: string;
  courseName: string;
  examType: "quiz" | "midterm" | "final" | "assignment";
  score: number;
  maxScore: number;
  completionDate: string;
  duration: string;
  passingScore: number;
  isPassed: boolean;
}

// StatCard Component - Same as BlogStats
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

// Mock data for exam results
const mockExamResults: ExamResult[] = [
  {
    id: 1,
    studentId: 1,
    studentName: "أحمد محمد السعيد",
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    examName: "اختبار البرمجة النهائي",
    courseName: "دورة البرمجة المتقدمة",
    examType: "final",
    score: 87,
    maxScore: 100,
    completionDate: "2024-08-15",
    duration: "120 دقيقة",
    passingScore: 70,
    isPassed: true
  },
  {
    id: 2,
    studentId: 1,
    studentName: "أحمد محمد السعيد",
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    examName: "اختبار التسويق",
    courseName: "دورة التسويق الرقمي",
    examType: "midterm",
    score: 92,
    maxScore: 100,
    completionDate: "2024-07-20",
    duration: "90 دقيقة",
    passingScore: 70,
    isPassed: true
  },
  {
    id: 3,
    studentId: 2,
    studentName: "فاطمة علي أحمد",
    studentImage: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
    examName: "اختبار تطوير المواقع",
    courseName: "دورة تطوير المواقع",
    examType: "final",
    score: 95,
    maxScore: 100,
    completionDate: "2024-06-25",
    duration: "150 دقيقة",
    passingScore: 75,
    isPassed: true
  },
  {
    id: 4,
    studentId: 3,
    studentName: "محمد عبدالله الغامدي",
    studentImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    examName: "مهام إدارة المشاريع",
    courseName: "دورة إدارة المشاريع",
    examType: "assignment",
    score: 65,
    maxScore: 100,
    completionDate: "2024-08-10",
    duration: "غير محدد",
    passingScore: 60,
    isPassed: true
  },
  {
    id: 5,
    studentId: 4,
    studentName: "سارة أحمد محمد",
    studentImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    examName: "اختبار التصميم الجرافيكي",
    courseName: "دورة التصميم الجرافيكي",
    examType: "quiz",
    score: 45,
    maxScore: 100,
    completionDate: "2024-08-05",
    duration: "60 دقيقة",
    passingScore: 50,
    isPassed: false
  }
];

function ExamStatisticsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("الكل");
  const [selectedResult, setSelectedResult] = useState("الكل");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const filteredExams = useMemo(() => {
    return mockExamResults.filter((exam) => {
      const matchesSearch =
        searchTerm === "" ||
        exam.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.courseName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === "الكل" || 
        (selectedType === "مقتطفات" && exam.examType === "quiz") ||
        (selectedType === "نصفي" && exam.examType === "midterm") ||
        (selectedType === "نهائي" && exam.examType === "final") ||
        (selectedType === "مهام" && exam.examType === "assignment");

      const matchesResult =
        selectedResult === "الكل" ||
        (selectedResult === "نجح" && exam.isPassed) ||
        (selectedResult === "رسب" && !exam.isPassed);

      return matchesSearch && matchesType && matchesResult;
    });
  }, [searchTerm, selectedType, selectedResult]);

  const handleViewExam = (exam: ExamResult) => {
    // Navigate to exam details page
    navigate(`/dashboard/exam-statistics/${exam.id}`);
  };

  const columns: ColumnDef<ExamResult>[] = [
    {
      accessorKey: "studentName",
      header: "الطالب",
      cell: ({ row }) => {
        const exam = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={exam.studentImage}
              alt={exam.studentName}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="font-medium text-gray-900">{exam.studentName}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "examName",
      header: "الاختبار",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.getValue("examName")}</div>
      ),
    },
    {
      accessorKey: "courseName",
      header: "الدورة",
      cell: ({ row }) => (
        <div className="text-gray-600">{row.getValue("courseName")}</div>
      ),
    },
    {
      accessorKey: "examType",
      header: "نوع الاختبار",
      cell: ({ row }) => {
        const type = row.getValue("examType") as string;
        return (
          <Badge className="bg-blue-100 text-blue-800">
            {type === "quiz" ? "مقتطفات" :
             type === "midterm" ? "نصفي" :
             type === "final" ? "نهائي" : "مهام"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "score",
      header: "النتيجة",
      cell: ({ row }) => {
        const exam = row.original;
        return (
          <div className="text-center">
            <div className="font-semibold text-gray-900">
              {exam.score}/{exam.maxScore}
            </div>
            <div className="text-xs text-gray-500">
              {((exam.score / exam.maxScore) * 100).toFixed(1)}%
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "isPassed",
      header: "الحالة",
      cell: ({ row }) => {
        const isPassed = row.getValue("isPassed") as boolean;
        return (
          <Badge className={
            isPassed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }>
            {isPassed ? "نجح" : "رسب"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "completionDate",
      header: "تاريخ الاختبار",
      cell: ({ row }) => {
        const date = new Date(row.getValue("completionDate"));
        return (
          <div className="text-sm text-gray-600">
            {date.toLocaleDateString("ar-SA")}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "الإجراءات",
      cell: ({ row }) => {
        const exam = row.original;
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewExam(exam)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            title="عرض تفاصيل الاختبار"
          >
            <Eye className="w-4 h-4" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredExams,
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

  // Calculate statistics
  const totalExams = mockExamResults.length;
  const passedExams = mockExamResults.filter(exam => exam.isPassed).length;
  const failedExams = mockExamResults.filter(exam => !exam.isPassed).length;
  const avgScore = mockExamResults.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / totalExams;

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={ClipboardCheck}
        title="إحصائيات الاختبارات"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الاختبارات"
          value={totalExams}
          icon={<ClipboardCheck className="w-8 h-8" />}
          change="+15%"
          changeType="positive"
        />
        <StatCard
          title="الاختبارات الناجحة"
          value={passedExams}
          icon={<Award className="w-8 h-8" />}
          change="+8%"
          changeType="positive"
        />
        <StatCard
          title="الاختبارات الراسبة"
          value={failedExams}
          icon={<FileText className="w-8 h-8" />}
        />
        <StatCard
          title="متوسط الدرجات"
          value={`${avgScore.toFixed(1)}%`}
          icon={<BarChart className="w-8 h-8" />}
          change="+5%"
          changeType="positive"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border-0">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="ابحث في الاختبارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="نوع الاختبار" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع الأنواع</SelectItem>
                <SelectItem value="مقتطفات">مقتطفات</SelectItem>
                <SelectItem value="نصفي">نصفي</SelectItem>
                <SelectItem value="نهائي">نهائي</SelectItem>
                <SelectItem value="مهام">مهام</SelectItem>
              </SelectContent>
            </Select>

            {/* Result Filter */}
            <Select value={selectedResult} onValueChange={setSelectedResult}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="النتيجة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع النتائج</SelectItem>
                <SelectItem value="نجح">نجح</SelectItem>
                <SelectItem value="رسب">رسب</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Exams Table */}
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-right py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500"
                >
                  لا توجد اختبارات.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          عرض {table.getFilteredRowModel().rows.length} اختبار.
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
    </div>
  );
}

export default ExamStatisticsPage;