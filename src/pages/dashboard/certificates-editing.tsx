import CertificateTable from "@/features/certificates/components/CertificateTable";
import { CertificateStats } from "@/features/certificates/components/CertificateStats";
import CertificateFilters from "@/features/certificates/components/CertificateFilters";
import { useState, useMemo } from "react";
import type { Table } from "@tanstack/react-table";
import type { CourseCertificate } from "@/types/certificate";
import { Award, Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";

// بيانات تجريبية للشهادات
const courseCertificates: CourseCertificate[] = [
  {
    id: "CC-001",
    courseName: "دورة تطوير تطبيقات الويب المتقدمة",
    courseId: "COURSE-001",
    certificateTemplate: "النموذج الأساسي",
    issuedCount: 45,
    totalStudents: 67,
    completionRate: 67.2,
    averageGrade: 8.7,
    createdDate: "2024-01-01",
    lastIssued: "2024-01-20",
    status: "active",
    certificateType: "completion",
    validityPeriod: 24,
    requirements: {
      minGrade: 7.0,
      attendanceRequired: 80,
      assignmentsCompleted: true,
    },
  },
  {
    id: "CC-002", 
    courseName: "دورة التسويق الرقمي الشامل",
    courseId: "COURSE-002",
    certificateTemplate: "النموذج المتقدم",
    issuedCount: 32,
    totalStudents: 42,
    completionRate: 76.2,
    averageGrade: 8.2,
    createdDate: "2024-01-05",
    lastIssued: "2024-01-18",
    status: "active",
    certificateType: "completion",
    validityPeriod: 18,
    requirements: {
      minGrade: 6.5,
      attendanceRequired: 75,
      assignmentsCompleted: true,
    },
  },
  {
    id: "CC-003",
    courseName: "دورة الأمن السيبراني",
    courseId: "COURSE-003", 
    certificateTemplate: "النموذج الأساسي",
    issuedCount: 28,
    totalStudents: 35,
    completionRate: 80.0,
    averageGrade: 9.1,
    createdDate: "2024-01-08",
    lastIssued: "2024-01-19",
    status: "active",
    certificateType: "completion",
    validityPeriod: 36,
    requirements: {
      minGrade: 8.0,
      attendanceRequired: 90,
      assignmentsCompleted: true,
    },
  },
  {
    id: "CC-004",
    courseName: "دورة تصميم واجهات المستخدم",
    courseId: "COURSE-004",
    certificateTemplate: "النموذج الإبداعي", 
    issuedCount: 19,
    totalStudents: 28,
    completionRate: 67.9,
    averageGrade: 7.8,
    createdDate: "2024-01-10",
    lastIssued: "2024-01-17",
    status: "active",
    certificateType: "completion",
    validityPeriod: 24,
    requirements: {
      minGrade: 7.0,
      attendanceRequired: 70,
      assignmentsCompleted: true,
    },
  },
  {
    id: "CC-005",
    courseName: "دورة إدارة المشاريع",
    courseId: "COURSE-005",
    certificateTemplate: "النموذج المتقدم",
    issuedCount: 0,
    totalStudents: 15,
    completionRate: 0,
    averageGrade: 0,
    createdDate: "2024-01-15",
    status: "draft",
    certificateType: "completion", 
    validityPeriod: 24,
    requirements: {
      minGrade: 7.5,
      attendanceRequired: 85,
      assignmentsCompleted: true,
    },
  },
];

function CertificatesEditing() {
  const [selectedType, setSelectedType] = useState("الكل");
  const [selectedStatus, setSelectedStatus] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");
  const [table, setTable] = useState<Table<CourseCertificate> | null>(null);

  const filteredCertificates = useMemo(() => {
    return courseCertificates.filter((cert) => {
      const matchesType =
        selectedType === "الكل" || 
        (selectedType === "إنجاز" && cert.certificateType === "completion") ||
        (selectedType === "تميز" && cert.certificateType === "achievement") ||
        (selectedType === "مشاركة" && cert.certificateType === "participation");

      const matchesStatus =
        selectedStatus === "الكل" || 
        (selectedStatus === "نشط" && cert.status === "active") ||
        (selectedStatus === "غير نشط" && cert.status === "inactive") ||
        (selectedStatus === "مسودة" && cert.status === "draft");

      const matchesSearch =
        searchTerm === "" ||
        cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.certificateTemplate.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [selectedType, selectedStatus, searchTerm]);

  const handleClearFilters = () => {
    setSelectedType("الكل");
    setSelectedStatus("الكل");
    setSearchTerm("");
  };

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Award}
        title="إدارة الشهادات"
        actions={
          <Link
            to="/dashboard/certificates-editing/new"
            className={buttonVariants()}
          >
            <Plus className="w-4 h-4 mr-2" />
            شهادة جديدة
          </Link>
        }
      />
      <CertificateStats certificates={filteredCertificates} />
      <CertificateFilters
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onClearFilters={handleClearFilters}
        table={table}
      />
      <CertificateTable certificates={filteredCertificates} onTableReady={setTable} />
    </div>
  );
}

export default CertificatesEditing;

