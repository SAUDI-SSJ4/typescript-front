import { useQuery } from '@tanstack/react-query';
import { EducationalMaterialsAPI } from '@/services/educational-materials-api';
import { useAuthStore } from '@/features/auth/store';
import { UserType } from '@/constants/enums';

export const useEnrolledCourses = () => {
  const { user } = useAuthStore();
  const isStudent = user?.user_type === UserType.STUDENT;
  
  return useQuery({
    queryKey: ['enrolledCourses'],
    queryFn: EducationalMaterialsAPI.getEnrolledCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: isStudent, // Only enable for students
  });
};

export const useCourseProgress = (courseId: string) => {
  const { user } = useAuthStore();
  const isStudent = user?.user_type === UserType.STUDENT;
  
  return useQuery({
    queryKey: ['courseProgress', courseId],
    queryFn: () => EducationalMaterialsAPI.getCourseProgress(courseId),
    enabled: !!courseId && isStudent, // Only enable for students
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useStudentCertificates = () => {
  const { user } = useAuthStore();
  const isStudent = user?.user_type === UserType.STUDENT;
  
  return useQuery({
    queryKey: ['studentCertificates'],
    queryFn: EducationalMaterialsAPI.getStudentCertificates,
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: isStudent, // Only enable for students
  });
};
