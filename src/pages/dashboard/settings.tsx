import { Settings as SettingsIcon } from "lucide-react";

function Settings() {
  return (
    <div className="space-y-6">
      <Header />
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-4">الإعدادات</h2>
        <p className="text-muted-foreground mb-6">
          قم بتخصيص إعدادات حسابك وتفضيلاتك.
        </p>

        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="border-b border-border pb-6">
            <h3 className="text-lg font-semibold mb-4">إعدادات الإشعارات</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إشعارات البريد الإلكتروني</p>
                  <p className="text-sm text-muted-foreground">
                    تلقي إشعارات حول الدورات الجديدة والتحديثات
                  </p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إشعارات الهاتف</p>
                  <p className="text-sm text-muted-foreground">
                    تلقي رسائل نصية للتذكير بالدروس
                  </p>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إشعارات التقييم</p>
                  <p className="text-sm text-muted-foreground">
                    تلقي إشعارات عند إضافة تقييمات جديدة
                  </p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="border-b border-border pb-6">
            <h3 className="text-lg font-semibold mb-4">إعدادات الخصوصية</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إظهار الملف الشخصي</p>
                  <p className="text-sm text-muted-foreground">
                    السماح للآخرين برؤية ملفك الشخصي
                  </p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">إظهار الإنجازات</p>
                  <p className="text-sm text-muted-foreground">
                    عرض شهادات الإنجاز والدورات المكتملة
                  </p>
                </div>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">إعدادات اللغة</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  لغة الواجهة
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="ar">العربية</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  المنطقة الزمنية
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                  <option value="Asia/Dubai">دبي (GMT+4)</option>
                  <option value="Africa/Cairo">القاهرة (GMT+2)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;

function Header() {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <SettingsIcon className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            الإعدادات
          </span>
        </div>
      </div>
    </div>
  );
}
