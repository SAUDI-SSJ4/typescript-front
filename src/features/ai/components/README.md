# مكونات المواد التعليمية الذكية

هذا المجلد يحتوي على جميع المكونات المتعلقة بصفحة المواد التعليمية الذكية (AI Learning Materials).

## هيكل المكونات

### `StatsCard.tsx`
مكون بطاقة الإحصائيات المتحركة مع تدرجات لونية جميلة.

**الخصائص:**
- `title`: عنوان الإحصائية
- `value`: القيمة الرقمية
- `subtitle`: النص الفرعي
- `icon`: أيقونة من lucide-react
- `gradient`: فئة CSS للتدرج اللوني

### `SearchAndFilters.tsx`
مكون البحث والفلاتر مع شارات تفاعلية تظهر عدد العناصر لكل فلتر.

**الخصائص:**
- `searchTerm`: نص البحث الحالي
- `setSearchTerm`: دالة تحديث نص البحث
- `selectedStatus`: الحالة المحددة حالياً
- `setSelectedStatus`: دالة تحديث الحالة
- `materialsCount`: كائن يحتوي على أعداد المواد لكل حالة

### `MaterialCard.tsx`
مكون بطاقة المادة التعليمية مع جميع المعلومات والوظائف.

**الخصائص:**
- `material`: كائن المادة التعليمية (LearningMaterial)
- `onDelete`: دالة حذف المادة
- `onSendMessage`: دالة إرسال رسالة للمساعد الذكي

**الميزات:**
- عرض معلومات الملف والحالة
- شريط تقدم للمعالجة الجارية
- إحصائيات البطاقات والاختبارات
- واجهة دردشة مع المساعد الذكي
- أزرار للدراسة والحذف

### `PageHeader.tsx`
مكون رأس الصفحة مع العنوان وأزرار الإجراءات.

**الخصائص:**
- `isUploading`: حالة الرفع الجارية
- `onFileUpload`: دالة معالجة رفع الملفات

**الميزات:**
- تصميم جذاب مع خلفية متحركة
- أزرار لإضافة مادة جديدة ورفع ملف سريع
- معلومات إضافية عن الميزات المدعومة

### `EmptyState.tsx`
مكون الحالة الفارغة عند عدم وجود مواد تعليمية.

**الخصائص:**
- `onFileUpload`: دالة معالجة رفع الملفات

**الميزات:**
- تصميم تحفيزي وجذاب
- عرض الميزات الرئيسية للنظام
- زر رفع أول ملف

## استخدام المكونات

```tsx
import { 
  StatsCard, 
  SearchAndFilters, 
  MaterialCard, 
  PageHeader, 
  EmptyState,
  WelcomeBanner,
  MaterialCardSkeleton,
  MaterialsGridSkeleton
} from "@/features/ai/components";
```

### `WelcomeBanner.tsx`
مكون ترحيب تفاعلي للمستخدمين الجدد مع دليل سريع للميزات.

**الخصائص:**
- `onDismiss`: دالة إخفاء البانر

**الميزات:**
- عرض خطوات تفاعلية للميزات الرئيسية
- تصميم جذاب مع تدرجات لونية متحركة
- إمكانية التنقل بين الخطوات

### `LoadingSkeleton.tsx`
مكونات Loading Skeleton لتحسين تجربة التحميل.

**المكونات:**
- `MaterialCardSkeleton`: skeleton لبطاقة مادة واحدة
- `MaterialsGridSkeleton`: skeleton لشبكة من البطاقات

**الخصائص (MaterialsGridSkeleton):**
- `count`: عدد البطاقات المراد عرضها (افتراضي: 6)

## نوع البيانات

```tsx
interface LearningMaterial {
  id: string;
  title: string;
  originalFileName: string;
  fileType: 'pdf' | 'docx';
  uploadDate: string;
  processingStatus: 'processing' | 'completed' | 'failed';
  progress: number;
  summary: string;
  flashcardsCount: number;
  quizzesCount: number;
  chatMessages: number;
  thumbnail: string;
  fileSize: string;
  aiInsights: string[];
}
```

## التحسينات المطبقة

1. **تجربة المستخدم**: 
   - تدرجات لونية جميلة
   - حركات انتقالية ناعمة
   - تفاعلات بصرية

2. **الأداء**: 
   - تقسيم المكونات لإعادة الاستخدام
   - تحسين إعادة الرندر

3. **سهولة الصيانة**: 
   - فصل المنطق عن العرض
   - مكونات قابلة للإعادة الاستخدام
   - توثيق شامل

4. **التصميم الموحد**: 
   - اتساق مع باقي المنصة
   - استخدام نظام التصميم الموحد
   - ألوان وخطوط متناسقة
