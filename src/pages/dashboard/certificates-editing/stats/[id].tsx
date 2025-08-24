import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Award,
  ArrowRight,
  Calendar,
  Star,
  Search,
  BarChart3,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";

import type { CertificateRecipient, CertificateDetailStats } from "@/types/certificate-recipient";

// Mock data للمثال
const mockRecipients: CertificateRecipient[] = [
  {
    id: "1",
    studentName: "أحمد محمد العلي",
    studentEmail: "ahmed.ali@email.com",
    studentPhone: "+966501234567",
    issueDate: "2024-01-15",
    certificateId: "CERT-001",
    certificateUrl: "https://certificates.example.com/CERT-001",
    finalExamGrade: 95,
    completionPercentage: 100,
    completionDate: "2024-01-10",
  },
  {
    id: "2",
    studentName: "فاطمة أحمد السالم",
    studentEmail: "fatima.salem@email.com",
    studentPhone: "+966507654321",
    issueDate: "2024-01-18",
    certificateId: "CERT-002",
    certificateUrl: "https://certificates.example.com/CERT-002",
    finalExamGrade: 88,
    completionPercentage: 95,
    completionDate: "2024-01-15",
  },
  {
    id: "3",
    studentName: "خالد عبدالله المطيري",
    studentEmail: "khalid.mutairi@email.com",
    studentPhone: "+966503456789",
    issueDate: "2024-01-22",
    certificateId: "CERT-003",
    certificateUrl: "https://certificates.example.com/CERT-003",
    finalExamGrade: 92,
    completionPercentage: 98,
    completionDate: "2024-01-20",
  },
  {
    id: "4",
    studentName: "نورا سعد القحطاني",
    studentEmail: "nora.qahtani@email.com",
    studentPhone: "+966508765432",
    issueDate: "2024-01-25",
    certificateId: "CERT-004",
    certificateUrl: "https://certificates.example.com/CERT-004",
    finalExamGrade: 76,
    completionPercentage: 85,
    completionDate: "2024-01-22",
  },
  {
    id: "5",
    studentName: "سارة عبدالعزيز النصر",
    studentEmail: "sara.alnasr@email.com",
    studentPhone: "+966502468135",
    issueDate: "2024-01-28",
    certificateId: "CERT-005",
    certificateUrl: "https://certificates.example.com/CERT-005",
    finalExamGrade: 89,
    completionPercentage: 92,
    completionDate: "2024-01-25",
  },
];

const mockStats: CertificateDetailStats = {
  totalIssued: 5,
  averageCompletion: 94,
  averageFinalExamGrade: 88,
  lastIssueDate: "2024-01-28",
  topPerformers: mockRecipients.slice(0, 3),
};



export default function CertificateStats() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");


  // Mock certificate name - في التطبيق الحقيقي سيتم جلبها من API
  const certificateName = "دورة تطوير تطبيقات الويب المتقدمة";
  
  // استخدام id لجلب البيانات (في التطبيق الحقيقي)
  console.log('Certificate ID:', id);

  // تصفية البيانات
  const filteredRecipients = mockRecipients.filter(recipient => {
    const matchesSearch = recipient.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipient.studentEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-sm lg:text-base">
              إحصائيات الشهادة - {certificateName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/dashboard/certificates-editing')}>
            <ArrowRight className="w-4 h-4 mr-2" />
            العودة لإدارة الشهادات
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الشهادات المصدرة</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockStats.totalIssued}</p>
              <p className="text-sm mt-2 flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                +25%
              </p>
            </div>
            <div className="text-blue-600">
              <Award className="w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط الإكمال</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockStats.averageCompletion}%</p>
              <p className="text-sm mt-2 flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                +8%
              </p>
            </div>
            <div className="text-blue-600">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">متوسط درجات الاختبار النهائي</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{mockStats.averageFinalExamGrade}%</p>
              <p className="text-sm mt-2 flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                +5%
              </p>
            </div>
            <div className="text-blue-600">
              <Star className="w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border-0 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">آخر شهادة صدرت</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{new Date(mockStats.lastIssueDate).toLocaleDateString('ar-SA')}</p>
            </div>
            <div className="text-blue-600">
              <Calendar className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-lg border-0 shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث بالاسم أو البريد الإلكتروني..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recipients Table */}
      <div className="w-full">
        <div className="hidden lg:block rounded-lg border-0 shadow-sm bg-white overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b border-gray-200">
                  <TableHead className="text-right font-semibold text-gray-700 py-4">اسم الطالب</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700 py-4">تاريخ الإصدار</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700 py-4">الدرجة</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700 py-4">نسبة الإكمال</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700 py-4">رابط الشهادة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecipients.length > 0 ? (
                  filteredRecipients.map((recipient) => (
                    <TableRow key={recipient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <TableCell className="text-right py-4">
                        <div className="font-medium text-gray-900">{recipient.studentName}</div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <div className="text-sm text-gray-600">
                          {new Date(recipient.issueDate).toLocaleDateString('ar-SA')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${
                            recipient.finalExamGrade >= 90 ? 'text-green-600' : 
                            recipient.finalExamGrade >= 80 ? 'text-blue-600' : 
                            'text-yellow-600'
                          }`}>
                            {recipient.finalExamGrade}%
                          </span>
                          {recipient.finalExamGrade >= 90 && <Star className="w-4 h-4 text-yellow-500" />}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${
                            recipient.completionPercentage >= 95 ? 'text-green-600' : 
                            recipient.completionPercentage >= 85 ? 'text-blue-600' : 
                            'text-yellow-600'
                          }`}>
                            {recipient.completionPercentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          onClick={() => window.open(recipient.certificateUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          عرض الشهادة
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                      لا توجد نتائج للبحث الحالي
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View - مطابق لتنسيق المدونات */}
          <div className="block lg:hidden space-y-4">
            {filteredRecipients.length > 0 ? (
              filteredRecipients.map((recipient) => (
                <div
                  key={recipient.id}
                  className="bg-white rounded-lg border-0 shadow-sm p-4 space-y-3"
                >
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm leading-5 text-right">
                      {recipient.studentName}
                    </h3>
                    <p className="text-xs text-gray-500 text-right">
                      {new Date(recipient.issueDate).toLocaleDateString('ar-SA')}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        recipient.finalExamGrade >= 90 ? 'text-green-600' : 
                        recipient.finalExamGrade >= 80 ? 'text-blue-600' : 
                        'text-yellow-600'
                      }`}>
                        {recipient.finalExamGrade}%
                      </span>
                      {recipient.finalExamGrade >= 90 && <Star className="w-4 h-4 text-yellow-500" />}
                    </div>
                    <div className="text-sm text-gray-600">
                      {recipient.completionPercentage}% إكمال
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => window.open(recipient.certificateUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    عرض الشهادة
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد نتائج للبحث الحالي.
              </div>
            )}
          </div>

          {/* Pagination - مطابق لتنسيق المدونات */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <div className="text-sm text-muted-foreground">
              عرض {filteredRecipients.length} من أصل {filteredRecipients.length} طالب
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={true}
              >
                السابق
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={true}
              >
                التالي
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}