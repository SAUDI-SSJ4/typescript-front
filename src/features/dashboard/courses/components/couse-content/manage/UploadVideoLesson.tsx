import type { Lesson } from "@/types/couse";
import {
  useDeleteLesson,
  // useDeleteLesson,
  useUpdateLesson,
  useUploadVideoLesson,
} from "../../../hooks/useLessonsMutations";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  lessonSchema,
  type LessonFormData,
  type SectionFormData,
} from "@/validations/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Play, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DeleteItemDialog from "@/components/shared/DeleteItemDialog";

function UploadVideoLesson({ lesson }: { lesson: Lesson }) {
  const [videoLesson, setVideoLesson] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (videoLesson) {
      const url = URL.createObjectURL(videoLesson);
      setVideoPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setVideoPreviewUrl(null);
    }
  }, [videoLesson]);

  const updateLessonMutation = useUpdateLesson();
  const uploadVideoLesson = useUploadVideoLesson();
  const deleteLessonMutation = useDeleteLesson();

  const {
    control,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    mode: "onChange",
    values: {
      title: lesson.title || "",
      type: lesson.type,
    },
  });
  const onSubmit = async (data: SectionFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("type", lesson.type);
    try {
      const { status_code } = await updateLessonMutation.mutateAsync({
        lessonId: String(lesson.id),
        data: formData,
      });
      if (status_code === 200 && videoLesson) {
        const videoData = new FormData();
        videoData.append("video_file", videoLesson);
        await uploadVideoLesson.mutateAsync({
          lessonId: String(lesson.id),
          data: videoData,
        });
      }
    } catch (error) {
      console.error("Error creating section:", error);
    }
  };

  const handleAddLesson = async () => {
    const isValid = await trigger(); // Trigger validation
    if (!isValid) return;
    const data = getValues(); // Get form values

    await onSubmit(data);
  };

  const handleDeleteLesson = async (id: string) => {
    try {
      await deleteLessonMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };
  return (
    <Card className="p-6 shadow-sm border-0 h-fit">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <Play className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {lesson.title}
          </h3>
        </div>
        {/* Edit Title */}
        <div className="space-y-2">
          <Label htmlFor="section-title" className="text-gray-700">
            عنوان الدرس
          </Label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="أدخل عنوان الدرس"
                disabled={updateLessonMutation.isPending}
              />
            )}
          />
          {errors.title && (
            <span className="text-sm text-red-500">{errors.title.message}</span>
          )}
        </div>

        {/* Video Upload/Edit */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">الفيديو</Label>
          {/* Video preview if a new file is selected */}
          {videoPreviewUrl ? (
            <div className="space-y-3">
              <div className="relative">
                <video
                  src={videoPreviewUrl}
                  className="w-full h-80 object-cover rounded-lg"
                  controls
                  poster="/api/placeholder/400/200"
                />
              </div>
              <div className="space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    document.getElementById("video-upload")?.click()
                  }
                >
                  <Upload className="w-4 h-4 mr-2" />
                  تغيير الفيديو
                </Button>
                <input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoLesson(e.target.files?.[0] || null)}
                  style={{ display: "none" }}
                />
                <p className="text-xs text-gray-500 text-center">
                  الحد الأقصى للملف: 512 ميجا
                </p>
              </div>
            </div>
          ) : lesson.video_id ? (
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("video-upload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                تغيير الفيديو
              </Button>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={(e) => setVideoLesson(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />
              <p className="text-xs text-gray-500 text-center">
                الحد الأقصى للملف: 512 ميجا
              </p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-3">لا يوجد فيديو مرفوع</p>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("video-upload")?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                رفع فيديو
              </Button>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                onChange={(e) => setVideoLesson(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />
              <p className="text-xs text-gray-500 mt-2">
                الحد الأقصى للملف: 512 ميجا
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleAddLesson}
              disabled={
                updateLessonMutation.isPending || deleteLessonMutation.isPending
              }
            >
              حفظ التغييرات
            </Button>
            <DeleteItemDialog
              id={String(lesson.id)}
              isPending={
                deleteLessonMutation.isPending || updateLessonMutation.isPending
              }
              onDelete={handleDeleteLesson}
              heading="حذف الدرس"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default UploadVideoLesson;
