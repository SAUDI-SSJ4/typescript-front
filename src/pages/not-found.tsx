import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Large Text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">
            404
          </h1>
        </div>

        {/* Arabic Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          الصفحة غير موجودة
        </h2>

        {/* Arabic Description */}
        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.
        </p>

        {/* Return Button */}
        <button
          onClick={handleGoHome}
          className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 mb-8 text-lg"
        >
          العودة إلى الصفحة الرئيسية
        </button>

        {/* Auto-redirect Message */}
        <p className="text-gray-500 text-sm">
          سيتم توجيهك تلقائياً خلال {countdown} ثوان...
        </p>
      </div>
    </div>
  );
}
