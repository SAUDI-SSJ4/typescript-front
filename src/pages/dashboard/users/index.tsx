import { UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserStats, UserFilters, UsersTable, InviteUserModal } from "@/features/users";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import type { UserWithInvitation, InvitationStatus } from "@/types/user-invitation";
import { UserType } from "@/constants/enums";
import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";
import type { IInviteUserForm } from "@/validations/user-invitation";
import { toast } from "sonner";

// Mock data for demonstration
const mockUsers: UserWithInvitation[] = [
  {
    id: "1",
    name: "محمد أحمد",
    email: "mohammed.ahmed@example.com",
    phone: "05510056864",
    role: UserType.MANAGER,
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "ACCEPTED" as InvitationStatus,
    joinDate: new Date("2024-01-15"),
    invitedAt: new Date("2024-01-10"),
    acceptedAt: new Date("2024-01-15"),
    isActive: true,
  },
  {
    id: "2", 
    name: "سارة علي",
    email: "sarah.ali@example.com",
    phone: "05515005864",
    role: UserType.MARKETING_MANAGER,
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "ACCEPTED" as InvitationStatus,
    joinDate: new Date("2024-02-01"),
    invitedAt: new Date("2024-01-25"),
    acceptedAt: new Date("2024-02-01"),
    isActive: true,
  },
  {
    id: "3",
    name: "أحمد محمود",
    email: "ahmed.mahmoud@example.com", 
    phone: "05521234567",
    role: UserType.TRAINER,
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "ACCEPTED" as InvitationStatus,
    joinDate: new Date("2024-02-10"),
    invitedAt: new Date("2024-02-05"),
    acceptedAt: new Date("2024-02-10"),
    isActive: true,
  },
  {
    id: "4",
    name: "فاطمة الزهراء",
    email: "fatma.zahra@example.com",
    phone: "05534567890", 
    role: UserType.TRAINER,
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "PENDING" as InvitationStatus,
    joinDate: new Date(),
    invitedAt: new Date("2024-02-20"),
    isActive: false,
  },
  {
    id: "5",
    name: "عبدالله صالح",
    email: "abdullah.saleh@example.com",
    role: UserType.ACADEMY,
    status: "REJECTED" as InvitationStatus, 
    joinDate: new Date(),
    invitedAt: new Date("2024-02-15"),
    rejectedAt: new Date("2024-02-18"),
    isActive: false,
  },
];

function UsersManagement() {
  const [selectedRole, setSelectedRole] = useState("الكل");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [table, setTable] = useState<Table<UserWithInvitation> | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<{ email: string; role: UserType } | null>(null);
  const [users, setUsers] = useState<UserWithInvitation[]>(mockUsers);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole = selectedRole === "الكل" || user.role === selectedRole;
      const matchesStatus = selectedStatus === "الكل" || user.status === selectedStatus;

      return matchesRole && matchesStatus;
    });
  }, [users, selectedRole, selectedStatus]);

  const handleClearFilters = () => {
    setSelectedRole("الكل");
    setSelectedStatus("الكل");
  };

  const handleInviteUser = async (data: IInviteUserForm) => {
    try {
      console.log(editingUser ? "Editing user:" : "Sending invitation:", data);
      
      if (editingUser) {
        // Update existing user
        setUsers(prev => prev.map(user => 
          user.email === editingUser.email 
            ? { ...user, role: data.role }
            : user
        ));
        toast.success("تم تعديل المستخدم بنجاح!");
      } else {
        // Add new invited user
        const newUser: UserWithInvitation = {
          id: Date.now().toString(),
          name: "",
          email: data.email,
          role: data.role,
          status: "PENDING" as InvitationStatus,
          joinDate: new Date(),
          invitedAt: new Date(),
          isActive: false,
        };
        setUsers(prev => [...prev, newUser]);
        toast.success("تم إرسال الدعوة بنجاح!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("حدث خطأ أثناء العملية");
    }
  };

  const handleEditUser = (user: UserWithInvitation) => {
    setEditingUser({ email: user.email, role: user.role });
    setIsInviteModalOpen(true);
  };

  const handleDeleteUser = (user: UserWithInvitation) => {
    if (confirm(`هل تريد حقاً حذف المستخدم ${user.name}؟`)) {
      setUsers(prev => prev.filter(u => u.id !== user.id));
      toast.success("تم حذف المستخدم بنجاح");
    }
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Users}
        title="إدارة المستخدمين"
        actions={
          <Button
            onClick={() => setIsInviteModalOpen(true)}
            className="gap-2"
          >
            <UserPlus className="w-4 h-4" />
            دعوة مستخدم
          </Button>
        }
      />
      
      <UserStats users={filteredUsers} />
      
      <UserFilters
        selectedRole={selectedRole}
        onRoleChange={setSelectedRole}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onClearFilters={handleClearFilters}
        table={table}
      />
      
      <UsersTable 
        users={filteredUsers} 
        onTableReady={setTable}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onInvite={() => setIsInviteModalOpen(true)}
      />

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => {
          setIsInviteModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleInviteUser}
        user={editingUser}
      />
    </div>
  );
}

export default UsersManagement;