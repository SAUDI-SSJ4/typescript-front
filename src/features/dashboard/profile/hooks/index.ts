// Export query hooks (for fetching data)
export {
  useCurrentUserProfile,
  useUserProfile,
  useUserData,
} from "./useUserQueries";

// Export mutation hooks (for modifying data)
export {
  useUpdateUserProfile,
  useUpdateProfilePicture,
  useDeleteProfilePicture,
  useUserMutations,
} from "./useUserMutations";

// Re-export types for convenience
export type {
  UserProfile,
  UpdateUserProfileRequest,
  UpdateProfilePictureRequest,
} from "../services/userService";
