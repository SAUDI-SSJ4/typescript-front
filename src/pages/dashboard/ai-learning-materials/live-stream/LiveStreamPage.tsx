import { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Copy,
  Check,

  FileQuestion,
  Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { VideoPlayer, ChatSidebar, ParticipantsPanel, QuizModal } from "@/features/live-stream/components";
import type { 
  LiveStreamData, 
  ChatMessage, 
  StreamParticipant, 
  Quiz, 
  CodingChallenge, 
  EmojiReaction,
  StreamStats
} from "@/types/live-stream";

// Mock data with updated interface structure
const mockStreamData: LiveStreamData = {
  id: "6",
  title: "ورشة تطوير التطبيقات الحديثة",
  description: "ورشة عمل تفاعلية مباشرة حول تطوير التطبيقات الحديثة باستخدام React وNode.js مع التركيز على أفضل الممارسات والأدوات الحديثة",
  instructor: {
    name: "د. أحمد محمد",
    avatar: "/avatars/instructor.jpg",
    bio: "خبير في تطوير التطبيقات الحديثة",
    specialization: "تطوير الويب والتطبيقات"
  },
  currentViewers: 45,
  totalViews: 156,
  duration: "1:23:45",
  status: 'live',
  streamUrl: "https://example.com/stream",
  startTime: "2024-01-30 15:00",
  category: "البرمجة",
  tags: ["React", "Node.js", "JavaScript", "التطوير"],
  likes: 28,
  isLiked: false,
  isRecording: true,
  thumbnailUrl: "/thumbnails/stream-6.jpg",
  settings: {
    allowChat: true,
    allowQuestions: true,
    allowReactions: true,
    autoRecord: true,
    maxViewers: 100
  }
};

const mockCommunityMessages: ChatMessage[] = [
  {
    id: "1",
    username: "سارة أحمد",
    message: "شرح ممتاز! هل يمكن شرح الـ hooks أكثر؟",
    timestamp: "15:32",
    type: 'question'
  },
  {
    id: "2", 
    username: "محمد علي",
    message: "شكراً للمعلومات المفيدة",
    timestamp: "15:30",
    type: 'message'
  },
  {
    id: "3",
    username: "النظام",
    message: "انضم 3 مشاركين جدد للبث",
    timestamp: "15:28",
    type: 'system'
  },
  {
    id: "4",
    username: "د. أحمد محمد",
    message: "سنقوم بشرح الـ hooks في الجزء القادم",
    timestamp: "15:33",
    type: 'message',
    isInstructor: true
  }
];

const mockAIMessages: ChatMessage[] = [
  {
    id: "ai1",
    username: "مساعد البرمجة الذكي",
    message: "مرحباً! أنا هنا لمساعدتك في فهم المفاهيم البرمجية. ما الذي تود معرفته؟",
    timestamp: "15:25",
    type: 'ai-response',
    isAI: true
  },
  {
    id: "ai2",
    username: "أنت",
    message: "ما هي الـ hooks في React؟",
    timestamp: "15:31",
    type: 'message'
  },
  {
    id: "ai3",
    username: "مساعد البرمجة الذكي",
    message: "الـ hooks هي وظائف خاصة في React تسمح لك باستخدام ميزات React مثل الـ state والـ lifecycle methods في المكونات الوظيفية. أشهرها useState و useEffect.",
    timestamp: "15:31",
    type: 'ai-response',
    isAI: true
  }
];

const mockParticipants: StreamParticipant[] = [
  {
    id: "1",
    name: "أحمد محمد",
    avatar: "/api/placeholder/40/40",
    isOnline: true,
    hasMic: false,
    hasCamera: true,
    handRaised: true,
    joinTime: "14:30",
    isMuted: false,
    lastEmoji: "👍",
    emojiTimestamp: "14:35",
    quizStatus: 'completed',
    isPresenting: false,
    lastInteractionTime: "14:35",
    handRaisedTime: "14:34",
    quizCompletedTime: "14:32",
    role: 'student',
    permissions: {
      canSpeak: true,
      canShare: false,
      canModerate: false
    }
  },
  {
    id: "2",
    name: "فاطمة علي",
    avatar: "/api/placeholder/40/40",
    isOnline: true,
    hasMic: true,
    hasCamera: false,
    handRaised: false,
    joinTime: "14:28",
    isMuted: true,
    lastEmoji: "❤️",
    emojiTimestamp: "14:33",
    quizStatus: 'in-progress',
    isPresenting: false,
    lastInteractionTime: "14:33",
    role: 'student',
    permissions: {
      canSpeak: true,
      canShare: false,
      canModerate: false
    }
  }
];

const mockStreamStats: StreamStats = {
  viewers: 45,
  likes: 28,
  duration: "1:23:45",
  isLive: true,
  peakViewers: 67,
  averageWatchTime: "45:30",
  messagesCount: 128,
  questionsCount: 15,
  quizParticipation: 85
};

export default function LiveStreamPage() {
  const { id: _streamId } = useParams();
  const [streamData] = useState<LiveStreamData>(mockStreamData);
  const [participants, setParticipants] = useState<StreamParticipant[]>(mockParticipants);
  const [communityMessages, setCommunityMessages] = useState<ChatMessage[]>(mockCommunityMessages);
  const [aiMessages, setAIMessages] = useState<ChatMessage[]>(mockAIMessages);
  const [streamStats] = useState<StreamStats>(mockStreamStats);
  
  // UI States
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);

  // Handlers for new component system
  const handleSendCommunityMessage = (message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "أنت",
      message: message,
      timestamp: new Date().toLocaleTimeString('ar', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'message'
    };
    setCommunityMessages(prev => [newMessage, ...prev]);
  };

  const handleSendAIMessage = async (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "أنت",
      message: message,
      timestamp: new Date().toLocaleTimeString('ar', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'message'
    };
    
    setAIMessages(prev => [userMessage, ...prev]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        username: "مساعد البرمجة الذكي",
        message: "شكراً لسؤالك! هذا سؤال ممتاز. دعني أوضح لك هذا المفهوم بطريقة بسيطة...",
        timestamp: new Date().toLocaleTimeString('ar', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        type: 'ai-response',
        isAI: true
      };
      setAIMessages(prev => [aiResponse, ...prev]);
    }, 1500);
  };

  const handleSendQuiz = (quiz: Quiz) => {
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "النظام",
      message: `📝 تم إطلاق "${quiz.title}" - ${quiz.questions.length} سؤال - مدة: ${quiz.timeLimit} دقيقة`,
      timestamp: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    
    setCommunityMessages(prev => [systemMessage, ...prev]);
  };

  const handleSendCodingChallenge = (challenge: CodingChallenge) => {
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "النظام",
      message: `💻 تحدي برمجي: "${challenge.title}" - مستوى: ${challenge.difficulty}`,
      timestamp: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    
    setCommunityMessages(prev => [systemMessage, ...prev]);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleToggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const handleToggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };

  const handleToggleHandRaise = () => {
    setIsHandRaised(!isHandRaised);
  };

  const handleSendReaction = (emoji: EmojiReaction) => {
    const message: ChatMessage = {
      id: Date.now().toString(),
      username: "أنت",
      message: `${emoji.emoji} ${emoji.label}`,
      timestamp: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
      type: 'message'
    };
    setCommunityMessages(prev => [message, ...prev]);
  };

  const handleShare = () => {
    setIsShareDialogOpen(true);
  };

  const handleToggleWhiteboard = () => {
    setIsWhiteboardOpen(!isWhiteboardOpen);
  };

  const handleToggleParticipantMic = (participantId: string) => {
    setParticipants(prev => prev.map(participant => 
      participant.id === participantId 
        ? { ...participant, hasMic: !participant.hasMic }
        : participant
    ));
  };

  const handleToggleParticipantCamera = (participantId: string) => {
    setParticipants(prev => prev.map(participant => 
      participant.id === participantId 
        ? { ...participant, hasCamera: !participant.hasCamera }
        : participant
    ));
  };

  const handleClearHandRaise = (participantId: string) => {
    setParticipants(prev => prev.map(participant => 
      participant.id === participantId 
        ? { ...participant, handRaised: false }
        : participant
    ));
  };

  const handleGrantPermission = (participantId: string, permission: keyof StreamParticipant['permissions']) => {
    setParticipants(prev => prev.map(participant => 
      participant.id === participantId 
        ? { 
            ...participant, 
            permissions: {
              ...participant.permissions,
              [permission]: !participant.permissions[permission]
            }
          }
        : participant
    ));
  };

  const copyStreamLink = () => {
    const streamLink = `https://app.example.com/stream/${streamData.id}`;
    navigator.clipboard.writeText(streamLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Video}
        title={streamData.title}
        actions={
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setIsQuizModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 font-noto"
            >
              <FileQuestion className="w-4 h-4 mr-2" />
              إرسال اختبار
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video Player Section */}
        <div className="lg:col-span-2">
          <VideoPlayer
            streamData={streamData}
            streamStats={streamStats}
            onToggleMute={handleToggleMute}
            onToggleFullscreen={handleToggleFullscreen}
            onToggleMic={handleToggleMic}
            onToggleCamera={handleToggleCamera}
            onToggleHandRaise={handleToggleHandRaise}
            onSendReaction={handleSendReaction}
            onShare={handleShare}
            isMuted={isMuted}
            isFullscreen={isFullscreen}
            isMicOn={isMicOn}
            isCameraOn={isCameraOn}
            isHandRaised={isHandRaised}
            isWhiteboardOpen={isWhiteboardOpen}
            onToggleWhiteboard={handleToggleWhiteboard}
          />
        </div>

        {/* Chat Sidebar */}
        <div className="lg:col-span-1">
          <ChatSidebar
            communityMessages={communityMessages}
            aiMessages={aiMessages}
            onSendCommunityMessage={handleSendCommunityMessage}
            onSendAIMessage={handleSendAIMessage}
          />
        </div>

        {/* Participants Panel */}
        <div className="lg:col-span-1">
          <ParticipantsPanel
            participants={participants}
            onToggleParticipantMic={handleToggleParticipantMic}
            onToggleParticipantCamera={handleToggleParticipantCamera}
            onClearHandRaise={handleClearHandRaise}
            onGrantPermission={handleGrantPermission}
            showControls={false}
          />
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-noto">مشاركة البث المباشر</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2 font-noto">رابط البث:</p>
              <div className="flex gap-2">
                <code className="flex-1 p-2 bg-white border rounded text-sm">
                  https://app.example.com/stream/{streamData.id}
                </code>
                <Button
                  size="sm"
                  onClick={copyStreamLink}
                  className={linkCopied ? "bg-green-600" : ""}
                >
                  {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quiz Modal */}
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onSendQuiz={handleSendQuiz}
        onSendCodingChallenge={handleSendCodingChallenge}
      />
    </div>
  );
}