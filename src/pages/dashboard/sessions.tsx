import { buttonVariants } from "@/components/ui/button";
import SessionTable from "@/features/sessions/components/SessionTable";
import SessionStats from "@/features/sessions/components/SessionStats";
import SessionFilters from "@/features/sessions/components/SessionFilters";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import { Link } from "react-router-dom";
import { Pages, Routes } from "@/constants/enums";
import { useState, useMemo } from "react";
import { Calendar, Plus, Clock } from "lucide-react";
import type { Table } from "@tanstack/react-table";

interface Session {
  id: number;
  title: string;
  duration: number;
  price: number;
  instructor: string;
  time: string;
}

const sessions: Session[] = [
  {
    id: 2,
    title: "ورشة عمل: تطوير استراتيجية الأعمال الرقمية",
    duration: 120,
    price: 500,
    instructor: "سارة أحمد",
    time: "2:00 م",
  },
  {
    id: 3,
    title: "جلسة تطوير شخصي: بناء الثقة والقيادة",
    duration: 90,
    price: 200,
    instructor: "محمد علي",
    time: "6:00 م",
  },
  {
    id: 4,
    title: "استشارة في تصميم واجهات المستخدم",
    duration: 45,
    price: 250,
    instructor: "فاطمة حسن",
    time: "11:00 ص",
  },
  {
    id: 5,
    title: "ورشة عمل مجانية: مقدمة في ريادة الأعمال",
    duration: 180,
    price: 0,
    instructor: "خالد أحمد",
    time: "9:00 ص",
  },
  {
    id: 6,
    title: "جلسة استشارية: تحسين الأداء المهني",
    duration: 60,
    price: 350,
    instructor: "نورا سالم",
    time: "4:00 م",
  },
];

function AcademySessions() {
  const [minPrice, setMinPrice] = useState(0);
  const [table, setTable] = useState<Table<Session> | null>(null);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const matchesPrice =
        minPrice === 0 ||
        (minPrice === -1 && session.price === 0) ||
        (minPrice > 0 && session.price >= minPrice);

      return matchesPrice;
    });
  }, [minPrice]);

  const handleClearFilters = () => {
    setMinPrice(0);
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Calendar}
        title="الجلسات الخصوصية"
        actions={
          <div className="flex gap-2">
            <Link
              to={`${Routes.DASHBOARD}/${Pages.APPOINTMENTS}`}
              className={buttonVariants({ variant: "outline" })}
            >
              <Clock className="w-4 h-4 mr-2" />
              إدارة المواعيد
            </Link>
            <Link
              to={`${Routes.DASHBOARD}/${Pages.SESSIONS}/${Pages.NEW}`}
              className={buttonVariants()}
            >
              <Plus className="w-4 h-4 mr-2" />
              إضافة جلسة جديدة
            </Link>
          </div>
        }
      />
      <SessionStats sessions={filteredSessions} />
      <SessionFilters
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        onClearFilters={handleClearFilters}
        table={table}
      />
      <SessionTable sessions={filteredSessions} onTableReady={setTable} />
    </div>
  );
}

export default AcademySessions;

