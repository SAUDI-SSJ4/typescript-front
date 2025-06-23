import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Briefcase,
  BookOpen,
  Package,
  GraduationCap,
  Heart,
  Menu,
  ShoppingCart,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Routes, UserType } from "@/constants/enums";

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

interface DashboardSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  userType: UserType;
}

function DashboardSidebar({
  isMobile = false,
  isOpen = true,
  onClose,
  userType,
}: DashboardSidebarProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

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
          icon: <GraduationCap className="w-4 h-4" />,
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
          id: "content-digital-products",
          title: "المنتجات الرقمية",
          href: "/dashboard/content-digital-products",
          icon: <Package className="w-4 h-4" />,
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
          title: "القائمة الرئيسية",
          href: "/dashboard/template/main-menu",
          icon: <List className="w-4 h-4" />,
        },
        {
          id: "about",
          title: "من نحن",
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
      title: "ادارة المديرين",
      href: "/dashboard/trainers",
      icon: <UserCheck className="w-5 h-5" />,
    },
  ];
  const studentSidebarItems: SidebarItem[] = [
    {
      id: "students-bag",
      title: "حقيبة الطلاب",
      icon: <Briefcase className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "courses",
          title: "المواد التعليمية",
          href: "/dashboard/courses",
          icon: <BookOpen className="w-4 h-4" />,
        },
        {
          id: "digital-products",
          title: "المنتجات الرقمية",
          href: "/dashboard/digital-products",
          icon: <Package className="w-4 h-4" />,
        },
        {
          id: "certificates",
          title: "الشهادات",
          href: "/dashboard/certificates",
          icon: <GraduationCap className="w-4 h-4" />,
          badge: "قريباً",
          comingSoon: true,
        },
        {
          id: "favorites",
          title: "قائمة المفضلة",
          href: "/dashboard/favorites",
          icon: <Heart className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "purchases",
      title: "المشتريات",
      href: "/dashboard/purchases",
      icon: <Menu className="w-5 h-5" />,
    },
    {
      id: "shopping-cart",
      title: "عربة التسوق",
      href: "/dashboard/shopping-cart",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
  ];

  const baseSidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "profile",
      title: "الملف الشخصي",
      href: "/dashboard/profile",
      icon: <User className="w-5 h-5" />,
    },
  ];

  const sidebarItems: SidebarItem[] = [
    ...baseSidebarItems,
    ...(userType === UserType.ACADEMY
      ? academySidebarItems
      : studentSidebarItems),
  ];

  const isActivePath = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    } else if (href === "/dashboard/template") {
      return location.pathname === "/dashboard/template";
    }
    return location.pathname.startsWith(href);
  };

  const renderSidebarItem = (item: SidebarItem) => {
    if (item.isExpandable && item.subItems) {
      const isExpanded = expandedItems.includes(item.id);
      const hasActiveSubItem = item.subItems.some(
        (subItem) => subItem.href && isActivePath(subItem.href)
      );

      return (
        <li key={item.id} className="space-y-1">
          {/* Parent Item */}
          <Button
            variant="ghost"
            onClick={() => toggleExpanded(item.id)}
            className={cn(
              "w-full justify-between h-auto px-4 py-3 text-right rounded-xl transition-all duration-200 group",
              hasActiveSubItem || isExpanded
                ? "bg-blue-50 text-primary"
                : "text-foreground hover:bg-blue-50 hover:text-primary"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "transition-colors",
                  hasActiveSubItem || isExpanded
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                )}
              >
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isExpanded ? "rotate-180" : "rotate-0",
                hasActiveSubItem || isExpanded
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            />
          </Button>

          {/* Sub Items */}
          {isExpanded && (
            <div className="ml-6 space-y-1 animate-in slide-in-from-top-1 duration-200">
              {item.subItems.map((subItem) => (
                <div key={subItem.id}>
                  {subItem.comingSoon ? (
                    <div
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-2 text-right rounded-lg transition-colors",
                        "text-muted-foreground bg-gray-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-gray-400">{subItem.icon}</div>
                        <span className="font-medium text-sm">
                          {subItem.title}
                        </span>
                      </div>
                      {subItem.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
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
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between h-auto px-4 py-2 text-right rounded-lg transition-all duration-200 group",
                          isActivePath(subItem.href!)
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "text-foreground hover:bg-blue-50 hover:text-primary"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "transition-colors",
                              isActivePath(subItem.href!)
                                ? "text-white group-hover:text-foreground"
                                : "text-muted-foreground group-hover:text-primary"
                            )}
                          >
                            {subItem.icon}
                          </div>
                          <span className="font-medium text-sm">
                            {subItem.title}
                          </span>
                        </div>
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </li>
      );
    }

    // Regular item (non-expandable)
    if (item.comingSoon) {
      return (
        <div
          key={item.id}
          className={cn(
            "flex items-center justify-between w-full px-4 py-3 text-right rounded-xl transition-colors",
            "text-muted-foreground bg-gray-50 cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="text-gray-400">{item.icon}</div>
            <span className="font-medium">{item.title}</span>
          </div>
          <div className="flex items-center gap-2">
            {item.badge && (
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
              >
                {item.badge}
              </Badge>
            )}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.href!}
        onClick={isMobile ? onClose : undefined}
      >
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between h-auto px-4 py-3 text-right rounded-xl transition-all duration-200 group",
            isActivePath(item.href!)
              ? "bg-primary text-white hover:bg-primary/90 shadow-md"
              : "text-foreground hover:bg-blue-50 hover:text-primary"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "transition-colors",
                isActivePath(item.href!)
                  ? ""
                  : "text-muted-foreground group-hover:text-primary"
              )}
            >
              {item.icon}
            </div>
            <span className="font-medium">{item.title}</span>
          </div>
          <div className="flex items-center gap-2">
            {item.badge && !isActivePath(item.href!) && (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {item.badge}
              </Badge>
            )}
          </div>
        </Button>
      </Link>
    );
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">القائمة</h2>
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
      <div className="p-6 space-y-6">
        <div className="hidden lg:flex items-center gap-2">
          {userType === UserType.ACADEMY ? (
            <Link
              to="/academy/simple-arab-code"
              target="_blank"
              className="flex items-center gap-4 group"
            >
              <img
                src="https://avatars.githubusercontent.com/u/87553297?v=4"
                alt="Sayan"
                className="w-24 h-24 rounded-full"
              />
              <h3 className="text-muted-foreground group-hover:text-primary transition-colors duration-200 font-semibold text-lg">
                SAC Academy
              </h3>
            </Link>
          ) : (
            <Link to={Routes.ROOT}>
              <img
                src="/assets/images/logo.svg"
                alt="Sayan"
                className="w-24 h-24"
              />
            </Link>
          )}
        </div>
        <nav>
          <ul className="flex flex-col gap-2">
            {sidebarItems.map((item) => renderSidebarItem(item))}
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
    <aside className="w-80 bg-white border-l border-border h-full overflow-y-auto hidden lg:block">
      {sidebarContent}
    </aside>
  );
}

export default DashboardSidebar;
