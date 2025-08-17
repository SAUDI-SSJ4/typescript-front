import { api } from "@/lib/axios";
import type { StudentAnalytics, AnalyticsPeriod } from "@/types/student-stats";

export const studentStatsApi = {
  getAnalytics: async (period: AnalyticsPeriod = "month"): Promise<StudentAnalytics> => {
    try {
      const response = await api.get(`/students/analytics?period=${period}`);
      
      // Validate response data structure
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('Invalid response data structure');
      }
      
      // Ensure required properties exist
      if (!response.data.study_time || !response.data.progress || !response.data.engagement) {
        throw new Error('Missing required analytics properties');
      }
      
      return response.data;
    } catch (error) {
      console.error('Error fetching student analytics:', error);
      
      // Return default data structure on error
      return {
        period: period === "week" ? "أسبوعي" : period === "month" ? "شهري" : "سنوي",
        study_time: {
          total_minutes: 0,
          daily_average: 0,
          weekly_data: [
            { day: "الأحد", minutes: 0 },
            { day: "الاثنين", minutes: 0 },
            { day: "الثلاثاء", minutes: 0 },
            { day: "الأربعاء", minutes: 0 },
            { day: "الخميس", minutes: 0 },
            { day: "الجمعة", minutes: 0 },
            { day: "السبت", minutes: 0 }
          ]
        },
        progress: {
          lessons_completed: 0,
          quizzes_passed: 0,
          certificates_earned: 0,
          average_quiz_score: 0
        },
        engagement: {
          login_days: 0,
          video_completion_rate: 0,
          quiz_participation_rate: 0,
          note_taking_frequency: 0
        },
        achievements: []
      };
    }
  },
};
