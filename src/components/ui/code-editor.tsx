import React, { useState, useRef } from 'react';
import { Label } from './label';
import { cn } from '@/lib/utils';
import { Play, Copy, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './button';

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  height?: number;
  className?: string;
  language?: 'javascript' | 'python' | 'html' | 'css' | 'java' | 'cpp';
  showRunButton?: boolean;
  showResetButton?: boolean;
  onRun?: (code: string) => void;
  onReset?: () => void;
  readOnly?: boolean;
  showLineNumbers?: boolean;
}

/**
 * محرر كود متطور للبرمجة مع تمييز الأكواد وأزرار التشغيل
 */
const CodeEditor: React.FC<CodeEditorProps> = ({
  value = '',
  onChange,
  placeholder = '// اكتب كودك هنا...\nconsole.log("مرحباً بالعالم!");',
  label,
  disabled = false,
  error,
  height = 300,
  className,
  language = 'javascript',
  showRunButton = false,
  showResetButton = false,
  onRun,
  onReset,
  readOnly = false,
  showLineNumbers = true,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);

  // تمييز الأكواد البسيط
  // Reserved for future syntax highlighting

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!readOnly && onChange) {
      onChange(e.target.value);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRun = () => {
    if (onRun) {
      onRun(value);
    }
  };

  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  // تعداد الأسطر
  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 10) }, (_, i) => i + 1);

  return (
    <div className={cn('space-y-3', className)}>
      {label && (
        <Label className="text-sm font-medium text-gray-800 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          {label}
        </Label>
      )}

      <div className="relative">
        {/* أزرار التحكم */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-mono">
              {language.toUpperCase()}
            </span>
            <span>{lineCount} lines</span>
          </div>
          
          <div className="flex items-center gap-2">
            {showResetButton && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                disabled={disabled}
                className="h-8 px-3"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                إعادة تعيين
              </Button>
            )}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={disabled}
              className="h-8 px-3"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                  تم النسخ
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  نسخ
                </>
              )}
            </Button>

            {showRunButton && (
              <Button
                type="button"
                size="sm"
                onClick={handleRun}
                disabled={disabled || !value.trim()}
                className="h-8 px-3 bg-green-600 hover:bg-green-700"
              >
                <Play className="w-3 h-3 mr-1" />
                تشغيل
              </Button>
            )}
          </div>
        </div>

        {/* محرر الكود */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden border">
          <div className="flex">
            {/* أرقام الأسطر */}
            {showLineNumbers && (
              <div className="bg-gray-800 text-gray-400 text-xs p-4 pr-2 select-none font-mono leading-6 min-w-[3rem] text-right">
                {lineNumbers.map(num => (
                  <div key={num} className="h-6 leading-6">
                    {num}
                  </div>
                ))}
              </div>
            )}

            {/* منطقة الكود */}
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                dir="ltr"
                className={cn(
                  'w-full p-4 text-sm font-mono resize-none bg-transparent text-gray-100 placeholder-gray-500',
                  'focus:outline-none border-0 leading-6',
                  disabled && 'opacity-50 cursor-not-allowed',
                  readOnly && 'cursor-default',
                  'scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'
                )}
                style={{ 
                  height: `${height}px`,
                  fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', 'Consolas', monospace"
                }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
              />
            </div>
          </div>

          {/* مؤشر الحالة */}
          <div className="absolute bottom-2 right-2 flex items-center gap-2 text-xs text-gray-400 bg-gray-800/80 px-2 py-1 rounded">
            <div className={cn(
              "w-2 h-2 rounded-full",
              error ? "bg-red-400" : "bg-green-400"
            )}></div>
            <span>{language}</span>
          </div>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};

export default CodeEditor;