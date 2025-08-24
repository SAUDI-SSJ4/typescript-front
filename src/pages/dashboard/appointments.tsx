import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Routes, Pages } from "@/constants/enums";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { Calendar, Clock, Users, CheckCircle, ChevronLeft, ChevronRight, Plus, Edit, X, Check, AlertTriangle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SimpleAppointment {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'booked' | 'pending';
  participants: number;
  availableDays: string[]; // Days of week: ['sunday', 'monday', etc.]
  endDate: string; // End date for recurring appointments
  studentName?: string; // For booked/pending appointments
  sessionName?: string; // For booked/pending appointments - session title
  bookingReason?: string; // For booked/pending appointments - reason from student
  cancellationReason?: string; // For cancelled appointments
}

interface AppointmentForm {
  startTime: string;
  endTime: string;
  availableDays: string[];
  endDate: string;
  isRecurring: boolean;
}

// Sample simplified data
const initialAppointments: SimpleAppointment[] = [
  // Monday, January 15 - Multiple appointments with different statuses
  {
    id: 1,
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "10:30",
    status: "available",
    participants: 0,
    availableDays: ['monday', 'wednesday', 'friday'],
    endDate: "2024-12-31"
  },
  {
    id: 2,
    date: "2024-01-15",
    startTime: "11:00",
    endTime: "12:30",
    status: "pending",
    participants: 1,
    studentName: "أحمد محمد",
    sessionName: "جلسة استشارية في التطوير المهني",
    bookingReason: "أحتاج استشارة في تطوير مهاراتي البرمجية ورغبتي في الانتقال إلى وظيفة أفضل",
    availableDays: ['monday', 'wednesday'],
    endDate: "2024-06-30"
  },
  {
    id: 3,
    date: "2024-01-15",
    startTime: "14:00",
    endTime: "15:30",
    status: "booked",
    participants: 2,
    studentName: "فاطمة أحمد",
    sessionName: "ورشة تصميم واجهات المستخدم",
    bookingReason: "أعمل في مجال التقنية وأريد تعلم التصميم لتطوير خدماتنا",
    availableDays: ['monday', 'wednesday'],
    endDate: "2024-06-30"
  },
  {
    id: 4,
    date: "2024-01-15",
    startTime: "16:00",
    endTime: "17:00",
    status: "available",
    participants: 0,
    availableDays: ['monday'],
    endDate: "2024-08-31"
  },
  
  // Tuesday, January 16 - Mixed statuses
  {
    id: 5,
    date: "2024-01-16",
    startTime: "15:30",
    endTime: "17:00",
    status: "available",
    participants: 0,
    availableDays: ['tuesday', 'thursday'],
    endDate: "2025-01-01"
  },
  
  // Wednesday, January 17 - Multiple appointments
  {
    id: 6,
    date: "2024-01-17",
    startTime: "09:30",
    endTime: "11:00",
    status: "pending",
    participants: 2,
    studentName: "عبدالله حسن",
    sessionName: "جلسة تطوير الذات وبناء الثقة",
    bookingReason: "أعاني من قلة الثقة بالنفس وأريد مساعدة في تطوير شخصيتي",
    availableDays: ['wednesday', 'friday'],
    endDate: "2024-07-15"
  },
  {
    id: 7,
    date: "2024-01-17",
    startTime: "11:30",
    endTime: "12:30",
    status: "available",
    participants: 0,
    availableDays: ['wednesday'],
    endDate: "2024-11-30"
  },
  {
    id: 8,
    date: "2024-01-17",
    startTime: "14:00",
    endTime: "15:30",
    status: "booked",
    participants: 1,
    studentName: "نور الدين",
    sessionName: "استشارة في ريادة الأعمال",
    bookingReason: "أريد بدء مشروعي الخاص وأحتاج استشارة في بناء خطة عمل مناسبة",
    availableDays: ['wednesday'],
    endDate: "2024-05-20"
  },
  {
    id: 9,
    date: "2024-01-17",
    startTime: "16:00",
    endTime: "17:30",
    status: "pending",
    participants: 1,
    studentName: "ليلى أحمد",
    sessionName: "دورة في التسويق الرقمي",
    bookingReason: "أعمل في شركة صغيرة ونحتاج إلى تعلم التسويق الرقمي لزيادة المبيعات",
    availableDays: ['wednesday'],
    endDate: "2024-10-31"
  }
];

// Stats Component similar to BlogStats
const AppointmentStats = ({ appointments }: { appointments: SimpleAppointment[] }) => {
  const totalAppointments = appointments.length;
  const availableAppointments = appointments.filter(apt => apt.status === 'available').length;
  const bookedAppointments = appointments.filter(apt => apt.status === 'booked').length;
  const pendingAppointments = appointments.filter(apt => apt.status === 'pending').length;
  const totalParticipants = appointments.reduce((sum, apt) => sum + apt.participants, 0);

  const StatCard = ({ title, value, icon, color }: { title: string; value: string | number; icon: React.ReactNode; color: string }) => {
    return (
      <div className="bg-white rounded-lg border-0 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          </div>
          <div className={color}>{icon}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <StatCard
        title="إجمالي المواعيد"
        value={totalAppointments}
        icon={<Calendar className="w-8 h-8" />}
        color="text-blue-600"
      />
      <StatCard
        title="مواعيد متاحة"
        value={availableAppointments}
        icon={<CheckCircle className="w-8 h-8" />}
        color="text-green-600"
      />
      <StatCard
        title="مواعيد محجوزة"
        value={bookedAppointments}
        icon={<Clock className="w-8 h-8" />}
        color="text-orange-600"
      />
      <StatCard
        title="في انتظار الموافقة"
        value={pendingAppointments}
        icon={<AlertTriangle className="w-8 h-8" />}
        color="text-yellow-600"
      />
    </div>
  );
};

// Calendar Component with navigation and modal
const AppointmentCalendar = () => {
  const [appointments, setAppointments] = useState<SimpleAppointment[]>(initialAppointments);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showAppointmentDetailsModal, setShowAppointmentDetailsModal] = useState(false);
  const [actionType, setActionType] = useState<'cancel' | 'approve' | 'reject'>('cancel');
  const [selectedAppointment, setSelectedAppointment] = useState<SimpleAppointment | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [editingAppointment, setEditingAppointment] = useState<SimpleAppointment | null>(null);
  const [appointmentForm, setAppointmentForm] = useState<AppointmentForm>({
    startTime: '',
    endTime: '',
    availableDays: [],
    endDate: '',
    isRecurring: false
  });
  
  // Generate calendar days for current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();
  
  const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  
  const weekDays = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };
  
  const getAppointmentsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return appointments.filter(apt => apt.date === dateStr);
  };
  
  const selectedAppointments = selectedDate ? appointments.filter(apt => apt.date === selectedDate) : [];
  
  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };
  
  const handleAddAppointment = (day?: number) => {
    const dateStr = day 
      ? `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      : '';
    setEditingAppointment(null);
    setAppointmentForm({
      startTime: '',
      endTime: '',
      availableDays: [],
      endDate: dateStr,
      isRecurring: false
    });
    setShowAppointmentModal(true);
  };
  
  const handleSaveAppointment = () => {
    if (appointmentForm.isRecurring) {
      // Create recurring appointments
      const newAppointments: SimpleAppointment[] = [];
      const startDate = new Date(appointmentForm.endDate || selectedDate);
      const endDate = new Date(appointmentForm.endDate);
      
      let currentDate = new Date(startDate);
      let appointmentId = Date.now();
      
      while (currentDate <= endDate) {
        const dayName = dayNames[currentDate.getDay()];
        
        if (appointmentForm.availableDays.includes(dayName)) {
          const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
          
          newAppointments.push({
            id: appointmentId++,
            date: dateStr,
            startTime: appointmentForm.startTime,
            endTime: appointmentForm.endTime,
            status: 'available',
            participants: 0,
            availableDays: appointmentForm.availableDays,
            endDate: appointmentForm.endDate
          });
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      setAppointments(prev => [...prev, ...newAppointments]);
    } else {
      // Create single appointment
      const newAppointment: SimpleAppointment = {
        id: Date.now(),
        date: appointmentForm.endDate || selectedDate,
        startTime: appointmentForm.startTime,
        endTime: appointmentForm.endTime,
        status: 'available',
        participants: 0,
        availableDays: appointmentForm.availableDays,
        endDate: appointmentForm.endDate || appointmentForm.endDate
      };
      setAppointments(prev => [...prev, newAppointment]);
    }
    
    setShowAppointmentModal(false);
    setEditingAppointment(null);
    setAppointmentForm({
      startTime: '',
      endTime: '',
      availableDays: [],
      endDate: '',
      isRecurring: false
    });
  };
  
  const handleDayChange = (day: string, checked: boolean) => {
    setAppointmentForm(prev => ({
      ...prev,
      availableDays: checked 
        ? [...prev.availableDays, day]
        : prev.availableDays.filter(d => d !== day)
    }));
  };
  
  const handleAppointmentAction = (appointment: SimpleAppointment, action: 'cancel' | 'approve' | 'reject') => {
    // For available appointments, cancel immediately without asking for reason
    if (appointment.status === 'available' && action === 'cancel') {
      setAppointments(prev => prev.filter(apt => apt.id !== appointment.id));
      return;
    }
    
    setSelectedAppointment(appointment);
    setActionType(action);
    setActionReason('');
    setShowActionModal(true);
  };
  
  const handleAppointmentClick = (appointment: SimpleAppointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDetailsModal(true);
  };
  
  const handleConfirmAction = () => {
    if (!selectedAppointment) return;
    
    setAppointments(prev => prev.map(apt => {
      if (apt.id === selectedAppointment.id) {
        if (actionType === 'cancel') {
          return { ...apt, status: 'available' as const, participants: 0, studentName: undefined, sessionName: undefined, bookingReason: undefined, cancellationReason: actionReason };
        } else if (actionType === 'approve') {
          return { ...apt, status: 'booked' as const };
        } else if (actionType === 'reject') {
          return { ...apt, status: 'available' as const, participants: 0, studentName: undefined, sessionName: undefined, bookingReason: undefined, cancellationReason: actionReason };
        }
      }
      return apt;
    }));
    
    setShowActionModal(false);
    setSelectedAppointment(null);
    setActionReason('');
  };
  
  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">تقويم المواعيد</h2>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => handleAddAppointment()}
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            إضافة موعد
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="p-2"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <div className="text-xl font-semibold text-gray-900 min-w-[120px] text-center">
            {monthNames[month]} {year}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2 mb-6">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: startingDay }, (_, i) => (
          <div key={`empty-${i}`} className="p-4"></div>
        ))}
        
        {/* Calendar days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayAppointments = getAppointmentsForDate(day);
          const isSelected = selectedDate === dateStr;
          const isToday = day === currentDate.getDate() && month === currentDate.getMonth();
          
          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors min-h-[100px] relative ${
                isSelected
                  ? 'bg-blue-50 border-blue-200'
                  : isToday
                  ? 'bg-gray-100 border-gray-300'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`text-sm font-medium ${
                  isToday ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {day}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddAppointment(day);
                  }}
                  className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-1">
                {dayAppointments.map(apt => (
                  <div
                    key={apt.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAppointmentClick(apt);
                    }}
                    className={`text-xs px-2 py-1 rounded cursor-pointer hover:opacity-80 ${
                      apt.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : apt.status === 'booked'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <div className="font-medium truncate">{apt.startTime}</div>
                    {(apt.status === 'booked' || apt.status === 'pending') && apt.sessionName && (
                      <div className="text-xs opacity-90 truncate mt-1">{apt.sessionName}</div>
                    )}
                    {(apt.status === 'booked' || apt.status === 'pending') && apt.bookingReason && (
                      <div className="text-xs opacity-75 truncate mt-1">"سبب الحجز: {apt.bookingReason.substring(0, 30)}..."</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Appointment Modal */}
      <Dialog open={showAppointmentModal} onOpenChange={setShowAppointmentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              إضافة موعد جديد
            </DialogTitle>
            <DialogDescription>
              أدخل تفاصيل الموعد الجديد
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">وقت البداية</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={appointmentForm.startTime}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="endTime">وقت الانتهاء</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={appointmentForm.endTime}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <Label>نوع الموعد</Label>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="single"
                    checked={!appointmentForm.isRecurring}
                    onCheckedChange={() => setAppointmentForm(prev => ({ ...prev, isRecurring: false, endDate: '', availableDays: [] }))}
                  />
                  <Label htmlFor="single" className="text-sm">
                    موعد واحد
                  </Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="recurring"
                    checked={appointmentForm.isRecurring}
                    onCheckedChange={() => setAppointmentForm(prev => ({ ...prev, isRecurring: true }))}
                  />
                  <Label htmlFor="recurring" className="text-sm">
                    مواعيد متكررة
                  </Label>
                </div>
              </div>
            </div>
            
            {appointmentForm.isRecurring && (
              <>
                <div>
                  <Label>الأيام المتاحة</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {weekDays.map((day, index) => {
                      const dayValue = dayNames[index];
                      const isSelected = appointmentForm.availableDays.includes(dayValue);
                      return (
                        <div key={dayValue} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={dayValue}
                            checked={isSelected}
                            onCheckedChange={(checked) => handleDayChange(dayValue, checked as boolean)}
                          />
                          <Label 
                            htmlFor={dayValue} 
                            className={`text-sm cursor-pointer ${
                              isSelected ? 'text-blue-600 font-medium' : 'text-gray-700'
                            }`}
                          >
                            {day}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="endDate">تاريخ انتهاء المواعيد المتكررة</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={appointmentForm.endDate}
                    onChange={(e) => setAppointmentForm(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                </div>
              </>
            )}
            
            {!appointmentForm.isRecurring && (
              <div>
                <Label htmlFor="singleDate">تاريخ الموعد</Label>
                <Input
                  id="singleDate"
                  type="date"
                  value={appointmentForm.endDate}
                  onChange={(e) => setAppointmentForm(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAppointmentModal(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handleSaveAppointment}>
              إضافة الموعد
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Action Confirmation Modal */}
      <Dialog open={showActionModal} onOpenChange={setShowActionModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'موافقة على الموعد' : 
               actionType === 'reject' ? 'رفض الموعد' : 
               'إلغاء الموعد'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' ? 'هل أنت متأكد من موافقتك على هذا الموعد؟' : 
               'هل أنت متأكد من هذا الإجراء؟'}
            </DialogDescription>
          </DialogHeader>
          
          {(actionType === 'reject' || (actionType === 'cancel' && selectedAppointment?.status === 'booked')) && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">السبب (اختياري)</Label>
                <Textarea
                  id="reason"
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder="اكتب سبب الإلغاء أو الرفض..."
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowActionModal(false)}
            >
              إلغاء
            </Button>
            <Button 
              onClick={handleConfirmAction}
              variant={actionType === 'approve' ? 'default' : 'destructive'}
            >
              {actionType === 'approve' ? 'موافقة' : 
               actionType === 'reject' ? 'رفض' : 
               'إلغاء'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Appointment Details Modal */}
      <Dialog open={showAppointmentDetailsModal} onOpenChange={setShowAppointmentDetailsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              تفاصيل الموعد
            </DialogTitle>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">موعد {selectedAppointment.startTime} - {selectedAppointment.endTime}</h4>
                <div className="space-y-2">
                  {selectedAppointment.sessionName && (
                    <p className="text-sm text-gray-900 font-medium">اسم الجلسة: {selectedAppointment.sessionName}</p>
                  )}
                  {selectedAppointment.studentName && (
                    <p className="text-sm text-gray-600">الطالب: {selectedAppointment.studentName}</p>
                  )}
                  {selectedAppointment.bookingReason && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">سبب الحجز:</p>
                      <p className="text-sm text-gray-600 bg-white p-2 rounded border">{selectedAppointment.bookingReason}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      selectedAppointment.status === 'available' ? 'default' : 
                      selectedAppointment.status === 'booked' ? 'secondary' : 
                      'outline'
                    }>
                      {selectedAppointment.status === 'available' ? 'متاح' : 
                       selectedAppointment.status === 'booked' ? 'محجوز' : 
                       'في الانتظار'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              {/* Action buttons based on status */}
              <div className="flex gap-2">
                {selectedAppointment.status === 'available' && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleAppointmentAction(selectedAppointment, 'cancel');
                      setShowAppointmentDetailsModal(false);
                    }}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    إلغاء الموعد
                  </Button>
                )}
                
                {selectedAppointment.status === 'pending' && (
                  <>
                    <Button
                      variant="default"
                      onClick={() => {
                        handleAppointmentAction(selectedAppointment, 'approve');
                        setShowAppointmentDetailsModal(false);
                      }}
                      className="flex-1"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      موافقة
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleAppointmentAction(selectedAppointment, 'reject');
                        setShowAppointmentDetailsModal(false);
                      }}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      رفض
                    </Button>
                  </>
                )}
                
                {selectedAppointment.status === 'booked' && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleAppointmentAction(selectedAppointment, 'cancel');
                      setShowAppointmentDetailsModal(false);
                    }}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    إلغاء الموعد
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

function AcademyAppointments() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Calendar}
        title="إدارة المواعيد"
        actions={
          <Link 
            to={`${Routes.DASHBOARD}/${Pages.SESSIONS}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
           العودة إلى الجلسات الخصوصية 
          </Link>
        }
      />
      
      <AppointmentStats appointments={initialAppointments} />
      
      <AppointmentCalendar />
    </div>
  );
}

export default AcademyAppointments;