export interface StudentQuestion {
  id: string;
  studentName: string;
  studentEmail: string;
  courseName: string;
  lessonName: string;
  question: string;
  aiResponse: string;
  createdAt: Date;
  isAnswered: boolean;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface StudentQuestionFilters {
  search: string;
  course: string;
  student: string;
  dateFrom?: Date;
  dateTo?: Date;
  isAnswered?: boolean;
}