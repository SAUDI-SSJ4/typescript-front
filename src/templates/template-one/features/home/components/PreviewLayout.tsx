import React from "react";
import Footer from "@/templates/template-one/components/footer";
import CustomCSSProvider from "@/features/template/components/CustomCSSProvider";

interface PreviewLayoutProps {
  children: React.ReactNode;
  customCSS?: string;
  showFooter?: boolean;
}

/**
 * Layout خاص بمعاينة واجهات الأكاديمية بدون هيدر
 * يستخدم في صفحات تعديل واجهات الأكاديمية لإظهار المحتوى بدون عناصر التنقل
 */
const PreviewLayout: React.FC<PreviewLayoutProps> = ({ 
  children, 
  customCSS, 
  showFooter = true 
}) => {
  return (
    <CustomCSSProvider customCSS={customCSS}>
      {children}
      {showFooter && <Footer />}
    </CustomCSSProvider>
  );
};

export default PreviewLayout;