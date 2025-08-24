export interface Student {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  joinDate: string;
  purchasedCourses: PurchasedCourse[];
  totalPurchases: number;
  coursesProgress: CourseProgress[];
  exams: StudentExam[];
  certificates: StudentCertificate[];
  comments: StudentComment[];
}

export interface PurchasedCourse {
  id: number;
  courseName: string;
  purchaseDate: string;
  price: number;
  category: string;
}

export interface CourseProgress {
  id: number;
  courseName: string;
  completionPercentage: number;
  enrollmentDate: string;
  lastAccessDate: string;
}

export interface StudentExam {
  id: number;
  examName: string;
  courseName: string;
  examType: "quiz" | "midterm" | "final" | "assignment";
  score: number;
  maxScore: number;
  completionDate: string;
}

export interface StudentCertificate {
  id: number;
  courseName: string;
  issueDate: string;
  certificateUrl: string;
}

export interface StudentComment {
  id: number;
  itemName: string; // course, product, or article name
  itemType: "course" | "product" | "article";
  comment: string;
  rating: number;
  commentDate: string;
}

export interface NotificationMessage {
  id?: number;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "announcement";
  priority: "low" | "medium" | "high";
  scheduledDate?: string;
  recipients: number[]; // student IDs
  createdAt?: string;
  status?: "draft" | "sent" | "scheduled";
}

export interface NotificationTemplate {
  id: number;
  name: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "announcement";
}