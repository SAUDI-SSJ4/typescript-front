export interface LiveStreamData {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
    bio: string;
    specialization: string;
  };
  currentViewers: number;
  totalViews: number;
  duration: string;
  status: 'live' | 'ended' | 'scheduled';
  streamUrl: string;
  startTime: string;
  endTime?: string;
  category: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
  isRecording: boolean;
  recordingUrl?: string;
  thumbnailUrl: string;
  settings: {
    allowChat: boolean;
    allowQuestions: boolean;
    allowReactions: boolean;
    autoRecord: boolean;
    maxViewers: number;
  };
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  type: 'message' | 'question' | 'system' | 'ai-response';
  avatar?: string;
  isAI?: boolean;
  isInstructor?: boolean;
  isPinned?: boolean;
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

export interface StreamParticipant {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  hasMic: boolean;
  hasCamera: boolean;
  handRaised: boolean;
  joinTime: string;
  isMuted: boolean;
  lastEmoji?: string;
  emojiTimestamp?: string;
  quizStatus: 'not-started' | 'in-progress' | 'completed' | 'not-participating';
  isPresenting: boolean;
  lastInteractionTime?: string;
  handRaisedTime?: string;
  quizCompletedTime?: string;
  role: 'student' | 'instructor' | 'moderator';
  permissions: {
    canSpeak: boolean;
    canShare: boolean;
    canModerate: boolean;
  };
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'coding' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation?: string;
  code?: string;
  expectedOutput?: string;
  points: number;
  timeLimit?: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  type: 'multiple-choice' | 'coding' | 'mixed';
  timeLimit: number;
  questions: QuizQuestion[];
  isActive: boolean;
  startTime?: string;
  endTime?: string;
  results?: {
    participantId: string;
    score: number;
    answers: (string | number)[];
    completedAt: string;
  }[];
}

export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  expectedOutput: string;
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
  }[];
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  timeLimit?: number;
}

export interface EmojiReaction {
  id: string;
  emoji: string;
  label: string;
  category: 'emotion' | 'reaction' | 'gesture';
}

export interface BoardContent {
  id: string;
  type: 'concept' | 'diagram' | 'code' | 'formula' | 'note';
  title: string;
  content: string;
  timestamp: string;
  teacherText: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  style: {
    backgroundColor: string;
    textColor: string;
    fontSize: number;
    fontWeight: 'normal' | 'bold';
  };
}

export interface WhiteboardDrawing {
  id: string;
  strokes: {
    points: { x: number; y: number }[];
    color: string;
    width: number;
    tool: 'pen' | 'highlighter' | 'eraser';
  }[];
  timestamp: string;
  author: string;
}

export interface StreamStats {
  viewers: number;
  likes: number;
  duration: string;
  isLive: boolean;
  peakViewers: number;
  averageWatchTime: string;
  messagesCount: number;
  questionsCount: number;
  quizParticipation: number;
}

export interface StreamSettings {
  video: {
    resolution: '720p' | '1080p' | '4k';
    frameRate: 30 | 60;
    bitrate: number;
  };
  audio: {
    quality: 'standard' | 'high' | 'studio';
    noiseReduction: boolean;
  };
  streaming: {
    platform: 'internal' | 'youtube' | 'facebook' | 'multiple';
    privacy: 'public' | 'unlisted' | 'private';
    chatModeration: boolean;
    recordAutomatically: boolean;
  };
  interaction: {
    allowQuestions: boolean;
    allowReactions: boolean;
    allowScreenSharing: boolean;
    maxParticipants: number;
  };
}

export interface CreateStreamData {
  title: string;
  description: string;
  category: string;
  tags: string[];
  scheduledTime?: string;
  thumbnailUrl?: string;
  settings: StreamSettings;
}