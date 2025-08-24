import { useAuth } from "@/features/auth/hooks/useAuthStore";

export function AuthStatus() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-blue-800">جاري التحقق من حالة المصادقة...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded-lg border ${
        isAuthenticated
          ? "bg-green-50 border-green-200 text-green-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">حالة المصادقة:</span>
          <span>{isAuthenticated ? "✅ مسجل الدخول" : "❌ غير مسجل"}</span>
        </div>

        {user && (
          <div className="space-y-1 text-sm">
            <div>
              <span className="font-medium">الاسم:</span> {user.name}
            </div>
            <div>
              <span className="font-medium">البريد الإلكتروني:</span>{" "}
              {user.email}
            </div>
            <div>
              <span className="font-medium">نوع الحساب:</span>{" "}
              {user.user_type === "ACADEMY" ? "طالب" : "أكاديمية"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
