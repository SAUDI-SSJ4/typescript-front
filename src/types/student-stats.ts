export type AnalyticsPeriod = "week" | "month" | "year";

export interface WeeklyDataItem {
  day: string;
  minutes: number;
}

export interface StudyTime {
  total_minutes: number;
  daily_average: number;
  weekly_data: WeeklyDataItem[];
}

export interface Progress {
  lessons_completed: number;
  quizzes_passed: number;
  certificates_earned: number;
  average_quiz_score: number;
}

export interface Engagement {
  login_days: number;
  video_completion_rate: number;
  quiz_participation_rate: number;
  note_taking_frequency: number;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
}

export interface StudentAnalytics {
  period: string;
  study_time: StudyTime;
  progress: Progress;
  engagement: Engagement;
  achievements: Achievement[];
}


