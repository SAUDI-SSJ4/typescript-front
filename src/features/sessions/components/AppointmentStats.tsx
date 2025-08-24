import { Calendar, Clock, Users, CheckCircle } from "lucide-react";
import type { SessionAppointment } from "@/types/session";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

interface AppointmentStatsProps {
  appointments: SessionAppointment[];
}

function StatCard({ title, value, icon, change, changeType }: StatCardProps) {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${getChangeColor()}`}>
              {change}
            </p>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
}

function AppointmentStats({ appointments }: AppointmentStatsProps) {
  const totalAppointments = appointments.length;
  const availableAppointments = appointments.filter(appointment => appointment.status === 'available').length;
  const bookedAppointments = appointments.filter(appointment => appointment.status === 'booked').length;
  const completedAppointments = appointments.filter(appointment => appointment.status === 'completed').length;
  
  const totalParticipants = appointments.reduce(
    (sum, appointment) => sum + appointment.currentParticipants,
    0
  );

  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    return appointmentDate >= today && (appointment.status === 'available' || appointment.status === 'booked');
  }).length;

  const completionRate = totalAppointments > 0 
    ? Math.round((completedAppointments / totalAppointments) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <StatCard
        title="إجمالي المواعيد"
        value={totalAppointments}
        icon={<Calendar className="h-6 w-6 text-blue-600" />}
        change={`${availableAppointments} متاح`}
        changeType="positive"
      />
      
      <StatCard
        title="المواعيد القادمة"
        value={upcomingAppointments}
        icon={<Clock className="h-6 w-6 text-orange-600" />}
        change={`${bookedAppointments} محجوز`}
        changeType="neutral"
      />
      
      <StatCard
        title="معدل الإنجاز"
        value={`${completionRate}%`}
        icon={<CheckCircle className="h-6 w-6 text-purple-600" />}
        change={`${completedAppointments} مكتمل`}
        changeType={completionRate >= 70 ? "positive" : completionRate >= 50 ? "neutral" : "negative"}
      />
    </div>
  );
}

export default AppointmentStats;