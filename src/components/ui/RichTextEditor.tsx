import React, { useRef, useState, useEffect } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough,
  Type, Palette, Code
} from 'lucide-react';

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "اكتب هنا...",
  disabled = false,
  error = false,
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorContent, setEditorContent] = useState(value);
  const [textColor, setTextColor] = useState('#000000');

  useEffect(() => {
    if (editorRef.current && value !== editorContent) {
      editorRef.current.innerHTML = value;
      setEditorContent(value);
    }
  }, [value]);

  const executeCommand = (command: string, value?: string) => {
    if (disabled) return;
    
    document.execCommand(command, false, value);
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setEditorContent(content);
      onChange(content);
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setEditorContent(content);
      onChange(content);
    }
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    executeCommand('foreColor', color);
  };

  return (
    <div className={`border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'opacity-50' : ''} ${className}`}>
      {/* Toolbar */}
      <div className="border-b bg-gray-50 p-2 rounded-t-lg">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => executeCommand("bold")}
            disabled={disabled}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md disabled:cursor-not-allowed"
            title="عريض"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("italic")}
            disabled={disabled}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md disabled:cursor-not-allowed"
            title="مائل"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("underline")}
            disabled={disabled}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md disabled:cursor-not-allowed"
            title="تحته خط"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => executeCommand("strikeThrough")}
            disabled={disabled}
            className="p-2 hover:bg-gray-100 hover:text-blue-600 rounded-md disabled:cursor-not-allowed"
            title="يتوسطه خط"
          >
            <Strikethrough className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1 ml-2">
            <Type className="w-4 h-4 text-gray-500" />
            <select
              onChange={(e) => executeCommand("fontSize", e.target.value)}
              disabled={disabled}
              className="px-2 py-1 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-blue-500 disabled:cursor-not-allowed"
              defaultValue="3"
            >
              <option value="1">صغير</option>
              <option value="2">متوسط صغير</option>
              <option value="3">متوسط</option>
              <option value="4">متوسط كبير</option>
              <option value="5">كبير</option>
              <option value="6">كبير جداً</option>
            </select>
          </div>
          
          <div className="relative ml-2">
            <input
              type="color"
              value={textColor}
              onChange={(e) => handleTextColorChange(e.target.value)}
              disabled={disabled}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              title="لون النص"
              id="textColor"
            />
            <label htmlFor="textColor" className="flex items-center justify-center w-8 h-8 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
              <Type className="w-4 h-4" style={{color: textColor}} />
            </label>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleEditorChange}
          className={`min-h-[120px] p-4 focus:outline-none ${error ? "border-red-500" : ""}`}
          style={{
            outline: 'none',
            direction: 'rtl',
            textAlign: 'right',
            lineHeight: '1.6',
            fontSize: '16px'
          }}
          suppressContentEditableWarning={true}
        />
        {!editorContent && !disabled && (
          <div className="absolute top-4 right-4 text-gray-400 pointer-events-none text-base select-none">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;