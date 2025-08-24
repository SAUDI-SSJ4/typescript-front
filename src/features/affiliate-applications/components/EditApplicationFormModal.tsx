import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Save, Package } from "lucide-react";

interface EditApplicationFormModalProps {
  trigger?: React.ReactNode;
}

export function EditApplicationFormModal({ trigger }: EditApplicationFormModalProps) {
  const [open, setOpen] = useState(false);

  // إعدادات النموذج المبسطة
  const [formSettings, setFormSettings] = useState({
    // حالة النشاط
    isActive: true,
    
    // الموافقة التلقائية
    autoApprovalEnabled: false,
    
    // رسالة القبول المخصصة
    acceptanceMessage: "مرحباً بك في برنامج التسويق بالعمولة! تم قبول طلبك بنجاح وسيتم التواصل معك قريباً."
  });



  const handleSave = () => {
    console.log("حفظ إعدادات النموذج:", formSettings);
    setOpen(false);
    // هنا يمكن إضافة منطق الحفظ
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Settings className="w-4 h-4 mr-2" />
            تعديل نموذج الطلب
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto" dir="rtl">
        <DialogHeader className="border-b border-gray-100 pb-6">
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3 justify-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            تعديل نموذج طلب التسويق بالعمولة
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-8 pt-6">
          {/* إعدادات النظام */}
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              إعدادات النظام
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* حالة نظام التسويق بالعمولة */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormSettings(prev => ({ ...prev, isActive: !prev.isActive }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formSettings.isActive ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  dir="ltr"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                      formSettings.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <Label className="text-sm font-medium text-gray-700">
                  حالة نظام التسويق بالعمولة
                </Label>
              </div>

              {/* الموافقة التلقائية على الطلبات */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFormSettings(prev => ({ ...prev, autoApprovalEnabled: !prev.autoApprovalEnabled }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formSettings.autoApprovalEnabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                  dir="ltr"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
                      formSettings.autoApprovalEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <Label className="text-sm font-medium text-gray-700">
                  الموافقة التلقائية على الطلبات
                </Label>
              </div>
            </div>
          </div>

          {/* رسالة القبول المخصصة */}
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">رسالة القبول المخصصة</h3>
            <div className="space-y-2">
              <Label htmlFor="acceptanceMessage" className="text-sm font-medium text-gray-700 text-right block">
                الرسالة التي ستُرسل للمتقدمين عند قبول طلباتهم
              </Label>
              <Textarea
                id="acceptanceMessage"
                value={formSettings.acceptanceMessage}
                onChange={(e) => setFormSettings(prev => ({ ...prev, acceptanceMessage: e.target.value }))}
                placeholder="اكتب رسالة الترحيب والقبول هنا..."
                className="!bg-transparent text-right !border-border !shadow-none focus-visible:ring-0 focus-visible:border-border resize-none"
                dir="rtl"
                rows={4}
              />
            </div>
          </div>

          {/* أزرار التحكم */}
          <div className="flex justify-start gap-3 pt-6 border-t" dir="rtl">
            <Button type="submit">
              <Save className="w-4 h-4 ml-2" />
              حفظ التغييرات
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}