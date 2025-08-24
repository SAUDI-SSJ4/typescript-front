export interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  instructor: {
    name: string;
    image: string;
  };
  type: string;
  category: string;
  insteadOf?: number;
  slug: string;
  videoUrl: string;
  duration: string;
  lessonsCount: number;
  enrolledStudents: number;
  level: string;
  learningPoints?: string[];
  reviews?: Array<{
    name: string;
    rating: number;
    comment: string;
    avatar: string;
  }>;
  // Course delivery types
  deliveryType: 'recorded-online' | 'in-person' | 'live-online' | 'private-session' | 'digital-product' | 'product-bundle';
  // Seat management for live courses
  totalSeats?: number;
  remainingSeats?: number;
  // Availability for private sessions
  isAvailable?: boolean;
}