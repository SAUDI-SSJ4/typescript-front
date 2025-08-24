import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Eye, AlertCircle, CheckCircle } from "lucide-react";

interface AdvancedCSSEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  label?: string;
  disabled?: boolean;
  error?: string;
}

export default function AdvancedCSSEditor({
  value,
  onChange,
  height = 200,
  label = "CSS Editor",
  disabled = false,
  error
}: AdvancedCSSEditorProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  const validateCSS = (css: string): boolean => {
    try {
      // Basic CSS validation - check for balanced braces
      const openBraces = (css.match(/{/g) || []).length;
      const closeBraces = (css.match(/}/g) || []).length;
      return openBraces === closeBraces;
    } catch {
      return false;
    }
  };

  const isValidCSS = validateCSS(value);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Code className="w-4 h-4" />
            {label}
          </Label>
          <div className="flex items-center gap-2">
            {value && (
              <Badge 
                variant={isValidCSS ? "default" : "destructive"}
                className="text-xs"
              >
                {isValidCSS ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    صحيح
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3 mr-1" />
                    خطأ في الصيغة
                  </>
                )}
              </Badge>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="text-xs h-6"
            >
              <Eye className="w-3 h-3 mr-1" />
              {isPreviewMode ? "تحرير" : "معاينة"}
            </Button>
          </div>
        </div>
      )}
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {!isPreviewMode ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            placeholder="/* أدخل CSS مخصص هنا */
body {
  font-family: 'Cairo', sans-serif;
  direction: rtl;
}

.custom-style {
  color: #3B82F6;
  padding: 10px;
}"
            className={`font-mono text-sm resize-none border-0 focus:ring-0 ${
              error ? "border-red-300" : ""
            }`}
            style={{ height: `${height}px` }}
            dir="ltr"
          />
        ) : (
          <div className="p-4 bg-gray-50 text-sm">
            <div className="mb-2 text-xs text-gray-600 font-medium">معاينة CSS:</div>
            <style dangerouslySetInnerHTML={{ __html: value }} />
            <div className="bg-white p-3 border rounded text-right">
              <div className="text-base mb-2">نص تجريبي</div>
              <div className="text-sm text-gray-600">
                هذا نص تجريبي لمعاينة تأثير CSS المخصص
              </div>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      
      <div className="text-xs text-gray-500 space-y-1">
        <div>💡 نصائح للاستخدام:</div>
        <ul className="list-disc list-inside space-y-1 mr-4">
          <li>استخدم متغيرات CSS للألوان: var(--primary-color)</li>
          <li>تأكد من التوافق مع الاتجاه RTL</li>
          <li>اختبر التصميم على أحجام مختلفة للشاشة</li>
        </ul>
      </div>
    </div>
  );
}