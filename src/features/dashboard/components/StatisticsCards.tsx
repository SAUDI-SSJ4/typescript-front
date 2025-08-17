import {
  Users,
  ShoppingBag,
  Heart,
  GraduationCap,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/formatters";
import { UserType } from "@/constants/enums";

interface StatCard {
  id: string;
  title: string;
  value: string;
  iconColor?: string;
  bgColor: string;
  link: string;
  percentage?: string;
  className: string;
}

function StatisticsCards({ userType }: { userType: UserType }) {
  const academyCards: StatCard[] = [
    {
      id: "digital-products",
      title: "المنتجات الرقمية",
      value: "0",
      iconColor: "bg-purple-500",
      bgColor: "#8b5cf60f",
      className: "text-gray-900",
      link: "",
    },
    {
      id: "students",
      title: "عدد الطلاب",
      value: "0",
      iconColor: "bg-green-500",
      bgColor: "#59c9020f",
      className: "text-gray-900",
      link: "",
    },
    {
      id: "sales",
      title: "المبيعات",
      value: formatCurrency(81000018.9),
      percentage: "10% منذ آخر شهر",
      bgColor: "",
      className: "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white",
      link: "/dashboard/wallet",
    },
  ];
  const studentCards: StatCard[] = [
    {
      id: "purchases",
      title: "المشتريات",
      value: "0",
      iconColor: "bg-pink-500",
      bgColor: "#c902790f",
      className: "text-gray-900",
      link: "/dashboard/purchases",
    },
    {
      id: "favorites",
      title: "المفضلة",
      value: "0",
      iconColor: "bg-green-500",
      bgColor: "#59c9020f",
      className: "text-gray-900",
      link: "/dashboard/favorites",
    },
    {
      id: "affiliate-marketing",
      title: "التسويق بالعمولة",
      value: formatCurrency(0),
      percentage: "100.00%",
      bgColor: "",
      className: "bg-gradient-to-r from-purple-500 to-purple-600 text-white",
      link: "",
    },
  ];
  const baseCards: StatCard[] = [
    {
      id: "courses",
      title: "المواد التعليمية",
      value: "0",
      iconColor: "bg-blue-500",
      bgColor: "#0062ff0f",
      className: "text-gray-900",
      link:
        userType === UserType.ACADEMY
          ? "/dashboard/courses"
          : "/dashboard/my-courses",
    },
  ];

  const statsCards = [
    ...baseCards,
    ...(userType === UserType.ACADEMY ? academyCards : studentCards),
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:sm:grid-cols-3 xl:grid-cols-4 gap-6">
      {statsCards.map((card) => (
        <Link
          key={card.id}
          to={card.link}
          className={`block p-6 rounded-2xl shadow-sm transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer ${card.className}`}
          style={
            card.bgColor && card.bgColor !== ""
              ? { backgroundColor: card.bgColor }
              : {}
          }
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium opacity-80">{card.title}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">{card.value}</span>
                {card.percentage && (
                  <p className="text-xs mt-1 opacity-60">
                    {card.percentage} منذ آخر شهر
                  </p>
                )}
              </div>
            </div>
            {card.iconColor && (
              <div
                className={`w-12 h-12 ${card.iconColor} rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-110`}
              >
                {card.id === "courses" && (
                  <Users className="w-6 h-6 text-white" />
                )}
                {card.id === "purchases" && (
                  <ShoppingBag className="w-6 h-6 text-white" />
                )}
                {card.id === "favorites" && (
                  <Heart className="w-6 h-6 text-white" />
                )}
                {card.id === "students" && (
                  <GraduationCap className="w-6 h-6 text-white" />
                )}
                {card.id === "digital-products" && (
                  <Package className="w-6 h-6 text-white" />
                )}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
export default StatisticsCards;
