import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, User } from "lucide-react";
import { EditUserInfoModal } from "@/components/shared/dashboard/EditUserInfoModal";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { useState } from "react";
import { useCurrentUserProfile } from "@/features/dashboard/profile/hooks/useUserQueries";
import { useUpdateUserProfile } from "@/features/dashboard/profile/hooks/useUserMutations";

function Profile() {
  // Get user profile data from API
  const { data: userProfile, isLoading, isError } = useCurrentUserProfile();
  const updateProfileMutation = useUpdateUserProfile();
  
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);

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
    if (!apiUrl) return undefined;
    try {
      const origin = new URL(apiUrl).origin;
      return `${origin}/static/${imagePath}`;
    } catch {
      return undefined;
    }
  };

  const handleSaveUserInfo = async (updatedInfo: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
    gender?: string;
    avatar?: File;
    coverImage?: File;
  }) => {
    try {
      await updateProfileMutation.mutateAsync({
        fname: updatedInfo.fname,
        lname: updatedInfo.lname,
        email: updatedInfo.email,
        phone_number: updatedInfo.phone,
        gender: updatedInfo.gender,
        avatar: updatedInfo.avatar || null,
        banner: updatedInfo.coverImage || null,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || !userProfile) {
    return (
      <div className="space-y-6">
        <Header />
        <div className="text-center text-red-600 py-8">
          حدث خطأ في تحميل بيانات الملف الشخصي
        </div>
      </div>
    );
  }

  // Map API data to component format
  const userInfo = {
    fname: userProfile.fname,
    lname: userProfile.lname,
    name: `${userProfile.fname} ${userProfile.lname}`,
    email: userProfile.email,
    phone: userProfile.phone_number,
    gender: userProfile.gender,
    avatar: (userProfile as any).avatar || userProfile.avatar_url, // Keep original path for modal
    coverImage: (userProfile as any).banner || userProfile.banner_url, // Keep original path for modal
  };

  // For display purposes, create URLs
  const displayInfo = {
    ...userInfo,
    avatar: getImageUrl((userProfile as any).avatar || userProfile.avatar_url) || coverImage,
    coverImage: getImageUrl((userProfile as any).banner || userProfile.banner_url) || coverImage,
  };

  const handleCoverImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Update banner via API
        await updateProfileMutation.mutateAsync({
          banner: file,
        });
        
        // Also update local state for immediate visual feedback
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setCoverImage(result);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error updating banner:", error);
      }
    }
  };



  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={User}
        title="الملف الشخصي"
        variant="bordered"
      />
      
      {/* Cover Image and Profile Section */}
      <div className="rounded-xl shadow-sm overflow-hidden mb-6 relative">
        {/* Cover Image */}
        <div className="h-72 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 relative overflow-hidden group">
          {displayInfo.coverImage ? (
            <img
              src={displayInfo.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-gray-400 absolute top-1/5 md:top-1/4 left-1/2 -translate-x-1/2">
              صورة الغلاف
            </p>
          )}

          {/* Cover Image Upload Button */}
          <button
            onClick={() =>
              document.getElementById("cover-upload-profile")?.click()
            }
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
            title="تغيير صورة الغلاف"
          >
            <Camera className="w-5 h-5" />
          </button>

          <input
            id="cover-upload-profile"
            type="file"
            accept="image/*"
            onChange={handleCoverImageUpload}
            className="hidden"
          />
        </div>

        {/* Profile Info */}
        <div className="flex items-end justify-between absolute bottom-0 bg-white w-full pt-10 md:pt-4 pb-4 px-4">
          <div className="flex items-end gap-4">
<<<<<<< HEAD:src/pages/dashboard/profile/index.tsx
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage 
                src={displayInfo.avatar || undefined} 
                alt={displayInfo.name} 
              />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-2xl">
                {displayInfo.name?.charAt(0) || "?"}
=======
            <Avatar className="w-20 h-20 border-4 border-white">
              <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-xl">
                {userInfo.name.charAt(0)}
>>>>>>> sketch:src/pages/dashboard/profile.tsx
              </AvatarFallback>
            </Avatar>
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                {userInfo.name}
              </h1>
              <p className="text-gray-500 text-sm">تاريخ الإنشاء 15-01-2023</p>
            </div>
          </div>
          <div className="absolute top-4 left-4">
            <EditUserInfoModal
              userInfo={{
                ...userInfo,
                phone: userInfo.phone || ""
              }}
              onSave={handleSaveUserInfo}
            />
          </div>
        </div>
      </div>

      {/* Personal Information Section - Full Width */}
      <div className="w-full">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            المعلومات الشخصية
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الاسم الأول
                </label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-900 font-medium">{userInfo.fname}</p>
                </div>
              </div>

              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم العائلة
                </label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-900 font-medium">{userInfo.lname}</p>
                </div>
              </div>

              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-900 font-medium">{userInfo.email}</p>
                </div>
              </div>

              <div className="text-right">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رقم الهاتف
                </label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-900 font-medium">{userInfo.phone}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;


