/**
 * مكونات البث المباشر
 * تحتوي على جميع المكونات اللازمة لتشغيل وإدارة جلسات البث المباشر
 */

// استيراد المكونات أولاً
import { VideoPlayer } from './VideoPlayer';
import { ChatSidebar } from './ChatSidebar';
import { ParticipantsPanel } from './ParticipantsPanel';
import { QuizModal } from './QuizModal';

// مكونات عرض الفيديو والوسائط
export { VideoPlayer } from './VideoPlayer';

// مكونات التفاعل والدردشة
export { ChatSidebar } from './ChatSidebar';
export { ParticipantsPanel } from './ParticipantsPanel';

// مكونات الاختبارات والأنشطة التفاعلية
export { QuizModal } from './QuizModal';

// تصدير جميع المكونات كمجموعة واحدة
export const LiveStreamComponents = {
  VideoPlayer,
  ChatSidebar,
  ParticipantsPanel,
  QuizModal
} as const;