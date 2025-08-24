import React, { useState } from "react";
import { X, Send, MessageSquare, AlertCircle, CheckCircle, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Student, NotificationMessage } from "@/types/student-notification";

interface SendNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStudents: Student[];
}

const notificationTemplates = [
  {
    id: 1,
    name: "إشعار ترحيبي",
    title: "مرحباً بك في منصتنا التعليمية!",
    content: "نحن سعداء بانضمامك إلينا. نتمنى لك رحلة تعليمية ممتعة ومفيدة.",
    type: "success" as const
  },
  {
    id: 2,
    name: "تذكير بالدورة",
    title: "لا تنس متابعة دورتك!",
    content: "نذكرك بأن لديك دورة غير مكتملة. يمكنك المتابعة من حيث توقفت.",
    type: "info" as const
  },
  {
    id: 3,
    name: "عرض خاص",
    title: "عرض خاص لك!",
    content: "لديك خصم خاص على الدورات الجديدة. لا تفوت الفرصة!",
    type: "announcement" as const
  }
];

export default function SendNotificationModal({
  isOpen,
  onClose,
  selectedStudents,
}: SendNotificationModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"info" | "warning" | "success" | "announcement">("info");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [scheduledDate, setScheduledDate] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleTemplateSelect = (templateId: string) => {
    const template = notificationTemplates.find(t => t.id === parseInt(templateId));
    if (template) {
      setTitle(template.title);
      setContent(template.content);
      setType(template.type);
      setSelectedTemplate(templateId);
    }
  };

  const handleSendNotification = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    setIsSending(true);

    // Simulate API call
    const notification: NotificationMessage = {
      title: title.trim(),
      content: content.trim(),
      type,
      priority,
      scheduledDate: scheduledDate || undefined,
      recipients: selectedStudents.map(s => s.id),
      createdAt: new Date().toISOString(),
      status: scheduledDate ? "scheduled" : "sent"
    };

    try {
      // Here you would make the actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Sending notification:", notification);
      
      // Reset form
      setTitle("");
      setContent("");
      setType("info");
      setPriority("medium");
      setScheduledDate("");
      setSelectedTemplate("");
      
      onClose();
    } catch (error) {
      console.error("Error sending notification:", error);
    } finally {
      setIsSending(false);
    }
  };

  const getTypeConfig = (notificationType: string) => {
    const configs = {
      info: { label: "معلومات", icon: MessageSquare, color: "bg-blue-100 text-blue-800 border-blue-200" },
      warning: { label: "تحذير", icon: AlertCircle, color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      success: { label: "نجاح", icon: CheckCircle, color: "bg-green-100 text-green-800 border-green-200" },
      announcement: { label: "إعلان", icon: MessageSquare, color: "bg-purple-100 text-purple-800 border-purple-200" }
    };
    return configs[notificationType as keyof typeof configs] || configs.info;
  };

  const getPriorityConfig = (notificationPriority: string) => {
    const configs = {
      low: { label: "منخفضة", color: "bg-gray-100 text-gray-800 border-gray-200" },
      medium: { label: "متوسطة", color: "bg-blue-100 text-blue-800 border-blue-200" },
      high: { label: "عالية", color: "bg-red-100 text-red-800 border-red-200" }
    };
    return configs[notificationPriority as keyof typeof configs] || configs.medium;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Send className="w-5 h-5 text-blue-600" />
            إرسال إشعار للطلاب
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Selected Students Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                الطلاب المحددون ({selectedStudents.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedStudents.slice(0, 5).map((student) => (
                <Badge key={student.id} variant="secondary" className="gap-1">
                  <img
                    src={student.profileImage}
                    alt={student.name}
                    className="w-4 h-4 rounded-full"
                  />
                  {student.name}
                </Badge>
              ))}
              {selectedStudents.length > 5 && (
                <Badge variant="secondary">
                  +{selectedStudents.length - 5} آخرين
                </Badge>
              )}
            </div>
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-medium text-gray-700">
              القوالب الجاهزة (اختياري)
            </Label>
            <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
              <SelectTrigger>
                <SelectValue placeholder="اختر قالب جاهز أو أنشئ رسالة مخصصة" />
              </SelectTrigger>
              <SelectContent>
                {notificationTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id.toString()}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notification Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              عنوان الإشعار *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="أدخل عنوان الإشعار..."
              className="w-full"
            />
          </div>

          {/* Notification Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-gray-700">
              محتوى الإشعار *
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="أدخل محتوى الإشعار..."
              rows={4}
              className="w-full resize-none"
            />
          </div>

          {/* Notification Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Type */}
            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                نوع الإشعار
              </Label>
              <Select value={type} onValueChange={(value: any) => setType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">معلومات</SelectItem>
                  <SelectItem value="success">نجاح</SelectItem>
                  <SelectItem value="warning">تحذير</SelectItem>
                  <SelectItem value="announcement">إعلان</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                الأولوية
              </Label>
              <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">منخفضة</SelectItem>
                  <SelectItem value="medium">متوسطة</SelectItem>
                  <SelectItem value="high">عالية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Scheduled Date */}
          <div className="space-y-2">
            <Label htmlFor="scheduledDate" className="text-sm font-medium text-gray-700">
              جدولة الإرسال (اختياري)
            </Label>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <Input
                id="scheduledDate"
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="flex-1"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <p className="text-xs text-gray-500">
              اتركه فارغاً للإرسال الفوري
            </p>
          </div>

          {/* Preview */}
          {(title || content) && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">معاينة الإشعار</Label>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getTypeConfig(type).color}>
                    {getTypeConfig(type).label}
                  </Badge>
                  <Badge className={getPriorityConfig(priority).color}>
                    أولوية {getPriorityConfig(priority).label}
                  </Badge>
                </div>
                {title && (
                  <h4 className="font-medium text-gray-900 mb-2">{title}</h4>
                )}
                {content && (
                  <p className="text-sm text-gray-600">{content}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSending}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSendNotification}
              disabled={!title.trim() || !content.trim() || isSending}
              className="gap-2"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {scheduledDate ? "جدولة الإرسال" : "إرسال الآن"}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}