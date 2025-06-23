import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Star, Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  studentReviewSchema,
  type StudentReviewFormData,
} from "@/validations/template";

// Star Rating Component
interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  error?: string;
}

const StarRating = ({ rating, onRatingChange, error }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex flex-col" dir="rtl">
      <div className="flex gap-1 justify-end">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-2xl transition-colors ${
              star <= (hoverRating || rating)
                ? "text-orange-400"
                : "text-gray-300"
            } hover:text-orange-400`}
            onClick={() => onRatingChange(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star
              fill={star <= (hoverRating || rating) ? "currentColor" : "none"}
            />
          </button>
        ))}
      </div>
      {error && (
        <span className="text-red-500 text-sm mt-1 text-right">{error}</span>
      )}
    </div>
  );
};

function StudentReviewForm() {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<StudentReviewFormData>({
    resolver: zodResolver(studentReviewSchema),
    defaultValues: {
      student_name: "",
      comment: "",
      rating: 0,
      image: "",
    },
  });

  // Watch the image field to update preview
  const imageUrl = watch("image");

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setValue("image", result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update preview when URL changes
  useEffect(() => {
    if (imageUrl && imageUrl !== imagePreview) {
      setImagePreview(imageUrl);
    }
  }, [imageUrl, imagePreview]);

  const onSubmit = async (data: StudentReviewFormData) => {
    try {
      console.log("Student Review Data:", data);
      // TODO: Add your API call here to submit the review
      // await submitReview(data);

      setOpen(false);
      reset();
      setImagePreview("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    setImagePreview("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">
          <PlusCircle />
          اضافة رأي جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-bold">
            إضافة تقييم طالب جديد
          </DialogTitle>
          <DialogDescription className="text-right text-gray-600">
            قم بإضافة تقييم وتعليق من الطالب مع إمكانية رفع صورة
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Student Name Field */}
          <div className="space-y-2">
            <Label htmlFor="student_name" className="text-right block">
              اسم الطالب
            </Label>
            <Input
              id="student_name"
              {...register("student_name")}
              placeholder="ادخل اسم الطالب"
              className="text-right"
              dir="rtl"
            />
            {errors.student_name && (
              <span className="text-red-500 text-sm text-right block">
                {errors.student_name.message}
              </span>
            )}
          </div>

          {/* Rating Field */}
          <div className="space-y-2">
            <Label className="text-right block">التقييم</Label>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-600 mb-2">
                اختر تقييم الطالب من 1 إلى 5 نجوم
              </p>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <StarRating
                    rating={field.value}
                    onRatingChange={field.onChange}
                    error={errors.rating?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* Comment Field */}
          <div className="space-y-2">
            <Label htmlFor="comment" className="text-right block">
              التعليق
            </Label>
            <Textarea
              id="comment"
              {...register("comment")}
              placeholder="اكتب تعليق الطالب هنا..."
              className="text-right min-h-[100px]"
              dir="rtl"
            />
            {errors.comment && (
              <span className="text-red-500 text-sm text-right block">
                {errors.comment.message}
              </span>
            )}
          </div>

          {/* Image URL Field */}
          <div className="space-y-2">
            <Label htmlFor="image" className="text-right block">
              صورة الطالب (اختياري)
            </Label>
            <div className="flex gap-2">
              <Input
                id="image"
                {...register("image")}
                placeholder="https://example.com/image.jpg"
                className="text-right flex-1"
                dir="ltr"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="px-3"
                onClick={() => {
                  document.getElementById("file-upload")?.click();
                }}
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>

            {/* Hidden file input */}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2 text-right">
                  معاينة الصورة:
                </p>
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Student preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                      onError={() => setImagePreview("")}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 bg-red-500 text-white hover:bg-red-600"
                      onClick={() => {
                        setValue("image", "");
                        setImagePreview("");
                      }}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {errors.image && (
              <span className="text-red-500 text-sm text-right block">
                {errors.image.message}
              </span>
            )}
          </div>

          <DialogFooter className="flex gap-2 justify-start">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري الحفظ..." : "حفظ التقييم"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default StudentReviewForm;
