import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Video,
  Users,
  Radio,
  Eye,
  VolumeX,
  Volume2,
  Maximize,
  Settings,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Hand,
  Smile,
  Share2,
  Presentation
} from "lucide-react";
import type { LiveStreamData, StreamStats, EmojiReaction } from "@/types/live-stream";

interface VideoPlayerProps {
  streamData: LiveStreamData;
  streamStats: StreamStats;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onToggleHandRaise: () => void;
  onSendReaction: (emoji: EmojiReaction) => void;
  onShare: () => void;
  isMuted: boolean;
  isFullscreen: boolean;
  isMicOn: boolean;
  isCameraOn: boolean;
  isHandRaised: boolean;
  isWhiteboardOpen: boolean;
  onToggleWhiteboard: () => void;
}

const emojiReactions: EmojiReaction[] = [
  { id: "like", emoji: "👍", label: "إعجاب", category: "reaction" },
  { id: "love", emoji: "❤️", label: "حب", category: "emotion" },
  { id: "laugh", emoji: "😂", label: "ضحك", category: "emotion" },
  { id: "wow", emoji: "😮", label: "إعجاب", category: "reaction" },
  { id: "clap", emoji: "👏", label: "تصفيق", category: "gesture" },
  { id: "think", emoji: "🤔", label: "تفكير", category: "emotion" },
  { id: "fire", emoji: "🔥", label: "رائع", category: "reaction" },
  { id: "party", emoji: "🎉", label: "احتفال", category: "gesture" }
];

export function VideoPlayer({
  streamData,
  streamStats,
  onToggleMute,
  onToggleFullscreen,
  onToggleMic,
  onToggleCamera,
  onToggleHandRaise,
  onSendReaction,
  onShare,
  isMuted,
  isMicOn,
  isCameraOn,
  isHandRaised,
  isWhiteboardOpen,
  onToggleWhiteboard
}: VideoPlayerProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emoji: EmojiReaction) => {
    onSendReaction(emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
      {/* Video Stream */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2 font-noto">البث المباشر</p>
          <p className="text-sm opacity-75 font-noto">
            {streamData.instructor.name}
          </p>
        </div>
      </div>

      {/* Stream Status Overlay */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Badge className="bg-red-600 text-white animate-pulse font-noto">
          <Radio className="w-3 h-3 mr-1" />
          {streamStats.isLive ? 'مباشر الآن' : 'انتهى البث'}
        </Badge>
        <Badge className="bg-black/50 text-white font-noto">
          <Users className="w-3 h-3 mr-1" />
          {streamStats.viewers}
        </Badge>
        <Badge className="bg-black/50 text-white font-noto">
          <Eye className="w-3 h-3 mr-1" />
          {streamStats.duration}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <Button
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg font-noto"
          onClick={onToggleWhiteboard}
          title={isWhiteboardOpen ? "إغلاق السبورة" : "فتح السبورة"}
        >
          <Presentation className="w-4 h-4 mr-1" />
          {isWhiteboardOpen ? 'إغلاق' : 'السبورة'}
        </Button>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Audio Controls */}
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={onToggleMute}
            title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          
          {/* Microphone Control */}
          <Button
            size="sm"
            variant="ghost"
            className={`text-white hover:bg-white/20 ${isMicOn ? 'bg-green-600/50' : 'bg-red-600/50'}`}
            onClick={onToggleMic}
            title={isMicOn ? "إغلاق المايك" : "تشغيل المايك"}
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </Button>
          
          {/* Camera Control */}
          <Button
            size="sm"
            variant="ghost"
            className={`text-white hover:bg-white/20 ${isCameraOn ? 'bg-green-600/50' : 'bg-red-600/50'}`}
            onClick={onToggleCamera}
            title={isCameraOn ? "إغلاق الكاميرا" : "تشغيل الكاميرا"}
          >
            {isCameraOn ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Emoji Reactions */}
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              title="إرسال تفاعل"
            >
              <Smile className="w-4 h-4" />
            </Button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0 bg-white rounded-lg shadow-lg border p-3 grid grid-cols-4 gap-2 z-50">
                {emojiReactions.map((reaction) => (
                  <button
                    key={reaction.id}
                    onClick={() => handleEmojiClick(reaction)}
                    className="text-2xl hover:bg-gray-100 rounded p-2 transition-colors"
                    title={reaction.label}
                  >
                    {reaction.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Raise Hand */}
          <Button
            size="sm"
            variant="ghost"
            className={`text-white hover:bg-white/20 ${isHandRaised ? 'bg-yellow-600/50' : ''}`}
            onClick={onToggleHandRaise}
            title={isHandRaised ? "إنزال اليد" : "رفع اليد"}
          >
            <Hand className={`w-4 h-4 ${isHandRaised ? 'animate-bounce' : ''}`} />
          </Button>
          
          {/* Share */}
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={onShare}
            title="مشاركة البث"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          
          {/* Fullscreen */}
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={onToggleFullscreen}
            title="ملء الشاشة"
          >
            <Maximize className="w-4 h-4" />
          </Button>
          
          {/* Settings */}
          <Button
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white/20"
            title="الإعدادات"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}