import React, { useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { Label } from './label';
import { cn } from '@/lib/utils';

interface CSSEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  height?: string | number;
  className?: string;
  showLineNumbers?: boolean;
}

/**
 * محرر CSS متطور مع إكمال تلقائي وتمييز الأكواد
 * يستخدم Monaco Editor (نفس محرر VS Code)
 */
const CSSEditor: React.FC<CSSEditorProps> = ({
  value = '',
  onChange,
  placeholder = '/* أدخل CSS المخصص هنا */\n.custom-class {\n  color: #333;\n  font-size: 16px;\n}\n\n/* مثال: تخصيص الألوان */\n:root {\n  --custom-primary: #your-color;\n}',
  label,
  disabled = false,
  error,
  height = 300,
  className,
  showLineNumbers = true,
}) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // تخصيص theme للخلفية السوداء المطفية
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A737D', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'F97583' },
        { token: 'string', foreground: '9ECBFF' },
        { token: 'number', foreground: '79B8FF' },
        { token: 'type', foreground: 'B392F0' },
        { token: 'class', foreground: 'FFAB70' },
        { token: 'function', foreground: 'B392F0' },
        { token: 'variable', foreground: 'FFD700' },
      ],
      colors: {
        'editor.background': '#1a1a1a', // خلفية سوداء مطفية
        'editor.foreground': '#E1E4E8',
        'editor.lineHighlightBackground': '#2F363D',
        'editor.selectionBackground': '#3392FF44',
        'editor.inactiveSelectionBackground': '#3392FF22',
        'editorCursor.foreground': '#E1E4E8',
        'editorWhitespace.foreground': '#484F58',
        'editorLineNumber.foreground': '#6B7280',
        'editorLineNumber.activeForeground': '#E1E4E8',
        'scrollbarSlider.background': '#484F58',
        'scrollbarSlider.hoverBackground': '#5A6169',
        'scrollbarSlider.activeBackground': '#6B7280',
      }
    });

    // تطبيق theme المخصص
    monaco.editor.setTheme('custom-dark');

    // إضافة اختصارات لوحة المفاتيح
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // يمكن إضافة وظيفة الحفظ هنا
      console.log('حفظ CSS');
    });

    // إضافة إكمال تلقائي مخصص للCSS العربي
    monaco.languages.registerCompletionItemProvider('css', {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = [
          {
            label: 'rtl-container',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '.rtl-container {\n  direction: rtl;\n  text-align: right;\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'حاوي RTL للنصوص العربية'
          },
          {
            label: 'arabic-font',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '.arabic-font {\n  font-family: "Cairo", "Tajawal", sans-serif;\n  font-weight: 400;\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'خط عربي محسن'
          },
          {
            label: 'primary-button',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '.primary-button {\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n\n.primary-button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0,0,0,0.15);\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'زر أساسي مع تأثيرات'
          },
          {
            label: 'card-hover',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '.card-hover {\n  transition: all 0.3s ease;\n  border-radius: 12px;\n  overflow: hidden;\n}\n\n.card-hover:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 20px 40px rgba(0,0,0,0.1);\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'كارد مع تأثير hover'
          },
          {
            label: 'gradient-bg',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '.gradient-bg {\n  background: linear-gradient(135deg, #00ffcc 0%, #3b82f6 100%);\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'خلفية متدرجة بألوان المنصة'
          }
        ];
        return { suggestions };
      }
    });
  };

  const handleChange = (newValue: string | undefined) => {
    if (onChange && newValue !== undefined) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <Label className="text-sm font-medium text-gray-800 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          {label}
        </Label>
      )}
      
      <div className={cn(
        'relative rounded-lg overflow-hidden border-2 transition-colors',
        error 
          ? 'border-red-300 focus-within:border-red-500' 
          : 'border-gray-200 focus-within:border-blue-500',
        disabled && 'opacity-50 pointer-events-none'
      )}>
        <Editor
          height={height}
          defaultLanguage="css"
          value={value || placeholder}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          options={{
            fontSize: 14,
            fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace",
            lineNumbers: showLineNumbers ? 'on' : 'off',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
            suggest: {
              showKeywords: true,
              showProperties: true,
              showValues: true,
              showColors: true,
              showFunctions: true,
              showReferences: true,
            },
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false
            },
            wordWrap: 'on',
            wrappingIndent: 'indent',
            tabSize: 2,
            insertSpaces: true,
            readOnly: disabled,
            contextmenu: true,
            mouseWheelZoom: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            }
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-gray-900 text-gray-300">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                <p className="text-sm">جاري تحميل محرر CSS...</p>
              </div>
            </div>
          }
        />
        
        {/* مؤشر الحالة */}
        <div className="absolute bottom-2 left-2 flex items-center gap-2 text-xs text-gray-400 bg-gray-800/80 px-2 py-1 rounded">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          CSS Editor
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="w-4 h-4 text-red-500">⚠️</span>
          {error}
        </p>
      )}

      {/* نصائح سريعة */}
      <div className="text-xs text-gray-500 space-y-1">
        <p className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">Ctrl+Space</kbd>
          للإكمال التلقائي
        </p>
        <p className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">Ctrl+S</kbd>
          للحفظ
        </p>
      </div>
    </div>
  );
};

export default CSSEditor;