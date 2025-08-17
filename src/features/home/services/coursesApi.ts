import { api } from "@/lib/axios";
import type { Course } from "@/types/couse";

export interface CoursesListResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    courses: Course[];
  };
}

export interface CourseResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: Course;
}

// API service for courses
export const coursesApi = {
  getCourses: async (filters = ""): Promise<CoursesListResponse> => {
    const queryParams = filters.trim() ? `?${filters}` : "";
    const response = await api.get(`public/courses${queryParams}`);
    return response.data;
  },
};
