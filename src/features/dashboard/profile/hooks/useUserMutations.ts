import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  userService,
  type UpdateUserProfileRequest,
  type UpdateProfilePictureRequest,
} from "../services/userService";
import { userKeys } from "@/lib/query-keys";
// import type { User } from "@/types/user";

// Type for API error response
interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Hook for updating user profile
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserProfileRequest) =>
      userService.updateUserProfile(data),
    onSuccess: (updatedProfile: User) => {
      // Update the current user profile in cache
      queryClient.setQueryData(userKeys.currentUser(), updatedProfile);

      // Also update specific profile cache if it exists
      queryClient.setQueryData(
        userKeys.profileById(updatedProfile.id.toString()),
        updatedProfile
      );

      // Invalidate related queries to ensure consistency
      queryClient.invalidateQueries({
        queryKey: userKeys.profile(),
      });

      toast.success("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء تحديث الملف الشخصي";
      toast.error(errorMessage);
      console.error("Profile update error:", error);
    },
  });
};

// Hook for updating profile picture
export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfilePictureRequest) =>
      userService.updateProfilePicture(data),
    onSuccess: (updatedProfile: User) => {
      // Update the current user profile in cache
      queryClient.setQueryData(userKeys.currentUser(), updatedProfile);

      // Also update specific profile cache if it exists
      queryClient.setQueryData(
        userKeys.profileById(updatedProfile.id.toString()),
        updatedProfile
      );

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: userKeys.profile(),
      });

      toast.success("تم تحديث صورة الملف الشخصي بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء تحديث صورة الملف الشخصي";
      toast.error(errorMessage);
      console.error("Profile picture update error:", error);
    },
  });
};

// Hook for deleting profile picture
export const useDeleteProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteProfilePicture,
    onSuccess: (updatedProfile: User) => {
      // Update the current user profile in cache
      queryClient.setQueryData(userKeys.currentUser(), updatedProfile);

      // Also update specific profile cache if it exists
      queryClient.setQueryData(
        userKeys.profileById(updatedProfile.id.toString()),
        updatedProfile
      );

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: userKeys.profile(),
      });

      toast.success("تم حذف صورة الملف الشخصي بنجاح");
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "حدث خطأ أثناء حذف صورة الملف الشخصي";
      toast.error(errorMessage);
      console.error("Profile picture delete error:", error);
    },
  });
};

// Hook that provides all user-related mutations
export const useUserMutations = () => {
  const updateProfile = useUpdateUserProfile();
  const updateProfilePicture = useUpdateProfilePicture();
  const deleteProfilePicture = useDeleteProfilePicture();

  return {
    // Mutations
    updateProfile,
    updateProfilePicture,
    deleteProfilePicture,

    // Mutation states
    isUpdating:
      updateProfile.isPending ||
      updateProfilePicture.isPending ||
      deleteProfilePicture.isPending,
  };
};
