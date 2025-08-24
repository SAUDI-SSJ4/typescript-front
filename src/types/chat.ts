export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderType: 'academy' | 'student';
  content: string;
  timestamp: Date;
  isRead: boolean;
  messageType: 'text' | 'image' | 'file';
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface ChatConversation {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar?: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  isOnline: boolean;
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatFilters {
  search: string;
  status: 'all' | 'unread' | 'online';
}

export interface SendMessageData {
  content: string;
  messageType: 'text' | 'image' | 'file';
  attachmentUrl?: string;
  attachmentName?: string;
}