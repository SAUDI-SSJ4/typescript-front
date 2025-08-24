import type { Chapter } from '@/types/lesson';

export const chaptersData: Chapter[] = [
  {
    id: 'ch1',
    title: 'أساسيات HTML',
    isExpanded: true,
    progress: 67,
    lessons: [
      { id: 'l1-1', title: 'مقدمة HTML', type: 'video', duration: '12 دقيقة', isCompleted: true, isActive: false },
      { id: 'l1-2', title: 'تطبيق HTML', type: 'interactive', duration: '15 دقيقة', isCompleted: false, isActive: false },
      { id: 'l1-3', title: 'اختبار HTML', type: 'quiz', duration: '10 دقائق', isCompleted: false, isActive: false },
    ]
  },
  {
    id: 'ch2', 
    title: 'CSS الأساسي',
    isExpanded: true,
    progress: 50,
    lessons: [
      { id: 'l2-1', title: 'شرح CSS', type: 'video', duration: '15 دقيقة', isCompleted: true, isActive: true },
      { id: 'l2-2', title: 'تطبيق CSS', type: 'interactive', duration: '18 دقيقة', isCompleted: false, isActive: false },
    ]
  },
  {
    id: 'ch3',
    title: 'JavaScript البسيط',
    isExpanded: false,
    progress: 0,
    lessons: [
      { id: 'l3-1', title: 'مبادئ JavaScript', type: 'video', duration: '20 دقيقة', isCompleted: false, isActive: false },
      { id: 'l3-2', title: 'مشروع بسيط', type: 'interactive', duration: '22 دقيقة', isCompleted: false, isActive: false },
    ]
  }
];