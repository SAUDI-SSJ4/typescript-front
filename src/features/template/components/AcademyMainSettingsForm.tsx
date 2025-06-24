import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import {
  academyMainSettingsSchema,
  type AcademyMainSettingsFormData,
} from "@/validations/template";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Palette, Image as ImageIcon, CheckCircle, Loader2, School } from "lucide-react";
import { useState, useEffect } from "react";

const AcademyMainSettingsForm = () => {
  const [hasUserChanges, setHasUserChanges] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm<AcademyMainSettingsFormData>({
    resolver: zodResolver(academyMainSettingsSchema),
    defaultValues: {
      academyName: "",
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
    },
    mode: "onChange",
  });

  // Track when user actually makes changes (after initial render)
  useEffect(() => {
    if (isDirty) {
      setHasUserChanges(true);
    }
  }, [isDirty]);

  const onSubmit = async (data: AcademyMainSettingsFormData) => {
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
      <div className="bg-indigo-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-indigo-600" />
          <div>
            <h2 className="text-base font-semibold text-gray-900">الإعدادات الرئيسية</h2>
            <p className="text-sm text-gray-600">قم بتخصيص هوية وألوان أكاديميتك</p>
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
                  name="academyName"
                  render={({ field: { onChange, value } }) => (
                    <div className="flex flex-col gap-2">
                      <Input
                        type="text"
                        value={value || ""}
                        onChange={onChange}
                        placeholder="أدخل اسم الأكاديمية"
                        disabled={formLoading}
                        className={`${
                          errors.academyName
                            ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                            : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                        } h-10 !bg-transparent`}
                        dir="rtl"
                      />
                    </div>
                  )}
                />
                {errors.academyName && (
                  <p className="text-sm text-destructive">
                    {errors.academyName.message}
                  </p>
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
                    name="primaryColor"
                    render={({ field: { onChange, value } }) => (
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-10 rounded-md border-2 border-gray-200 shadow-sm cursor-pointer transition-all hover:scale-105"
                          style={{ backgroundColor: value }}
                          onClick={() => document.getElementById('primaryColorPicker')?.click()}
                        />
                        <input
                          id="primaryColorPicker"
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
                            errors.primaryColor
                              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                              : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                          } h-10 !bg-transparent`}
                          dir="ltr"
                        />
                      </div>
                    )}
                  />
                  {errors.primaryColor && (
                    <p className="text-sm text-destructive">
                      {errors.primaryColor.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-medium text-card-foreground block">
                    اللون الثانوي
                  </Label>
                  <Controller
                    control={control}
                    name="secondaryColor"
                    render={({ field: { onChange, value } }) => (
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-12 h-10 rounded-md border-2 border-gray-200 shadow-sm cursor-pointer transition-all hover:scale-105"
                          style={{ backgroundColor: value }}
                          onClick={() => document.getElementById('secondaryColorPicker')?.click()}
                        />
                        <input
                          id="secondaryColorPicker"
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
                            errors.secondaryColor
                              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                              : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                          } h-10 !bg-transparent`}
                          dir="ltr"
                        />
                      </div>
                    )}
                  />
                  {errors.secondaryColor && (
                    <p className="text-sm text-destructive">
                      {errors.secondaryColor.message}
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
              <div className="space-y-2">
                <ImageField
                  name="academyIcon"
                  type="image"
                  label=""
                  placeholder="اختر أيقونة المنصة"
                  control={control as unknown as Control<Record<string, unknown>>}
                  errors={errors}
                  disabled={formLoading}
                />
              </div>
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
              <div className="space-y-2">
                <ImageField
                  name="academyLogo"
                  type="image"
                  label=""
                  placeholder="اختر شعار المنصة"
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
                حفظ الإعدادات
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
            استعادة الافتراضي
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AcademyMainSettingsForm;
