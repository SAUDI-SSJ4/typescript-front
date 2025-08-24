// ثيمات وألوان المواد التعليمية الذكية

export const aiTheme = {
  gradients: {
    primary: "from-purple-500 to-purple-600",
    secondary: "from-blue-500 to-blue-600", 
    success: "from-green-500 to-green-600",
    warning: "from-orange-500 to-orange-600",
    info: "from-cyan-500 to-blue-500",
    
    // تدرجات خاصة للمواد التعليمية
    brain: "from-purple-500 to-blue-500",
    sparkles: "from-blue-500 to-cyan-500",
    learning: "from-cyan-500 to-green-500",
    chat: "from-green-500 to-emerald-500",
    
    // تدرجات الخلفيات
    backgroundLight: "from-purple-50 to-blue-50",
    backgroundMedium: "from-blue-50 to-purple-50",
    
    // تدرجات الحالات
    processing: "from-blue-400 to-blue-500",
    completed: "from-green-400 to-green-500",
    failed: "from-red-400 to-red-500"
  },
  
  colors: {
    primary: {
      50: "#f3f4f6",
      100: "#e5e7eb", 
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca"
    },
    ai: {
      purple: "#8b5cf6",
      blue: "#3b82f6",
      cyan: "#06b6d4",
      green: "#10b981",
      orange: "#f59e0b"
    }
  },
  
  shadows: {
    card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    cardHover: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    button: "0 4px 14px 0 rgba(139, 92, 246, 0.39)",
    buttonHover: "0 6px 20px rgba(139, 92, 246, 0.5)"
  },
  
  animations: {
    fadeIn: "transition-all duration-300 ease-in-out",
    slideUp: "transform transition-all duration-300 hover:-translate-y-1",
    pulse: "animate-pulse",
    spin: "animate-spin"
  }
};

export const getStatusGradient = (status: 'processing' | 'completed' | 'failed') => {
  switch (status) {
    case 'processing':
      return aiTheme.gradients.processing;
    case 'completed':
      return aiTheme.gradients.completed;
    case 'failed':
      return aiTheme.gradients.failed;
    default:
      return aiTheme.gradients.primary;
  }
};

export const getFileTypeColor = (fileType: 'pdf' | 'docx') => {
  switch (fileType) {
    case 'pdf':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'docx':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};
