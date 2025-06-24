import { Phone } from "lucide-react";
import SocialMedia from "./social-media";
import { Link } from "react-router-dom";

function Footer() {
  const linkStyles =
    "text-card-foreground hover:text-[#009AFF] hover:underline duration-200 transition-colors";
  return (
    <footer className="bg-[rgb(249_250_251)]">
      <div className="container flex flex-col gap-10 md:gap-20">
        <div className="flex justify-between flex-wrap gap-10">
          <div className="flex flex-col gap-6">
            <Link to="/">
              <img
                src="https://www.sayan-server.com/storage/academy/image/uqeh6BuRGvAmQ8tdvoGa.png"
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
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-foreground text-lg lg:text-xl">تواصل معنا</h3>
              <div className="flex items-center group duration-200 transition-colors">
                <div className="bg-[#1E02AA] group-hover:bg-[#009AFF] rounded-[8px] w-10  h-10 element-center">
                  <Phone className="rotate-270 text-white" />
                </div>
                <a
                  href="tel:0997203339"
                  className="text-card-foreground group-hover:text-[#009AFF] pr-4"
                >
                  0997203339
                </a>
              </div>
            </div>
            <SocialMedia />
          </div>
        </div>
        <div className="border-t border-border py-6 text-card-foreground text-sm lg:text-base text-center flex flex-wrap gap-4 justify-between">
          <p>
            جميع الحقوق محفوظة © 2025 تم التطوير بواسطة{" "}
            <Link
              to="/"
              className="text-primary hover:text-[#009AFF] duration-200 transition-colors hover:underline"
            >
              منصة سيان
            </Link>
          </p>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
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
