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
import { Edit, Trash2 } from "lucide-react";

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

interface Course {
  id: number;
  title: string;
  category: string;
  type: string;
  level: string;
  instructor: string;
  price: number;
  image: string;
  students?: number;
  rating?: number;
}

interface CourseTableProps {
  courses: Course[];
  onTableReady?: (table: TanstackTable<Course>) => void;
}

const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: "اسم الدورة",
    cell: ({ row }) => (
      <div className="max-w-[300px]">
        <div className="font-medium text-right truncate">
          {row.getValue("title")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "level",
    header: "المستوى",
    cell: ({ row }) => {
      const level = row.getValue("level") as string;
      const levelColors = {
        مبتدئ: "bg-green-100 text-green-800 border-green-200",
        متوسط: "bg-yellow-100 text-yellow-800 border-yellow-200",
        متقدم: "bg-red-100 text-red-800 border-red-200",
      };
      return (
        <Badge
          className={`${
            levelColors[level as keyof typeof levelColors] ||
            "bg-gray-100 text-gray-800 border-gray-200"
          }`}
        >
          {level}
        </Badge>
      );
    },
  },
  {
<<<<<<< HEAD:src/features/dashboard/courses/components/CourseTable.tsx
    accessorKey: "course_state",
    header: "الحالة",
    cell: ({ row }) => {
      const state = row.getValue("course_state") as string;
      const stateColors = {
        draft: "bg-gray-100 text-gray-800 border-gray-200",
        published: "bg-green-100 text-green-800 border-green-200",
        archived: "bg-red-100 text-red-800 border-red-200",
      };
      const stateLabels = {
        draft: "مسودة",
        published: "منشور",
        archived: "مؤرشف",
      };
      return (
        <Badge
          className={`${
            stateColors[state as keyof typeof stateColors] ||
            "bg-gray-100 text-gray-800 border-gray-200"
          }`}
        >
          {stateLabels[state as keyof typeof stateLabels] || state}
        </Badge>
      );
    },
  },
  {
    accessorKey: "instructor",
    header: "اسم المدرب",
    cell: ({ row }) => (
      <div className="font-medium text-right">{row.getValue("instructor")}</div>
    ),
  },
  {
=======
>>>>>>> sketch:src/features/courses/components/CourseTable.tsx
    accessorKey: "price",
    header: "السعر",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return (
        <div className="font-medium text-right">
          {price === 0 ? "مجاني" : `${price} ر.س`}
        </div>
      );
    },
  },
];

function CourseTable({ courses, onTableReady }: CourseTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: courses,
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

  // Pass table object to parent for filters
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
              <div className="flex items-start gap-3">
                <img
                  src={row.getValue("image")}
                  alt={row.getValue("title")}
                  className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm leading-5 line-clamp-2 text-right">
                    {row.getValue("title")}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 text-right">
                    {row.getValue("instructor")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 text-xs"
                >
                  {row.getValue("category")}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-blue-200 text-blue-800 text-xs"
                >
                  {row.getValue("type")}
                </Badge>
                <Badge
                  className={`text-xs ${
                    row.getValue("level") === "مبتدئ"
                      ? "bg-green-100 text-green-800"
                      : row.getValue("level") === "متوسط"
                      ? "bg-yellow-100 text-yellow-800"
                      : row.getValue("level") === "متقدم"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {row.getValue("level")}
                </Badge>
                <Badge
                  className={`text-xs ${
                    row.getValue("course_state") === "published"
                      ? "bg-green-100 text-green-800"
                      : row.getValue("course_state") === "archived"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {row.getValue("course_state") === "published"
                    ? "منشور"
                    : row.getValue("course_state") === "archived"
                    ? "مؤرشف"
                    : "مسودة"}
                </Badge>
              </div>

              <div className="flex justify-end pt-2 border-t">
                <div className="text-sm font-medium">
                  {parseFloat(row.getValue("price")) === 0
                    ? "مجاني"
                    : `${row.getValue("price")} ر.س`}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد نتائج.
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
                  لا توجد نتائج.
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

export default CourseTable;
