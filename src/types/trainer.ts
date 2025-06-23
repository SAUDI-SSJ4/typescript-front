export interface Trainer {
  id: number;
  name: string;
  email: string;
  phone: string;
  coursesCount: number;
  image: string;
  specialization?: string;
  rating?: number;
  studentsCount?: number;
  joinDate?: string;
  isActive?: boolean;
}
