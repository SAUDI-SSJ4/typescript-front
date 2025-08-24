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
import { Eye, MessageCircle, User, BookOpen, GraduationCap } from "lucide-react";
import type { StudentQuestion } from "@/types/student-question";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Table as TanstackTable } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface StudentQuestionsTableProps {
  questions: StudentQuestion[];
  onTableReady?: (table: TanstackTable<StudentQuestion>) => void;
}

const createColumns = (): ColumnDef<StudentQuestion>[] => [
  {
    accessorKey: "studentName",
    header: "اسم الطالب",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <User className="w-4 h-4 text-blue-600" />
        </div>
        <div className="font-medium text-right">{row.getValue("studentName")}</div>
      </div>
    ),
  },
  {
    accessorKey: "courseName",
    header: "المادة التعليمية",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <GraduationCap className="w-4 h-4 text-green-600" />
        <div className="text-right font-medium">{row.getValue("courseName")}</div>
      </div>
    ),
  },
  {
    accessorKey: "lessonName",
    header: "اسم الدرس",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-purple-600" />
        <div className="text-right">{row.getValue("lessonName")}</div>
      </div>
    ),
  },
  {
    accessorKey: "question",
    header: "السؤال",
    cell: ({ row }) => {
      const question = row.getValue("question") as string;
      const truncatedQuestion = question.length > 50 ? question.substring(0, 50) + "..." : question;
      
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-right h-auto p-2 justify-start">
              <MessageCircle className="w-4 h-4 ml-2 text-blue-500" />
              {truncatedQuestion}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-right">تفاصيل السؤال والإجابة</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Student Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-right mb-2">معلومات الطالب</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="text-right">
                    <span className="font-medium">الاسم: </span>
                    {row.original.studentName}
                  </div>
                  <div className="text-right">
                    <span className="font-medium">المادة التعليمية: </span>
                    {row.original.courseName}
                  </div>
                  <div className="text-right">
                    <span className="font-medium">الدرس: </span>
                    {row.original.lessonName}
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 text-right mb-2">سؤال الطالب</h4>
                <p className="text-blue-800 text-right leading-relaxed">{question}</p>
              </div>

              {/* AI Response */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 text-right mb-2">رد المساعد الذكي</h4>
                <p className="text-green-800 text-right leading-relaxed whitespace-pre-wrap">
                  {row.original.aiResponse}
                </p>
              </div>

              {/* Metadata */}
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>تاريخ السؤال: {new Date(row.original.createdAt).toLocaleDateString("ar-SA")}</span>
                  <Badge variant={row.original.isAnswered ? "default" : "secondary"}>
                    {row.original.isAnswered ? "تم الرد" : "في الانتظار"}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "التاريخ",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div className="text-right text-sm">
          <div>{new Date(date).toLocaleDateString("ar-SA")}</div>
          <div className="text-muted-foreground">{new Date(date).toLocaleTimeString("ar-SA")}</div>
        </div>
      );
    },
  },
];

function StudentQuestionsTable({ questions, onTableReady }: StudentQuestionsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => createColumns(), []);

  const table = useReactTable({
    data: questions,
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
          table.getRowModel().rows.map((row) => {
            const question = row.original;
            return (
              <div key={row.id} className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg text-right text-blue-900">
                      {question.studentName}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-green-600" />
                    <span className="text-right">{question.courseName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                    <span className="text-right">{question.lessonName}</span>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800 text-right">
                    {question.question.length > 100 ? question.question.substring(0, 100) + "..." : question.question}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    {new Date(question.createdAt).toLocaleDateString("ar-SA")}
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 ml-1" />
                        عرض التفاصيل
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-right">تفاصيل السؤال</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-blue-900 text-right mb-2">السؤال</h4>
                          <p className="text-blue-800 text-right text-sm">{question.question}</p>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <h4 className="font-semibold text-green-900 text-right mb-2">رد المساعد الذكي</h4>
                          <p className="text-green-800 text-right text-sm whitespace-pre-wrap">{question.aiResponse}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد أسئلة من الطلاب.
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border-0 shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-200">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-right font-semibold text-gray-700 py-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  لا توجد أسئلة من الطلاب.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length} سؤال محدد.
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

export default StudentQuestionsTable;