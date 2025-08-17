import { UnifiedStudentStatsPage } from "@/features/dashboard/student-stats/components/UnifiedStudentStatsPage";
import { StudentStatsErrorBoundary } from "@/features/dashboard/student-stats/components/StudentStatsErrorBoundary";

export default function StudentStatisticsPage() {
  return (
    <StudentStatsErrorBoundary>
      <UnifiedStudentStatsPage />
    </StudentStatsErrorBoundary>
  );
}
