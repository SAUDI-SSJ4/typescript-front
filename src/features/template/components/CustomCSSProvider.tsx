import React, { useEffect } from 'react';

/**
 * واجهة خصائص مزود CSS المخصص
 * @property {string} customCSS - كود CSS المخصص الذي سيتم تطبيقه
 * @property {React.ReactNode} children - العناصر الفرعية التي سيتم تقديمها
 */
interface CustomCSSProviderProps {
  customCSS?: string;
  children: React.ReactNode;
}

const CustomCSSProvider: React.FC<CustomCSSProviderProps> = ({ customCSS, children }) => {
  useEffect(() => {
    // Remove any existing custom CSS
    const existingStyle = document.getElementById('academy-custom-css');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Add new custom CSS if provided
    if (customCSS && customCSS.trim()) {
      const styleElement = document.createElement('style');
      styleElement.id = 'academy-custom-css';
      styleElement.textContent = customCSS;
      document.head.appendChild(styleElement);
    }

    // Cleanup function to remove custom CSS when component unmounts
    return () => {
      const styleElement = document.getElementById('academy-custom-css');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [customCSS]);

  return <>{children}</>;
};

export default CustomCSSProvider;