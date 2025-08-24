import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Video, Calendar, Clock, User, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { 
  calculateTimeUntilStream, 
  formatDuration, 
  formatTime, 
  getRelativeDate,
  isSessionLive 
} from "@/lib/live-stream-utils";

interface UpcomingSession {
  id: number;
  title: string;
  type: 'دورة مباشرة' | 'جلسة خاصة';
  instructor: string;
  startTime: string; // ISO date string or time like "15:30"
  date: string; // ISO date string
  duration: number; // in minutes
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'live' | 'starting-soon';
  streamUrl?: string;
}

// Mock data for upcoming sessions - using realistic dates and times
const createMockSessions = (): UpcomingSession[] => {
  const now = new Date();
  const sessions: UpcomingSession[] = [];
  
  // Create a live session (started 10 minutes ago)
  const liveSession = new Date(now.getTime() - 10 * 60 * 1000);
  sessions.push({
    id: 1,
    title: "دورة الذكاء الاصطناعي المتقدمة",
    type: "دورة مباشرة",
    instructor: "د. محمد العتيبي",
    startTime: liveSession.toISOString(),
    date: liveSession.toISOString(),
    duration: 120,
    participants: 28,
    maxParticipants: 30,
    status: "live",
    streamUrl: "/live-stream/ai-course"
  });
  
  // Create a session starting in 5 minutes
  const startingSoon = new Date(now.getTime() + 5 * 60 * 1000);
  sessions.push({
    id: 2,
    title: "جلسة تطوير المهارات البرمجية",
    type: "جلسة خاصة",
    instructor: "أحمد علي",
    startTime: startingSoon.toISOString(),
    date: startingSoon.toISOString(),
    duration: 60,
    participants: 8,
    maxParticipants: 15,
    status: "starting-soon",
    streamUrl: "/live-stream/programming-skills"
  });
  
  // Create a session starting in 3 hours
  const laterToday = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  sessions.push({
    id: 3,
    title: "مقدمة في الذكاء الاصطناعي",
    type: "دورة مباشرة",
    instructor: "فاطمة محمد",
    startTime: laterToday.toISOString(),
    date: laterToday.toISOString(),
    duration: 90,
    participants: 45,
    maxParticipants: 50,
    status: "upcoming",
    streamUrl: "/live-stream/ai-intro"
  });
  
  // Create a session for tomorrow
  const tomorrow = new Date(now.getTime() + 20 * 60 * 60 * 1000);
  sessions.push({
    id: 4,
    title: "أساسيات تصميم قواعد البيانات",
    type: "جلسة خاصة",
    instructor: "عمر حسن",
    startTime: tomorrow.toISOString(),
    date: tomorrow.toISOString(),
    duration: 75,
    participants: 12,
    maxParticipants: 20,
    status: "upcoming",
    streamUrl: "/live-stream/database-design"
  });
  
  return sessions;
};

export function LiveStreamDropdown() {
  const { lang, t } = useLanguage();
  const [sessions, setSessions] = useState<UpcomingSession[]>([]);
  
  // Initialize sessions and update their status based on real time
  useEffect(() => {
    const updateSessions = () => {
      const mockSessions = createMockSessions();
      
      // Update session status based on current time
      const updatedSessions = mockSessions.map(session => {
        const timeData = calculateTimeUntilStream(session.startTime);
        const isLive = isSessionLive(session.startTime, session.duration);
        
        let status: 'upcoming' | 'live' | 'starting-soon' = 'upcoming';
        
        if (isLive) {
          status = 'live';
        } else if (timeData.isStartingSoon) {
          status = 'starting-soon';
        }
        
        return {
          ...session,
          status
        };
      });
      
      setSessions(updatedSessions);
    };
    
    // Update immediately
    updateSessions();
    
    // Update every minute to keep times current
    const interval = setInterval(updateSessions, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Count different session statuses
  const liveSessions = sessions.filter(s => s.status === 'live');
  const startingSoonSessions = sessions.filter(s => s.status === 'starting-soon');
  const upcomingSessions = sessions.filter(s => s.status === 'upcoming');

  // Determine button theme based on session status
  const getButtonTheme = () => {
    if (liveSessions.length > 0) {
      return {
        className: "text-red-600 hover:text-red-700 hover:bg-red-50 animate-pulse",
        title: "بث مباشر نشط"
      };
    } else if (startingSoonSessions.length > 0) {
      return {
        className: "text-orange-600 hover:text-orange-700 hover:bg-orange-50",
        title: "بث قريب"
      };
    } else if (upcomingSessions.length > 0) {
      return {
        className: "text-blue-600 hover:text-blue-700 hover:bg-blue-50",
        title: "بث مجدول"
      };
    }
    return {
      className: "text-gray-600 hover:text-gray-700 hover:bg-gray-50",
      title: "لا توجد جلسات"
    };
  };

  const buttonTheme = getButtonTheme();

  // Get status badge properties - only show for live sessions
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return {
          className: "bg-red-100 text-red-800 border-red-200 animate-pulse",
          text: "مباشر الآن"
        };
      default:
        return null; // Don't show badge for other statuses
    }
  };

  // Get type badge properties
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'جلسة خاصة':
        return {
          className: "bg-purple-100 text-purple-800 border-purple-200",
          text: "جلسة خاصة"
        };
      case 'دورة مباشرة':
        return {
          className: "bg-green-100 text-green-800 border-green-200",
          text: "دورة مباشرة"
        };
      default:
        return {
          className: "bg-gray-100 text-gray-800 border-gray-200",
          text: type
        };
    }
  };

  const SessionItem = ({ session }: { session: UpcomingSession }) => {
    const statusBadge = getStatusBadge(session.status);
    const typeBadge = getTypeBadge(session.type);
    const timeData = calculateTimeUntilStream(session.startTime);
    const formattedTime = formatTime(new Date(session.startTime).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    const formattedDate = getRelativeDate(session.date);
    const formattedDuration = formatDuration(session.duration);

    return (
      <div
        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 mb-3 rounded-lg ${
          session.status === 'live' ? "bg-red-50" : 
          session.status === 'starting-soon' ? "bg-orange-50" : "bg-white border border-gray-100"
        }`}
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
      >
        <div className="space-y-2">
          {/* Title and status */}
          <div className="flex items-start justify-between">
            <h4 className={`text-sm font-medium ${
              session.status === 'live' ? "text-red-900" : 
              session.status === 'starting-soon' ? "text-orange-900" : "text-gray-900"
            }`}>
              {session.title}
            </h4>
            {statusBadge && (
              <Badge className={`text-xs ${statusBadge.className}`}>
                {statusBadge.text}
              </Badge>
            )}
          </div>
          
          {/* Type and instructor */}
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${typeBadge.className}`}>
              {typeBadge.text}
            </Badge>
            <span className="text-xs text-gray-600">
              المدرب: {session.instructor}
            </span>
          </div>

          {/* Session details */}
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>{session.participants}/{session.maxParticipants}</span>
            </div>
            <div>
              <span>{formattedDuration}</span>
            </div>
          </div>

          {/* Time until start and join button */}
          <div className="flex items-center justify-between pt-1">
            <div className={`text-xs font-medium ${
              session.status === 'live' ? "text-red-600" : 
              session.status === 'starting-soon' ? "text-orange-600" : "text-blue-600"
            }`}>
              {timeData.timeString}
            </div>
            
            {/* Join button for live sessions */}
            {session.status === 'live' && session.streamUrl && (
              <Link 
                to={session.streamUrl} 
                target="_blank"
                className="flex items-center gap-1"
              >
                <button className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-md flex items-center gap-1 transition-colors">
                  انضم للبث
                  <ExternalLink className="w-3 h-3" />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Don't render if no sessions
  if (sessions.length === 0) {
    return null;
  }

  return (
    <DropdownMenu dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`relative transition-all duration-200 ${buttonTheme.className}`}
          title={buttonTheme.title}
        >
          <Video className="w-5 h-5" />
          {liveSessions.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg" />
          )}
          {liveSessions.length === 0 && startingSoonSessions.length > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
          )}
          {liveSessions.length === 0 && startingSoonSessions.length === 0 && upcomingSessions.length > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-0 shadow-lg" align="start">
        {/* Header */}
        <div className="p-4 bg-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <h3 className="font-semibold text-gray-900">مواعيد البث المباشر</h3>
        </div>
        
        {/* Sessions List */}
        <div className="max-h-96 overflow-y-auto p-3">
          {sessions.length > 0 ? (
            <div className="space-y-0">
              {/* Live sessions first */}
              {liveSessions.map((session) => (
                <SessionItem key={session.id} session={session} />
              ))}
              {/* Starting soon sessions */}
              {startingSoonSessions.map((session) => (
                <SessionItem key={session.id} session={session} />
              ))}
              {/* Upcoming sessions */}
              {upcomingSessions.map((session) => (
                <SessionItem key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
              <Video className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">لا توجد جلسات حالياً</p>
            </div>
          )}
        </div>
        

      </DropdownMenuContent>
    </DropdownMenu>
  );
}