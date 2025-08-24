import React from "react";
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
import { Edit, Eye, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { CourseCertificate } from "@/types/certificate";

interface CertificateTableProps {
  certificates: CourseCertificate[];
  onTableReady?: (table: any) => void;
  onEdit?: (certificate: CourseCertificate) => void;
  onDelete?: (certificate: CourseCertificate) => void;
  onStatusChange?: (certificate: CourseCertificate, status: 'active' | 'inactive' | 'draft') => void;
}

const columns: ColumnDef<CourseCertificate>[] = [
  {
    accessorKey: "courseName",
    header: "اسم الدورة",
    cell: ({ row }) => {
      const certificate = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 line-clamp-2">
            {certificate.courseName}
          </span>
          <span className="text-sm text-gray-500">
            النموذج: {certificate.certificateTemplate}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "certificateType",
    header: "نوع الشهادة",
    cell: ({ row }) => {
      const type = row.getValue("certificateType") as string;
      const typeColors = {
        "completion": "bg-blue-100 text-blue-800 border-blue-200",
        "achievement": "bg-green-100 text-green-800 border-green-200",
        "participation": "bg-purple-100 text-purple-800 border-purple-200",
      };
      const typeText = {
        "completion": "إنجاز",
        "achievement": "تميز",
        "participation": "مشاركة",
      };
      return (
        <Badge
          className={`${
            typeColors[type as keyof typeof typeColors] ||
            "bg-gray-100 text-gray-800 border-gray-200"
          }`}
        >
          {typeText[type as keyof typeof typeText] || type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "issuedCount",
    header: "عدد الشهادات المصدرة",
    cell: ({ row }) => {
      const certificate = row.original;
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">{certificate.issuedCount}</span>
          <span className="text-gray-500">من {certificate.totalStudents}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "completionRate",
    header: "نسبة الإنجاز",
    cell: ({ row }) => {
      const rate = row.getValue("completionRate") as number;
      const getCompletionColor = (rate: number) => {
        if (rate >= 80) return "text-green-600";
        if (rate >= 60) return "text-yellow-600";
        return "text-red-600";
      };
      return (
        <span className={`font-medium ${getCompletionColor(rate)}`}>
          {rate.toFixed(1)}%
        </span>
      );
    },
  },
  {
    accessorKey: "averageGrade",
    header: "متوسط التقدير",
    cell: ({ row }) => {
      const grade = row.getValue("averageGrade") as number;
      return (
        <span className="font-medium">
          {grade > 0 ? grade.toFixed(1) : "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      
      return (
        <Badge
          className={`${
            status === "active"
              ? "bg-green-100 text-green-800 border-green-200"
              : status === "inactive"
              ? "bg-gray-100 text-gray-800 border-gray-200"
              : "bg-yellow-100 text-yellow-800 border-yellow-200"
          }`}
        >
          {status === "active" ? "نشط" : status === "inactive" ? "غير نشط" : "مسودة"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const certificate = row.original;

      return (
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/certificates-editing/stats/${certificate.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
              title="إحصائيات الشهادة"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </Link>

          <Link to={`/dashboard/certificates-editing/edit/${certificate.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              title="تعديل الشهادة"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Link>

          <Link to={`/dashboard/certificates-editing/stats/${certificate.id}`}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
              title="عرض الطلاب الحاصلين"
            >
              <Users className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

function CertificateTable({ certificates, onTableReady }: CertificateTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: certificates,
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
  });

  // إرسال الجدول للمكون الأب للتحكم في الأعمدة
  React.useEffect(() => {
    if (onTableReady) {
      onTableReady(table);
    }
  }, [table, onTableReady]);

  return (
    <div className="w-full">
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-lg text-right">
                    {row.getValue("courseName")}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 text-right">
                    نموذج: {row.getValue("certificateTemplate")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 text-right">
                    {row.getValue("issuedCount")} من {row.getValue("totalStudents")} طالب
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <Badge
                  variant={row.getValue("status") === "active" ? "default" : "secondary"}
                  className={
                    row.getValue("status") === "active"
                      ? "bg-green-100 text-green-800"
                      : row.getValue("status") === "draft"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {row.getValue("status") === "active" ? "نشط" : 
                   row.getValue("status") === "draft" ? "مسودة" : "غير نشط"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {Math.round(row.getValue("completionRate"))}% إكمال
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد شهادات.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border-0 shadow-sm bg-white overflow-hidden">
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
                  لا توجد شهادات.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length} صف محدد.
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

export default CertificateTable;