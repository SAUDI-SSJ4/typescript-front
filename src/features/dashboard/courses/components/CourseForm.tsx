import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FormFields from "@/components/shared/formFields/form-fields";
import { courseSchema, type ICourseForm } from "@/validations/course";
import { toast } from "sonner";
import { ArrowRight, Trash2, Edit, X, Edit2, Plus } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useCreateCourse, useUpdateCourse, usePublishCourse, useUnpublishCourse } from "../hooks/useCoursesMutations";
import { useNavigate } from "react-router-dom";
import type { CoursePayload } from "../services/coursesApi";
import { CourseLevels } from "@/constants/enums";
import type { Course } from "@/types/couse";
import { useCategories } from "../hooks/useCoursesQueries";
import * as z from "zod";
import CourseContent from "./couse-content";
import { Loader } from "@/components/shared";
import ProgressSteps from "./ProgressSteps";
import { API_BASE_URL } from "@/lib/api-config";

// استخدام التكوين المركزي
const url = API_BASE_URL;
const origin = new URL(url).origin;

// Local storage key for persisting form data
const FORM_DATA_KEY = "addCourseForm_draft";
const FORM_STEP_KEY = "addCourseForm_step";

// Helper functions for local storage
const saveToLocalStorage = (
  key: string,
  data: Partial<ICourseForm> | number
) => {
  try {
    // Don't save File objects to localStorage as they can't be serialized
    if (key === FORM_DATA_KEY && typeof data === "object") {
      const dataToSave = { ...data };
      // Remove file objects before saving
      delete dataToSave.image;
      delete dataToSave.video;
      localStorage.setItem(key, JSON.stringify(dataToSave));
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.warn("Failed to save to localStorage:", error);
  }
};

const getFromLocalStorage = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.warn("Failed to read from localStorage:", error);
    return null;
  }
};

const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Failed to remove from localStorage:", error);
  }
};

const CourseForm = ({ course }: { course?: Course }) => {
  // React Query mutation for creating course
  const createCourseMutation = useCreateCourse();
  const updateCourseMutation = useUpdateCourse();
  const publishCourseMutation = usePublishCourse();
  const unpublishCourseMutation = useUnpublishCourse();
  const navigate = useNavigate();
  const { data: categories, isPending: categoriesPending, error: categoriesError } = useCategories();
  // State for managing media change forms
  const [showImageChangeForm, setShowImageChangeForm] = useState(false);
  const [showVideoChangeForm, setShowVideoChangeForm] = useState(false);
  // Get saved step from localStorage or default to 1
  const [currentStep, setCurrentStep] = useState(() => {
    const savedStep = getFromLocalStorage(FORM_STEP_KEY);
    return savedStep || 1;
  });
  const totalSteps = course ? 3 : 2;

  // Create conditional schema for editing vs creating
  const getValidationSchema = useCallback(() => {
    if (course) {
      // For editing: make image and video optional
      return courseSchema.extend({
        image: z.any().optional(),
        video: z.any().optional(),
      });
    }
    // For creating: use original schema
    return courseSchema;
  }, [course]);

  // Get saved form data from localStorage
  const getSavedFormData = useCallback(() => {
    const savedData = getFromLocalStorage(FORM_DATA_KEY);
    return (
      savedData || {
        title: "",
        category: categories?.data && categories.data.length > 0
          ? String(categories.data[0].id)
          : "",
        instructor: "",
        level: CourseLevels.BEGINNER,
        price: 0,
        discountPrice: 0,
        description: "",
        shortContent: "",
        skills: "",
        requirements: "",
      }
    );
  }, [categories?.data]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    trigger,
    watch,
    reset,
  } = useForm<ICourseForm>({
    resolver: zodResolver(getValidationSchema()),
    mode: "onChange",
    defaultValues: course
      ? {
          title: course.title,
          category: String(course.category.id),
          instructor: course.trainer ? course.trainer.fname : "",
          level: course.level,
          price: course.price || 0,
          discountPrice: course.discount_price || 0,
          description: course.content,
          shortContent: course.short_content,
          skills: course.learning_outcomes,
          requirements: course.requirements,
          image: null,
          video: null,
        }
      : getSavedFormData(),
  });

  const formLoading = isSubmitting;

  // Watch all form values for auto-save
  const watchedValues = watch();

  // Auto-save form data to localStorage whenever values change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveToLocalStorage(FORM_DATA_KEY, watchedValues);
    }, 500); // Debounce saves by 500ms

    return () => clearTimeout(timeoutId);
  }, [watchedValues]);

  // Save current step to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage(FORM_STEP_KEY, currentStep);
  }, [currentStep]);

  const clearDraftData = useCallback(() => {
    removeFromLocalStorage(FORM_DATA_KEY);
    removeFromLocalStorage(FORM_STEP_KEY);
  }, []);

  const handleFormSubmit = async (data: ICourseForm) => {
    try {
      // Format data to match API structure
      const formattedData: CoursePayload = {
        category_id: data.category,
        // trainer_id: "1", // You may need to map instructor name to ID
        title: data.title,
        content: data.description,
        short_content: data.shortContent,
        price: String(data.price),
        discount_price: String(data.discountPrice),
        level: data.level,
        image: data.image || null,
        preview_video: data.video || null,
        learning_outcomes: data.skills,
        requirements: data.requirements,
      };

      if (course) {
        // Update existing course
        await updateCourseMutation.mutateAsync({
          id: course.id,
          courseData: formattedData,
        });
      } else {
        // Create new course
        const { status_code, data } = await createCourseMutation.mutateAsync(
          formattedData
        );
        if (status_code === 201) {
          setCurrentStep(3);
          navigate(`/dashboard/courses/manage/${data.id}`);
        }
      }

      // Clear draft data after successful submission
      clearDraftData();
    } catch (error) {
      console.error("Error submitting course:", error);
      // Error handling is done in the mutation hook
    }
  };

  const handleCancel = () => {
    // Show confirmation before clearing draft
    if (
      confirm(
        "هل تريد حقاً إلغاء إنشاء المادة؟ سيتم حذف جميع البيانات المحفوظة."
      )
    ) {
      clearDraftData();
      reset();
      navigate("/dashboard/courses");
    }
  };

  const handleClearDraft = () => {
    if (confirm("هل تريد حذف المسودة المحفوظة وبدء من جديد؟")) {
      clearDraftData();
      reset(getSavedFormData());
      setCurrentStep(1);
      toast.success("تم حذف المسودة بنجاح");
    }
  };

  // Handle course publishing
  const handlePublishCourse = async () => {
    if (!course) return;
    
    try {
      await publishCourseMutation.mutateAsync(course.id);
      // Optionally navigate or refresh data
    } catch (error) {
      console.error("Error publishing course:", error);
    }
  };

  // Handle course unpublishing (back to draft)
  const handleUnpublishCourse = async () => {
    if (!course) return;
    
    if (
      confirm(
        "هل تريد حقاً إرجاع الدورة إلى المسودة؟ سيتم إخفاؤها عن الطلاب."
      )
    ) {
      try {
        await unpublishCourseMutation.mutateAsync(course.id);
        // Optionally navigate or refresh data
      } catch (error) {
        console.error("Error unpublishing course:", error);
      }
    }
  };

  const nextStep = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    const fieldsToValidate = getFieldsForStep(currentStep);
    // When editing, exclude image and video from validation if they're not being changed
    const filteredFields = course
      ? fieldsToValidate.filter((field) => {
          if (field === "image" && !showImageChangeForm && course.image)
            return false;
          if (field === "video" && !showVideoChangeForm && course.preview_video)
            return false;
          return true;
        })
      : fieldsToValidate;

    const isValid = await trigger(filteredFields);

    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number): (keyof ICourseForm)[] => {
    switch (step) {
      case 1:
        return [
          "image",
          "video",
          "title",
          "category",
          "instructor",
          "level",
          "price",
          "discountPrice",
        ];
      case 2:
        return ["description", "shortContent", "skills", "requirements"];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            {course ? (
              <Edit2 className="w-5 h-5 text-blue-600" />
            ) : (
              <Plus className="w-5 h-5 text-blue-600" />
            )}
            <span className="font-medium text-sm lg:text-base">
              {course ? "تعديل المادة التعليمية" : "إنشاء مادة تعليمية جديدة"}
            </span>
          </div>
        </div>
        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
      </div>
      {/* Form */}
      <Card className="p-4 border-0 shadow-sm">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {currentStep === 1 ? (
            <div className="space-y-6">
              {/* الصف الأول: الوسائط */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Image Section */}
                <div>
                  {course && course.image && !showImageChangeForm ? (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">
                        صورة المادة التعليمية
                      </label>
                      <div className="relative group overflow-hidden rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                        <img
                          src={`${origin}${course.image}`}
                          alt="صورة المادة التعليمية"
                          className="w-full h-64 object-contain bg-gray-50 transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          className="absolute top-3 right-3 bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm border border-gray-200"
                          onClick={() => setShowImageChangeForm(true)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          تغيير الصورة
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <FormFields
                        name="image"
                        label="صورة المادة التعليمية"
                        type="file"
                        placeholder="اختر صورة للمادة التعليمية"
                        fileType="image"
                        accept="image/*"
                        maxSize={5}
                        allowedTypes={[
                          "image/jpeg",
                          "image/png",
                          "image/jpg",
                          "image/webp",
                        ]}
                        control={control}
                        errors={errors}
                      />
                      {course && showImageChangeForm && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setShowImageChangeForm(false)}
                          className="mt-2"
                        >
                          <X className="w-4 h-4 mr-1" />
                          إلغاء التغيير
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Course Video Section */}
                <div>
                  {course && course.preview_video && !showVideoChangeForm ? (
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-foreground">
                        فيديو تعريفي للمادة
                      </label>
                      <div className="relative group overflow-hidden rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300">
                        <video
                          src={`${origin}${course.preview_video}`}
                          className="w-full h-64 object-contain bg-gray-50 rounded-lg"
                          controls
                          preload="metadata"
                          poster=""
                        >
                          المتصفح لا يدعم تشغيل الفيديو
                        </video>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 pointer-events-none" />
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          className="absolute top-3 right-3 bg-white/95 hover:bg-white shadow-lg backdrop-blur-sm border border-gray-200"
                          onClick={() => setShowVideoChangeForm(true)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          تغيير الفيديو
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <FormFields
                        name="video"
                        label="فيديو تعريفي للمادة"
                        type="file"
                        placeholder="اختر فيديو تعريفي للمادة"
                        fileType="video"
                        accept="video/*"
                        maxSize={100}
                        allowedTypes={[
                          "video/mp4",
                          "video/avi",
                          "video/mov",
                          "video/wmv",
                        ]}
                        control={control}
                        errors={errors}
                      />
                      {course && showVideoChangeForm && (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setShowVideoChangeForm(false)}
                          className="mt-2"
                        >
                          <X className="w-4 h-4 mr-1" />
                          إلغاء التغيير
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* الصفوف التالية: المعلومات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields
                    name="title"
                    label="عنوان المادة التعليمية"
                    type="text"
                    placeholder="أدخل عنوان المادة التعليمية"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div>
                  {categoriesPending ? (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        الفئة
                      </label>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader className="w-4 h-4" />
                        جارٍ تحميل الفئات...
                      </div>
                    </div>
                  ) : categoriesError ? (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        الفئة
                      </label>
                      <div className="text-sm text-red-500">
                        حدث خطأ في تحميل الفئات
                      </div>
                    </div>
                  ) : (
                    <FormFields
                      name="category"
                      label="الفئة"
                      type="select"
                      placeholder="اختر فئة المادة"
                      options={categories?.data ? categories.data.map((category) => ({
                        label: category.title,
                        value: String(category.id),
                      })) : []}
                      control={control}
                      errors={errors}
                    />
                  )}
                </div>
              </div>

              {/* صف نوع المادة والمدرب والمستوى */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields
                    name="instructor"
                    label="المدرب"
                    type="select"
                    placeholder="اختر المدرب"
                    options={[]}
                    control={control}
                    errors={errors}
                  />
                </div>
                <div>
                  <FormFields
                    name="level"
                    label="مستوى الطالب المطلوب"
                    type="select"
                    placeholder="اختر مستوى الطالب"
                    options={[
                      {
                        label: "مبتدئ",
                        value: CourseLevels.BEGINNER,
                      },
                      {
                        label: "متوسط",
                        value: CourseLevels.INTERMEDIATE,
                      },
                      {
                        label: "متقدم",
                        value: CourseLevels.ADVANCED,
                      },
                    ]}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>

              {/* صف السعر */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields
                    name="price"
                    label="السعر (ريال سعودي)"
                    type="number"
                    placeholder="0"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div>
                  <FormFields
                    name="discountPrice"
                    label="سعر الخصم (ريال سعودي)"
                    type="number"
                    placeholder="0"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          ) : currentStep === 2 ? (
            <div className="space-y-6">
              {/* الصف الأول: الوصف التفصيلي والمحتوى المختصر */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields
                    name="description"
                    label="الوصف التفصيلي للمادة"
                    type="textarea"
                    placeholder="اكتب وصفاً شاملاً للمادة التعليمية وما سيتعلمه الطلاب..."
                    control={control}
                    errors={errors}
                  />
                </div>
                <div>
                  <FormFields
                    name="shortContent"
                    label="المحتوى المختصر"
                    type="textarea"
                    placeholder="ملخص قصير عن محتوى المادة..."
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>

              {/* الصف الثاني: ما ستتعلمه والمتطلبات الأساسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormFields
                    name="skills"
                    label="ما سيتعلمه الطلاب"
                    type="textarea"
                    placeholder="اذكر ما سيتعلمه الطلاب..."
                    control={control}
                    errors={errors}
                  />
                </div>
                <div>
                  <FormFields
                    name="requirements"
                    label="المتطلبات الأساسية"
                    type="textarea"
                    placeholder="اذكر المتطلبات والمعرفة المسبقة المطلوبة..."
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          ) : currentStep === 3 ? (
            <CourseContent />
          ) : null}

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={formLoading}
              >
                إلغاء
              </Button>

              {/* Clear draft button */}
              <Button
                type="button"
                variant="ghost"
                onClick={handleClearDraft}
                disabled={formLoading}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                حذف المسودة
              </Button>

              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={formLoading}
                >
                  السابق
                </Button>
              )}
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse">
              {currentStep < totalSteps ? (
                <div className="flex items-center gap-2">
                  {course && currentStep == 2 && (
                    <Button
                      type="submit"
                      disabled={formLoading}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      حفظ الدورة كمسودة
                      {formLoading && <Loader />}
                    </Button>
                  )}
                  <Button
                    type="button"
                    onClick={(e) => nextStep(e)}
                    disabled={formLoading}
                    className="flex items-center gap-2"
                  >
                    التالي
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {!course && (
                    <Button
                      type="submit"
                      disabled={formLoading}
                      className="flex items-center gap-2"
                    >
                      إنشاء الدورة
                      {formLoading && <Loader />}
                    </Button>
                  )}
                  {course && (
                    <>
                      {course.course_state === "published" ? (
                        <Button 
                          type="button"
                          onClick={handleUnpublishCourse}
                          disabled={unpublishCourseMutation.isPending}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          إرجاع إلى المسودة
                          {unpublishCourseMutation.isPending && <Loader />}
                        </Button>
                      ) : (
                        <Button 
                          type="button"
                          onClick={handlePublishCourse}
                          disabled={publishCourseMutation.isPending}
                          className="flex items-center gap-2"
                        >
                          نشر الدورة
                          {publishCourseMutation.isPending && <Loader />}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CourseForm;
