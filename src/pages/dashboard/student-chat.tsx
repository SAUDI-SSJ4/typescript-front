import { useState, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import DashboardPageHeader from '@/components/shared/dashboard/DashboardPageHeader';
import ChatSidebar from '@/features/chat/components/ChatSidebar';
import ChatWindow from '@/features/chat/components/ChatWindow';
import AddStudentToChatModal from '@/features/chat/components/AddStudentToChatModal';
import type { ChatConversation, ChatMessage, ChatFilters, SendMessageData } from '@/types/chat';

// Mock data for demonstration
const mockConversations: ChatConversation[] = [
  {
    id: '1',
    studentId: '1',
    studentName: 'أحمد محمد علي',
    studentEmail: 'ahmed.mohammed@example.com',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    unreadCount: 2,
    isOnline: false,
    createdAt: new Date('2024-02-20T10:30:00'),
    updatedAt: new Date('2024-02-23T14:20:00'),
    lastMessage: {
      id: 'msg-1',
      conversationId: '1',
      senderId: '1',
      senderName: 'أحمد محمد علي',
      senderType: 'student',
      content: 'شكراً لك على الشرح الواضح، هل يمكنك مساعدتي في حل هذا التمرين؟',
      timestamp: new Date('2024-02-23T14:20:00'),
      isRead: false,
      messageType: 'text',
    },
  },
  {
    id: '2',
    studentId: '2',
    studentName: 'فاطمة سالم',
    studentEmail: 'fatma.salem@example.com',
    studentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    unreadCount: 0,
    isOnline: false,
    lastSeen: new Date('2024-02-23T12:15:00'),
    createdAt: new Date('2024-02-19T15:45:00'),
    updatedAt: new Date('2024-02-23T10:30:00'),
    lastMessage: {
      id: 'msg-2',
      conversationId: '2',
      senderId: 'academy',
      senderName: 'الأكاديمية',
      senderType: 'academy',
      content: 'ممتاز! أنت تتقدمين بشكل رائع في الدورة',
      timestamp: new Date('2024-02-23T10:30:00'),
      isRead: true,
      messageType: 'text',
    },
  },
  {
    id: '3',
    studentId: '3',
    studentName: 'عمر خالد',
    studentEmail: 'omar.khaled@example.com',
    studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    unreadCount: 1,
    isOnline: false,
    createdAt: new Date('2024-02-22T09:20:00'),
    updatedAt: new Date('2024-02-23T11:45:00'),
    lastMessage: {
      id: 'msg-3',
      conversationId: '3',
      senderId: '3',
      senderName: 'عمر خالد',
      senderType: 'student',
      content: 'متى سيكون الامتحان النهائي؟',
      timestamp: new Date('2024-02-23T11:45:00'),
      isRead: false,
      messageType: 'text',
    },
  },
];

const mockMessages: { [conversationId: string]: ChatMessage[] } = {
  '1': [
    {
      id: 'msg-1-1',
      conversationId: '1',
      senderId: '1',
      senderName: 'أحمد محمد علي',
      senderType: 'student',
      content: 'السلام عليكم، أستاذ',
      timestamp: new Date('2024-02-23T14:00:00'),
      isRead: true,
      messageType: 'text',
    },
    {
      id: 'msg-1-2',
      conversationId: '1',
      senderId: 'academy',
      senderName: 'الأكاديمية',
      senderType: 'academy',
      content: 'وعليكم السلام ورحمة الله وبركاته، أهلاً بك أحمد',
      timestamp: new Date('2024-02-23T14:02:00'),
      isRead: true,
      messageType: 'text',
    },
    {
      id: 'msg-1-3',
      conversationId: '1',
      senderId: '1',
      senderName: 'أحمد محمد علي',
      senderType: 'student',
      content: 'لدي سؤال حول الدرس الأخير عن المتغيرات في JavaScript',
      timestamp: new Date('2024-02-23T14:05:00'),
      isRead: true,
      messageType: 'text',
    },
    {
      id: 'msg-1-4',
      conversationId: '1',
      senderId: 'academy',
      senderName: 'الأكاديمية',
      senderType: 'academy',
      content: 'بالطبع، اسأل عما تريد وسأساعدك',
      timestamp: new Date('2024-02-23T14:07:00'),
      isRead: true,
      messageType: 'text',
    },
    {
      id: 'msg-1-5',
      conversationId: '1',
      senderId: '1',
      senderName: 'أحمد محمد علي',
      senderType: 'student',
      content: 'شكراً لك على الشرح الواضح، هل يمكنك مساعدتي في حل هذا التمرين؟',
      timestamp: new Date('2024-02-23T14:20:00'),
      isRead: false,
      messageType: 'text',
    },
  ],
  '2': [
    {
      id: 'msg-2-1',
      conversationId: '2',
      senderId: '2',
      senderName: 'فاطمة سالم',
      senderType: 'student',
      content: 'صباح الخير أستاذ، انتهيت من المشروع الأول',
      timestamp: new Date('2024-02-23T10:00:00'),
      isRead: true,
      messageType: 'text',
    },
    {
      id: 'msg-2-2',
      conversationId: '2',
      senderId: 'academy',
      senderName: 'الأكاديمية',
      senderType: 'academy',
      content: 'ممتاز! أنت تتقدمين بشكل رائع في الدورة',
      timestamp: new Date('2024-02-23T10:30:00'),
      isRead: true,
      messageType: 'text',
    },
  ],
  '3': [
    {
      id: 'msg-3-1',
      conversationId: '3',
      senderId: '3',
      senderName: 'عمر خالد',
      senderType: 'student',
      content: 'متى سيكون الامتحان النهائي؟',
      timestamp: new Date('2024-02-23T11:45:00'),
      isRead: false,
      messageType: 'text',
    },
  ],
};

function StudentChat() {
  const [conversations, setConversations] = useState<ChatConversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ [conversationId: string]: ChatMessage[] }>(mockMessages);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [filters, setFilters] = useState<ChatFilters>({
    search: '',
    status: 'all',
  });

  // Filter conversations based on search and status
  const filteredConversations = useMemo(() => {
    return conversations.filter(conversation => {
      const matchesSearch = 
        filters.search === '' ||
        conversation.studentName.toLowerCase().includes(filters.search.toLowerCase()) ||
        conversation.studentEmail.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = 
        filters.status === 'all' ||
        (filters.status === 'unread' && conversation.unreadCount > 0) ||
        (filters.status === 'online' && conversation.isOnline);

      return matchesSearch && matchesStatus;
    });
  }, [conversations, filters]);

  const selectedConversation = selectedConversationId 
    ? conversations.find(c => c.id === selectedConversationId) || null
    : null;

  const currentMessages = selectedConversationId 
    ? messages[selectedConversationId] || []
    : [];

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );

    // Mark messages as read
    setMessages(prev => ({
      ...prev,
      [conversationId]: (prev[conversationId] || []).map(msg => ({
        ...msg,
        isRead: true,
      }))
    }));
  };

  const handleSendMessage = (data: SendMessageData) => {
    if (!selectedConversationId) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: 'academy',
      senderName: 'الأكاديمية',
      senderType: 'academy',
      content: data.content,
      timestamp: new Date(),
      isRead: false,
      messageType: data.messageType,
      attachmentUrl: data.attachmentUrl,
      attachmentName: data.attachmentName,
    };

    // Add message to messages
    setMessages(prev => ({
      ...prev,
      [selectedConversationId]: [...(prev[selectedConversationId] || []), newMessage],
    }));

    // Update conversation's last message and timestamp
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              lastMessage: newMessage,
              updatedAt: new Date(),
            }
          : conv
      )
    );
  };

  const handleAddStudent = (studentId: string) => {
    // In a real app, you would make an API call here
    // For now, we'll create a new conversation
    const newConversation: ChatConversation = {
      id: `conv-${Date.now()}`,
      studentId,
      studentName: `طالب ${studentId}`, // In real app, get from student data
      studentEmail: `student${studentId}@example.com`,
      unreadCount: 0,
      isOnline: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setConversations(prev => [newConversation, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newConversation.id]: [],
    }));
  };

  const handleFiltersChange = (newFilters: Partial<ChatFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={MessageCircle}
        title="محادثات الطلاب"
      />
      
      <div className="bg-white rounded-lg border-0 shadow-sm overflow-hidden h-[calc(100vh-12rem)]">
        <div className="flex h-full">
          <ChatSidebar
            conversations={filteredConversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={handleSelectConversation}
            onAddStudent={() => setIsAddStudentModalOpen(true)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
          
          <ChatWindow
            conversation={selectedConversation}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>

      <AddStudentToChatModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        onAddStudent={handleAddStudent}
        existingConversationIds={conversations.map(c => c.studentId)}
      />
    </div>
  );
}

export default StudentChat;