import { Plus, Settings, Eye, Trash2, Image, FileText, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCertificateTemplates } from "@/features/dashboard/certificates/hooks/useCertificatesQueries";
import { 
  useDeleteCertificateTemplate 
} from "@/features/dashboard/certificates/hooks/useCertificatesMutations";
import { useCurrentUserProfile } from "@/features/dashboard/profile/hooks";
import { getAcademyDetails } from "@/lib/academy";
import type { User } from "@/types/user";
import type { CertificateTemplate } from "@/types/certificate";
import { toast } from "sonner";

function CertificateTemplates() {
  const { data: user } = useCurrentUserProfile();
  const academy = getAcademyDetails(user as User);
  
  const { data: templatesData, isPending, isError } = useCertificateTemplates();
  const deleteTemplate = useDeleteCertificateTemplate();

  const handleDeleteTemplate = async (templateId: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا القالب؟")) {
      try {
        await deleteTemplate.mutateAsync(templateId);
        toast.success("تم حذف القالب بنجاح");
      } catch (error) {
        toast.error("فشل في حذف القالب");
      }
    }
  };

  const getTemplateTypeText = (type: string) => {
    switch (type) {
      case "default":
        return "افتراضي";
      case "academy_default":
        return "أكاديمية افتراضي";
      case "course_specific":
        return "مخصص للدورة";
      default:
        return "غير معروف";
    }
  };

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case "default":
        return "bg-gray-100 text-gray-700";
      case "academy_default":
        return "bg-blue-100 text-blue-700";
      case "course_specific":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500">جارٍ تحميل القوالب...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-red-500">حدث خطأ في تحميل القوالب</span>
      </div>
    );
  }

  const templates = templatesData?.data?.templates || [];

  return (
    <div className="space-y-6">
      <Header />

      {/* Empty State */}
      {templates.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد قوالب شهادات</h3>
          <p className="text-gray-500 mb-6">ابدأ بإنشاء قالب شهادة لأكاديميتك</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            إنشاء قالب جديد
          </Button>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template: CertificateTemplate) => (
          <TemplateCard
            key={template.id}
            template={template}
            onDelete={handleDeleteTemplate}
            getTemplateTypeText={getTemplateTypeText}
            getTemplateTypeColor={getTemplateTypeColor}
          />
        ))}
      </div>
    </div>
  );
}

export default CertificateTemplates;

// Template Card Component
interface TemplateCardProps {
  template: CertificateTemplate;
  onDelete: (id: number) => void;
  getTemplateTypeText: (type: string) => string;
  getTemplateTypeColor: (type: string) => string;
}

function TemplateCard({
  template,
  onDelete,
  getTemplateTypeText,
  getTemplateTypeColor,
}: TemplateCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Template Preview */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        {template.background_image ? (
          <img 
            src={template.background_image}
            alt={template.template_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Image className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">لا توجد صورة خلفية</p>
            </div>
          </div>
        )}
        
        {/* Template Type Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTemplateTypeColor(template.template_type)}`}>
            {getTemplateTypeText(template.template_type)}
          </span>
        </div>

        {/* Default Badge */}
        {template.is_default && (
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
              افتراضي
            </span>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute bottom-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            template.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {template.is_active ? "نشط" : "غير نشط"}
          </span>
        </div>
      </div>

      {/* Template Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {template.template_name}
        </h3>
        
        {/* Template Details */}
        <div className="space-y-2 mb-4 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <span>تاريخ الإنشاء:</span>
            <span>{new Date(template.created_at).toLocaleDateString('ar-SA')}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>آخر تحديث:</span>
            <span>{new Date(template.updated_at).toLocaleDateString('ar-SA')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Settings className="w-4 h-4 mr-2" />
            تحرير
          </Button>
          <Button 
            size="sm"
            variant="outline"
            className="px-3"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button 
            size="sm"
            variant="outline"
            className="px-3"
          >
            <Palette className="w-4 h-4" />
          </Button>
          {!template.is_default && (
            <Button 
              size="sm"
              variant="outline"
              className="px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => onDelete(template.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <FileText className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            قوالب الشهادات
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          إنشاء قالب جديد
        </Button>
      </div>
    </div>
  );
}











