import { UserType } from "@/constants/enums";
import StatisticsCards from "@/features/dashboard/components/StatisticsCards";
import StudentDashboard from "@/features/dashboard/components/StudentDashboard";
import AcademyDashboard from "@/features/dashboard/components/AcademyDashboard";

const userType = UserType.ACADEMY;

function Dashboard() {
  return (
    <div className="space-y-6">
      <StatisticsCards userType={userType} />
      {userType === UserType.ACADEMY ? (
        <AcademyDashboard />
      ) : (
        <StudentDashboard />
      )}
    </div>
  );
}

export default Dashboard;
