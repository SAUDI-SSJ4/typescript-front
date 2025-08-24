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
  Clock,
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
  MessageCircle,
  Database,
  Wallet,
  ExternalLink,
  Brain,
  PanelLeftClose,
  PanelRightClose,
  Ticket,
  Link2,
  Bell,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { UserType } from "@/constants/enums";
import { useLanguage } from "@/contexts/LanguageContext";

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
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

<<<<<<< HEAD
const baseSidebarItems = [
    {
      id: "dashboard",
      title: "لوحة التحكم",
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
];

=======
>>>>>>> sketch
function DashboardSidebar({
  isMobile = false,
  isOpen = true,
  onClose,
  userType,
  isCollapsed,
  setIsCollapsed,
}: DashboardSidebarProps) {
<<<<<<< HEAD
  // Render appropriate sidebar based on user type
  if (user.user_type === UserType.ACADEMY) {
      return (
      <AcademySidebar
        baseSidebarItems={baseSidebarItems}
        isMobile={isMobile}
        isOpen={isOpen}
        onClose={onClose}
        user={user}
      />
      );
    }

    return (
    <StudentSidebar
      baseSidebarItems={baseSidebarItems}
      isMobile={isMobile}
      isOpen={isOpen}
      onClose={onClose}
      user={user}
    />
=======
  const { lang, t } = useLanguage();
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
      title: t("sidebar.content-management", "ادارة المحتوى"),
      icon: <FileText className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "courses",
          title: t("sidebar.courses", "الدورات التدريبية"),
          href: "/dashboard/courses",
          icon: <GraduationCap className="w-4 h-4" />,
        },

        {
          id: "sessions",
          title: t("sidebar.sessions", "الجلسات الخصوصية"),
          href: "/dashboard/sessions",
          icon: <Calendar className="w-4 h-4" />,
        },
        {
          id: "certificates-editing",
          title: t("sidebar.certificates-editing", "تحرير الشهادات"),
          href: "/dashboard/certificates-editing",
          icon: <Award className="w-4 h-4" />,
        },
        {
          id: "content-digital-products",
          title: t("sidebar.digital-products", "المنتجات الرقمية"),
          href: "/dashboard/digital-products",
          icon: <Package className="w-4 h-4" />,
        },
        {
          id: "product-packages",
          title: t("sidebar.product-packages", "حزم المنتجات"),
          href: "/dashboard/product-packages",
          icon: <Layers className="w-4 h-4" />,
        },
        {
          id: "blogs",
          title: t("sidebar.blogs", "المدونات"),
          href: "/dashboard/blogs",
          icon: <Edit3 className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "marketing-tools",
      title: t("sidebar.marketing-tools", "ادوات التسويق"),
      icon: <TrendingUp className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "coupons",
          title: t("sidebar.coupons", "كوبونات الخصم"),
          href: "/dashboard/coupons",
          icon: <Ticket className="w-4 h-4" />,
        },
        {
          id: "affiliate-links",
          title: t("sidebar.affiliate-links", "روابط التسويق بالعمولة"),
          href: "/dashboard/affiliate-links",
          icon: <Link2 className="w-4 h-4" />,
        },
        {
          id: "affiliate-applications",
          title: t("sidebar.affiliate-applications", "طلبات التسويق بالعمولة"),
          href: "/dashboard/affiliate-applications",
          icon: <Users className="w-4 h-4" />,
        },
        {
          id: "offers",
          title: t("sidebar.offers", "العروض والخصومات"),
          href: "/dashboard/offers",
          icon: <Star className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "student-information",
      title: t("sidebar.student-information", "معلومات الطلاب"),
      icon: <Database className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "student-notifications",
          title: t("sidebar.student-notifications", "بيانات الطلاب"),
          href: "/dashboard/student-notifications",
          icon: <Users className="w-4 h-4" />,
        },
        {
          id: "exam-statistics",
          title: t("sidebar.exam-statistics", "إحصائيات الاختبارات"),
          href: "/dashboard/exam-statistics",
          icon: <ClipboardCheck className="w-4 h-4" />,
        },
        {
          id: "comments",
          title: t("sidebar.comments", "التعليقات"),
          href: "/dashboard/comments",
          icon: <MessageSquare className="w-4 h-4" />,
        },
        {
          id: "student-certificates",
          title: t("sidebar.student-certificates", "شهادات الطلاب"),
          href: "/dashboard/student-certificates",
          icon: <Award className="w-4 h-4" />,
        },
        {
          id: "student-questions",
          title: t("sidebar.student-questions", "أسئلة الطلاب"),
          href: "/dashboard/student-questions",
          icon: <MessageCircle className="w-4 h-4" />,
        },
        {
          id: "student-chat",
          title: t("sidebar.student-chat", "محادثات الطلاب"),
          href: "/dashboard/student-chat",
          icon: <MessageSquare className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "academy-interface-editing",
      title: t("sidebar.academy-interface-editing", "تعديل واجهات الأكاديمية"),
      icon: <Palette className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "template",
          title: t("sidebar.template", "الاعدادات الرئيسية"),
          href: "/dashboard/template",
          icon: <Settings className="w-4 h-4" />,
        },
        {
          id: "main-menu",
          title: t("sidebar.main-menu", "القسم الرئيسي"),
          href: "/dashboard/template/main-menu",
          icon: <List className="w-4 h-4" />,
        },
        {
          id: "about",
          title: t("sidebar.about", "قسم من نحن"),
          href: "/dashboard/template/about",
          icon: <Info className="w-4 h-4" />,
        },
        {
          id: "student-reviews",
          title: t("sidebar.student-reviews", "تقييمات الطلاب"),
          href: "/dashboard/template/student-reviews",
          icon: <Star className="w-4 h-4" />,
        },
        {
          id: "faqs",
          title: t("sidebar.faqs", "الأسئلة الشائعة"),
          href: "/dashboard/template/faqs",
          icon: <HelpCircle className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "ai-learning-materials",
      title: t("sidebar.ai-learning-materials", "المواد التعليمية الذكية"),
      href: "/dashboard/ai-learning-materials",
      icon: <Brain className="w-5 h-5" />,
      badge: "AI",
    },
    {
      id: "wallet",
      title: t("sidebar.wallet", "المحفظة"),
      href: "/dashboard/wallet",
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: "users",
      title: t("sidebar.users", "إدارة المستخدمين"),
      href: "/dashboard/users",
      icon: <UserCheck className="w-5 h-5" />,
    },
  ];
  const studentSidebarItems: SidebarItem[] = [
    {
      id: "students-bag",
      title: t("sidebar.students-bag", "حقيبة الطلاب"),
      icon: <Briefcase className="w-5 h-5" />,
      isExpandable: true,
      subItems: [
        {
          id: "courses",
          title: t("sidebar.materials", "المواد التعليمية"),
          href: "/dashboard/courses",
          icon: <BookOpen className="w-4 h-4" />,
        },

        {
          id: "digital-products",
          title: t("sidebar.digital-products", "المنتجات الرقمية"),
          href: "/dashboard/digital-products",
          icon: <Package className="w-4 h-4" />,
        },
        {
          id: "certificates",
          title: t("sidebar.certificates", "الشهادات"),
          href: "/dashboard/certificates",
          icon: <GraduationCap className="w-4 h-4" />,
          badge: t("chip.soon", "قريباً"),
          comingSoon: true,
        },
        {
          id: "favorites",
          title: t("sidebar.favorites", "قائمة المفضلة"),
          href: "/dashboard/favorites",
          icon: <Heart className="w-4 h-4" />,
        },
      ],
    },
    {
      id: "ai-learning-materials",
      title: t("sidebar.ai-learning-materials", "المواد التعليمية الذكية"), 
      href: "/dashboard/ai-learning-materials",
      icon: <Brain className="w-5 h-5" />,
      badge: "AI",
    },
    {
      id: "purchases",
      title: t("sidebar.purchases", "المشتريات"),
      href: "/dashboard/purchases",
      icon: <Menu className="w-5 h-5" />,
    },
    {
      id: "shopping-cart",
      title: t("sidebar.shopping-cart", "عربة التسوق"),
      href: "/dashboard/shopping-cart",
      icon: <ShoppingCart className="w-5 h-5" />,
    },
  ];

  const baseSidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      title: t("sidebar.dashboard", "لوحة التحكم"),
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: "profile",
      title: t("sidebar.profile", "الملف الشخصي"),
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

  // Debug log to see the userType value
  // console.log("DashboardSidebar userType:", userType);
  // console.log("UserType.ACADEMY:", UserType.ACADEMY);
  // console.log("Is Academy?", userType === UserType.ACADEMY);

  const isActivePath = (href: string) => {
    if (href === "/dashboard") {
      return location.pathname === "/dashboard";
    } else if (href === "/dashboard/template") {
      return location.pathname === "/dashboard/template";
    }
    return location.pathname.startsWith(href);
  };

  // Note: renderSidebarItem was removed (unused)

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
        <div className="flex items-center justify-between p-4 border-b border-white/30" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Menu className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{t('sidebar.menu', 'القائمة')}</h2>
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
      <div className={cn("p-4 border-b border-white/30", isCollapsed && "p-2")} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between">
          {!isCollapsed && (
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center">
                  <img
                    src="https://avatars.githubusercontent.com/u/87553297?v=4"
                    alt={lang === 'ar' ? "أكاديمية" : "Academy"}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{lang === 'ar' ? 'أكاديمية سيان' : 'Siyan Academy'}</h3>
                  <p className="text-sm text-gray-600">{t('dashboard.title', 'لوحة التحكم')}</p>
                </div>
              </div>
          )}
          <Button 
            variant="ghost" 
            size="icon"
            className="h-10 w-10"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <PanelRightClose className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </Button>
        </div>
        {!isCollapsed && userType === UserType.ACADEMY && (
           <div className="mt-3">
             <Link to="/academy/simple-arab-code" target="_blank" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('sidebar.visit-academy')}
                </Button>
              </Link>
           </div>
        )}
      </div>

      {/* Back to Main Site Button */}
      <div className={cn("p-4 border-b border-white/30", isCollapsed && "p-2")} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <Link to="/" className="block">
          <Button 
            variant="outline"
            className="w-full justify-center gap-2 border-gray-300 hover:bg-white/50"
          >
            <Home className="w-4 h-4" />
            {!isCollapsed && t('sidebar.back-home')}
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
                        {!isCollapsed && <span className="font-medium text-sm">{item.title}</span>}
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
                                 <span className="text-sm">{subItem.title}</span>
                               </div>
                               {subItem.badge && (
                                 <Badge variant="secondary" className="bg-orange-100 text-orange-600 text-xs">
                                   {subItem.badge}
                                 </Badge>
                               )}
                             </div>
                           ) : (
                             <Link to={subItem.href!} onClick={isMobile ? onClose : undefined}>
                               <div className={cn(
                                 "flex items-center justify-between px-3 py-2 rounded-md transition-colors duration-200",
                                 isActivePath(subItem.href!)
                                   ? "bg-blue-600 text-white"
                                   : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                               )}>
                                 <div className="flex items-center gap-3">
                                   <div className="w-6 h-6 rounded-md flex items-center justify-center">
                                     {subItem.icon}
                                   </div>
                                   <span className="text-sm">{subItem.title}</span>
                                 </div>
                                 {subItem.badge && !isActivePath(subItem.href!) && (
                                   <Badge variant="secondary" className="bg-blue-100 text-blue-600 text-xs">
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
                 <Link to={item.href!} onClick={isMobile ? onClose : undefined}>
                   <div className={cn(
                     "flex items-center justify-between px-4 py-3 rounded-lg transition-colors duration-200",
                     isActivePath(item.href!)
                       ? "bg-blue-600 text-white"
                       : "text-gray-700 hover:bg-blue-50 hover:text-blue-600",
                     isCollapsed && "px-2"
                   )}>
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                         {item.icon}
                       </div>
                       {!isCollapsed && <span className="font-medium text-sm">{item.title}</span>}
                     </div>
                     {!isCollapsed && item.badge && !isActivePath(item.href!) && (
                       <Badge variant="secondary" className="bg-blue-100 text-blue-600 text-xs">
                         {item.badge}
                       </Badge>
                     )}
                   </div>
                 </Link>
               </li>
              )
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
            "fixed top-0 right-0 h-full w-80 shadow-xl transform transition-transform duration-300 z-50 lg:hidden",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{
            background:
              "linear-gradient(91.81deg, rgba(255, 255, 255, 0.87) 21.24%, rgba(255, 255, 255, 0.87) 109.59%)",
          }}
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
      style={{
        background:
          "linear-gradient(91.81deg, rgba(255, 255, 255, 0.87) 21.24%, rgba(255, 255, 255, 0.87) 109.59%)",
      }}
    >
      {sidebarContent}
    </aside>
>>>>>>> sketch
  );
}

export default DashboardSidebar;
