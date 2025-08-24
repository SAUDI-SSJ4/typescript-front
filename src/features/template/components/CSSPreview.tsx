import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Code, Palette } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CSSPreviewProps {
  customCSS: string;
}

const CSSPreview: React.FC<CSSPreviewProps> = ({ customCSS }) => {
  const [showPreview, setShowPreview] = useState(false);

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const hasCSS = customCSS && customCSS.trim().length > 0;

  return (
    <Card className="shadow-sm border-0 bg-blue-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-800 text-sm font-medium">
            <Eye className="w-4 h-4 text-blue-600" />
            معاينة CSS المخصص
          </CardTitle>
          {hasCSS && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Code className="w-3 h-3 ml-1" />
              نشط
            </Badge>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          اضغط على "معاينة" لرؤية تأثير CSS المخصص على عناصر تجريبية
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={togglePreview}
            disabled={!hasCSS}
            className="w-full"
          >
            {showPreview ? (
              <>
                <EyeOff className="w-4 h-4 ml-2" />
                إخفاء المعاينة
              </>
            ) : (
              <>
                <Eye className="w-4 h-4 ml-2" />
                عرض المعاينة
              </>
            )}
          </Button>

          {showPreview && hasCSS && (
            <div className="space-y-4 p-4 bg-white rounded-lg border">
              <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                عناصر تجريبية
              </h4>
              
              {/* Preview Elements */}
              <div className="space-y-3">
                <div className="custom-preview-element p-3 bg-gray-50 rounded border">
                  <h5 className="font-medium text-gray-900">عنوان تجريبي</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    هذا نص تجريبي لمعاينة تأثير CSS المخصص على العناصر
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button className="custom-button px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    زر تجريبي
                  </button>
                  <button className="custom-button-secondary px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                    زر ثانوي
                  </button>
                </div>
                
                <div className="custom-card p-4 bg-white border rounded-lg shadow-sm">
                  <div className="custom-card-header mb-2">
                    <h6 className="font-medium text-gray-900">بطاقة تجريبية</h6>
                  </div>
                  <div className="custom-card-content">
                    <p className="text-sm text-gray-600">
                      محتوى البطاقة التجريبية لمعاينة التصميم
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Apply Custom CSS */}
              <style dangerouslySetInnerHTML={{ __html: customCSS }} />
            </div>
          )}
          
          {!hasCSS && (
            <div className="text-center py-8 text-gray-500">
              <Code className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">أضف CSS مخصص لرؤية المعاينة</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CSSPreview;