import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ChevronDown,
  X,
  FileText,
  Calendar,
  Layers,
  Edit3,
  Settings,
  Palette,
  List,
  Info,
  Star,
  HelpCircle,
  UserCheck,
  Users,
  ClipboardCheck,
  Award,
  MessageSquare,
  Database,
  Wallet,
  PanelRightClose,
  PanelLeftClose,
  Menu,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { getAcademyDetails } from "@/lib/academy";
import type { User } from "@/types/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import RemoteImage from "../RemoteImage";

interface SidebarSubItem {
  id: string;
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  comingSoon?: boolean;
}

interface SidebarItem {
  id: string;
  title: string;
  href?: string;
  icon: React.ReactNode;
  badge?: string;
  comingSoon?: boolean;
  isExpandable?: boolean;
  subItems?: SidebarSubItem[];
}

interface AcademySidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  baseSidebarItems?: SidebarItem[];
  user: User;
}

function AcademySidebar({
  isMobile = false,
  isOpen = true,
  onClose,
  baseSidebarItems = [],
  user,
}: AcademySidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };
  
  const academy = getAcademyDetails(user);

  // If no academy found, return null or a fallback
  if (!academy) {
    return null;
  }

  const academySidebarItems: SidebarItem[] = [
    {
      id: "content-management",
      title: "ادارة المحتوى",
      icon: <FileText className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "courses",
          title: "الدورات التدريبية",
          href: "/dashboard/courses",
          icon: <Award className="w-4 h-4" />,
        },
        {
          id: "live-sessions",
          title: "الجلسات الحضورية",
          href: "/dashboard/live-sessions",
          icon: <Calendar className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "certificates-editing",
          title: "تحرير الشهادات",
          href: "/dashboard/certificates-editing",
          icon: <Award className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "content-digital-products",
          title: "المنتجات الرقمية",
          href: "/dashboard/content-digital-products",
          icon: <Database className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "product-packages",
          title: "حزم المنتجات",
          href: "/dashboard/product-packages",
          icon: <Layers className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "blogs",
          title: "المدونات",
          href: "/dashboard/blogs",
          icon: <Edit3 className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "coupons",
          title: "الكوبونات",
          href: "/dashboard/coupons",
          icon: <Ticket className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "student-information",
      title: "معلومات الطلاب",
      icon: <Database className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "student-data",
          title: "بيانات الطلاب",
          href: "/dashboard/student-data",
          icon: <Users className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "exams",
          title: "الاختبارات",
          href: "/dashboard/exams",
          icon: <ClipboardCheck className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "certificates-management",
          title: "الشهادات",
          href: "/dashboard/certificates-management",
          icon: <Award className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "comments",
          title: "التعليقات",
          href: "/dashboard/comments",
          icon: <MessageSquare className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
      ],
    },
    {
      id: "academy-interface-editing",
      title: "تعديل واجهات الأكاديمية",
      icon: <Palette className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "template",
          title: "الاعدادات الرئيسية",
          href: "/dashboard/template",
          icon: <Settings className="w-4 h-4" />,
        },
        {
          id: "main-menu",
          title: "القسم الرئيسي",
          href: "/dashboard/template/main-menu",
          icon: <List className="w-4 h-4" />,
        },
        {
          id: "about",
          title: "قسم من نحن",
          href: "/dashboard/template/about",
          icon: <Info className="w-4 h-4" />,
        },
        {
          id: "student-reviews",
          title: "تقييمات الطلاب",
          href: "/dashboard/template/student-reviews",
          icon: <Star className="w-4 h-4" />,
        },
        {
          id: "faqs",
          title: "الأسئلة الشائعة",
          href: "/dashboard/template/faqs",
          icon: <HelpCircle className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "wallet",
      title: "المحفظة",
      href: "/dashboard/wallet",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: "trainers",
      title: "ادارة المدربين",
      href: "/dashboard/trainers",
      icon: <UserCheck className="w-5 h-5" />,
    },
  ];

  const sidebarItems: SidebarItem[] = [
    ...baseSidebarItems,
    ...academySidebarItems,
  ];

  const isActivePath = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    } else if (href === "/dashboard/template") {
      return location.pathname === "/dashboard/template";
    }
    return location.pathname.startsWith(href);
  };

  const sidebarContent = (
    <div
      className="h-full flex flex-col backdrop-blur-sm"
      style={{
        background:
          "linear-gradient(91.81deg, rgba(255, 255, 255, 0.87) 21.24%, rgba(255, 255, 255, 0.87) 109.59%)",
      }}
    >
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-white/30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Menu className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">القائمة</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Profile Section & Collapse Button */}
      <div
        className={cn(
          "p-4 pb-0 border-b border-white/30",
          isCollapsed && "p-2"
        )}
      >
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                <Avatar className="h-10 w-10">
                  {getAcademyDetails(user)?.settings.logo ? (
                    <RemoteImage
                      prefix="static"
                      src={getAcademyDetails(user)?.settings.logo || ""}
                      alt={getAcademyDetails(user)?.academy_name}
                      className="!h-10 !w-10 object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-primary text-white">
                      {getAcademyDetails(user)?.academy_name?.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">
                  {getAcademyDetails(user)?.academy_name}
                </h3>
                <p className="text-sm text-gray-600">لوحة التحكم</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <PanelRightClose className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Back to Main Site Button */}
      <div
        className={cn(
          "p-4 pb-0 border-b border-white/30",
          isCollapsed && "p-2"
        )}
      >
        <Link to="/" className="block">
          <Button
            variant="outline"
            className="w-full justify-center gap-2 border-gray-300 hover:bg-white/50"
          >
            <Home className="w-4 h-4" />
            {!isCollapsed && "العودة للرئيسية"}
          </Button>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <nav>
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              if (item.isExpandable && item.subItems) {
                const isExpanded = expandedItems.includes(item.id);
                const hasActiveSubItem = item.subItems.some(
                  (subItem) => subItem.href && isActivePath(subItem.href)
                );

                return (
                  <li key={item.id} className="mb-1">
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200",
                        hasActiveSubItem || isExpanded
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600",
                        isCollapsed && "px-2"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                          {item.icon}
                        </div>
                        {!isCollapsed && (
                          <span className="font-medium text-sm">
                            {item.title}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            isExpanded ? "rotate-180" : "rotate-0"
                          )}
                        />
                      )}
                    </button>

                    {!isCollapsed && isExpanded && (
                      <div className="mt-1 ml-6 space-y-1 border-l-2 border-blue-100 pl-3">
                        {item.subItems.map((subItem) => (
                          <div key={subItem.id}>
                            {subItem.comingSoon ? (
                              <div className="flex items-center justify-between px-3 py-2 text-gray-400 cursor-not-allowed">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center">
                                    {subItem.icon}
                                  </div>
                                  <span className="text-sm">
                                    {subItem.title}
                                  </span>
                                </div>
                                {subItem.badge && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-orange-100 text-orange-600 text-xs"
                                  >
                                    {subItem.badge}
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <Link
                                to={subItem.href!}
                                onClick={isMobile ? onClose : undefined}
                              >
                                <div
                                  className={cn(
                                    "flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-200",
                                    isActivePath(subItem.href!)
                                      ? "bg-blue-600 text-white"
                                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                  )}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-md flex items-center justify-center">
                                      {subItem.icon}
                                    </div>
                                    <span className="text-sm">
                                      {subItem.title}
                                    </span>
                                  </div>
                                  {subItem.badge &&
                                    !isActivePath(subItem.href!) && (
                                      <Badge
                                        variant="secondary"
                                        className="bg-blue-100 text-blue-600 text-xs"
                                      >
                                        {subItem.badge}
                                      </Badge>
                                    )}
                                </div>
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.id} className="mb-1">
                  <Link
                    to={item.href!}
                    onClick={isMobile ? onClose : undefined}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200",
                        isActivePath(item.href!)
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600",
                        isCollapsed && "px-2"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                          {item.icon}
                        </div>
                        {!isCollapsed && (
                          <span className="font-medium text-sm">
                            {item.title}
                          </span>
                        )}
                      </div>
                      {!isCollapsed &&
                        item.badge &&
                        !isActivePath(item.href!) && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-600 text-xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={cn(
            "fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-50 lg:hidden",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside
      className={cn(
        "border-l border-gray-200 h-full overflow-hidden hidden lg:block transition-all duration-300",
        isCollapsed ? "w-20" : "w-80"
      )}
    >
      {sidebarContent}
    </aside>
  );
}

export default AcademySidebar;
