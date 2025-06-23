import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import { userSchema, type UserFormData } from "@/validations/user";

interface UserInfo {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  coverImage?: string;
}

interface EditUserInfoModalProps {
  userInfo: UserInfo;
  onSave: (updatedInfo: UserInfo) => void;
  trigger?: React.ReactNode;
}

export function EditUserInfoModal({
  userInfo,
  onSave,
  trigger,
}: EditUserInfoModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      phone: userInfo.phone,
      avatar: userInfo.avatar || "",
      coverImage: userInfo.coverImage || "",
    },
  });

  const watchedValues = watch();

  const validateFile = (
    file: File,
    type: "avatar" | "cover"
  ): string | null => {
    const maxSize = type === "avatar" ? 2 : 5; // MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return `نوع الملف غير مدعوم. الأنواع المدعومة: ${allowedTypes.join(
        ", "
      )}`;
    }

    if (file.size > maxSize * 1024 * 1024) {
      return `حجم الملف كبير جداً. الحد الأقصى ${maxSize} ميجابايت`;
    }

    return null;
  };

  const handleFormSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const userInfo: UserInfo = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        avatar: typeof data.avatar === "string" ? data.avatar : undefined,
        coverImage:
          typeof data.coverImage === "string" ? data.coverImage : undefined,
      };

      onSave(userInfo);
      toast.success("تم تحديث المعلومات بنجاح!");
      setOpen(false);
    } catch (error) {
      console.error("Error saving user info:", error);
      toast.error("حدث خطأ أثناء حفظ المعلومات");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset(); // Reset form to default values
    setOpen(false);
  };

  const validateCoverImageDimensions = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Cover image should be landscape and reasonably sized
        const minWidth = 800; // Minimum width for cover
        const minHeight = 300; // Minimum height for cover
        const maxWidth = 2048; // Maximum width
        const maxHeight = 1152; // Maximum height

        // Also check aspect ratio (should be wider than tall for cover)
        const aspectRatio = img.width / img.height;
        const minAspectRatio = 2.0; // At least 2:1 ratio
        const maxAspectRatio = 4.0; // Maximum 4:1 ratio

        const isValidDimensions =
          img.width >= minWidth &&
          img.height >= minHeight &&
          img.width <= maxWidth &&
          img.height <= maxHeight &&
          aspectRatio >= minAspectRatio &&
          aspectRatio <= maxAspectRatio;

        resolve(isValidDimensions);
      };

      img.onerror = () => resolve(false);
      img.src = URL.createObjectURL(file);
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validationError = validateFile(file, "avatar");
      if (validationError) {
        toast.error(validationError);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue("avatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic validation first
      const basicValidation = validateFile(file, "cover");
      if (basicValidation) {
        toast.error(basicValidation);
        return;
      }

      // Validate dimensions
      const isValidDimensions = await validateCoverImageDimensions(file);
      if (!isValidDimensions) {
        toast.error(
          "أبعاد صورة الغلاف غير مناسبة. الحد الأدنى: 800x300 بكسل، الحد الأقصى: 2048x1152 بكسل، ونسبة العرض للارتفاع بين 2:1 و 4:1"
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue("coverImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
            تحديث المعلومات
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-bold">
            تحديث المعلومات الشخصية
          </DialogTitle>
          <DialogDescription className="text-right text-gray-600">
            قم بتحديث معلوماتك الشخصية وصورة الملف الشخصي
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cover Image Section */}
          <div className="space-y-4">
            <h3 className="text-right text-lg font-semibold text-gray-900">
              صورة الغلاف
            </h3>
            <div
              className="relative cursor-pointer group h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg overflow-hidden"
              onClick={() => document.getElementById("cover-upload")?.click()}
            >
              {watchedValues.coverImage ? (
                <img
                  src={
                    typeof watchedValues.coverImage === "string"
                      ? watchedValues.coverImage
                      : ""
                  }
                  alt="Cover"
                  className="w-full h-full object-cover transition-all duration-200 group-hover:opacity-80"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 transition-all duration-200 group-hover:opacity-80">
                  <div className="text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">اضغط لإضافة صورة غلاف</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors">
                <Camera className="w-4 h-4" />
              </div>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="relative cursor-pointer group"
              onClick={() => document.getElementById("avatar-upload")?.click()}
            >
              <Avatar className="w-24 h-24 transition-all duration-200 group-hover:opacity-80">
                <AvatarImage
                  src={
                    typeof watchedValues.avatar === "string"
                      ? watchedValues.avatar
                      : userInfo.avatar
                  }
                  alt="Profile"
                />
                <AvatarFallback className="bg-gray-200 text-gray-600 text-2xl">
                  {watchedValues.name
                    ? watchedValues.name.charAt(0)
                    : userInfo.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors">
                <Camera className="w-4 h-4" />
              </div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              اضغط على الصورة لتغيير صورة الملف الشخصي
            </p>
          </div>

          {/* Form Fields */}
          <form
            id="user-info-form"
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <div className="text-right">
              <Label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                الاسم الكامل
              </Label>
              <Input
                id="name"
                type="text"
                {...register("name")}
                className="text-right"
                placeholder="أدخل اسمك الكامل"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                البريد الإلكتروني
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="text-right"
                placeholder="أدخل بريدك الإلكتروني"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <Label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                رقم الهاتف
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className="text-right"
                placeholder="أدخل رقم هاتفك"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </form>
        </div>

        <DialogFooter className="flex gap-2 justify-start">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading || isSubmitting}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            form="user-info-form"
            disabled={isLoading || isSubmitting}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isLoading || isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري الحفظ...
              </div>
            ) : (
              "حفظ التغييرات"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
