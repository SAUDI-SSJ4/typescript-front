export interface Session {
  id: number;
  title: string;
  description: string;
  type: 'فردية' | 'جماعية' | 'ورشة عمل';
  category: string;
  duration: number; // in minutes
  price: number;
  maxParticipants: number;
  instructor: string;
  location: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface SessionAppointment {
  id: number;
  sessionId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'completed' | 'cancelled';
  currentParticipants: number;
  bookedBy?: {
    id: number;
    name: string;
    email: string;
  }[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionWithAppointments extends Session {
  appointments: SessionAppointment[];
}

export interface AppointmentFormData {
  sessionId: number;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface SessionFormData {
  title: string;
  description: string;
  instructor: string;
  duration: number;
  price: number;
  date: string;
  time: string;
  image: string;
}