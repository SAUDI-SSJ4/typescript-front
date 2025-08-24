import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Dot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// بيانات وهمية للإشعارات (يتم تكييفها لغوياً في وقت العرض)
const baseNotifications: Omit<Notification, "title" | "message" | "time">[] = [
  {
    id: "1",
    read: false,
  },
  {
    id: "2",
    read: false,
  },
  {
    id: "3",
    read: true,
  },
  {
    id: "4",
    read: false,
  },
  {
    id: "5",
    read: true,
  },
];

export function NotificationsDropdown() {
  const { lang, t } = useLanguage();
  const localized: Notification[] = [
    { id: "1", title: t('notif.course'), message: t('notif.course.msg'), time: t('time.5m'), read: false },
    { id: "2", title: t('notif.upload'), message: t('notif.upload.msg'), time: t('time.15m'), read: false },
    { id: "3", title: t('notif.student'), message: t('notif.student.msg'), time: t('time.30m'), read: true },
    { id: "4", title: t('notif.appointment'), message: t('notif.appointment.msg'), time: t('time.1h'), read: false },
    { id: "5", title: t('notif.review'), message: t('notif.review.msg'), time: t('time.2h'), read: true },
  ];
  const [notifications, setNotifications] = useState<Notification[]>(localized);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const allNotifications = notifications;
  const readNotifications = notifications.filter((n) => n.read);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div
      className={`p-4 hover:bg-gray-50/80 cursor-pointer transition-all duration-200 ${
        !notification.read ? "bg-blue-50/30" : ""
      }`}
      onClick={() => !notification.read && markAsRead(notification.id)}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-1 min-w-0 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h4 className={`text-sm mb-1.5 ${lang === 'ar' ? 'text-right' : 'text-left'} ${!notification.read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
            {notification.title}
          </h4>
          <p className={`text-xs text-gray-600 mb-2 line-clamp-2 ${lang === 'ar' ? 'text-right' : 'text-left'} leading-relaxed`}>
            {notification.message}
          </p>
          <span className={`text-xs text-gray-500 ${lang === 'ar' ? 'text-right' : 'text-left'} block`}>{notification.time}</span>
        </div>
        {!notification.read && (
          <Dot className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
        )}
      </div>
    </div>
  );

  return (
    <DropdownMenu dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-600">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0 shadow-lg" align="start">
        {/* هيدر الإشعارات */}
        <div className="p-4 bg-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{t('notifications.title')}</h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 text-xs h-auto p-1 hover:bg-blue-50 rounded-lg"
              >
                {t('notifications.markAll')}
              </Button>
            )}
          </div>
        </div>
        
        {/* التبويبات */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 m-0 rounded-none bg-gray-50/50 h-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <TabsTrigger value="all" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              {t('notifications.tab.all')} ({allNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="read" className="text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              {t('notifications.tab.read')} ({readNotifications.length})
            </TabsTrigger>
          </TabsList>
          
          {/* محتوى تبويب الكل */}
          <TabsContent value="all" className="max-h-96 overflow-y-auto m-0">
            {allNotifications.length > 0 ? (
              <div>
                {allNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <Bell className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">{t('notifications.empty')}</p>
              </div>
            )}
          </TabsContent>
          
          {/* محتوى تبويب المقروء */}
          <TabsContent value="read" className="max-h-96 overflow-y-auto m-0">
            {readNotifications.length > 0 ? (
              <div>
                {readNotifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                <Bell className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">{t('notifications.emptyRead')}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}