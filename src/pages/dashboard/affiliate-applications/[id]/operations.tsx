import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
import { ArrowRight, Eye, DollarSign, TrendingUp, Calendar, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";

interface AffiliateOperation {
  id: number;
  date: string;
  operationType: "click" | "conversion" | "commission";
  courseName: string;
  studentName: string;
  amount?: number;
  commissionRate?: number;
  status: "completed" | "pending" | "cancelled";
  referralCode: string;
}

// Mock data for affiliate operations
const mockOperations: AffiliateOperation[] = [
  {
    id: 1,
    date: "2024-08-22T10:30:00Z",
    operationType: "conversion",
    courseName: "دورة البرمجة المتقدمة",
    studentName: "أحمد محمد السعيد",
    amount: 599,
    commissionRate: 15,
    status: "completed",
    referralCode: "AFF001_REF001"
  },
  {
    id: 2,
    date: "2024-08-22T09:15:00Z", 
    operationType: "click",
    courseName: "دورة تطوير المواقع",
    studentName: "فاطمة علي أحمد",
    status: "completed",
    referralCode: "AFF001_REF002"
  },
  {
    id: 3,
    date: "2024-08-21T16:45:00Z",
    operationType: "commission",
    courseName: "دورة البرمجة المتقدمة", 
    studentName: "أحمد محمد السعيد",
    amount: 89.85,
    commissionRate: 15,
    status: "completed",
    referralCode: "AFF001_REF001"
  },
  {
    id: 4,
    date: "2024-08-21T14:20:00Z",
    operationType: "click",
    courseName: "دورة إدارة المشاريع",
    studentName: "نورا خالد المطيري",
    status: "completed", 
    referralCode: "AFF001_REF003"
  },
  {
    id: 5,
    date: "2024-08-20T11:10:00Z",
    operationType: "conversion",
    courseName: "دورة التسويق الرقمي",
    studentName: "محمد عبدالله الغامدي",
    amount: 399,
    commissionRate: 15,
    status: "pending",
    referralCode: "AFF001_REF004"
  }
];

const columns: ColumnDef<AffiliateOperation>[] = [
  {
    accessorKey: "date",
    header: "التاريخ والوقت",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            {date.toLocaleDateString("ar-SA")}
          </div>
          <div className="text-gray-500">
            {date.toLocaleTimeString("ar-SA", { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "operationType",
    header: "نوع العملية",
    cell: ({ row }) => {
      const type = row.getValue("operationType") as string;
      const typeConfig = {
        click: { label: "نقرة", color: "bg-blue-100 text-blue-800 border-blue-200" },
        conversion: { label: "تحويل", color: "bg-green-100 text-green-800 border-green-200" },
        commission: { label: "عمولة", color: "bg-purple-100 text-purple-800 border-purple-200" }
      };
      
      return (
        <Badge className={typeConfig[type as keyof typeof typeConfig].color}>
          {typeConfig[type as keyof typeof typeConfig].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "courseName",
    header: "الدورة",
    cell: ({ row }) => {
      return (
        <div className="font-medium text-gray-900">
          {row.getValue("courseName")}
        </div>
      );
    },
  },
  {
    accessorKey: "studentName", 
    header: "الطالب",
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-600">
          {row.getValue("studentName")}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "المبلغ/العمولة",
    cell: ({ row }) => {
      const operation = row.original;
      if (operation.operationType === "click") {
        return <span className="text-gray-400 text-sm">-</span>;
      }
      
      return (
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            {operation.amount?.toLocaleString()} ر.س
          </div>
          {operation.commissionRate && (
            <div className="text-gray-500">
              عمولة {operation.commissionRate}%
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusConfig = {
        completed: { label: "مكتملة", color: "bg-green-100 text-green-800 border-green-200" },
        pending: { label: "معلقة", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
        cancelled: { label: "ملغية", color: "bg-red-100 text-red-800 border-red-200" }
      };
      
      return (
        <Badge className={statusConfig[status as keyof typeof statusConfig].color}>
          {statusConfig[status as keyof typeof statusConfig].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "referralCode",
    header: "كود الإحالة",
    cell: ({ row }) => {
      return (
        <div className="text-sm font-mono text-gray-600">
          {row.getValue("referralCode")}
        </div>
      );
    },
  },
];

function AffiliateOperationsPage() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const filteredOperations = useMemo(() => {
    return mockOperations.filter((operation) => {
      const matchesSearch =
        searchTerm === "" ||
        operation.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        operation.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        operation.referralCode.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [searchTerm]);

  const table = useReactTable({
    data: filteredOperations,
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

  // Calculate summary stats
  const totalCommissions = filteredOperations
    .filter(op => op.operationType === "commission" && op.status === "completed")
    .reduce((sum, op) => sum + (op.amount || 0), 0);
    
  const totalConversions = filteredOperations.filter(op => op.operationType === "conversion").length;
  const totalClicks = filteredOperations.filter(op => op.operationType === "click").length;

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={TrendingUp}
        title={`إحصائيات المسوق - طلب #${id}`}
        actions={
          <Button variant="outline" asChild>
            <Link to="/dashboard/affiliate-applications">
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للطلبات
            </Link>
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي العمولات</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalCommissions.toLocaleString()} ر.س</p>
            </div>
            <div className="text-green-600">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي التحويلات</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalConversions}</p>
            </div>
            <div className="text-blue-600">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي النقرات</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalClicks}</p>
            </div>
            <div className="text-purple-600">
              <Eye className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border-0">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Input
              placeholder="البحث في العمليات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Operations Table */}
      <div className="rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-200"
              >
                {headerGroup.headers.map((header) => {
                  return (
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  data-state={row.getIsSelected() && "selected"}
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
                  لا توجد عمليات.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length} عملية محددة.
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

export default AffiliateOperationsPage;