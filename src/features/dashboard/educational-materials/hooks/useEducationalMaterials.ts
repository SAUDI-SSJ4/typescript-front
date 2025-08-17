import { useQuery } from '@tanstack/react-query';
import { EducationalMaterialsAPI } from '@/services/educational-materials-api';

export const useEnrolledCourses = () => {
  return useQuery({
    queryKey: ['enrolledCourses'],
    queryFn: EducationalMaterialsAPI.getEnrolledCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCourseProgress = (courseId: string) => {
  return useQuery({
    queryKey: ['courseProgress', courseId],
    queryFn: () => EducationalMaterialsAPI.getCourseProgress(courseId),
    enabled: !!courseId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useStudentCertificates = () => {
  return useQuery({
    queryKey: ['studentCertificates'],
    queryFn: EducationalMaterialsAPI.getStudentCertificates,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
