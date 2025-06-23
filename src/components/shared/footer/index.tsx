import SocialMedia from "./social-media";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

function Footer() {
  const linkStyles =
    "text-primary text-base hover:text-[#009AFF] hover:underline duration-200 transition-colors";
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 pt-10 lg:pt-20 pb-8">
      <div className="container flex flex-col gap-10">
        <div className="flex justify-between flex-wrap gap-10">
          <div className="flex flex-col gap-6">
            <Link to="/">
              <img
                src="/assets/images/logo.svg"
                alt="Logo"
                loading="lazy"
                className="h-[60px] object-contain"
              />
            </Link>
            <p className="text-lg text-card-foreground lg:w-[350px]">
              منصة سيان التعليمية توفر تجربة تعلم فريدة تجمع بين أحدث التقنيات
              وأفضل الممارسات التعليمية لتقديم محتوى عالي الجودة.
            </p>
          </div>
          <div>
            <SocialMedia />
            <div className="mt-8">
              <h3 className="text-foreground font-medium text-lg md:text-xl mb-4">
                للتواصل معنا
              </h3>
              <div className="flex flex-col gap-4">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:support@sayan.pro"
                    className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-lg">support@sayan.pro</span>
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <a
                    href="tel:0590406718"
                    className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-lg">0590406718</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-card-foreground lg:text-lg text-center flex flex-col gap-4 justify-center">
          <p className="text-card-foreground">
            جميع الحقوق محفوظة لمنصة سيان © 2025
          </p>
          <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
            <Link to="/terms" target="_blank" className={linkStyles}>
              الشروط والأحكام
            </Link>
            <Link to="/privacy" target="_blank" className={linkStyles}>
              سياسة الخصوصية
            </Link>
            <Link to="/updates" target="_blank" className={linkStyles}>
              تحديثات المنصة
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
