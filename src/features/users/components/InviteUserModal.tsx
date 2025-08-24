import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormFields from "@/components/shared/formFields/form-fields";
import { inviteUserSchema, type IInviteUserForm } from "@/validations/user-invitation";
import { UserType } from "@/constants/enums";
import { toast } from "sonner";
import { Send, X } from "lucide-react";

interface InviteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: IInviteUserForm) => void;
  isLoading?: boolean;
  user?: {
    email: string;
    role: UserType;
  } | null;
}

const getRoleDisplayName = (role: UserType) => {
  switch (role) {
    case UserType.MANAGER:
      return "مدير";
    case UserType.MARKETING_MANAGER:
      return "مسؤول تسويق";
    case UserType.TRAINER:
      return "مدرب";
    default:
      return role;
  }
};

const getRoleDescription = (role: UserType) => {
  switch (role) {
    case UserType.MANAGER:
      return "صلاحيات إدارية كاملة على النظام";
    case UserType.MARKETING_MANAGER:
      return "إدارة الحملات التسويقية والعروض";
    case UserType.TRAINER:
      return "إنشاء وإدارة الدورات التدريبية";
    default:
      return "";
  }
};

const InviteUserModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  user,
}: InviteUserModalProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<IInviteUserForm>({
    resolver: zodResolver(inviteUserSchema),
    mode: "onChange",
    defaultValues: {
      email: user?.email || "",
      role: user?.role || UserType.TRAINER, // Default role
    },
  });

  const formLoading = isSubmitting || isLoading;
  const selectedRole = watch("role");

  const handleFormSubmit = async (data: IInviteUserForm) => {
    try {
      console.log(user ? "Edit User Data:" : "Invite User Data:", data);
      toast.success(user ? "تم تعديل المستخدم بنجاح!" : "تم إرسال الدعوة بنجاح!");
      onSubmit?.(data);
      reset();
      onClose();
    } catch (error) {
      console.error(user ? "Error editing user:" : "Error sending invitation:", error);
      toast.error(user ? "حدث خطأ أثناء تعديل المستخدم" : "حدث خطأ أثناء إرسال الدعوة");
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const availableRoles = [
    UserType.MANAGER,
    UserType.MARKETING_MANAGER,
    UserType.TRAINER,
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-semibold">
            {user ? "تعديل المستخدم" : "دعوة مستخدم جديد"}
          </DialogTitle>
          <DialogDescription className="text-right text-muted-foreground">
            {user ? "تعديل بيانات المستخدم وصلاحياته" : "أرسل دعوة لمستخدم جديد للانضمام للنظام"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <FormFields
                name="email"
                label="البريد الإلكتروني"
                type="email"
                placeholder="أدخل البريد الإلكتروني للمستخدم"
                control={control}
                errors={errors}
                disabled={formLoading || !!user}
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-right block">
                نوع الحساب والصلاحيات <span className="text-red-500">*</span>
              </label>
              <Select
                value={selectedRole}
                onValueChange={(value) => setValue("role", value as UserType)}
                disabled={formLoading}
              >
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder="اختر نوع الحساب" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role} value={role} className="text-right">
                      {getRoleDisplayName(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500 mt-1 text-right">
                  {errors.role.message}
                </p>
              )}
            </div>

            {/* Role Description */}
            {selectedRole && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2 text-right">
                  صلاحيات {getRoleDisplayName(selectedRole)}:
                </h4>
                <p className="text-sm text-blue-800 text-right">
                  {getRoleDescription(selectedRole)}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-row justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={formLoading}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              إلغاء
            </Button>

            <Button
              type="submit"
              disabled={formLoading}
              className="flex items-center gap-2"
            >
              {formLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {user ? "حفظ التعديلات" : "إرسال الدعوة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserModal;