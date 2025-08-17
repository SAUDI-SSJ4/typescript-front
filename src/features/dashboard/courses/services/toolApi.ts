import { api } from "@/lib/axios";
import type { Tool } from "@/types/couse";

// Types for API responses
export interface ToolListResponse {
  status: string;
  status_code: number;
  message: string;
  data: { items: Tool[]; total: number };
}

export interface ToolResponse {
  status: string;
  status_code: number;
  error_type: string | null;
  message: string;
  data: {
    tool: Tool;
  };
}

export interface ToolPayload {
  lessonId: string;
  data: {
    tool_type: "colored_card" | "timeline" | "text";
  };
}

export const toolApi = {
  createTool: async ({
    lessonId,
    data,
  }: ToolPayload): Promise<ToolResponse> => {
    const response = await api.post(`/lessons/${lessonId}/tools`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};
