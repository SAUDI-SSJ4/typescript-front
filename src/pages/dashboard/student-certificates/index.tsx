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
  Award, 
  Search, 
  Eye,
  User,
  Download,
  TrendingUp
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
import type { StudentCertificate } from "@/types/student-notification";

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

// Mock data for all certificates
const mockCertificates: (StudentCertificate & { studentName: string; studentImage: string; certificateStatus: string })[] = [
  {
    id: 1,
    studentName: "أحمد محمد السعيد",
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    courseName: "دورة التسويق الرقمي",
    issueDate: "2024-07-25",
    certificateUrl: "#",
    certificateStatus: "active"
  },
  {
    id: 2,
    studentName: "فاطمة علي أحمد",
    studentImage: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
    courseName: "دورة تطوير المواقع",
    issueDate: "2024-06-30",
    certificateUrl: "#",
    certificateStatus: "active"
  },
  {
    id: 3,
    studentName: "سارة أحمد محمد",
    studentImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    courseName: "دورة البرمجة المتقدمة",
    issueDate: "2024-08-15",
    certificateUrl: "#",
    certificateStatus: "pending"
  },
  {
    id: 4,
    studentName: "علي حسن محمود",
    studentImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    courseName: "دورة إدارة المشاريع",
    issueDate: "2024-08-20",
    certificateUrl: "#",
    certificateStatus: "revoked"
  }
];

function CertificatesManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const filteredCertificates = useMemo(() => {
    return mockCertificates.filter((certificate) => {
      const matchesSearch =
        searchTerm === "" ||
        certificate.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        certificate.courseName.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "الكل" || 
        (selectedStatus === "نشط" && certificate.certificateStatus === "active") ||
        (selectedStatus === "معلق" && certificate.certificateStatus === "pending") ||
        (selectedStatus === "ملغي" && certificate.certificateStatus === "revoked");

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  const handleViewCertificate = (certificate: typeof mockCertificates[0]) => {
    window.open(certificate.certificateUrl, '_blank');
  };

  const handleDownloadCertificate = (certificate: typeof mockCertificates[0]) => {
    // Mock download functionality
    console.log("Downloading certificate for:", certificate.studentName);
  };

  const columns: ColumnDef<typeof mockCertificates[0]>[] = [
    {
      accessorKey: "studentName",
      header: "الطالب",
      cell: ({ row }) => {
        const certificate = row.original;
        return (
          <div className="flex items-center gap-3">
            <img
              src={certificate.studentImage}
              alt={certificate.studentName}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="font-medium text-gray-900">{certificate.studentName}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "courseName",
      header: "اسم الدورة",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.getValue("courseName")}</div>
      ),
    },
    {
      accessorKey: "issueDate",
      header: "تاريخ الإصدار",
      cell: ({ row }) => {
        const date = new Date(row.getValue("issueDate"));
        return (
          <div className="text-sm text-gray-600">
            {date.toLocaleDateString("ar-SA")}
          </div>
        );
      },
    },
    {
      accessorKey: "certificateStatus",
      header: "الحالة",
      cell: ({ row }) => {
        const status = row.getValue("certificateStatus") as string;
        return (
          <Badge className={
            status === "active" ? "bg-green-100 text-green-800" :
            status === "pending" ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          }>
            {status === "active" ? "نشط" :
             status === "pending" ? "معلق" : "ملغي"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "الإجراءات",
      cell: ({ row }) => {
        const certificate = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewCertificate(certificate)}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              title="عرض الشهادة"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDownloadCertificate(certificate)}
              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50"
              title="تحميل الشهادة"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredCertificates,
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

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Award}
        title="إدارة الشهادات"
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
        <StatCard
          title="إجمالي الشهادات"
          value={mockCertificates.length}
          icon={<Award className="w-8 h-8" />}
          change="+12%"
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
                placeholder="ابحث في الشهادات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="حالة الشهادة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="الكل">جميع الحالات</SelectItem>
                <SelectItem value="نشط">نشط</SelectItem>
                <SelectItem value="معلق">معلق</SelectItem>
                <SelectItem value="ملغي">ملغي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Certificates Table */}
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
                  لا توجد شهادات.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          عرض {table.getFilteredRowModel().rows.length} شهادة.
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

export default CertificatesManagementPage;