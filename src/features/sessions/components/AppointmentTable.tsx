import { useState, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type Table,
} from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Eye, Edit, Trash2, Calendar, Clock, Users } from "lucide-react";
import type { SessionAppointment } from "@/types/session";

interface AppointmentTableProps {
  appointments: SessionAppointment[];
  onTableReady?: (table: Table<SessionAppointment>) => void;
  onEdit?: (appointment: SessionAppointment) => void;
  onDelete?: (appointmentId: number) => void;
  onView?: (appointment: SessionAppointment) => void;
}

const columnHelper = createColumnHelper<SessionAppointment>();

function AppointmentTable({ 
  appointments, 
  onTableReady, 
  onEdit, 
  onDelete, 
  onView 
}: AppointmentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const getStatusBadge = (status: SessionAppointment['status']) => {
    const statusConfig = {
      available: { label: "متاح", className: "bg-green-100 text-green-800" },
      booked: { label: "محجوز", className: "bg-yellow-100 text-yellow-800" },
      completed: { label: "مكتمل", className: "bg-blue-100 text-blue-800" },
      cancelled: { label: "ملغي", className: "bg-red-100 text-red-800" },
    };
    
    const config = statusConfig[status];
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("date", {
        header: "التاريخ",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{formatDate(info.getValue())}</span>
          </div>
        ),
      }),
      columnHelper.accessor("startTime", {
        header: "وقت البداية",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{formatTime(info.getValue())}</span>
          </div>
        ),
      }),
      columnHelper.accessor("endTime", {
        header: "وقت النهاية",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{formatTime(info.getValue())}</span>
          </div>
        ),
      }),
      columnHelper.accessor("currentParticipants", {
        header: "المشاركون",
        cell: (info) => {
          const appointment = info.row.original;
          const maxParticipants = appointment.bookedBy?.length || 0;
          return (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span>{info.getValue()}/{maxParticipants}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor("status", {
        header: "الحالة",
        cell: (info) => getStatusBadge(info.getValue()),
      }),
      columnHelper.accessor("notes", {
        header: "ملاحظات",
        cell: (info) => (
          <span className="text-sm text-gray-600 max-w-32 truncate block">
            {info.getValue() || "-"}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "الإجراءات",
        cell: (info) => {
          const appointment = info.row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">فتح القائمة</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onView?.(appointment)}>
                  <Eye className="mr-2 h-4 w-4" />
                  عرض التفاصيل
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(appointment)}>
                  <Edit className="mr-2 h-4 w-4" />
                  تعديل
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete?.(appointment.id)}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  حذف
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      }),
    ],
    [onEdit, onDelete, onView]
  );

  const table = useReactTable({
    data: appointments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  // Call onTableReady when table is ready
  if (onTableReady && table) {
    onTableReady(table);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <UITable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-right">
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
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-right">
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
                  className="h-24 text-center"
                >
                  لا توجد مواعيد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          عرض {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} إلى{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          من {table.getFilteredRowModel().rows.length} موعد
        </div>
        <div className="space-x-2">
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

export default AppointmentTable;