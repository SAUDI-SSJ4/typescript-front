import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import AdvancedCSSEditor from "@/components/ui/css-editor";
import { 
  Palette, 
  Type, 
  Image as ImageIcon, 
  Code, 
  Settings2,
  Paintbrush,
  Layout,
  Sparkles
} from "lucide-react";

interface WebBuilderControlsProps {
  onSettingsChange?: (settings: any) => void;
}

export default function WebBuilderControls({ onSettingsChange }: WebBuilderControlsProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    academyName: "أكاديمية سيان",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937",
    customCSS: "",
    logo: "",
    favicon: "",
  });

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  const tabs = [
    { id: "general", label: "عام", icon: Settings2 },
    { id: "colors", label: "الألوان", icon: Palette },
    { id: "typography", label: "الخطوط", icon: Type },
    { id: "layout", label: "التخطيط", icon: Layout },
    { id: "advanced", label: "متقدم", icon: Code },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">اسم الأكاديمية</Label>
              <Input
                value={settings.academyName}
                onChange={(e) => handleSettingChange("academyName", e.target.value)}
                placeholder="أدخل اسم الأكاديمية"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">الشعار</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={settings.logo}
                  onChange={(e) => handleSettingChange("logo", e.target.value)}
                  placeholder="رابط الشعار"
                />
                <Button size="sm" variant="outline">
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        );

      case "colors":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">اللون الأساسي</Label>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                  style={{ backgroundColor: settings.primaryColor }}
                  onClick={() => document.getElementById('primaryColor')?.click()}
                />
                <Input
                  id="primaryColor"
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                  className="sr-only"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">اللون الثانوي</Label>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                  style={{ backgroundColor: settings.secondaryColor }}
                  onClick={() => document.getElementById('secondaryColor')?.click()}
                />
                <Input
                  id="secondaryColor"
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => handleSettingChange("secondaryColor", e.target.value)}
                  className="sr-only"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => handleSettingChange("secondaryColor", e.target.value)}
                  placeholder="#10B981"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">لون الخلفية</Label>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                  style={{ backgroundColor: settings.backgroundColor }}
                  onClick={() => document.getElementById('backgroundColor')?.click()}
                />
                <Input
                  id="backgroundColor"
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => handleSettingChange("backgroundColor", e.target.value)}
                  className="sr-only"
                />
                <Input
                  value={settings.backgroundColor}
                  onChange={(e) => handleSettingChange("backgroundColor", e.target.value)}
                  placeholder="#FFFFFF"
                />
              </div>
            </div>
          </div>
        );

      case "typography":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">لون النص</Label>
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
                  style={{ backgroundColor: settings.textColor }}
                  onClick={() => document.getElementById('textColor')?.click()}
                />
                <Input
                  id="textColor"
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => handleSettingChange("textColor", e.target.value)}
                  className="sr-only"
                />
                <Input
                  value={settings.textColor}
                  onChange={(e) => handleSettingChange("textColor", e.target.value)}
                  placeholder="#1F2937"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">حجم الخط الأساسي</Label>
              <Input
                type="number"
                placeholder="16"
                min="12"
                max="24"
              />
            </div>
          </div>
        );

      case "layout":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">عرض الحاوية</Label>
              <Input
                placeholder="1200px"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">المسافات الداخلية</Label>
              <Input
                placeholder="20px"
              />
            </div>
          </div>
        );

      case "advanced":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <AdvancedCSSEditor
                value={settings.customCSS}
                onChange={(value) => handleSettingChange("customCSS", value)}
                height={300}
                label="CSS مخصص"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 text-xs"
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              {tabs.find(t => t.id === activeTab)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderTabContent()}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-gray-200 p-4 space-y-2">
        <Button variant="outline" size="sm" className="w-full">
          <Paintbrush className="w-4 h-4 mr-2" />
          إعادة تعيين الألوان
        </Button>
        <Badge variant="secondary" className="w-full justify-center">
          تغييرات غير محفوظة
        </Badge>
      </div>
    </div>
  );
}
