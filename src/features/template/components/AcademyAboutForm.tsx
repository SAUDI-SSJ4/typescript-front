import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import {
  academyAboutSchema,
  type AcademyAboutForm as AcademyAboutFormType,
} from "@/validations/template";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, Image as ImageIcon, CheckCircle, Loader2 } from "lucide-react";
import { useAcademyAboutMutation } from "../hooks/useAboutMutations";
import type { About, AboutPayload } from "@/types/academy/about";
import Editor from "@/components/shared/Editor";
import RemoteImage from "@/components/shared/RemoteImage";

const AcademyAboutForm = ({ about }: { about: About }) => {
  const academyAboutMutation = useAcademyAboutMutation();
  const [currentSliderId, setCurrentSliderId] = useState<string | null>(null);
  const [isChangingImage, setIsChangingImage] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AcademyAboutFormType>({
    resolver: zodResolver(academyAboutSchema),
    defaultValues: {
      title: about.title || "",
      content: about.content || "",
      feature_one: about.feature_one || "",
      feature_two: about.feature_two || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: AcademyAboutFormType) => {
    try {
      const payload: AboutPayload = {
        title: data.title,
        content: data.content,
        feature_one: data.feature_one,
        feature_two: data.feature_two,
      };

      // Include image if it exists
      if (data.image) {
        payload.image = data.image;
      }

      if (currentSliderId) {
        // Update existing about section
        await academyAboutMutation.mutateAsync(payload);
      } else {
        // Create new about section
        const response = await academyAboutMutation.mutateAsync(payload);
        if (response.data?.id) {
          setCurrentSliderId(response.data.id.toString());
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleReset = () => {
    reset();
  };

  const formLoading = isSubmitting || academyAboutMutation.isPending;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header Section */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-blue-600" />
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              تحرير قسم "من نحن"
            </h2>
            <p className="text-sm text-gray-600">
              قم بتخصيص المعلومات التعريفية لأكاديميتك
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
                <Info className="w-4 h-4 text-blue-600" />
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

          {/* Statistics Combined */}
          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <CheckCircle className="w-4 h-4 text-green-600" />
                الإحصائيات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  الإحصائية الأولى
                </Label>
                <Controller
                  control={control}
                  name="feature_one"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="مثال: +500 طالب"
                      disabled={formLoading}
                      className={`${
                        errors.feature_one
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.feature_one && (
                  <p className="text-sm text-destructive">
                    {errors.feature_one.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-card-foreground">
                  الإحصائية الثانية
                </Label>
                <Controller
                  control={control}
                  name="feature_two"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      type="text"
                      value={value || ""}
                      onChange={onChange}
                      placeholder="مثال: +50 دورة"
                      disabled={formLoading}
                      className={`${
                        errors.feature_two
                          ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                          : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                      } h-10 !bg-transparent`}
                      dir="rtl"
                    />
                  )}
                />
                {errors.feature_two && (
                  <p className="text-sm text-destructive">
                    {errors.feature_two.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
                <ImageIcon className="w-4 h-4 text-indigo-600" />
                الصورة الرئيسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {about.image && !isChangingImage ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <RemoteImage
                        prefix="static"
                        src={about.image}
                        alt="About Image"
                        className="w-full h-40 object-cover rounded-lg border"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsChangingImage(true)}
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
                    {about.image && isChangingImage && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsChangingImage(false)}
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

        {/* content - Second Row */}
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
              <Info className="w-4 h-4 text-gray-600" />
              الوصف التفصيلي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, value } }) => (
                <Editor value={value || ""} onChange={onChange} />
              )}
            />
            {errors.content && (
              <p className="text-sm text-destructive">
                {errors.content.message}
              </p>
            )}
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

export default AcademyAboutForm;
