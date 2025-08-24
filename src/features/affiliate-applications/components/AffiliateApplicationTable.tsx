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
import { CheckCircle, XCircle, Instagram, Twitter, Youtube, Users, BarChart3, Linkedin } from "lucide-react";
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

import type { AffiliateApplication } from "@/types/affiliate-application";

interface AffiliateApplicationTableProps {
  applications: AffiliateApplication[];
  onTableReady?: (table: any) => void;
}

const columns: ColumnDef<AffiliateApplication>[] = [
  {
    accessorKey: "studentName",
    header: "الطالب",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <div className="flex items-center gap-3">
          <img
            src={application.profileImage}
            alt={application.studentName}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">
              {application.studentName}
            </span>
            <span className="text-sm text-gray-500 font-mono">
              #{application.studentCode}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "socialMediaAccounts",
    header: "وسائل التواصل",
    cell: ({ row }) => {
      const accounts = row.getValue("socialMediaAccounts") as any;
      const getSocialMediaIcon = (platform: string) => {
        const iconClasses = "w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors";
        switch (platform) {
          case 'instagram': return <Instagram className={iconClasses} />;
          case 'twitter': return <Twitter className={iconClasses} />;
          case 'youtube': return <Youtube className={iconClasses} />;
          case 'tiktok': return (
            <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          );
          case 'snapchat': return (
            <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.958 1.404-5.958s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165C3.887 18.165 3.1 16.079 3.1 12.993c0-4.227 3.068-8.094 8.847-8.094 4.646 0 8.263 3.318 8.263 7.756 0 4.63-2.916 8.347-6.966 8.347-1.36 0-2.639-.708-3.075-1.548l-.837 3.19c-.302 1.169-1.123 2.635-1.667 3.525 1.252.385 2.575.590 3.952.590 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          );
          case 'linkedin': return <Linkedin className={iconClasses} />;
          default: return <Users className={iconClasses} />;
        }
      };
      
      return (
        <div className="flex gap-3">
          {Object.entries(accounts).map(([platform, account]) => (
            <a 
              key={platform} 
              href={(account as any).profileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
              title={`${platform.charAt(0).toUpperCase() + platform.slice(1)}: @${(account as any).username}`}
            >
              {getSocialMediaIcon(platform)}
            </a>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "briefDescription",
    header: "نبذة عن الطالب",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <div className="text-sm text-gray-600 max-w-xs">
          {application.briefDescription}
        </div>
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
            status === "pending"
              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
              : status === "approved"
              ? "bg-green-100 text-green-800 border-green-200"
              : "bg-red-100 text-red-800 border-red-200"
          }`}
        >
          {status === "pending" ? "قيد المراجعة" : status === "approved" ? "مقبول" : "مرفوض"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    enableHiding: false,
    cell: ({ row }) => {
      const application = row.original;

      return (
        <div className="flex items-center justify-center gap-2">
          {application.status === "approved" && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              asChild
            >
              <Link to={`/dashboard/affiliate-applications/${application.id}/operations`}>
                <BarChart3 className="h-4 w-4" />
              </Link>
            </Button>
          )}
          
          {application.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
                onClick={() => console.log(`الموافقة على طلب ${application.studentName}`)}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-50"
                onClick={() => console.log(`رفض طلب ${application.studentName}`)}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      );
    },
  },
];

function AffiliateApplicationTable({ applications, onTableReady }: AffiliateApplicationTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: applications,
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
            const application = row.original;
            const getSocialMediaIcon = (platform: string) => {
              const iconClasses = "w-5 h-5 text-gray-600";
              switch (platform) {
                case 'instagram': return <Instagram className={iconClasses} />;
                case 'twitter': return <Twitter className={iconClasses} />;
                case 'youtube': return <Youtube className={iconClasses} />;
                case 'tiktok': return (
                  <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                );
                case 'snapchat': return (
                  <svg className={iconClasses} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.958 1.404-5.958s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.098.119.112.223.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165C3.887 18.165 3.1 16.079 3.1 12.993c0-4.227 3.068-8.094 8.847-8.094 4.646 0 8.263 3.318 8.263 7.756 0 4.63-2.916 8.347-6.966 8.347-1.36 0-2.639-.708-3.075-1.548l-.837 3.19c-.302 1.169-1.123 2.635-1.667 3.525 1.252.385 2.575.590 3.952.590 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                );
                case 'linkedin': return <Linkedin className={iconClasses} />;
                default: return <Users className={iconClasses} />;
              }
            };
            
            return (
              <div
                key={row.id}
                className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={application.profileImage}
                      alt={application.studentName}
                      className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {application.studentName}
                      </h3>
                      <p className="text-sm text-gray-600 font-mono">#{application.studentCode}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {application.status === "approved" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600"
                        asChild
                      >
                        <Link to={`/dashboard/affiliate-applications/${application.id}/operations`}>
                          <BarChart3 className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {application.status === "pending" && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-green-600"
                          onClick={() => console.log(`الموافقة على طلب ${application.studentName}`)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600"
                          onClick={() => console.log(`رفض طلب ${application.studentName}`)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    {Object.entries(application.socialMediaAccounts).map(([platform, account]) => (
                      <a 
                        key={platform} 
                        href={(account as any).profileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition-transform"
                        title={`${platform.charAt(0).toUpperCase() + platform.slice(1)}: @${(account as any).username}`}
                      >
                        {getSocialMediaIcon(platform)}
                      </a>
                    ))}
                  </div>
                  <Badge
                    className={`text-xs ${
                      application.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                        : application.status === "approved"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-red-100 text-red-800 border-red-200"
                    }`}
                  >
                    {application.status === "pending" ? "قيد المراجعة" : application.status === "approved" ? "مقبول" : "مرفوض"}
                  </Badge>
                </div>

                <div className="text-sm text-gray-600">
                  {application.briefDescription}
                </div>

                <div className="flex justify-end items-center pt-2 border-t">
                  <div className="text-sm text-gray-600">
                    {new Date(application.createdAt).toLocaleDateString("ar-SA")}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            لا توجد طلبات.
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
                  لا توجد طلبات.
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

export default AffiliateApplicationTable;