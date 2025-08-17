import { Wallet, TrendingUp, AlertCircle, CheckCircle, Clock, X } from "lucide-react";
import { useState } from "react";
import WithdrawalModal from "@/components/shared/dashboard/WithdrawalModal";
import FinancialTransactions from "@/components/shared/dashboard/FinancialTransactions";

import { useWalletBalance, useWithdrawalRequests } from "@/features/dashboard/wallet/hooks/useWalletQueries";
import type { WithdrawalRequest } from '@/types/wallet';


// StatCard component for wallet statistics
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

function StatCard({ title, value, icon, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border-0 shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

// WalletStats component
interface WalletStatsProps {
  walletBalance?: { total: number; monthlyRevenue: number; withdrawals: number; partnershipCommissions: number; availableForWithdrawal: number; };
  isLoading?: boolean;
  isError?: boolean;
}

function WalletStats({ walletBalance, isLoading, isError }: WalletStatsProps) {
  const stats = [
    {
      title: "الرصيد المتاح",
      value: isLoading 
        ? "جاري التحميل..." 
        : isError 
          ? "غير متاح" 
          : `${walletBalance?.availableForWithdrawal?.toFixed(2) || "0.00"} ريال`,
      icon: <Wallet className="w-6 h-6 text-blue-600" />,

    },
    {
      title: "السحوبات المعلقة",
      value: isLoading 
        ? "جاري التحميل..." 
        : isError 
          ? "غير متاح" 
          : `${walletBalance?.withdrawals?.toFixed(2) || "0.00"} ريال`,
      icon: <Clock className="w-6 h-6 text-blue-600" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}

function WalletPage() {
  // Get wallet data from API
  const { data: walletBalance, isLoading: isLoadingBalance, isError: isBalanceError } = useWalletBalance();
  const { data: withdrawalRequests = [], isLoading: isLoadingRequests } = useWithdrawalRequests();

  // Loading state
  const isLoading = isLoadingBalance || isLoadingRequests;

  return (
    <div className="space-y-6">
      <Header walletBalance={walletBalance} isLoading={isLoadingBalance} />
      <WalletStats walletBalance={walletBalance} isLoading={isLoadingBalance} isError={isBalanceError} />
      <WalletContent 
        withdrawalRequests={withdrawalRequests}
        isLoading={isLoading}
      />
    </div>
  );
}

function Header({ walletBalance, isLoading }: { walletBalance?: any, isLoading?: boolean }) {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Wallet className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            محفظة الأكاديمية
          </span>
        </div>
      </div>
      <div className="flex items-center">
        <WithdrawalModal availableBalance={walletBalance?.availableForWithdrawal || 0} disabled={isLoading} />
      </div>
    </div>
  );
}

// Withdrawal Request Card component  
function WithdrawalRequestCard({ request }: { request: WithdrawalRequest }) {
  const [showReason, setShowReason] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          badgeColor: 'bg-orange-100 text-orange-700',
          icon: <Clock className="w-4 h-4" />,
          text: 'معلق'
        };
      case 'completed':
        return {
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200', 
          badgeColor: 'bg-green-100 text-green-700',
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'مكتمل'
        };
      case 'rejected':
        return {
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          badgeColor: 'bg-red-100 text-red-700',
          icon: <X className="w-4 h-4" />,
          text: 'مرفوض'
        };
      default:
        return {
          color: 'gray',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          badgeColor: 'bg-gray-100 text-gray-700',
          icon: <AlertCircle className="w-4 h-4" />,
          text: 'غير معروف'
        };
    }
  };

  const statusConfig = getStatusConfig(request.status);

  return (
    <div className={`p-4 ${statusConfig.bgColor} rounded-lg border ${statusConfig.borderColor} space-y-2`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">{request.amount.toLocaleString()} ﷼</p>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span>الطلب: {request.date}</span>
            {request.processedDate && (
              <>
                <span>•</span>
                <span>المعالجة: {request.processedDate}</span>
              </>
            )}
          </div>
        </div>
        <div className={`px-3 py-1 ${statusConfig.badgeColor} rounded-full text-xs font-medium flex items-center gap-1`}>
          {statusConfig.icon}
          {statusConfig.text}
        </div>
      </div>
      
      {/* Show reason button for rejected requests */}
      {request.status === 'rejected' && request.reason && (
        <div className="mt-2">
          <button
            onClick={() => setShowReason(!showReason)}
            className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 font-medium"
          >
            <AlertCircle className="w-3 h-3" />
            {showReason ? 'إخفاء السبب' : 'عرض سبب الرفض'}
          </button>
          
          {showReason && (
            <div className="mt-2 p-3 bg-red-100 border border-red-200 rounded-md">
              <p className="text-xs text-red-800 leading-relaxed">
                <strong>سبب الرفض:</strong> {request.reason}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function WalletContent({ withdrawalRequests, isLoading }: { 
  withdrawalRequests: WithdrawalRequest[];
  isLoading?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Side - 66% of page */}
      <div className="lg:col-span-2 space-y-6">
        {/* Transactions Table - Top */}
        <div>
          <FinancialTransactions />
        </div>


      </div>

      {/* Right Side - 34% of page */}
      <div className="lg:col-span-1">
        {/* Withdrawal History */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">طلبات السحب</h3>
          
          <div className="space-y-3">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="mr-2">جاري تحميل طلبات السحب...</span>
              </div>
            ) : withdrawalRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                لا توجد طلبات سحب
              </div>
            ) : (
              withdrawalRequests.map((request: WithdrawalRequest) => (
                <WithdrawalRequestCard key={request.id} request={request} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WalletPage;
