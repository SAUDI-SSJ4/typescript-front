import { toast } from "sonner";
import { CheckCircle, AlertCircle, XCircle, Download, Trash2, Plus, Edit, Sparkles, Zap, Heart, Star } from "lucide-react";

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// تصميم Toast جديد ومبهج مع ألوان المنصة القوية
const getNewToastStyles = (type: 'success' | 'error' | 'warning' | 'info') => {
  const baseStyles = "relative overflow-hidden border-0 shadow-2xl rounded-2xl p-5 font-semibold transform transition-all duration-500 hover:scale-105";
  
  switch (type) {
    case 'success':
      return `${baseStyles} bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 text-white shadow-emerald-500/30`;
    case 'error':
      return `${baseStyles} bg-gradient-to-br from-red-500 via-rose-600 to-pink-700 text-white shadow-red-500/30`;
    case 'warning':
      return `${baseStyles} bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-600 text-white shadow-amber-500/30`;
    case 'info':
      return `${baseStyles} bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 text-white shadow-blue-500/30`;
    default:
      return baseStyles;
  }
};

// إضافة تأثير الشرارة المتحركة
const getSparkleEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-2 right-2 animate-pulse">
        <Sparkles className="h-3 w-3 text-white/60" />
      </div>
      <div className="absolute bottom-2 left-2 animate-bounce" style={{animationDelay: '0.5s'}}>
        <Star className="h-2 w-2 text-white/40" />
      </div>
      <div className="absolute top-1/2 right-1/4 animate-ping" style={{animationDelay: '1s'}}>
        <div className="h-1 w-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
};

export const enhancedToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm">
          <Heart className="h-5 w-5 text-white animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white">{message}</div>
          {options?.description && (
            <div className="text-white/80 text-sm mt-1">{options.description}</div>
          )}
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: options?.duration || 4000,
        className: getNewToastStyles('success'),
        unstyled: true,
      }
    );
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm">
          <Zap className="h-5 w-5 text-white animate-bounce" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white">{message}</div>
          {options?.description && (
            <div className="text-white/80 text-sm mt-1">{options.description}</div>
          )}
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: options?.duration || 5000,
        className: getNewToastStyles('error'),
        unstyled: true,
      }
    );
  },

  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm">
          <AlertCircle className="h-5 w-5 text-white animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white">{message}</div>
          {options?.description && (
            <div className="text-white/80 text-sm mt-1">{options.description}</div>
          )}
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: options?.duration || 4000,
        className: getNewToastStyles('warning'),
        unstyled: true,
      }
    );
  },

  info: (message: string, options?: ToastOptions) => {
    return toast.info(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm">
          <Sparkles className="h-5 w-5 text-white animate-spin" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white">{message}</div>
          {options?.description && (
            <div className="text-white/80 text-sm mt-1">{options.description}</div>
          )}
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: options?.duration || 4000,
        className: getNewToastStyles('info'),
        unstyled: true,
      }
    );
  },

  // تنبيهات مخصصة للعمليات مع التصميم الجديد المبهج
  courseAdded: (courseName: string) => {
    return toast.success(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm animate-bounce">
          <Plus className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-lg">🎉 تم إضافة الدورة بنجاح</div>
          <div className="text-white/90 text-sm mt-1">تم إضافة دورة "{courseName}" إلى قائمة الدورات</div>
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: 5000,
        className: getNewToastStyles('success'),
        unstyled: true,
      }
    );
  },

  courseUpdated: (courseName: string) => {
    return toast.info(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
          <Edit className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-lg">✨ تم تحديث الدورة بنجاح</div>
          <div className="text-white/90 text-sm mt-1">تم تحديث دورة "{courseName}" بنجاح</div>
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: 4000,
        className: getNewToastStyles('info'),
        unstyled: true,
      }
    );
  },

  courseDeleted: (courseName: string) => {
    return toast.error(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm animate-bounce">
          <Trash2 className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-lg">🗑️ تم حذف الدورة</div>
          <div className="text-white/90 text-sm mt-1">تم حذف دورة "{courseName}" من قائمة الدورات</div>
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: 4000,
        className: getNewToastStyles('error'),
        unstyled: true,
      }
    );
  },

  dataExported: (fileName: string) => {
    return toast.success(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
          <Download className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-lg">📁 تم تصدير البيانات بنجاح</div>
          <div className="text-white/90 text-sm mt-1">تم حفظ ملف "{fileName}" في مجلد التحميلات</div>
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: 5000,
        className: getNewToastStyles('success'),
        unstyled: true,
      }
    );
  },

  draftSaved: () => {
    return toast.info(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-lg">💾 تم حفظ المسودة تلقائياً</div>
          <div className="text-white/90 text-sm mt-1">يمكنك المتابعة لاحقاً من حيث توقفت</div>
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: 3000,
        className: getNewToastStyles('info'),
        unstyled: true,
      }
    );
  },

  uploadProgress: (progress: number, fileName: string) => {
    return toast.loading(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm">
          <div className="relative">
            <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-lg">📤 جاري رفع {fileName}...</div>
          <div className="text-white/90 text-sm mt-1">تم رفع {progress}% من الملف</div>
          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
            <div className="bg-white h-2 rounded-full transition-all duration-300" style={{width: `${progress}%`}}></div>
          </div>
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: Infinity,
        className: getNewToastStyles('info'),
        unstyled: true,
      }
    );
  },

  uploadComplete: (fileName: string) => {
    return toast.success(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm animate-bounce">
          <CheckCircle className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-lg">✅ تم رفع الملف بنجاح</div>
          <div className="text-white/90 text-sm mt-1">تم رفع ملف "{fileName}" بنجاح</div>
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: 4000,
        className: getNewToastStyles('success'),
        unstyled: true,
      }
    );
  },

  validationError: (fieldName: string, error: string) => {
    return toast.error(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm animate-bounce">
          <AlertCircle className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-lg">⚠️ خطأ في {fieldName}</div>
          <div className="text-white/90 text-sm mt-1">{error}</div>
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: 5000,
        className: getNewToastStyles('error'),
        unstyled: true,
      }
    );
  },

  networkError: () => {
    return toast.error(
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
          <XCircle className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-white text-lg">🌐 خطأ في الاتصال</div>
          <div className="text-white/90 text-sm mt-1">تحقق من اتصالك بالإنترنت وحاول مرة أخرى</div>
        </div>
        {getSparkleEffect()}
      </div>,
      {
        duration: 6000,
        className: getNewToastStyles('error'),
        unstyled: true,
      }
    );
  },
};

export default enhancedToast;