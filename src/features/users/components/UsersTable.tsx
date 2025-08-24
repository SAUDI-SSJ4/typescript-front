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
import { Edit, Trash2, CheckCircle, XCircle, Clock, UserPlus } from "lucide-react";
import { UserType } from "@/constants/enums";
import type { UserWithInvitation, InvitationStatus } from "@/types/user-invitation";

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

interface UsersTableProps {
  users: UserWithInvitation[];
  onTableReady?: (table: TanstackTable<UserWithInvitation>) => void;
  onEdit?: (user: UserWithInvitation) => void;
  onDelete?: (user: UserWithInvitation) => void;
  onInvite?: () => void;
}

const getRoleBadgeColor = (role: UserType) => {
  switch (role) {
    case UserType.MANAGER:
      return "bg-purple-100 text-purple-800";
    case UserType.MARKETING_MANAGER:
      return "bg-green-100 text-green-800";
    case UserType.TRAINER:
      return "bg-blue-100 text-blue-800";
    case UserType.ACADEMY:
      return "bg-orange-100 text-orange-800";
    case UserType.STUDENT:
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getRoleDisplayName = (role: UserType) => {
  switch (role) {
    case UserType.MANAGER:
      return "مدير";
    case UserType.MARKETING_MANAGER:
      return "مسؤول تسويق";
    case UserType.TRAINER:
      return "مدرب";
    case UserType.ACADEMY:
      return "أكاديمية";
    case UserType.STUDENT:
      return "طالب";
    default:
      return role;
  }
};

const getStatusBadgeColor = (status: InvitationStatus) => {
  switch (status) {
    case "ACCEPTED":
      return "bg-green-100 text-green-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    case "EXPIRED":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusDisplayName = (status: InvitationStatus) => {
  switch (status) {
    case "ACCEPTED":
      return "مقبول";
    case "PENDING":
      return "في الانتظار";
    case "REJECTED":
      return "مرفوض";
    case "EXPIRED":
      return "منتهي الصلاحية";
    default:
      return status;
  }
};

const getStatusIcon = (status: InvitationStatus) => {
  switch (status) {
    case "ACCEPTED":
      return <CheckCircle className="h-4 w-4" />;
    case "PENDING":
      return <Clock className="h-4 w-4" />;
    case "REJECTED":
      return <XCircle className="h-4 w-4" />;
    case "EXPIRED":
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const createColumns = (
  onEdit?: (user: UserWithInvitation) => void,
  onDelete?: (user: UserWithInvitation) => void
): ColumnDef<UserWithInvitation>[] => [
  {
    accessorKey: "profilePicture",
    header: "الصورة",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <img
          src={row.getValue("profilePicture") || "/default-avatar.png"}
          alt={row.getValue("name")}
          className="h-12 w-12 rounded-full object-cover"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "اسم المستخدم",
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
    accessorKey: "role",
    header: "الصلاحيات",
    cell: ({ row }) => {
      const role = row.getValue("role") as UserType;
      return (
        <div className="text-center">
          <Badge variant="secondary" className={getRoleBadgeColor(role)}>
            {getRoleDisplayName(role)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "حالة الدعوة",
    cell: ({ row }) => {
      const status = row.getValue("status") as InvitationStatus;
      return (
        <div className="flex items-center justify-center gap-2">
          <Badge variant="secondary" className={getStatusBadgeColor(status)}>
            <div className="flex items-center gap-1">
              {getStatusIcon(status)}
              {getStatusDisplayName(status)}
            </div>
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "joinDate",
    header: "تاريخ الانضمام",
    cell: ({ row }) => {
      const joinDate = row.getValue("joinDate") as Date;
      return (
        <div className="text-right text-sm text-muted-foreground">
          {joinDate ? new Date(joinDate).toLocaleDateString("ar-SA") : "غير محدد"}
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "رقم الهاتف",
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("phone") || "غير محدد"}
      </div>
    ),
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => onEdit?.(user)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
            onClick={() => onDelete?.(user)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];

function UsersTable({ users, onTableReady, onEdit, onDelete, onInvite }: UsersTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => createColumns(onEdit, onDelete), [onEdit, onDelete]);

  const table = useReactTable({
    data: users,
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
          table.getRowModel().rows.map((row) => {
            const user = row.original;
            return (
              <div
                key={row.id}
                className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={user.profilePicture || "/default-avatar.png"}
                    alt={user.name}
                    className="h-16 w-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-lg text-right">
                      {user.name}
                    </h3>
                    <p className="text-sm text-blue-600 mt-1 text-right">
                      {user.email}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 text-right">
                      {user.phone || "غير محدد"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600"
                      onClick={() => onEdit?.(user)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => onDelete?.(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t gap-2">
                  <Badge
                    variant="secondary"
                    className={getRoleBadgeColor(user.role)}
                  >
                    {getRoleDisplayName(user.role)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={getStatusBadgeColor(user.status)}
                  >
                    <div className="flex items-center gap-1">
                      {getStatusIcon(user.status)}
                      {getStatusDisplayName(user.status)}
                    </div>
                  </Badge>
                </div>

                <div className="text-sm text-muted-foreground text-right">
                  انضم في: {user.joinDate ? new Date(user.joinDate).toLocaleDateString("ar-SA") : "غير محدد"}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد مستخدمين.
            <div className="mt-4">
              <Button onClick={onInvite} className="gap-2">
                <UserPlus className="h-4 w-4" />
                دعوة مستخدم جديد
              </Button>
            </div>
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
                  <div className="flex flex-col items-center gap-4">
                    <span>لا توجد مستخدمين.</span>
                    <Button onClick={onInvite} className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      دعوة مستخدم جديد
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} من{" "}
          {table.getFilteredRowModel().rows.length} مستخدم محدد.
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

export default UsersTable;