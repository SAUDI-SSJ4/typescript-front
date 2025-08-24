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
  fname: string;
  lname: string;
  email: string;
  phone: string;
  gender?: string;
  avatar?: string | File;
  coverImage?: string | File;
}

interface EditUserInfoModalProps {
  userInfo: UserInfo;
  onSave: (updatedInfo: UserInfo & { avatar?: File; coverImage?: File }) => void;
  trigger?: React.ReactNode;
}

export function EditUserInfoModal({
  userInfo,
  onSave,
  trigger,
}: EditUserInfoModalProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // إصلاح مشكلة VITE_API_URL
  const getApiUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    if (!envUrl) {
      console.warn("VITE_API_URL not defined, using default 127.0.0.1:8000");
      return "http://127.0.0.1:8000";
    }
    
    try {
      new URL(envUrl);
      return envUrl;
    } catch (error) {
      console.warn("Invalid VITE_API_URL, using default 127.0.0.1:8000:", error);
      return "http://127.0.0.1:8000";
    }
  };

  const apiUrl = getApiUrl();

  // Function to create full image URL
  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return undefined;
    try {
      const origin = new URL(apiUrl).origin;
      return `${origin}/static/${imagePath}`;
    } catch {
      return undefined;
    }
  };

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
      fname: userInfo.fname,
      lname: userInfo.lname,
      email: userInfo.email,
      phone: userInfo.phone,
      gender: userInfo.gender as "male" | "female" || "male",
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
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        avatar: data.avatar instanceof File ? data.avatar : undefined,
        coverImage: data.coverImage instanceof File ? data.coverImage : undefined,
      };

      onSave(userInfo as UserInfo & { avatar?: File; coverImage?: File });
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

  const validateCoverImageDimensions = async (_file: File): Promise<boolean> => {
    // No restrictions on cover image dimensions - accept any image
    return true;
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
              {watchedValues.coverImage || userInfo.coverImage ? (
                <img
                  src={
                    typeof watchedValues.coverImage === "string" && watchedValues.coverImage
                      ? watchedValues.coverImage
                      : getImageUrl(typeof userInfo.coverImage === 'string' ? userInfo.coverImage : '') || ""
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
              <Avatar className="w-20 h-20 transition-all duration-200 group-hover:opacity-80">
                <AvatarImage
                  src={
                    typeof watchedValues.avatar === "string" && watchedValues.avatar
                      ? watchedValues.avatar
                      : getImageUrl(typeof userInfo.avatar === 'string' ? userInfo.avatar : '') || undefined
                  }
                  alt="Profile"
                />
<<<<<<< HEAD
                <AvatarFallback className="bg-gray-200 text-gray-600 text-2xl">
                  {watchedValues.fname
                    ? watchedValues.fname.charAt(0)
                    : userInfo.fname?.charAt(0) || "?"}
=======
                <AvatarFallback className="bg-gray-200 text-gray-600 text-xl">
                  {watchedValues.name
                    ? watchedValues.name.charAt(0)
                    : userInfo.name.charAt(0)}
>>>>>>> sketch
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-right">
                <Label
                  htmlFor="fname"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  الاسم الأول
                </Label>
                <Input
                  id="fname"
                  type="text"
                  {...register("fname")}
                  className="text-right"
                  placeholder="أدخل اسمك الأول"
                />
                {errors.fname && (
                  <p className="text-red-500 text-sm mt-1 text-right">
                    {errors.fname.message}
                  </p>
                )}
              </div>

              <div className="text-right">
                <Label
                  htmlFor="lname"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  اسم العائلة
                </Label>
                <Input
                  id="lname"
                  type="text"
                  {...register("lname")}
                  className="text-right"
                  placeholder="أدخل اسم العائلة"
                />
                {errors.lname && (
                  <p className="text-red-500 text-sm mt-1 text-right">
                    {errors.lname.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="text-right">
              <Label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                الجنس
              </Label>
              <select
                id="gender"
                {...register("gender")}
                className="w-full p-2 border border-gray-300 rounded-md text-right bg-white"
              >
                <option value="male">ذكر</option>
                <option value="female">أنثى</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {errors.gender.message}
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
