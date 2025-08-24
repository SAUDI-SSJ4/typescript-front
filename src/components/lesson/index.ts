/**
 * مكونات الدروس
 * تحتوي على جميع المكونات المتعلقة بعرض وإدارة الدروس
 */

// مكونات الدروس الأساسية
export { LessonContent } from './LessonContent';
export { VideoLesson } from './VideoLesson';
export { QuizLesson } from './QuizLesson';
export { InteractiveLesson } from './InteractiveLesson';

// مكونات إدارة الدروس
export { LessonsList } from './LessonsList';
export { EmptyLessonState } from './EmptyLessonState';

// مكونات التنقل والعرض المحمول
export { MobileLessonsDropdown } from './MobileLessonsDropdown';
export { MobileMenuButton } from './MobileMenuButton';

// مساعد الذكاء الاصطناعي للدروس
export { AIAssistant } from './AIAssistant';

// أنواع مكونات الدروس
export type LessonComponentType = 
  | 'video'
  | 'quiz' 
  | 'interactive'
  | 'content';

// واجهة مكون الدرس الأساسية
export interface BaseLessonProps {
  lessonId: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
  onComplete?: () => void;
}