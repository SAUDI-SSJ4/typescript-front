import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Camera, User } from "lucide-react";
import Icon from "@/components/shared/Icon";
import { EditUserInfoModal } from "@/components/shared/dashboard/EditUserInfoModal";
import { useState } from "react";

function Profile() {
  const [userInfo, setUserInfo] = useState({
    name: "محمد أحمد",
    email: "mohammed.ahmed@example.com",
    phone: "966512345678",
    avatar: "https://avatars.githubusercontent.com/u/87553297?v=4" as
      | string
      | undefined,
    coverImage: undefined as string | undefined,
  });

  const handleSaveUserInfo = (updatedInfo: {
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    coverImage?: string;
  }) => {
    setUserInfo({
      name: updatedInfo.name,
      email: updatedInfo.email,
      phone: updatedInfo.phone,
      avatar: updatedInfo.avatar,
      coverImage: updatedInfo.coverImage,
    });
    // Here you would typically make an API call to save the data
    console.log("User info updated:", updatedInfo);
  };

  const handleCoverImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUserInfo((prev) => ({
          ...prev,
          coverImage: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const socialMediaLinks = [
    {
      platform: "Twitter",
      username: "Mohammed@",
      iconName: "twitter" as const,
      bgColor: "bg-black",
    },
    {
      platform: "Facebook",
      username: "Mohammed@",
      iconName: "facebook" as const,
      bgColor: "bg-blue-600",
    },
    {
      platform: "Snapchat",
      username: "Mohammed@",
      iconName: "snapchat" as const,
      bgColor: "bg-yellow-400",
    },
    {
      platform: "Instagram",
      username: "Mohammed@",
      iconName: "instagram" as const,
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="space-y-6">
      <Header />
      
      {/* Cover Image and Profile Section */}
      <div className="rounded-xl shadow-sm overflow-hidden mb-6 relative">
        {/* Cover Image */}
        <div className="h-72 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 relative overflow-hidden group">
          {userInfo.coverImage ? (
            <img
              src={userInfo.coverImage}
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
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-2xl">
                {userInfo.name.charAt(0)}
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
              userInfo={userInfo}
              onSave={handleSaveUserInfo}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Social Media Links */}

        {/* Personal Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            المعلومات الشخصية
          </h2>

          <div className="space-y-6">
            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                الاسم
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900 font-medium">{userInfo.name}</p>
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

            <div className="text-right">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-900 font-medium">{userInfo.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            وسائل التواصل الاجتماعي
          </h2>

          <div className="space-y-4">
            {socialMediaLinks.map((social, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${social.bgColor} rounded-full flex items-center justify-center text-white font-bold`}
                  >
                    <Icon
                      name={social.iconName}
                      size="20"
                      className="text-white"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {social.platform}
                    </p>
                    <p className="text-sm text-gray-500">{social.username}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            الملف الشخصي
          </span>
        </div>
      </div>
    </div>
  );
}
