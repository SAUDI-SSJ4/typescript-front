import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Send,
  Bot,
  MessageCircle,
  Shield,
  Pin
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/types/live-stream";

interface ChatSidebarProps {
  communityMessages: ChatMessage[];
  aiMessages: ChatMessage[];
  onSendCommunityMessage: (message: string) => void;
  onSendAIMessage: (message: string) => void;
  onPinMessage?: (messageId: string) => void;
  onReactToMessage?: (messageId: string, emoji: string) => void;
}

export function ChatSidebar({
  communityMessages,
  aiMessages,
  onSendCommunityMessage,
  onSendAIMessage,
  onPinMessage,
  onReactToMessage
}: ChatSidebarProps) {
  const [activeChatTab, setActiveChatTab] = useState("community");
  const [newCommunityMessage, setNewCommunityMessage] = useState("");
  const [newAIMessage, setNewAIMessage] = useState("");

  const handleSendCommunityMessage = () => {
    if (newCommunityMessage.trim()) {
      onSendCommunityMessage(newCommunityMessage.trim());
      setNewCommunityMessage("");
    }
  };

  const handleSendAIMessage = () => {
    if (newAIMessage.trim()) {
      onSendAIMessage(newAIMessage.trim());
      setNewAIMessage("");
    }
  };

  const MessageComponent = ({ message, showActions = false }: { message: ChatMessage; showActions?: boolean }) => (
    <div className={cn(
      "flex gap-2 text-sm group",
      message.type === 'system' && "justify-center"
    )}>
      {message.type !== 'system' && (
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={message.avatar} />
          <AvatarFallback className="text-xs">
            {message.isAI ? "🤖" : 
             message.isInstructor ? "👨‍🏫" : 
             message.username.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "flex-1 min-w-0",
        message.type === 'system' && "text-center"
      )}>
        <div className={cn(
          "p-3 rounded-lg relative",
          message.type === 'question' && "bg-yellow-50 border border-yellow-200",
          message.type === 'message' && "bg-gray-50 hover:bg-gray-100 transition-colors",
          message.type === 'system' && "bg-blue-50 text-blue-700 inline-block",
          message.type === 'ai-response' && "bg-blue-50 border border-blue-200",
          message.isInstructor && "bg-green-50 border border-green-200",
          message.isPinned && "ring-2 ring-yellow-400"
        )}>
          {message.type !== 'system' && (
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-medium font-noto",
                  message.isAI ? "text-blue-900" : 
                  message.isInstructor ? "text-green-900" : 
                  "text-gray-900"
                )}>
                  {message.username}
                </span>
                {message.isInstructor && (
                  <Badge className="bg-green-100 text-green-800 text-xs">مدرب</Badge>
                )}
                {message.isPinned && (
                  <Pin className="w-3 h-3 text-yellow-600" />
                )}
              </div>
              <span className="text-xs text-gray-500">
                {message.timestamp}
              </span>
            </div>
          )}
          
          <p className={cn(
            "font-noto leading-relaxed",
            message.type === 'system' ? "text-xs" : "text-sm"
          )}>
            {message.message}
          </p>
          
          {message.type === 'question' && (
            <div className="mt-2">
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                سؤال
              </Badge>
            </div>
          )}

          {/* Message Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {message.reactions.map((reaction, index) => (
                <button
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-white rounded-full border text-xs hover:bg-gray-50"
                  onClick={() => onReactToMessage?.(message.id, reaction.emoji)}
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-gray-600">{reaction.count}</span>
                </button>
              ))}
            </div>
          )}

          {/* Message Actions */}
          {showActions && onPinMessage && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => onPinMessage(message.id)}
                title="تثبيت الرسالة"
              >
                <Pin className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="border-0 shadow-sm h-[600px] flex flex-col bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 font-noto">
          <MessageSquare className="w-5 h-5" />
          التفاعل المباشر
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs value={activeChatTab} onValueChange={setActiveChatTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mx-4 mb-2">
            <TabsTrigger value="community" className="flex items-center gap-2 font-noto">
              <MessageCircle className="w-4 h-4" />
              المجتمع
              {communityMessages.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {communityMessages.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2 font-noto">
              <Bot className="w-4 h-4" />
              الذكاء الاصطناعي
              {aiMessages.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {aiMessages.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Community Chat */}
          <TabsContent value="community" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-3 py-4">
                {/* Pinned Messages */}
                {communityMessages.filter(m => m.isPinned).length > 0 && (
                  <div className="mb-4">
                    <div className="text-center mb-2">
                      <Badge variant="outline" className="text-xs font-noto">
                        📌 رسائل مثبتة
                      </Badge>
                    </div>
                    {communityMessages.filter(m => m.isPinned).map((message) => (
                      <MessageComponent key={message.id} message={message} />
                    ))}
                    <div className="border-t border-gray-200 my-3" />
                  </div>
                )}

                <div className="text-center py-2">
                  <Badge variant="outline" className="text-xs font-noto">
                    {communityMessages.length} رسالة
                  </Badge>
                </div>
                
                {communityMessages.filter(m => !m.isPinned).map((message) => (
                  <MessageComponent key={message.id} message={message} showActions />
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="شارك مع المجتمع..."
                  value={newCommunityMessage}
                  onChange={(e) => setNewCommunityMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendCommunityMessage()}
                  className="font-noto"
                />
                <Button 
                  size="sm" 
                  onClick={handleSendCommunityMessage}
                  disabled={!newCommunityMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span className="font-noto">كن محترماً ومهذباً</span>
              </div>
            </div>
          </TabsContent>

          {/* AI Chat */}
          <TabsContent value="ai" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-3 py-4">
                <div className="text-center py-2">
                  <Badge variant="outline" className="text-xs font-noto">
                    <Bot className="w-3 h-3 mr-1" />
                    مساعد ذكي متاح
                  </Badge>
                </div>
                
                {aiMessages.map((message) => (
                  <MessageComponent key={message.id} message={message} />
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="اسأل الذكاء الاصطناعي..."
                  value={newAIMessage}
                  onChange={(e) => setNewAIMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendAIMessage()}
                  className="font-noto"
                />
                <Button 
                  size="sm" 
                  onClick={handleSendAIMessage}
                  disabled={!newAIMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-blue-600">
                <Bot className="w-3 h-3" />
                <span className="font-noto">اسأل عن أي موضوع متعلق بالدرس</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}