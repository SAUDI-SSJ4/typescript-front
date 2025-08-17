import { api } from "@/lib/axios";

interface Exam {
  id: string;
  title: string;
  duration_minutes: number;
  questions: {
    type: "single_choice" | "multiple_choice" | "text" | "true_false";
    question_text: string;
    explanation: string;
    options: {
      text: string;
      is_correct?: boolean;
    }[];
    points?: number;
  }[];
  created_at?: string;
  updated_at?: string;
}
export interface ExamListResponse {
  status: string;
  status_code: number;
  message: string;
  data: { items: Exam[]; total: number };
}

export interface ExamResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: {
    Exam: Exam;
  };
}

interface Question {
  type: "single_choice" | "multiple_choice" | "text" | "true_false";
  question_text: string;
  explanation: string;
  options: {
    text: string;
    is_correct?: boolean;
  }[];
  points?: number;
}
export interface ExamPayload {
  title: string;
  duration_minutes: number;
  questions: Question[];
}

export const examApi = {
  createExam: async ({
    lessonId,
    data,
  }: {
    lessonId: string;
    data: ExamPayload;
  }): Promise<ExamResponse> => {
    const response = await api.post(`/lessons/${lessonId}/Exams`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
