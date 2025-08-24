import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Video,
  Users,
  Settings,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  Camera,
  Mic,
  Monitor,
  Globe,
  Lock,
  Upload,
  Plus,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardPageHeader from "@/components/shared/dashboard/DashboardPageHeader";
import type { CreateStreamData, StreamSettings } from "@/types/live-stream";

const categories = [
  "البرمجة",
  "تطوير الويب",
  "الذكاء الاصطناعي",
  "علوم البيانات",
  "الأمن السيبراني",
  "تطوير التطبيقات",
  "التصميم",
  "التسويق الرقمي"
];

const suggestedTags = [
  "React", "JavaScript", "TypeScript", "Node.js", "Python", 
  "AI", "Machine Learning", "CSS", "HTML", "Database",
  "API", "Backend", "Frontend", "Mobile", "DevOps"
];

export default function NewLiveStreamPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  
  const [streamData, setStreamData] = useState<CreateStreamData>({
    title: "",
    description: "",
    category: "",
    tags: [],
    thumbnailUrl: "",
    settings: {
      video: {
        resolution: "1080p",
        frameRate: 30,
        bitrate: 4000
      },
      audio: {
        quality: "high",
        noiseReduction: true
      },
      streaming: {
        platform: "internal",
        privacy: "public",
        chatModeration: true,
        recordAutomatically: true
      },
      interaction: {
        allowQuestions: true,
        allowReactions: true,
        allowScreenSharing: false,
        maxParticipants: 100
      }
    }
  });

  const handleInputChange = (field: keyof CreateStreamData, value: string) => {
    setStreamData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSettingsChange = (
    category: keyof StreamSettings,
    field: string,
    value: any
  ) => {
    setStreamData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [category]: {
          ...prev.settings[category],
          [field]: value
        }
      }
    }));
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !selectedTags.includes(tag.trim())) {
      const newTags = [...selectedTags, tag.trim()];
      setSelectedTags(newTags);
      setStreamData(prev => ({ ...prev, tags: newTags }));
      setCustomTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    setStreamData(prev => ({ ...prev, tags: newTags }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would create the stream and redirect to it
      console.log("Creating stream:", streamData);
      navigate("/dashboard/ai-learning-materials/live-stream/6"); // Navigate to the stream
    } catch (error) {
      console.error("Failed to create stream:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = streamData.title.trim() && streamData.description.trim() && streamData.category;

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        icon={Video}
        title="إنشاء بث مباشر جديد"
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="font-noto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              العودة
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="bg-blue-600 hover:bg-blue-700 font-noto"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  إنشاء البث
                </>
              )}
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="font-noto">المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-noto">عنوان البث *</Label>
                <Input
                  id="title"
                  placeholder="مثال: ورشة تطوير التطبيقات باستخدام React"
                  value={streamData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="font-noto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-noto">الوصف *</Label>
                <Textarea
                  id="description"
                  placeholder="اكتب وصفاً شاملاً للبث المباشر، ماذا سيتعلم المشاركون؟"
                  value={streamData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={4}
                  className="font-noto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="font-noto">التصنيف *</Label>
                <Select value={streamData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="font-noto">
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="font-noto">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags Section */}
              <div className="space-y-2">
                <Label className="font-noto">العلامات</Label>
                <div className="space-y-3">
                  {/* Selected Tags */}
                  {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="font-noto flex items-center gap-1"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="hover:bg-gray-300 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Add Custom Tag */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="أضف علامة جديدة"
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(customTag);
                        }
                      }}
                      className="font-noto"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addTag(customTag)}
                      disabled={!customTag.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Suggested Tags */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 font-noto">علامات مقترحة:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags
                        .filter(tag => !selectedTags.includes(tag))
                        .slice(0, 8)
                        .map((tag) => (
                          <button
                            key={tag}
                            onClick={() => addTag(tag)}
                            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors font-noto"
                          >
                            + {tag}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-2">
                <Label className="font-noto">الصورة المصغرة</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-noto mb-2">
                    اسحب وأفلت الصورة هنا أو انقر للتحديد
                  </p>
                  <Button variant="outline" size="sm" className="font-noto">
                    اختيار ملف
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 font-noto">
                    PNG, JPG أو GIF حتى 10MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stream Settings */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="font-noto flex items-center gap-2">
                <Settings className="w-5 h-5" />
                إعدادات البث
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="video" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="video" className="font-noto">
                    <Camera className="w-4 h-4 mr-1" />
                    الفيديو
                  </TabsTrigger>
                  <TabsTrigger value="audio" className="font-noto">
                    <Mic className="w-4 h-4 mr-1" />
                    الصوت
                  </TabsTrigger>
                  <TabsTrigger value="streaming" className="font-noto">
                    <Monitor className="w-4 h-4 mr-1" />
                    البث
                  </TabsTrigger>
                  <TabsTrigger value="interaction" className="font-noto">
                    <Users className="w-4 h-4 mr-1" />
                    التفاعل
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-noto">الدقة</Label>
                      <Select
                        value={streamData.settings.video.resolution}
                        onValueChange={(value) => handleSettingsChange("video", "resolution", value)}
                      >
                        <SelectTrigger className="font-noto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="720p">720p HD</SelectItem>
                          <SelectItem value="1080p">1080p Full HD</SelectItem>
                          <SelectItem value="4k">4K Ultra HD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-noto">معدل الإطارات</Label>
                      <Select
                        value={streamData.settings.video.frameRate.toString()}
                        onValueChange={(value) => handleSettingsChange("video", "frameRate", parseInt(value))}
                      >
                        <SelectTrigger className="font-noto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 FPS</SelectItem>
                          <SelectItem value="60">60 FPS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-noto">معدل البت (Bitrate)</Label>
                    <Input
                      type="number"
                      value={streamData.settings.video.bitrate}
                      onChange={(e) => handleSettingsChange("video", "bitrate", parseInt(e.target.value))}
                      className="font-noto"
                    />
                    <p className="text-xs text-gray-500 font-noto">كلما زاد المعدل، كانت الجودة أفضل</p>
                  </div>
                </TabsContent>

                <TabsContent value="audio" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-noto">جودة الصوت</Label>
                    <Select
                      value={streamData.settings.audio.quality}
                      onValueChange={(value) => handleSettingsChange("audio", "quality", value)}
                    >
                      <SelectTrigger className="font-noto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">عادية</SelectItem>
                        <SelectItem value="high">عالية</SelectItem>
                        <SelectItem value="studio">استوديو</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="font-noto">تقليل الضوضاء</Label>
                      <p className="text-sm text-gray-500 font-noto">
                        تحسين جودة الصوت وإزالة الضوضاء
                      </p>
                    </div>
                    <Switch
                      checked={streamData.settings.audio.noiseReduction}
                      onCheckedChange={(checked) => handleSettingsChange("audio", "noiseReduction", checked)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="streaming" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-noto">الخصوصية</Label>
                    <Select
                      value={streamData.settings.streaming.privacy}
                      onValueChange={(value) => handleSettingsChange("streaming", "privacy", value)}
                    >
                      <SelectTrigger className="font-noto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            عام
                          </div>
                        </SelectItem>
                        <SelectItem value="unlisted">
                          <div className="flex items-center gap-2">
                            <EyeOff className="w-4 h-4" />
                            غير مدرج
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            خاص
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="font-noto">تسجيل تلقائي</Label>
                      <p className="text-sm text-gray-500 font-noto">
                        حفظ البث تلقائياً للمراجعة لاحقاً
                      </p>
                    </div>
                    <Switch
                      checked={streamData.settings.streaming.recordAutomatically}
                      onCheckedChange={(checked) => handleSettingsChange("streaming", "recordAutomatically", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="font-noto">إشراف على الدردشة</Label>
                      <p className="text-sm text-gray-500 font-noto">
                        تفعيل المراجعة التلقائية للرسائل
                      </p>
                    </div>
                    <Switch
                      checked={streamData.settings.streaming.chatModeration}
                      onCheckedChange={(checked) => handleSettingsChange("streaming", "chatModeration", checked)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="interaction" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-noto">العدد الأقصى للمشاركين</Label>
                    <Input
                      type="number"
                      value={streamData.settings.interaction.maxParticipants}
                      onChange={(e) => handleSettingsChange("interaction", "maxParticipants", parseInt(e.target.value))}
                      className="font-noto"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="font-noto">السماح بالأسئلة</Label>
                        <p className="text-sm text-gray-500 font-noto">
                          السماح للمشاركين بطرح الأسئلة
                        </p>
                      </div>
                      <Switch
                        checked={streamData.settings.interaction.allowQuestions}
                        onCheckedChange={(checked) => handleSettingsChange("interaction", "allowQuestions", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="font-noto">السماح بالتفاعلات</Label>
                        <p className="text-sm text-gray-500 font-noto">
                          السماح بإرسال الإيموجي والتفاعلات
                        </p>
                      </div>
                      <Switch
                        checked={streamData.settings.interaction.allowReactions}
                        onCheckedChange={(checked) => handleSettingsChange("interaction", "allowReactions", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="font-noto">مشاركة الشاشة</Label>
                        <p className="text-sm text-gray-500 font-noto">
                          السماح للمشاركين بمشاركة شاشتهم
                        </p>
                      </div>
                      <Switch
                        checked={streamData.settings.interaction.allowScreenSharing}
                        onCheckedChange={(checked) => handleSettingsChange("interaction", "allowScreenSharing", checked)}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview/Summary */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm sticky top-6">
            <CardHeader>
              <CardTitle className="font-noto flex items-center gap-2">
                <Eye className="w-5 h-5" />
                معاينة البث
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview thumbnail */}
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Video className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-noto">الصورة المصغرة</p>
                </div>
              </div>

              {/* Stream info */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900 font-noto">
                    {streamData.title || "عنوان البث"}
                  </h3>
                  <p className="text-sm text-gray-600 font-noto mt-1">
                    {streamData.description || "وصف البث"}
                  </p>
                </div>

                {streamData.category && (
                  <Badge variant="secondary" className="font-noto">
                    {streamData.category}
                  </Badge>
                )}

                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {selectedTags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs font-noto">
                        {tag}
                      </Badge>
                    ))}
                    {selectedTags.length > 3 && (
                      <Badge variant="outline" className="text-xs font-noto">
                        +{selectedTags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Stream settings summary */}
                <div className="pt-3 border-t">
                  <h4 className="text-sm font-medium text-gray-900 font-noto mb-2">إعدادات البث</h4>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between font-noto">
                      <span>الدقة:</span>
                      <span>{streamData.settings.video.resolution}</span>
                    </div>
                    <div className="flex justify-between font-noto">
                      <span>الخصوصية:</span>
                      <span>
                        {streamData.settings.streaming.privacy === 'public' && 'عام'}
                        {streamData.settings.streaming.privacy === 'unlisted' && 'غير مدرج'}
                        {streamData.settings.streaming.privacy === 'private' && 'خاص'}
                      </span>
                    </div>
                    <div className="flex justify-between font-noto">
                      <span>الحد الأقصى:</span>
                      <span>{streamData.settings.interaction.maxParticipants} مشارك</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}