export interface Workshop {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    image: string;
    bio: string;
    specialization: string;
  };
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  type: 'حضوري' | 'مباشر' | 'مسجل';
  duration: string;
  sessionCount: number;
  startDate: string;
  endDate?: string;
  schedule: {
    dayOfWeek: string;
    time: string;
  }[];
  price: number;
  originalPrice?: number;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  enrolledStudents: number;
  maxStudents: number;
  rating: number;
  reviewsCount: number;
  image: string;
  requirements: string[];
  whatYouWillLearn: string[];
  technologies: string[];
  features: string[];
  materials: string[];
  location?: string;
  isEnrolled: boolean;
  enrollmentDate?: string;
  progress?: number;
  tags: string[];
  certificate: boolean;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkshopSession {
  id: string;
  workshopId: string;
  title: string;
  description: string;
  date: string;
  duration: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
  type: 'lecture' | 'practical' | 'project' | 'review';
  materials: {
    title: string;
    type: 'pdf' | 'video' | 'code' | 'link';
    url: string;
  }[];
  attendance?: boolean;
  recording?: string;
}

export interface WorkshopEnrollment {
  id: string;
  workshopId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  enrollmentDate: string;
  status: 'active' | 'completed' | 'cancelled' | 'refunded';
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded';
  progress: number;
  lastActivity: string;
  certificateIssued: boolean;
  certificateUrl?: string;
}

export interface CreateWorkshopData {
  title: string;
  description: string;
  instructor: {
    name: string;
    image: string;
    bio: string;
    specialization: string;
  };
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  type: 'حضوري' | 'مباشر' | 'مسجل';
  duration: string;
  sessionCount: number;
  startDate: string;
  endDate?: string;
  schedule: {
    dayOfWeek: string;
    time: string;
  }[];
  price: number;
  originalPrice?: number;
  maxStudents: number;
  image: string;
  requirements: string[];
  whatYouWillLearn: string[];
  technologies: string[];
  features: string[];
  materials: string[];
  location?: string;
  tags: string[];
  certificate: boolean;
  language: string;
}

export interface WorkshopFilters {
  category: string;
  level: string;
  type: string;
  status: string;
  priceRange: {
    min: number;
    max: number;
  };
  instructor: string;
  search: string;
}

export interface WorkshopStats {
  totalWorkshops: number;
  activeWorkshops: number;
  totalStudents: number;
  totalRevenue: number;
  avgRating: number;
  completionRate: number;
}