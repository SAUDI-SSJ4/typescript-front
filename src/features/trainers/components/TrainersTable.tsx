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
import type { Trainer } from "@/types/trainer";

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

interface TrainersTableProps {
  trainers: Trainer[];
  onTableReady?: (table: TanstackTable<Trainer>) => void;
}

const columns: ColumnDef<Trainer>[] = [
  {
    accessorKey: "image",
    header: "الصورة",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <img
          src={row.getValue("image")}
          alt={row.getValue("name")}
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "اسم المدرب",
    cell: ({ row }) => (
      <div className="font-medium text-right">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
    cell: ({ row }) => (
      <div className="text-right text-blue-600">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "رقم الهاتف",
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "coursesCount",
    header: "عدد الدورات",
    cell: ({ row }) => {
      const count = row.getValue("coursesCount") as number;
      return (
        <div className="text-center">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {count} دورة
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

function TrainersTable({ trainers, onTableReady }: TrainersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: trainers,
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
                  alt={row.getValue("name")}
                  className="h-16 w-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-lg text-right">
                    {row.getValue("name")}
                  </h3>
                  <p className="text-sm text-blue-600 mt-1 text-right">
                    {row.getValue("email")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 text-right">
                    {row.getValue("phone")}
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

              <div className="flex justify-end pt-2 border-t">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800"
                >
                  {row.getValue("coursesCount")} دورة
                </Badge>
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

export default TrainersTable;
