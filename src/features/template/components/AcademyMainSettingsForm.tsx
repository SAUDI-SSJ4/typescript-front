import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import { academyMainSettingsSchema } from "@/validations/template";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Settings,
  Palette,
  Image as ImageIcon,
  CheckCircle,
  Loader2,
  School,
  Share2,
} from "lucide-react";
import { useState } from "react";
import type { AxiosError } from "axios";
import { useCheckSubdomain } from "../hooks/useMainSettingsQueries";
import { useDebounce } from "@/hooks/useDebounce";
import RemoteImage from "@/components/shared/RemoteImage";
import { toast } from "sonner";
import { useAcademyMainSettingsMutation } from "../hooks/useMainSettingsMutations";
import type {
  MainSettings,
  MainSettingsPayload,
} from "@/types/academy/main-settings";

const AcademyMainSettingsForm = ({
  mainSettings,
}: {
  mainSettings: MainSettings;
}) => {
  const academyMainSettingsMutation = useAcademyMainSettingsMutation();
  const [isChangingFavicon, setIsChangingFavicon] = useState(false);
  const [isChangingLogo, setIsChangingLogo] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    watch,
  } = useForm<MainSettingsPayload>({
    resolver: zodResolver(academyMainSettingsSchema),
    defaultValues: {
      platform_name: mainSettings?.platform_name || "",
      subdomain: mainSettings?.subdomain || "",
      primary_color: "#3B82F6",
      secondary_color: "#10B981",
      facebook: mainSettings?.facebook || "",
      twitter: mainSettings?.twitter || "",
      instagram: mainSettings?.instagram || "",
      youtube: mainSettings?.youtube || "",
      linkedin: mainSettings?.linkedin || "",
    },
    mode: "onChange",
  });

  const watchedSubdomain = watch("subdomain");
  const debouncedSubdomain = useDebounce(watchedSubdomain, 500);
  const shouldCheck =
    !!debouncedSubdomain &&
    mainSettings?.subdomain !== getValues("subdomain") &&
    !errors.subdomain &&
    debouncedSubdomain.length >= 3;
  const {
    data: subdomainCheck,
    isLoading: subdomainLoading,
    isError: subdomainCheckError,
  } = useCheckSubdomain(debouncedSubdomain, shouldCheck);
  const onSubmit = async (data: MainSettingsPayload) => {
    try {
      await academyMainSettingsMutation.mutateAsync(data);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as AxiosError<{ message?: string }>;
        toast.error(
          axiosError.response?.data?.message || "حدث خطأ أثناء حفظ الإعدادات"
        );
      } else {
        toast.error("حدث خطأ أثناء حفظ الإعدادات");
      }
    }
  };

  const handleReset = () => {
    reset();
  };

  const formLoading = isSubmitting || academyMainSettingsMutation.isPending;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="bg-indigo-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              الإعدادات الرئيسية
            </h2>
            <p className="text-sm text-gray-600">
              قم بتخصيص هوية وألوان أكاديميتك
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* All Settings in One Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Academy Name */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <School className="w-4 h-4 text-blue-600" />
                اسم الأكاديمية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Controller
                  control={control}
                  name="platform_name"
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        value={value || ""}
                        onChange={onChange}
                        placeholder="أدخل اسم الأكاديمية"
                        disabled={formLoading}
                        className={`${
                          errors.platform_name
                            ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                            : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                        } h-10 !bg-transparent`}
                        dir="rtl"
                      />
                    </div>
                  )}
                />
                {errors.platform_name && (
                  <p className="text-sm text-destructive">
                    {errors.platform_name.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Subdomain Field */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <Settings className="w-4 h-4 text-green-600" />
                النطاق الفرعي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Controller
                  control={control}
                  name="subdomain"
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        value={value || ""}
                        onChange={onChange}
                        placeholder="أدخل النطاق الفرعي (مثال: academy) "
                        disabled={formLoading}
                        className={`${
                          errors.subdomain
                            ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                            : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                        } h-10 !bg-transparent`}
                      />
                    </div>
                  )}
                />
                {errors.subdomain && (
                  <p className="text-sm text-destructive">
                    {errors.subdomain.message}
                  </p>
                )}
                {/* Subdomain availability feedback */}
                {!errors.subdomain &&
                  watchedSubdomain &&
                  watchedSubdomain.length >= 3 && (
                    <div className="text-xs min-h-[20px]">
                      {subdomainLoading && (
                        <span className="text-gray-500">
                          جاري التحقق من توفر النطاق...
                        </span>
                      )}
                      {subdomainCheck &&
                        subdomainCheck.data.available &&
                        !subdomainLoading && (
                          <span className="text-green-600">النطاق متاح ✅</span>
                        )}
                      {subdomainCheck &&
                        !subdomainCheck.data.available &&
                        !subdomainLoading && (
                          <span className="text-destructive">
                            {subdomainCheck.message || "النطاق غير متاح"}
                          </span>
                        )}
                      {subdomainCheckError && !subdomainLoading && (
                        <span className="text-destructive">
                          تعذر التحقق من النطاق
                        </span>
                      )}
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>

          {/* Colors Combined */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <Palette className="w-4 h-4 text-orange-600" />
                ألوان الأكاديمية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-card-foreground block">
                    اللون الأساسي
                  </Label>
                  <Controller
                    control={control}
                    name="primary_color"
                    render={({ field: { onChange, value } }) => (
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-10 rounded-md border-2 border-gray-200 shadow-sm cursor-pointer transition-all hover:scale-105"
                          style={{ backgroundColor: value }}
                          onClick={() =>
                            document
                              .getElementById("primary_colorPicker")
                              ?.click()
                          }
                        />
                        <input
                          id="primary_colorPicker"
                          type="color"
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          className="sr-only"
                        />
                        <Input
                          type="text"
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          placeholder="#3B82F6"
                          className={`flex-1 ${
                            errors.primary_color
                              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                              : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                          } h-10 !bg-transparent`}
                          dir="ltr"
                        />
                      </div>
                    )}
                  />
                  {errors.primary_color && (
                    <p className="text-sm text-destructive">
                      {errors.primary_color.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-card-foreground block">
                    اللون الثانوي
                  </Label>
                  <Controller
                    control={control}
                    name="secondary_color"
                    render={({ field: { onChange, value } }) => (
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-10 rounded-md border-2 border-gray-200 shadow-sm cursor-pointer transition-all hover:scale-105"
                          style={{ backgroundColor: value }}
                          onClick={() =>
                            document
                              .getElementById("secondary_colorPicker")
                              ?.click()
                          }
                        />
                        <input
                          id="secondary_colorPicker"
                          type="color"
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          className="sr-only"
                        />
                        <Input
                          type="text"
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                          placeholder="#10B981"
                          className={`flex-1 ${
                            errors.secondary_color
                              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                              : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                          } h-10 !bg-transparent`}
                          dir="ltr"
                        />
                      </div>
                    )}
                  />
                  {errors.secondary_color && (
                    <p className="text-sm text-destructive">
                      {errors.secondary_color.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academy Icon */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                ايقونة المنصة التعليمية
              </CardTitle>
            </CardHeader>

            <CardContent>
              {mainSettings.favicon && !isChangingFavicon ? (
                <div className="flex flex-col gap-2 items-center space-y-2">
                  <RemoteImage
                    className="w-full h-32"
                    src={mainSettings?.favicon || ""}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setIsChangingFavicon(true)}
                      disabled={formLoading}
                    >
                      تغيير الأيقونة
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <ImageField
                    name="favicon"
                    type="image"
                    label=""
                    placeholder="اختر أيقونة المنصة"
                    control={
                      control as unknown as Control<Record<string, unknown>>
                    }
                    errors={errors}
                    disabled={formLoading}
                  />
                  {isChangingFavicon && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsChangingFavicon(false)}
                      disabled={formLoading}
                    >
                      إلغاء
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Academy Logo */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                شعار المنصة التعليمية
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mainSettings.logo && !isChangingLogo ? (
                <div className="flex flex-col gap-2 items-center space-y-2">
                  <RemoteImage
                    className="w-full h-32"
                    src={mainSettings?.logo || ""}
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      onClick={() => setIsChangingLogo(true)}
                      disabled={formLoading}
                    >
                      تغيير الشعار
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <ImageField
                    name="logo"
                    type="image"
                    label=""
                    placeholder="اختر شعار المنصة"
                    control={
                      control as unknown as Control<Record<string, unknown>>
                    }
                    errors={errors}
                    disabled={formLoading}
                  />
                  {isChangingLogo && (
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsChangingLogo(false)}
                      disabled={formLoading}
                    >
                      إلغاء
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Social Media Section */}
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
              <Share2 className="w-4 h-4 text-blue-600" />
              حسابات التواصل الاجتماعي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Facebook */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-card-foreground flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  فيسبوك
                </Label>
                <Controller
                  control={control}
                  name="facebook"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="url"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="https://facebook.com/your-academy"
                      disabled={formLoading}
                      className={`${
                        errors.facebook
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="ltr"
                    />
                  )}
                />
                {errors.facebook && (
                  <p className="text-sm text-destructive">
                    {errors.facebook.message}
                  </p>
                )}
              </div>

              {/* Twitter */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-card-foreground flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-sky-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  تويتر
                </Label>
                <Controller
                  control={control}
                  name="twitter"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="url"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="https://twitter.com/your-academy"
                      disabled={formLoading}
                      className={`${
                        errors.twitter
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="ltr"
                    />
                  )}
                />
                {errors.twitter && (
                  <p className="text-sm text-destructive">
                    {errors.twitter.message}
                  </p>
                )}
              </div>

              {/* Instagram */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-card-foreground flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-pink-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  إنستغرام
                </Label>
                <Controller
                  control={control}
                  name="instagram"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="url"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="https://instagram.com/your-academy"
                      disabled={formLoading}
                      className={`${
                        errors.instagram
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="ltr"
                    />
                  )}
                />
                {errors.instagram && (
                  <p className="text-sm text-destructive">
                    {errors.instagram.message}
                  </p>
                )}
              </div>

              {/* YouTube */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-card-foreground flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-red-600"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  يوتيوب
                </Label>
                <Controller
                  control={control}
                  name="youtube"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="url"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="https://youtube.com/@your-academy"
                      disabled={formLoading}
                      className={`${
                        errors.youtube
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="ltr"
                    />
                  )}
                />
                {errors.youtube && (
                  <p className="text-sm text-destructive">
                    {errors.youtube.message}
                  </p>
                )}
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-card-foreground flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-blue-700"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  لينكد إن
                </Label>
                <Controller
                  control={control}
                  name="linkedin"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="url"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="https://linkedin.com/company/your-academy"
                      disabled={formLoading}
                      className={`${
                        errors.linkedin
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="ltr"
                    />
                  )}
                />
                {errors.linkedin && (
                  <p className="text-sm text-destructive">
                    {errors.linkedin.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-start gap-3 pt-4 border-t border-gray-100">
          <Button type="submit" disabled={isSubmitting} className="px-6">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 ml-2" />
                حفظ الإعدادات
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-6"
          >
            استعادة الافتراضي
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AcademyMainSettingsForm;
