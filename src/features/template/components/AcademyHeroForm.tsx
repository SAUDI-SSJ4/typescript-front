import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Menu,
  Link2,
  Image as ImageIcon,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import {
  academyHeroSchema,
  type AcademyHeroForm as AcademyHeroFormType,
} from "@/validations/template";
import { useAcademyHeroMutation } from "../hooks/useHeroMutations";
import type { Hero } from "@/types/academy/hero";
import RemoteImage from "@/components/shared/RemoteImage";
import Editor from "@/components/shared/Editor";

const AcademyHeroForm = ({ hero }: { hero: Hero }) => {
  const academyHeroMutation = useAcademyHeroMutation();
  const [isChangingImage, setIsChangingImage] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AcademyHeroFormType>({
    resolver: zodResolver(academyHeroSchema),
    defaultValues: {
      title: hero.title || "",
      description: hero.description || "",
      first_link_title: hero.first_link.title || "",
      first_link_url: hero.first_link.url || "",
      second_link_title: hero.second_link.title || "",
      second_link_url: hero.second_link.url || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AcademyHeroFormType) => {
    try {
      await academyHeroMutation.mutateAsync(data);
    } catch (error) {
      console.error("Error submitting Hero form:", error);
    }
  };

  const handleReset = () => {
    reset();
  };

  const formLoading = isSubmitting;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 text-purple-600" />
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              تحرير القسم الرئيسي{" "}
            </h2>
            <p className="text-sm text-gray-600">
              قم بتخصيص المحتوى والروابط في القسم الرئيسي{" "}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Titles Combined */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <Menu className="w-4 h-4 text-blue-600" />
                العناوين
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  العنوان الرئيسي
                </Label>
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value } }) => (
                    <Editor value={value || ""} onChange={onChange} />
                  )}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* First Link */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <Link2 className="w-4 h-4 text-orange-600" />
                الرابط الأول
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  عنوان الرابط
                </Label>
                <Controller
                  control={control}
                  name="first_link_title"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="عنوان الرابط"
                      disabled={formLoading}
                      className={`${
                        errors.first_link_title
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.first_link_title && (
                  <p className="text-sm text-destructive">
                    {errors.first_link_title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  رابط URL
                </Label>
                <Controller
                  control={control}
                  name="first_link_url"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="url"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="https://example.com"
                      disabled={formLoading}
                      className={`${
                        errors.first_link_url
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="ltr"
                    />
                  )}
                />
                {errors.first_link_url && (
                  <p className="text-sm text-destructive">
                    {errors.first_link_url.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Second Link */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <Link2 className="w-4 h-4 text-purple-600" />
                الرابط الثاني
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  عنوان الرابط
                </Label>
                <Controller
                  control={control}
                  name="second_link_title"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="عنوان الرابط"
                      disabled={formLoading}
                      className={`${
                        errors.second_link_title
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.second_link_title && (
                  <p className="text-sm text-destructive">
                    {errors.second_link_title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  رابط URL
                </Label>
                <Controller
                  control={control}
                  name="second_link_url"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="url"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="https://example.com"
                      disabled={formLoading}
                      className={`${
                        errors.second_link_url
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="ltr"
                    />
                  )}
                />
                {errors.second_link_url && (
                  <p className="text-sm text-destructive">
                    {errors.second_link_url.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/*Description */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <Menu className="w-4 h-4 text-indigo-600" />
                الوصف التفصيلي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => (
                  <Editor value={value || ""} onChange={onChange} />
                )}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Hero Image */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                الصورة الرئيسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {hero.image && !isChangingImage ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <RemoteImage
                        prefix="static"
                        src={hero.image}
                        alt="Hero Image"
                        className="w-full h-40 object-cover rounded-lg border"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsChangingImage(true);
                      }}
                      disabled={formLoading}
                      className="w-full"
                    >
                      تغيير الصورة
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <ImageField
                      name="image"
                      type="image"
                      label=""
                      placeholder="اختر الصورة الرئيسية"
                      control={
                        control as unknown as Control<Record<string, unknown>>
                      }
                      errors={errors}
                      disabled={formLoading}
                    />
                    {hero.image && isChangingImage && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsChangingImage(false);
                        }}
                        disabled={formLoading}
                        className="w-full"
                      >
                        إلغاء التغيير
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

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
                حفظ التغييرات
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
            إلغاء التغييرات
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AcademyHeroForm;
