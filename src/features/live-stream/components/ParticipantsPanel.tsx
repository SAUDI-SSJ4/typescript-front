import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Hand,
  UserCheck,
  Monitor,
  Filter,
  Clock
} from "lucide-react";
import type { StreamParticipant } from "@/types/live-stream";

interface ParticipantsPanelProps {
  participants: StreamParticipant[];
  onToggleParticipantMic: (participantId: string) => void;
  onToggleParticipantCamera: (participantId: string) => void;
  onClearHandRaise: (participantId: string) => void;
  onGrantPermission: (participantId: string, permission: keyof StreamParticipant['permissions']) => void;
  showControls?: boolean;
}

export function ParticipantsPanel({
  participants,
  onToggleParticipantMic,
  onToggleParticipantCamera,
  onClearHandRaise,
  showControls = false
}: ParticipantsPanelProps) {
  const [sortBy, setSortBy] = useState<string>("join-time");
  const [filterBy, setFilterBy] = useState<string>("all");

  const onlineParticipants = participants.filter(p => p.isOnline);

  const getSortedParticipants = () => {
    let filtered = onlineParticipants;

    // Apply filters
    switch (filterBy) {
      case 'hand-raised':
        filtered = filtered.filter(p => p.handRaised);
        break;
      case 'mic-on':
        filtered = filtered.filter(p => p.hasMic && !p.isMuted);
        break;
      case 'camera-on':
        filtered = filtered.filter(p => p.hasCamera);
        break;
      case 'quiz-completed':
        filtered = filtered.filter(p => p.quizStatus === 'completed');
        break;
      case 'instructors':
        filtered = filtered.filter(p => p.role === 'instructor');
        break;
      default:
        break;
    }

    // Apply sorting
    switch (sortBy) {
      case 'last-interaction':
        return filtered.sort((a, b) => {
          const timeA = a.lastInteractionTime || a.joinTime;
          const timeB = b.lastInteractionTime || b.joinTime;
          return timeB.localeCompare(timeA);
        });
      
      case 'hand-raised':
        return filtered.sort((a, b) => {
          if (a.handRaised && !b.handRaised) return -1;
          if (!a.handRaised && b.handRaised) return 1;
          if (a.handRaised && b.handRaised) {
            const timeA = a.handRaisedTime || a.joinTime;
            const timeB = b.handRaisedTime || b.joinTime;
            return timeA.localeCompare(timeB);
          }
          return 0;
        });
      
      case 'quiz-completed':
        return filtered.sort((a, b) => {
          if (a.quizStatus === 'completed' && b.quizStatus !== 'completed') return -1;
          if (a.quizStatus !== 'completed' && b.quizStatus === 'completed') return 1;
          if (a.quizStatus === 'completed' && b.quizStatus === 'completed') {
            const timeA = a.quizCompletedTime || a.joinTime;
            const timeB = b.quizCompletedTime || b.joinTime;
            return timeA.localeCompare(timeB);
          }
          return 0;
        });
      
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
      
      case 'join-time':
      default:
        return filtered.sort((a, b) => a.joinTime.localeCompare(b.joinTime));
    }
  };

  const getQuizStatusColor = (status: StreamParticipant['quizStatus']) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'not-started': return 'bg-gray-400';
      case 'not-participating': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getQuizStatusLabel = (status: StreamParticipant['quizStatus']) => {
    switch (status) {
      case 'completed': return 'مكتمل';
      case 'in-progress': return 'جاري';
      case 'not-started': return 'لم يبدأ';
      case 'not-participating': return 'غير مشارك';
      default: return 'غير محدد';
    }
  };

  const getRoleIcon = (role: StreamParticipant['role']) => {
    switch (role) {
      case 'instructor': return '👨‍🏫';
      case 'moderator': return '🛡️';
      case 'student': return '👨‍🎓';
      default: return '👤';
    }
  };

  const sortedParticipants = getSortedParticipants();

  return (
    <div className="bg-white rounded-lg border-0 shadow-sm h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 font-noto flex items-center gap-2">
            <Users className="w-5 h-5" />
            المشاركون
          </h3>
          <Badge variant="outline" className="text-xs">
            {onlineParticipants.length} متصل
          </Badge>
        </div>

        {/* Filters and Sorting */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="h-8 text-sm font-noto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المشاركين</SelectItem>
                <SelectItem value="hand-raised">رافعين اليد</SelectItem>
                <SelectItem value="mic-on">المايك مفتوح</SelectItem>
                <SelectItem value="camera-on">الكاميرا مفتوحة</SelectItem>
                <SelectItem value="quiz-completed">أكملوا الاختبار</SelectItem>
                <SelectItem value="instructors">المدربين</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-8 text-sm font-noto">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="join-time">وقت الانضمام</SelectItem>
                <SelectItem value="last-interaction">آخر تفاعل</SelectItem>
                <SelectItem value="hand-raised">رفع اليد أولاً</SelectItem>
                <SelectItem value="quiz-completed">إكمال الاختبار</SelectItem>
                <SelectItem value="name">الاسم أبجدياً</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Participants List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {sortedParticipants.length > 0 ? (
            sortedParticipants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback className="text-sm">
                      {participant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Status Indicators */}
                  <div className="absolute -top-1 -right-1 flex gap-1">
                    {participant.handRaised && (
                      <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
                        <Hand className="w-2 h-2 text-white" />
                      </div>
                    )}
                    {participant.isPresenting && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <Monitor className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Quiz Status */}
                  <div className="absolute -bottom-1 -right-1">
                    <div 
                      className={`w-3 h-3 rounded-full ${getQuizStatusColor(participant.quizStatus)}`}
                      title={`اختبار: ${getQuizStatusLabel(participant.quizStatus)}`}
                    />
                  </div>
                </div>

                {/* Participant Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 font-noto truncate">
                      {participant.name}
                    </p>
                    <span className="text-lg" title={participant.role}>
                      {getRoleIcon(participant.role)}
                    </span>
                    {participant.role === 'instructor' && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        مدرب
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500 font-noto">
                      انضم: {participant.joinTime}
                    </span>
                    
                    {/* Status Icons */}
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${
                        participant.isMuted || !participant.hasMic ? 'bg-red-500' : 'bg-green-500'
                      }`} title={participant.isMuted || !participant.hasMic ? 'مكتوم' : 'مايك مفتوح'} />
                      
                      <div className={`w-3 h-3 rounded-full ${
                        participant.hasCamera ? 'bg-green-500' : 'bg-gray-400'
                      }`} title={participant.hasCamera ? 'كاميرا مفتوحة' : 'كاميرا مغلقة'} />
                    </div>
                  </div>

                  {/* Last Emoji */}
                  {participant.lastEmoji && participant.emojiTimestamp && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm">{participant.lastEmoji}</span>
                      <span className="text-xs text-gray-400">{participant.emojiTimestamp}</span>
                    </div>
                  )}
                </div>

                {/* Controls (for instructors) */}
                {showControls && (
                  <div className="flex items-center gap-1">
                    {/* Mic Control */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onToggleParticipantMic(participant.id)}
                      className="h-7 w-7 p-0"
                      title={participant.isMuted ? 'إلغاء الكتم' : 'كتم'}
                    >
                      {participant.isMuted || !participant.hasMic ? 
                        <MicOff className="w-3 h-3 text-red-600" /> : 
                        <Mic className="w-3 h-3 text-green-600" />
                      }
                    </Button>

                    {/* Camera Control */}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onToggleParticipantCamera(participant.id)}
                      className="h-7 w-7 p-0"
                      title="تشغيل/إيقاف الكاميرا"
                    >
                      {participant.hasCamera ? 
                        <Camera className="w-3 h-3 text-green-600" /> : 
                        <CameraOff className="w-3 h-3 text-gray-600" />
                      }
                    </Button>

                    {/* Clear Hand */}
                    {participant.handRaised && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onClearHandRaise(participant.id)}
                        className="h-7 w-7 p-0"
                        title="إزالة رفع اليد"
                      >
                        <UserCheck className="w-3 h-3 text-yellow-600" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-noto">لا يوجد مشاركون</p>
              <p className="font-noto text-sm mt-1">
                {filterBy === 'all' ? 'لا يوجد مشاركون متصلون' : 'لا توجد نتائج للفلتر المحدد'}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}