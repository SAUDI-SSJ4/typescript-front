import { api } from "@/lib/axios";
import type { Lesson } from "@/types/couse";

// Types for API responses
export interface LessonsListResponse {
  status: string;
  status_code: number;
  message: string;
  data: { items: Lesson[]; total: number };
}

export interface LessonResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: {
    lesson: Lesson;
  };
}

// Type for lesson creation payload
export interface LessonPayload {
  sectionId: string;
  data: FormData;
}

// Type for lesson update payload
export interface LessonUpdatePayload {
  lessonId: string;
  data: FormData;
}

// API service for lessons
export const lessonsApi = {
  // Get all lessons for a section
  getLessonsBySection: async (
    sectionId: string
  ): Promise<LessonsListResponse> => {
    const response = await api.get(`/academy/chapters/${sectionId}/lessons`);
    return response.data;
  },

  // Get all lessons for a course
  getLessonsByCourse: async (
    courseId: string
  ): Promise<LessonsListResponse> => {
    const response = await api.get(`/academy/courses/${courseId}/lessons`);
    return response.data;
  },

  // Get single lesson by ID
  getLesson: async (id: string): Promise<LessonResponse> => {
    const response = await api.get(`/academy/lessons/${id}`);
    return response.data;
  },

  // Create new lesson
  createLesson: async ({
    sectionId,
    data,
  }: LessonPayload): Promise<LessonResponse> => {
    const response = await api.post(`/lessons/${sectionId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update existing lesson
  updateLesson: async ({
    lessonId,
    data,
  }: LessonUpdatePayload): Promise<LessonResponse> => {
    const response = await api.put(`/lessons/${lessonId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete lesson
  deleteLesson: async (id: string): Promise<LessonResponse> => {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  },

  getVideoLesson: async (video_id: string): Promise<Blob> => {
    const response = await api.get(`/videos/watch-direct/${video_id}`, {
      responseType: "blob",
    });
    return response.data;
  },
  uploadVideoLesson: async (
    lessonId: string,
    data: FormData
  ): Promise<LessonResponse> => {
    const response = await api.post(`/lessons/${lessonId}/video`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};
