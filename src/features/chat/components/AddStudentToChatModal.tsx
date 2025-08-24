import React, { useState, useMemo } from 'react';
import { Search, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isEnrolled: boolean;
}

interface AddStudentToChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (studentId: string) => void;
  existingConversationIds: string[];
}

// Mock student data with real profile images
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'أحمد محمد علي',
    email: 'ahmed.mohammed@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isEnrolled: true,
  },
  {
    id: '2',
    name: 'فاطمة سالم',
    email: 'fatma.salem@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    isEnrolled: true,
  },
  {
    id: '3',
    name: 'عمر خالد',
    email: 'omar.khaled@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isEnrolled: true,
  },
  {
    id: '4',
    name: 'سارة أحمد',
    email: 'sara.ahmed@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    isEnrolled: true,
  },
  {
    id: '5',
    name: 'محمد حسن',
    email: 'mohammed.hassan@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    isEnrolled: true,
  },
  {
    id: '6',
    name: 'نور الهدى',
    email: 'noor.alhuda@example.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    isEnrolled: true,
  },
  {
    id: '7',
    name: 'يوسف عبدالله',
    email: 'yousef.abdullah@example.com',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    isEnrolled: true,
  },
  {
    id: '8',
    name: 'ريم محمود',
    email: 'reem.mahmoud@example.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    isEnrolled: true,
  },
];

function AddStudentToChatModal({
  isOpen,
  onClose,
  onAddStudent,
  existingConversationIds,
}: AddStudentToChatModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter students
  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      // Exclude students who already have conversations
      if (existingConversationIds.includes(student.id)) {
        return false;
      }

      const matchesSearch = 
        searchQuery === '' ||
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch && student.isEnrolled;
    });
  }, [searchQuery, existingConversationIds]);

  const handleAddStudent = (studentId: string) => {
    onAddStudent(studentId);
    onClose();
  };

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-right">إضافة طالب للمحادثة</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Only */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="البحث عن طالب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>

          {/* Students List */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>لا توجد طلاب متاحين</p>
                <p className="text-sm text-gray-400 mt-1">
                  جميع الطلاب المسجلين لديهم محادثات بالفعل
                </p>
              </div>
            ) : (
              filteredStudents.map(student => (
                <div
                  key={student.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Student Avatar */}
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=3b82f6&color=fff&size=48`;
                      }}
                    />

                    {/* Student Info */}
                    <div>
                      <h4 className="font-medium text-gray-900 text-right">{student.name}</h4>
                    </div>
                  </div>

                  {/* Chat Button */}
                  <Button
                    size="sm"
                    onClick={() => handleAddStudent(student.id)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    variant="outline"
                  >
                    <MessageCircle className="w-4 h-4 ml-1" />
                    محادثة
                  </Button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={handleClose}>
              إلغاء
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddStudentToChatModal;