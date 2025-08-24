import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Settings, Save, Undo2, Redo2, Maximize2, Minimize2, Monitor, Tablet, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import WebBuilderControls from "./WebBuilderControls";

interface WebBuilderLayoutProps {
  title: string;
  children?: React.ReactNode;
  previewComponent: React.ReactNode;
  onSave?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  showBuilderControls?: boolean;
}

export default function WebBuilderLayout({
  title,
  children,
  previewComponent,
  onSave,
  onUndo,
  onRedo,
  canUndo = false,
  canRedo = false,
  showBuilderControls = true,
}: WebBuilderLayoutProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleSettingsChange = (settings: any) => {
    console.log("Settings changed:", settings);
    // هنا يمكن تطبيق التغييرات على المعاينة
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onUndo}
                disabled={!canUndo}
                className="h-8 px-2"
              >
                <Undo2 className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onRedo}
                disabled={!canRedo}
                className="h-8 px-2"
              >
                <Redo2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === 'desktop' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('desktop')}
                className="p-2"
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('tablet')}
                className="p-2"
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode('mobile')}
                className="p-2"
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Fullscreen Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="gap-2"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              {isFullscreen ? "تصغير" : "ملء الشاشة"}
            </Button>

            {/* Preview Toggle */}
            <Button
              variant={isPreviewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              {isPreviewMode ? "عرض التحرير" : "معاينة"}
            </Button>

            {/* Save Button */}
            <Button
              onClick={onSave}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              <Save className="w-4 h-4" />
              حفظ التغييرات
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn("flex-1 flex overflow-hidden", isFullscreen && "fixed inset-0 top-16 z-50")}>
        {/* Editor Panel */}
        <div className={cn(
          "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
          isPreviewMode ? "w-0 overflow-hidden" : "w-[30%] min-w-[350px]"
        )}>
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">إعدادات التحرير</h2>
            <p className="text-sm text-gray-600 mt-1">
              قم بتعديل الإعدادات وشاهد النتيجة مباشرة
            </p>
          </div>
          
          <div className="flex-1 overflow-hidden">
            {showBuilderControls ? (
              <WebBuilderControls onSettingsChange={handleSettingsChange} />
            ) : (
              <div className="p-4 overflow-y-auto">
                {children}
              </div>
            )}
          </div>
        </div>

        {/* Preview Panel */}
        <div className={cn(
          "flex-1 bg-gray-100 overflow-hidden transition-all duration-300",
          isPreviewMode ? "w-full" : "w-[70%]"
        )}>
          <div className="h-full flex flex-col">
            <div className="bg-white border-b border-gray-200 px-4 py-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">معاينة مباشرة</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  متصل
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto flex justify-center items-start p-4">
              <div className={cn(
                "bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-300",
                viewMode === 'desktop' && "w-full h-full",
                viewMode === 'tablet' && "w-[768px] h-[1024px] scale-75 origin-top",
                viewMode === 'mobile' && "w-96 h-[812px] scale-75 origin-top"
              )}>
                {previewComponent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
