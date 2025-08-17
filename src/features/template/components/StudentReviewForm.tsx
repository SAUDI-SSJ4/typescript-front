import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageField from "@/components/shared/formFields/image-field";
import { useForm, Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Star, CheckCircle } from "lucide-react";
import { useCreateOpinion } from "../hooks/useOpinionsMutations";
import type { OpinionPayload } from "@/types/academy/opinion";

const StudentReviewForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  const createOpinionMutation = useCreateOpinion();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OpinionPayload>({
    defaultValues: {
      name: "",
      content: "",
      rating: 5,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: OpinionPayload) => {
    try {
      await createOpinionMutation.mutateAsync(data);

      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating opinion:", error);
    }
  };

  const resetForm = () => {
    reset();
  };

  const renderStars = (
    rating: number,
    interactive = false,
    onStarClick?: (rating: number) => void
  ) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-300" : ""}`}
            onClick={() => interactive && onStarClick?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة تقييم جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">
            إضافة تقييم طالب جديد
          </DialogTitle>
          <DialogDescription className="text-right">
            أضف تقييماً جديداً من أحد الطلبة مع إمكانية رفع صورة
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="student-name"
                className="text-sm font-medium text-card-foreground"
              >
                اسم الطالب
              </Label>
              <Controller
                control={control}
                name="name"
                rules={{ required: "اسم الطالب مطلوب" }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="student-name"
                    value={value || ""}
                    onChange={onChange}
                    placeholder="أدخل اسم الطالب"
                    className={`${
                      errors.name
                        ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                        : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                    } h-10 !bg-transparent`}
                    dir="rtl"
                  />
                )}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-card-foreground">
                التقييم
              </Label>
              <Controller
                control={control}
                name="rating"
                rules={{
                  required: "التقييم مطلوب",
                  min: {
                    value: 1,
                    message: "يجب أن يكون التقييم على الأقل نجمة واحدة",
                  },
                }}
                render={({ field: { onChange, value } }) =>
                  renderStars(value, true, onChange)
                }
              />
              {errors.rating && (
                <p className="text-sm text-destructive">
                  {errors.rating.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="text-sm font-medium text-card-foreground"
              >
                التعليق
              </Label>
              <Controller
                control={control}
                name="content"
                rules={{ required: "التعليق مطلوب" }}
                render={({ field: { onChange, value } }) => (
                  <Textarea
                    id="content"
                    value={value || ""}
                    onChange={onChange}
                    placeholder="اكتب تعليق الطالب هنا..."
                    rows={4}
                    className={`${
                      errors.content
                        ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                        : "!border-border !shadow-none focus-visible:ring-0 focus-visible:border-border"
                    } !bg-transparent resize-none`}
                    dir="rtl"
                  />
                )}
              />
              {errors.content && (
                <p className="text-sm text-destructive">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <ImageField
                name="image"
                type="image"
                label="صورة الطالب (اختيارية)"
                placeholder="اختر صورة الطالب"
                control={control as unknown as Control<Record<string, unknown>>}
                errors={errors}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                resetForm();
                setIsOpen(false);
              }}
              className="flex-1 shadow-sm"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={createOpinionMutation.isPending}
              className="flex-1 gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              {createOpinionMutation.isPending
                ? "جاري الحفظ..."
                : "إضافة التقييم"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentReviewForm;
