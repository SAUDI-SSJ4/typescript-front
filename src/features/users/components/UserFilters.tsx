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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, X, ChevronDown, Search } from "lucide-react";
import { UserType } from "@/constants/enums";
import type { InvitationStatus } from "@/types/user-invitation";

interface UserFiltersProps {
  selectedRole: string;
  onRoleChange: (role: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onClearFilters: () => void;
  table?: any; // للتحكم في الأعمدة
}

function UserFilters({
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  onClearFilters,
  table,
}: UserFiltersProps) {
  const getRoleDisplayName = (role: UserType | "الكل") => {
    if (role === "الكل") return "الكل";
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

  const getStatusDisplayName = (status: InvitationStatus | "الكل") => {
    if (status === "الكل") return "الكل";
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

  const roles = [
    "الكل",
    UserType.MANAGER,
    UserType.MARKETING_MANAGER,
    UserType.TRAINER,
    UserType.ACADEMY,
  ];

  const statuses = [
    "الكل",
    "ACCEPTED",
    "PENDING", 
    "REJECTED",
    "EXPIRED",
  ];

  const hasActiveFilters = selectedRole !== "الكل" || selectedStatus !== "الكل";

  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">فلترة المستخدمين</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="w-4 h-4 mr-1" />
            مسح الفلاتر
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في المستخدمين..."
            value={(table?.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table?.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="pr-10"
          />
        </div>

        {/* Role Filter */}
        <Select value={selectedRole} onValueChange={onRoleChange}>
          <SelectTrigger>
            <SelectValue placeholder="نوع الحساب" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {getRoleDisplayName(role as UserType | "الكل")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={selectedStatus} onValueChange={onStatusChange}>
          <SelectTrigger>
            <SelectValue placeholder="حالة الدعوة" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {getStatusDisplayName(status as InvitationStatus | "الكل")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Columns Filter */}
        {table && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                الأعمدة <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => {
                  const columnHeaders = {
                    profilePicture: "الصورة",
                    name: "اسم المستخدم",
                    email: "البريد الإلكتروني",
                    phone: "رقم الهاتف",
                    role: "الصلاحيات",
                    status: "حالة الدعوة",
                    joinDate: "تاريخ الانضمام",
                  };
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnHeaders[column.id as keyof typeof columnHeaders] ||
                        column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          <span className="text-sm font-medium text-gray-600">
            الفلاتر النشطة:
          </span>
          {selectedRole !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              النوع: {getRoleDisplayName(selectedRole as UserType)}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onRoleChange("الكل")}
              />
            </Badge>
          )}
          {selectedStatus !== "الكل" && (
            <Badge variant="secondary" className="gap-1">
              الحالة: {getStatusDisplayName(selectedStatus as InvitationStatus)}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => onStatusChange("الكل")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export default UserFilters;