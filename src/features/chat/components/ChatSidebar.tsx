import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { ChatConversation, ChatFilters } from '@/types/chat';

interface ChatSidebarProps {
  conversations: ChatConversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onAddStudent: () => void;
  filters: ChatFilters;
  onFiltersChange: (filters: Partial<ChatFilters>) => void;
}

function ChatSidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onAddStudent,
  filters,
  onFiltersChange,
}: ChatSidebarProps) {
  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  const formatMessageTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 text-right">محادثات الطلاب</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={onAddStudent}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 ml-1" />
            إضافة طالب
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث في المحادثات..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="pr-10"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-center p-6">
              <p className="text-lg font-medium mb-2">لا توجد محادثات</p>
              <p className="text-sm text-gray-400 mb-4">ابدأ محادثة جديدة مع الطلاب</p>
              <Button onClick={onAddStudent} className="text-blue-600 border-blue-200 hover:bg-blue-50" variant="outline">
                <Plus className="w-4 h-4 ml-1" />
                إضافة طالب
              </Button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversationId === conversation.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <img
                    src={conversation.studentAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.studentName)}&background=3b82f6&color=fff&size=48`}
                    alt={conversation.studentName}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.studentName)}&background=3b82f6&color=fff&size=48`;
                    }}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900 text-right truncate">
                        {conversation.studentName}
                      </h3>
                      <div className="flex items-center gap-2">
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="bg-red-500 text-white">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                        {conversation.lastMessage && (
                          <span className="text-xs text-gray-500">
                            {formatMessageTime(conversation.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                    </div>

                    {conversation.lastMessage ? (
                      <p className="text-sm text-gray-600 text-right truncate">
                        {conversation.lastMessage.senderType === 'academy' ? 'أنت: ' : ''}
                        {conversation.lastMessage.content}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 text-right">لا توجد رسائل</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatSidebar;