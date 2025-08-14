import { api } from "@/lib/axios";
import { appendFormData } from "@/lib/formdata";
import type { Category, Course } from "@/types/couse";

// Types for API requests
export interface CoursePayload {
  category_id: string;
  trainer_id?: string;
  title: string;
  content: string;
  short_content: string;
  price: string;
  discount_price: string;
  type?: string;
  level: string;
  featured?: boolean;
  image: File | null;
  discount_ends_at?: string;
  preview_video: File | null;
  learning_outcomes: string;
  requirements: string;
}

// Types for API responses

export interface CoursesListResponse {
  status: string;
  status_code: number;
  message: string;
  data: {
    courses: Course[];
  };
}

export interface CategoriesListResponse {
  status: string;
  status_code: number;
  message: string;
  data: Category[];
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
  getCourses: async (): Promise<CoursesListResponse> => {
    const response = await api.get("/academy/courses");
    return response.data;
  },
  getCategories: async (): Promise<CategoriesListResponse> => {
    const response = await api.get("/categories");
    return response.data;
  },

  // Get single course by ID
  getCourse: async (id: string): Promise<CourseResponse> => {
    const response = await api.get(`/academy/courses/${id}`);
    return response.data;
  },

  // Create new course
  createCourse: async (courseData: CoursePayload): Promise<CourseResponse> => {
    // Create FormData for file uploads
    const formData = new FormData();
    appendFormData(formData, {
      ...courseData,
    });

    const response = await api.post("/academy/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Update existing course
  updateCourse: async (
    id: string,
    courseData: Partial<CoursePayload>
  ): Promise<CourseResponse> => {
    // Create FormData for file uploads if needed
    const formData = new FormData();
    appendFormData(formData, courseData);

    const response = await api.put(`/academy/courses/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  // Delete course
  deleteCourse: async (id: string): Promise<void> => {
    await api.delete(`/academy/courses/${id}`);
  },

  // Publish course
  publishCourse: async (id: string): Promise<CourseResponse> => {
    const response = await api.patch(`/academy/courses/${id}/publish`);
    return response.data;
  },

  // Unpublish course (back to draft)
  unpublishCourse: async (id: string): Promise<CourseResponse> => {
    const response = await api.patch(`/academy/courses/${id}/unpublish`);
    return response.data;
  },
};
