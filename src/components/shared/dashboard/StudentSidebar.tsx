import {
  Link,
  useLocation,
} from "react-router-dom";
import {
  Home,
  BookOpen,
  Package,
  GraduationCap,
  Heart,
  Menu,
  ShoppingCart,
  X,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import type { User } from "@/types/user";
import { UserType } from "@/constants/enums";

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

interface StudentSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  baseSidebarItems?: SidebarItem[];
  user: User;
}

function StudentSidebar({
  isMobile = false,
  isOpen = true,
  onClose,
  baseSidebarItems = [],
  user,
}: StudentSidebarProps) {
  const location = useLocation();
  const [
    expandedItems,
    setExpandedItems,
  ] = useState<string[]>([]);

  const toggleExpanded = (
    itemId: string
  ) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter(
            (id) => id !== itemId
          )
        : [...prev, itemId]
    );
  };

  const studentSidebarItems: SidebarItem[] =
    [
      {
        id: "courses",
        title: "المواد التعليمية",
        href: "/dashboard/my-courses",
        icon: (
          <BookOpen className="w-5 h-5" />
        ),
      },
      {
        id: "statistics",
        title: "إحصائيات الطالب",
        href: "/dashboard/statistics",
        icon: (
          <BarChart3 className="w-5 h-5" />
        ),
      },
      {
        id: "digital-products",
        title: "المنتجات الرقمية",
        href: "/dashboard/digital-products",
        icon: (
          <Package className="w-5 h-5" />
        ),
      },
      {
        id: "certificates",
        title: "الشهادات",
        href: "/dashboard/certificates",
        icon: (
          <GraduationCap className="w-5 h-5" />
        ),
      },
      {
        id: "favorites",
        title: "قائمة المفضلة",
        href: "/dashboard/favorites",
        icon: (
          <Heart className="w-5 h-5" />
        ),
      },
      {
        id: "purchases",
        title: "المشتريات",
        href: "/dashboard/purchases",
        icon: (
          <Menu className="w-5 h-5" />
        ),
      },
      {
        id: "shopping-cart",
        title: "عربة التسوق",
        href: "/dashboard/shopping-cart",
        icon: (
          <ShoppingCart className="w-5 h-5" />
        ),
      },
    ];

  const sidebarItems: SidebarItem[] = [
    ...baseSidebarItems,
    ...studentSidebarItems,
  ];

  const isActivePath = (
    href: string
  ) => {
    if (href === "/dashboard") {
      return (
        location.pathname ===
        "/dashboard"
      );
    }
    return location.pathname.startsWith(
      href
    );
  };

  const renderSidebarItem = (
    item: SidebarItem
  ) => {
    if (
      item.isExpandable &&
      item.subItems
    ) {
      const isExpanded =
        expandedItems.includes(item.id);
      const hasActiveSubItem =
        item.subItems.some(
          (subItem) =>
            subItem.href &&
            isActivePath(subItem.href)
        );

      return (
        <li
          key={item.id}
          className="space-y-1"
        >
          {/* Parent Item */}
          <Button
            variant="ghost"
            onClick={() =>
              toggleExpanded(item.id)
            }
            className={cn(
              "w-full justify-between h-auto px-4 py-3 text-right rounded-lg transition-colors group",
              hasActiveSubItem ||
                isExpanded
                ? "text-white hover:text-white"
                : "bg-white text-gray-900 hover:text-white"
            )}
            style={
              hasActiveSubItem ||
              isExpanded
                ? {
                    backgroundColor:
                      "#0062ff",
                  }
                : {}
            }
            onMouseEnter={(e) => {
              if (
                !(
                  hasActiveSubItem ||
                  isExpanded
                )
              ) {
                e.currentTarget.style.backgroundColor =
                  "#0062ff";
                const icon =
                  e.currentTarget.querySelector(
                    ".sidebar-icon"
                  ) as HTMLElement;
                if (icon)
                  icon.style.color =
                    "white";
              }
            }}
            onMouseLeave={(e) => {
              if (
                !(
                  hasActiveSubItem ||
                  isExpanded
                )
              ) {
                e.currentTarget.style.backgroundColor =
                  "white";
                const icon =
                  e.currentTarget.querySelector(
                    ".sidebar-icon"
                  ) as HTMLElement;
                if (icon)
                  icon.style.color =
                    "#0062ff";
              }
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="sidebar-icon transition-colors w-6 h-6 flex items-center justify-center"
                style={{
                  color:
                    hasActiveSubItem ||
                    isExpanded
                      ? "white"
                      : "#0062ff",
                }}
              >
                {item.icon}
              </div>
              <span className="font-medium">
                {item.title}
              </span>
            </div>
            {item.isExpandable && (
              <svg
                className={cn(
                  "w-5 h-5 transition-transform",
                  isExpanded
                    ? "rotate-180"
                    : "rotate-0"
                )}
                style={{
                  color:
                    hasActiveSubItem ||
                    isExpanded
                      ? "white"
                      : "#0062ff",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </Button>

          {/* Sub Items */}
          {isExpanded && (
            <div className="ml-6 space-y-1">
              {item.subItems.map(
                (subItem) => (
                  <div key={subItem.id}>
                    {subItem.comingSoon ? (
                      <div
                        className={cn(
                          "flex items-center justify-between w-full px-4 py-2 text-right rounded-md transition-colors",
                          "text-gray-500 bg-white cursor-not-allowed"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center text-gray-400">
                            {
                              subItem.icon
                            }
                          </div>
                          <span className="font-medium text-sm">
                            {
                              subItem.title
                            }
                          </span>
                        </div>
                        {subItem.badge && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
                          >
                            {
                              subItem.badge
                            }
                          </Badge>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={
                          subItem.href!
                        }
                        onClick={
                          isMobile
                            ? onClose
                            : undefined
                        }
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-between h-auto px-4 py-2 text-right rounded-md transition-colors group",
                            isActivePath(
                              subItem.href!
                            )
                              ? "text-white hover:text-white"
                              : "bg-white text-gray-900 hover:text-white"
                          )}
                          style={
                            isActivePath(
                              subItem.href!
                            )
                              ? {
                                  backgroundColor:
                                    "#0062ff",
                                }
                              : {}
                          }
                          onMouseEnter={(
                            e
                          ) => {
                            if (
                              !isActivePath(
                                subItem.href!
                              )
                            ) {
                              e.currentTarget.style.backgroundColor =
                                "#0062ff";
                              const icon =
                                e.currentTarget.querySelector(
                                  ".sidebar-subicon"
                                ) as HTMLElement;
                              if (icon)
                                icon.style.color =
                                  "white";
                            }
                          }}
                          onMouseLeave={(
                            e
                          ) => {
                            if (
                              !isActivePath(
                                subItem.href!
                              )
                            ) {
                              e.currentTarget.style.backgroundColor =
                                "white";
                              const icon =
                                e.currentTarget.querySelector(
                                  ".sidebar-subicon"
                                ) as HTMLElement;
                              if (icon)
                                icon.style.color =
                                  "#0062ff";
                            }
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="sidebar-subicon transition-colors w-5 h-5 flex items-center justify-center"
                              style={{
                                color:
                                  isActivePath(
                                    subItem.href!
                                  )
                                    ? "white"
                                    : "#0062ff",
                              }}
                            >
                              {
                                subItem.icon
                              }
                            </div>
                            <span className="font-medium text-sm">
                              {
                                subItem.title
                              }
                            </span>
                          </div>
                        </Button>
                      </Link>
                    )}
                  </div>
                )
              )}
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
            "flex items-center justify-between w-full px-4 py-3 text-right rounded-lg transition-colors",
            "text-gray-500 bg-white cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center text-gray-400">
              {item.icon}
            </div>
            <span className="font-medium">
              {item.title}
            </span>
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
        onClick={
          isMobile ? onClose : undefined
        }
      >
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between h-auto px-4 py-3 text-right rounded-lg transition-colors group",
            isActivePath(item.href!)
              ? "text-white hover:text-white shadow-sm"
              : "bg-white text-gray-900 hover:text-white"
          )}
          style={
            isActivePath(item.href!)
              ? {
                  backgroundColor:
                    "#0062ff",
                }
              : {}
          }
          onMouseEnter={(e) => {
            if (
              !isActivePath(item.href!)
            ) {
              e.currentTarget.style.backgroundColor =
                "#0062ff";
              const icon =
                e.currentTarget.querySelector(
                  ".sidebar-mainicon"
                ) as HTMLElement;
              if (icon)
                icon.style.color =
                  "white";
            }
          }}
          onMouseLeave={(e) => {
            if (
              !isActivePath(item.href!)
            ) {
              e.currentTarget.style.backgroundColor =
                "white";
              const icon =
                e.currentTarget.querySelector(
                  ".sidebar-mainicon"
                ) as HTMLElement;
              if (icon)
                icon.style.color =
                  "#0062ff";
            }
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="sidebar-mainicon transition-colors w-6 h-6 flex items-center justify-center"
              style={{
                color: isActivePath(
                  item.href!
                )
                  ? "white"
                  : "#0062ff",
              }}
            >
              {item.icon}
            </div>
            <span className="font-medium">
              {item.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {item.badge &&
              !isActivePath(
                item.href!
              ) && (
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
          <h2 className="text-lg font-semibold">
            القائمة
          </h2>
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

      {/* Mobile Back to Main Site Button */}
      {isMobile && (
        <div className="p-4 border-b border-gray-100">
          <Link
            to="/"
            className="block"
            onClick={onClose}
          >
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-center gap-2 h-10 text-sm border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium"
            >
              <Home className="w-4 h-4" />
              العودة للصفحة الرئيسية
            </Button>
          </Link>
        </div>
      )}

      <div className="p-5 space-y-4">
        {/* Back to Main Site Button */}
        <div className="hidden lg:block">
          <Link
            to="/"
            className="block"
          >
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-center gap-2 h-10 text-sm border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium"
            >
              <Home className="w-4 h-4" />
              العودة للصفحة الرئيسية
            </Button>
          </Link>
        </div>

        {/* Academy Profile Section - Only show for academy accounts */}
        {user?.user_type === UserType.ACADEMY && user?.academy_memberships?.[0] && (
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 rounded-lg object-cover shadow-sm">
              <AvatarImage
                src={user.academy_memberships[0].settings?.logo || "/api/placeholder/48/48"}
                alt={user.academy_memberships[0].academy_name}
              />
              <AvatarFallback className="bg-blue-100 text-blue-700">
                {user.academy_memberships[0].academy_name?.charAt(0) || "أ"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-base truncate">
                {user.academy_memberships[0].academy_name}
              </h3>
            </div>
          </div>
        )}

        <nav>
          <ul className="flex flex-col gap-1">
            {sidebarItems.map((item) =>
              renderSidebarItem(item)
            )}
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
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          )}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className="w-80 bg-white border-l border-gray-200 h-full overflow-y-auto hidden lg:block">
      {sidebarContent}
    </aside>
  );
}

export default StudentSidebar;
