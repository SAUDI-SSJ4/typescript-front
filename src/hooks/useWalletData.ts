import { useMemo } from 'react';
import type { Transaction, WalletStats, WalletBalance, WithdrawalRequest } from '@/types/wallet';

// Sample transaction data - in a real app, this would come from an API
const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-001",
    date: "١٤٤٦/١٢/٢٢هـ",
    type: "بيع دورة",
    typeColor: "blue",
    product: "دورة البرمجة المتقدمة",
    student: "أحمد محمد علي",
    change: "+850",
    after: "81,000,019.8",
    status: "مكتمل",
    amount: 850
  },
  {
    id: "TXN-002",
    date: "١٤٤٦/١٢/٢١هـ",
    type: "عمولة شراكة",
    typeColor: "purple",
    product: "برنامج الشراكة المتقدم",
    student: "سارة أحمد",
    change: "+320",
    after: "80,999,169.8",
    status: "مكتمل",
    amount: 320
  },
  {
    id: "TXN-003",
    date: "١٤٤٦/١٢/٢٠هـ",
    type: "سحب أرباح",
    typeColor: "red",
    product: "-",
    student: "-",
    change: "-5000",
    after: "80,998,849.8",
    status: "مكتمل",
    amount: -5000
  },
  {
    id: "TXN-004",
    date: "١٤٤٦/١٢/١٩هـ",
    type: "بيع دورة",
    typeColor: "blue",
    product: "دورة تصميم الجرافيك",
    student: "فاطمة علي",
    change: "+1200",
    after: "81,003,849.8",
    status: "مكتمل",
    amount: 1200
  },
  {
    id: "TXN-005",
    date: "١٤٤٦/١٢/١٨هـ",
    type: "بيع دورة",
    typeColor: "blue",
    product: "دورة التسويق الرقمي",
    student: "محمد خالد",
    change: "+750",
    after: "81,002,649.8",
    status: "مكتمل",
    amount: 750
  },
  {
    id: "TXN-006",
    date: "١٤٤٦/١٢/١٧هـ",
    type: "عمولة شراكة",
    typeColor: "purple",
    product: "برنامج الشراكة",
    student: "نورا سعد",
    change: "+180",
    after: "81,001,899.8",
    status: "مكتمل",
    amount: 180
  },
  {
    id: "TXN-007",
    date: "١٤٤٦/١٢/١٦هـ",
    type: "بيع دورة",
    typeColor: "blue",
    product: "دورة إدارة المشاريع",
    student: "عبدالله أحمد",
    change: "+950",
    after: "81,001,719.8",
    status: "مكتمل",
    amount: 950
  },
  {
    id: "TXN-008",
    date: "١٤٤٦/١٢/١٥هـ",
    type: "رسوم إدارية",
    typeColor: "orange",
    product: "-",
    student: "-",
    change: "-50",
    after: "81,000,769.8",
    status: "مكتمل",
    amount: -50
  }
];

// Sample withdrawal requests data
const SAMPLE_WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
  {
    id: "WR-001",
    status: "pending",
    amount: 1111,
    date: "١٤٤٦/١٢/١٣هـ",
    requestDate: "٢٠٢٤/٠١/١٣",
  },
  {
    id: "WR-002", 
    status: "completed",
    amount: 5000,
    date: "١٤٤٦/١٢/١٠هـ",
    requestDate: "٢٠٢٤/٠١/١٠",
    processedDate: "٢٠٢٤/٠١/١٢",
  },
  {
    id: "WR-003",
    status: "rejected",
    amount: 8500,
    date: "١٤٤٦/١٢/٠٨هـ", 
    requestDate: "٢٠٢٤/٠١/٠٨",
    processedDate: "٢٠٢٤/٠١/٠٩",
    reason: "الحد الأدنى للسحب لم يتم الوصول إليه. يجب أن يكون المبلغ أقل من 5000 ريال للسحب الأول."
  },
  {
    id: "WR-004",
    status: "completed", 
    amount: 2500,
    date: "١٤٤٦/١٢/٠٥هـ",
    requestDate: "٢٠٢٤/٠١/٠٥",
    processedDate: "٢٠٢٤/٠١/٠٧",
  },
  {
    id: "WR-005",
    status: "rejected",
    amount: 12000,
    date: "١٤٤٦/١١/٢٨هـ",
    requestDate: "٢٠٢٣/١٢/٢٨", 
    processedDate: "٢٠٢٣/١٢/٢٩",
    reason: "بيانات البنك غير مكتملة. يرجى التأكد من صحة رقم الآيبان واسم صاحب الحساب قبل إعادة المحاولة."
  }
];

export function useWalletData() {
  // Calculate wallet statistics
  const walletStats = useMemo((): WalletStats => {
    const totalRevenue = 139000;
    const totalExpenses = 21000;
    const netProfit = totalRevenue - totalExpenses;
    const monthlyGrowth = 12.5;
    const totalStudents = 1247;
    const activeCourses = 28;
    
    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      monthlyGrowth,
      totalStudents,
      activeCourses
    };
  }, []);

  // Calculate wallet balance
  const walletBalance = useMemo((): WalletBalance => {
    const total = 81000019.8;
    const monthlyRevenue = 92000;
    const withdrawals = 15000;
    const partnershipCommissions = 8500;
    const availableForWithdrawal = total - 10000; // Keep minimum balance
    
    return {
      total,
      monthlyRevenue,
      withdrawals,
      partnershipCommissions,
      availableForWithdrawal
    };
  }, []);

  // Get transactions
  const transactions = useMemo(() => SAMPLE_TRANSACTIONS, []);

  // Calculate transaction statistics
  const transactionStats = useMemo(() => {
    const totalTransactions = transactions.length;
    const completedTransactions = transactions.filter(t => t.status === "مكتمل").length;
    const pendingTransactions = transactions.filter(t => t.status === "معلق").length;
    
    const totalIncome = transactions
      .filter(t => t.amount && t.amount > 0)
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    const totalExpenses = transactions
      .filter(t => t.amount && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount || 0), 0);
    
    return {
      totalTransactions,
      completedTransactions,
      pendingTransactions,
      totalIncome,
      totalExpenses
    };
  }, [transactions]);

  // Filter transactions by type
  const getTransactionsByType = useMemo(() => {
    return (type: string) => {
      return transactions.filter(transaction => transaction.type === type);
    };
  }, [transactions]);

  // Get recent transactions
  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  // Get withdrawal requests
  const withdrawalRequests = useMemo(() => SAMPLE_WITHDRAWAL_REQUESTS, []);

  // Calculate withdrawal statistics
  const withdrawalStats = useMemo(() => {
    const totalRequests = withdrawalRequests.length;
    const pendingRequests = withdrawalRequests.filter(r => r.status === "pending").length;
    const completedRequests = withdrawalRequests.filter(r => r.status === "completed").length;
    const rejectedRequests = withdrawalRequests.filter(r => r.status === "rejected").length;
    
    const totalWithdrawnAmount = withdrawalRequests
      .filter(r => r.status === "completed")
      .reduce((sum, r) => sum + r.amount, 0);
    
    const totalPendingAmount = withdrawalRequests
      .filter(r => r.status === "pending")
      .reduce((sum, r) => sum + r.amount, 0);

    const totalRejectedAmount = withdrawalRequests
      .filter(r => r.status === "rejected")
      .reduce((sum, r) => sum + r.amount, 0);
    
    return {
      totalRequests,
      pendingRequests,
      completedRequests,
      rejectedRequests,
      totalWithdrawnAmount,
      totalPendingAmount,
      totalRejectedAmount
    };
  }, [withdrawalRequests]);

  return {
    walletStats,
    walletBalance,
    transactions,
    transactionStats,
    getTransactionsByType,
    recentTransactions,
    withdrawalRequests,
    withdrawalStats
  };
}

export default useWalletData;