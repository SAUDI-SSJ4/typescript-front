import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell, 
  X, 
  Check, 
  AlertCircle, 
  Info, 
  Star, 
  Users, 
  BookOpen, 
  DollarSign,
  Settings,
  Filter,
  MoreVertical,
  Trash2,
  MarkAsUnread
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error' | 'course' | 'payment' | 'student';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  priority: 'low' | 'medium' | 'high';
  category: 'system' | 'course' | 'payment' | 'student' | 'marketing';
  metadata?: {
    courseId?: string;
    studentId?: string;
    amount?: number;
    [key: string]: any;
  };
}

interface NotificationCenterProps {
  className?: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ className }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'course',
      title: 'تسجيل جديد في دورة البرمجة',
      message: 'تم تسجيل 5 طلاب جدد في دورة "تعلم React من الصفر"',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
      priority: 'high',
      category: 'course',
      actionUrl: '/dashboard/courses/react-course',
      actionLabel: 'عرض الدورة',
      metadata: { courseId: 'react-course', studentCount: 5 }
    },
    {
      id: '2',
      type: 'payment',
      title: 'دفعة جديدة مستلمة',
      message: 'تم استلام دفعة بقيمة 1,500 ر.س من الطالب أحمد محمد',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
      priority: 'medium',
      category: 'payment',
      actionUrl: '/dashboard/payments',
      actionLabel: 'عرض المدفوعات',
      metadata: { amount: 1500, studentId: 'ahmed-123' }
    },
    {
      id: '3',
      type: 'student',
      title: 'تقييم جديد للدورة',
      message: 'حصلت دورة "تصميم المواقع" على تقييم 5 نجوم من الطالبة فاطمة أحمد',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: true,
      priority: 'low',
      category: 'course',
      actionUrl: '/dashboard/reviews',
      actionLabel: 'عرض التقييمات',
      metadata: { rating: 5, courseId: 'web-design' }
    },
    {
      id: '4',
      type: 'warning',
      title: 'انتباه: مساحة التخزين',
      message: 'مساحة التخزين المتاحة أقل من 10%. يرجى ترقية الخطة أو حذف الملفات غير المستخدمة.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      priority: 'high',
      category: 'system',
      actionUrl: '/dashboard/storage',
      actionLabel: 'إدارة التخزين'
    },
    {
      id: '5',
      type: 'info',
      title: 'تحديث النظام',
      message: 'تم تحديث النظام بنجاح. تتضمن التحديثات تحسينات في الأداء وإصلاحات أمنية.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low',
      category: 'system'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'course' | 'payment' | 'student' | 'system'>('all');
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    const iconClass = "h-4 w-4";
    switch (type) {
      case 'success':
        return <Check className={cn(iconClass, "text-green-500")} />;
      case 'warning':
        return <AlertCircle className={cn(iconClass, "text-yellow-500")} />;
      case 'error':
        return <X className={cn(iconClass, "text-red-500")} />;
      case 'course':
        return <BookOpen className={cn(iconClass, "text-blue-500")} />;
      case 'payment':
        return <DollarSign className={cn(iconClass, "text-green-500")} />;
      case 'student':
        return <Users className={cn(iconClass, "text-purple-500")} />;
      default:
        return <Info className={cn(iconClass, "text-blue-500")} />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: false } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.category === filter;
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "relative p-2 hover:bg-gray-100",
            className
          )}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-96 p-0" 
        align="end"
        sideOffset={8}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">الإشعارات</CardTitle>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setFilter('all')}>
                      جميع الإشعارات
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('unread')}>
                      غير المقروءة ({unreadCount})
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilter('course')}>
                      الدورات
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('payment')}>
                      المدفوعات
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('student')}>
                      الطلاب
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilter('system')}>
                      النظام
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={markAllAsRead}>
                      تحديد الكل كمقروء
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={clearAll} className="text-red-600">
                      حذف جميع الإشعارات
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      إعدادات الإشعارات
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">
                لديك {unreadCount} إشعار غير مقروء
              </p>
            )}
          </CardHeader>
          
          <CardContent className="p-0">
            <ScrollArea className="h-96">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-muted-foreground">لا توجد إشعارات</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "group relative p-4 border-l-4 hover:bg-gray-50 transition-colors cursor-pointer",
                        getPriorityColor(notification.priority),
                        !notification.isRead && "bg-blue-50/50"
                      )}
                      onClick={() => {
                        if (!notification.isRead) {
                          markAsRead(notification.id);
                        }
                        if (notification.actionUrl) {
                          // Navigate to action URL
                          console.log('Navigate to:', notification.actionUrl);
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className={cn(
                              "text-sm font-medium line-clamp-1",
                              !notification.isRead && "font-semibold"
                            )}>
                              {notification.title}
                            </h4>
                            
                            <div className="flex items-center gap-1 ml-2">
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreVertical className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {notification.isRead ? (
                                    <DropdownMenuItem onClick={() => markAsUnread(notification.id)}>
                                      <MarkAsUnread className="h-4 w-4 mr-2" />
                                      تحديد كغير مقروء
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                      <Check className="h-4 w-4 mr-2" />
                                      تحديد كمقروء
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem 
                                    onClick={() => deleteNotification(notification.id)}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    حذف
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            
                            {notification.actionLabel && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs h-6 px-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log('Action clicked:', notification.actionUrl);
                                }}
                              >
                                {notification.actionLabel}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
export type { Notification };