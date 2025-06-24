import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import TextareaField from "@/components/shared/formFields/textarea-field";
import {
  academyMainMenuSchema,
  type AcademyMainMenuForm as AcademyMainMenuFormType,
} from "@/validations/template";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Menu, Settings, Link2, Image as ImageIcon, CheckCircle, Loader2 } from "lucide-react";

const AcademyMainMenuForm = () => {
  const [hasUserChanges, setHasUserChanges] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
  } = useForm<AcademyMainMenuFormType>({
    resolver: zodResolver(academyMainMenuSchema),
    defaultValues: {
      mainTitle: "",
      subTitle: "",
      description: "",
      firstLinkTitle: "",
      firstLinkUrl: "",
      secondLinkTitle: "",
      secondLinkUrl: "",
    },
    mode: "onChange",
  });

  // Track when user actually makes changes (after initial render)
  useEffect(() => {
    if (isDirty) {
      setHasUserChanges(true);
    }
  }, [isDirty]);

  const onSubmit = async (data: AcademyMainMenuFormType) => {
    // Handle form submission logic here
    console.log("Form submitted with data:", data);
    // You can call your API or perform any other actions here

    // After successful submission, reset the user changes flag
    setHasUserChanges(false);
  };

  const handleReset = () => {
    reset();
    setHasUserChanges(false);
  };

  const formLoading = isSubmitting;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="bg-purple-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 text-purple-600" />
          <div>
            <h2 className="text-base font-semibold text-gray-900">تحرير القسم الرئيسي </h2>
            <p className="text-sm text-gray-600">قم بتخصيص المحتوى والروابط في القسم الرئيسي </p>
          </div>
          {hasUserChanges && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 mr-auto">
              <Settings className="w-3 h-3 ml-1" />
              يوجد تغييرات غير محفوظة
            </Badge>
          )}
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
                  name="mainTitle"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="أدخل العنوان الجذاب"
                      disabled={formLoading}
                      className={`${
                        errors.mainTitle
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.mainTitle && (
                  <p className="text-sm text-destructive">
                    {errors.mainTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  العنوان الفرعي
                </Label>
                <Controller
                  control={control}
                  name="subTitle"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="أدخل العنوان الفرعي"
                      disabled={formLoading}
                      className={`${
                        errors.subTitle
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.subTitle && (
                  <p className="text-sm text-destructive">
                    {errors.subTitle.message}
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
                  name="firstLinkTitle"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="عنوان الرابط"
                      disabled={formLoading}
                      className={`${
                        errors.firstLinkTitle
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.firstLinkTitle && (
                  <p className="text-sm text-destructive">
                    {errors.firstLinkTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  رابط URL
                </Label>
                <Controller
                  control={control}
                  name="firstLinkUrl"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="url"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="https://example.com"
                      disabled={formLoading}
                      className={`${
                        errors.firstLinkUrl
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="ltr"
                    />
                  )}
                />
                {errors.firstLinkUrl && (
                  <p className="text-sm text-destructive">
                    {errors.firstLinkUrl.message}
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
                  name="secondLinkTitle"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="عنوان الرابط"
                      disabled={formLoading}
                      className={`${
                        errors.secondLinkTitle
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.secondLinkTitle && (
                  <p className="text-sm text-destructive">
                    {errors.secondLinkTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  رابط URL
                </Label>
                <Controller
                  control={control}
                  name="secondLinkUrl"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="url"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="https://example.com"
                      disabled={formLoading}
                      className={`${
                        errors.secondLinkUrl
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="ltr"
                    />
                  )}
                />
                {errors.secondLinkUrl && (
                  <p className="text-sm text-destructive">
                    {errors.secondLinkUrl.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description and Image - Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Description */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <Menu className="w-4 h-4 text-indigo-600" />
                الوصف التفصيلي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <TextareaField
                name="description"
                type="textarea"
                label=""
                placeholder="اكتب وصفاً جذاباً للصفحة الرئيسية..."
                control={control}
                errors={errors}
                disabled={formLoading}
                rows={4}
                maxLength={500}
              />
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
                <ImageField
                  name="heroImage"
                  type="image"
                  label=""
                  placeholder="اختر الصورة الرئيسية"
                  control={control as unknown as Control<Record<string, unknown>>}
                  errors={errors}
                  disabled={formLoading}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Actions */}
        <div className="flex justify-start gap-3 pt-4 border-t border-gray-100">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting || !hasUserChanges}
            className="px-6"
          >
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
            disabled={isSubmitting || !hasUserChanges}
            className="px-6"
          >
            إلغاء التغييرات
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AcademyMainMenuForm;
