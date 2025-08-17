import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sectionsApi, type SectionResponse } from "../services/sectionsApi";
import { queryKeys } from "@/lib/query-keys";

// Type for API error response
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Type for section creation payload
export interface SectionPayload {
  courseId: string;
  data: FormData;
}

// Type for section update payload
export interface SectionUpdatePayload {
  sectionId: string;
  data:
    | FormData
    | {
        title: string;
      };
}

// Hook for creating a new section
export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionData: SectionPayload) =>
      sectionsApi.createSection(sectionData),
    onSuccess: (response: SectionResponse) => {
      // Invalidate all sections-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.all,
      });

      // Also invalidate course-specific sections if we have course_id
      if (response.data.course_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.sections.byCourse(response.data.course_id),
        });
      }

      toast.success(response.message || "تم إنشاء القسم بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء إنشاء القسم";
      toast.error(errorMessage);
      console.error("Error creating section:", error);
    },
  });
};

// Hook for updating an existing section
export const useUpdateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, data }: SectionUpdatePayload) =>
      sectionsApi.updateSection({ sectionId, data }),
    onSuccess: (response: SectionResponse) => {
      // Invalidate all sections-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.all,
      });

      // Also invalidate course-specific sections
      if (response.data.course_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.sections.byCourse(response.data.course_id),
        });
      }

      // Invalidate the specific section query
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.detail(String(response.data.id)),
      });

      toast.success(response.message || "تم تحديث القسم بنجاح!");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء تحديث القسم";
      toast.error(errorMessage);
      console.error("Error updating section:", error);
    },
  });
};

// Hook for deleting a section
export const useDeleteSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionId: string) => sectionsApi.deleteSection(sectionId),
    onSuccess: () => {
      // Invalidate all sections queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.all,
      });

      toast.success("تم حذف القسم بنجاح!");
    },
    onError: (error: ApiError) => {
      // Revert optimistic updates on error by invalidating queries
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.all,
      });

      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء حذف القسم";
      toast.error(errorMessage);
      console.error("Error deleting section:", error);
    },
  });
};

// Hook for toggling section publish status
export const useToggleSectionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      sectionsApi.toggleSectionStatus(id, isPublished),
    onSuccess: (response: SectionResponse) => {
      // Invalidate all sections-related queries to ensure freshness
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.all,
      });

      // Also invalidate course-specific sections
      if (response.data.course_id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.sections.byCourse(response.data.course_id),
        });
      }

      // Invalidate the specific section query
      queryClient.invalidateQueries({
        queryKey: queryKeys.sections.detail(String(response.data.id)),
      });

      const statusText = response.data.is_published ? "نشر" : "إخفاء";
      toast.success(response.message || `تم ${statusText} القسم بنجاح!`);
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error?.response?.data?.message || "حدث خطأ أثناء تغيير حالة النشر";
      toast.error(errorMessage);
      console.error("Error toggling section status:", error);
    },
  });
};
