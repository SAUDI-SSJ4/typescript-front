import React, { useRef, useState, useEffect } from 'react';
import {
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, Link, Image,
  Quote, Code,
  AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUploader from "@/components/ui/ImageUploader";
import { useLanguage } from "@/contexts/LanguageContext";

interface FlowbiteTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  name?: string;
  label?: string;
}

const FlowbiteTextEditor: React.FC<FlowbiteTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "ابدأ في الكتابة...",
  disabled = false,
  error = false,
  className = "",
  name,
  label
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const isRTL = lang === 'ar';
  const placeholderText = value ? undefined : (placeholder || (isRTL ? 'ابدأ في الكتابة...' : 'Start typing...'));
  const [editorContent, setEditorContent] = useState(value);
  const [isPreview, setIsPreview] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  useEffect(() => {
    if (editorRef.current && value !== editorContent) {
      editorRef.current.innerHTML = value;
      setEditorContent(value);
    }
  }, [value]);

  // Ensure editor content is restored when switching from preview to edit
  useEffect(() => {
    if (!isPreview && editorRef.current && editorContent) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (editorRef.current && editorRef.current.innerHTML !== editorContent) {
          editorRef.current.innerHTML = editorContent;
        }
      }, 0);
    }
  }, [isPreview, editorContent]);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0).cloneRange());
    }
  };

  // Note: restoreSelection is used inside insertHTML via savedSelection
  const restoreSelection = () => {
    if (savedSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelection);
      }
    }
  };

  const executeCommand = (command: string, value?: string) => {
    if (disabled || isPreview) return;
    
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      const content = editorRef.current.innerHTML;
      setEditorContent(content);
      onChange(content);
    }
  };

  const insertHTML = (html: string) => {
    if (disabled || isPreview || !editorRef.current) return;
    
    editorRef.current.focus();
    
    // Try to restore selection if we have one
    restoreSelection();
    
    // Try insertHTML command first
    let success = false;
    try {
      if (document.queryCommandSupported('insertHTML')) {
        success = document.execCommand('insertHTML', false, html);
      }
    } catch (e) {
      console.warn('insertHTML failed:', e);
    }
    
    // Fallback: manual DOM insertion
    if (!success) {
      try {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.deleteContents();
          const div = document.createElement('div');
          div.innerHTML = html;
          const fragment = document.createDocumentFragment();
          while (div.firstChild) {
            fragment.appendChild(div.firstChild);
          }
          range.insertNode(fragment);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          // Last resort: append to end
          const div = document.createElement('div');
          div.innerHTML = html;
          while (div.firstChild) {
            editorRef.current.appendChild(div.firstChild);
          }
        }
      } catch (e) {
        console.warn('Manual insertion failed:', e);
        // Very last resort: append to innerHTML
        editorRef.current.innerHTML += html;
      }
    }
    
    const content = editorRef.current.innerHTML;
    setEditorContent(content);
    onChange(content);
    
    // Clear saved selection after use
    setSavedSelection(null);
  };

  const toggleBlockFormat = (tagName: string) => {
    if (disabled || isPreview) return;
    
    const selection = window.getSelection();
    if (!selection || !editorRef.current) return;
    
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
    
    // Check if we're already in the target block
    const currentBlock = (element as Element)?.closest(tagName);
    
    if (currentBlock) {
      // Remove the block formatting
      executeCommand('formatBlock', 'p');
    } else {
      // Apply the block formatting
      executeCommand('formatBlock', tagName);
    }
  };

  const handleEditorChange = () => {
    if (editorRef.current && !isPreview) {
      const content = editorRef.current.innerHTML;
      // Only update if content actually changed
      if (content !== editorContent) {
        setEditorContent(content);
        onChange(content);
      }
    }
  };

  const handleEditorClick = () => {
    // Save selection when clicking on editor
    setTimeout(saveSelection, 0);
  };

  const handleEditorKeyUp = () => {
    // Save selection when moving cursor with keyboard
    setTimeout(saveSelection, 0);
  };

  const insertLink = () => {
    if (disabled || isPreview) return;
    
    // Save current selection
    saveSelection();
    
    // Get selected text if any
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setLinkText(selection.toString());
    }
    
    setShowLinkModal(true);
  };

  const handleLinkInsert = () => {
    if (!linkUrl.trim()) return;
    
    const finalUrl = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
    const finalText = linkText.trim() || linkUrl;
    
    insertHTML(`<a href="${finalUrl}" target="_blank" class="text-blue-600 underline hover:text-blue-800">${finalText}</a>`);
    
    // Reset modal state
    setLinkUrl('');
    setLinkText('');
    setShowLinkModal(false);
  };

  const insertImage = () => {
    if (disabled || isPreview) return;
    
    // Save current selection
    saveSelection();
    
    setShowImageModal(true);
  };

  const handleImageInsert = () => {
    if (!imageUrl.trim()) return;
    
    const imgHTML = `<img src="${imageUrl}" alt="${imageAlt || 'صورة'}" class="max-w-full h-auto rounded-lg my-2 mx-auto block" />`;
    insertHTML(imgHTML);
    
    // Reset modal state
    setImageUrl('');
    setImageAlt('');
    setShowImageModal(false);
  };

  // Upload logic is handled by ImageUploader

  const togglePreview = () => {
    if (isPreview) {
      // Switching from preview to edit mode
      // Make sure the editor content is restored
      if (editorRef.current && editorContent) {
        editorRef.current.innerHTML = editorContent;
      }
    } else {
      // Switching from edit to preview mode
      // Make sure we have the latest content
      if (editorRef.current) {
        const content = editorRef.current.innerHTML;
        setEditorContent(content);
        onChange(content);
      }
    }
    setIsPreview(!isPreview);
  };

  const getPreviewContent = () => {
    // Get the most recent content from the editor
    let content = editorContent;
    if (editorRef.current && !isPreview) {
      content = editorRef.current.innerHTML;
    }
    
    if (!content) return '';
    
    try {
      // For now, just return the HTML content directly since we're working with HTML, not markdown
      return content;
    } catch (error) {
      return content; // Fallback to showing raw HTML
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className={`border rounded-lg overflow-hidden ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'opacity-50' : ''}`}>
        {/* Toolbar */}
        <div className="bg-gray-50 px-2 py-1.5">
          <div className="flex flex-wrap items-center gap-1">
            {/* Text Formatting */}
            <div className="flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={() => executeCommand("bold")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="عريض"
              >
                <Bold className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("italic")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="مائل"
              >
                <Italic className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("underline")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="تحته خط"
              >
                <Underline className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("strikeThrough")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="يتوسطه خط"
              >
                <Strikethrough className="w-3 h-3" />
              </button>
            </div>

            {/* Font Size & Headings */}
            <div className="flex items-center gap-1 mr-2">
              <select
                onChange={(e) => {
                  if (e.target.value === 'h1') executeCommand('formatBlock', 'h1');
                  else if (e.target.value === 'h2') executeCommand('formatBlock', 'h2');
                  else if (e.target.value === 'h3') executeCommand('formatBlock', 'h3');
                  else executeCommand('formatBlock', 'p');
                }}
                disabled={disabled || isPreview}
                className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:border-blue-500 disabled:cursor-not-allowed"
                defaultValue="p"
              >
                <option value="p">نص عادي</option>
                <option value="h1">عنوان كبير</option>
                <option value="h2">عنوان متوسط</option>
                <option value="h3">عنوان صغير</option>
              </select>
              
              <select
                onChange={(e) => executeCommand('fontSize', e.target.value)}
                disabled={disabled || isPreview}
                className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:border-blue-500 disabled:cursor-not-allowed"
                defaultValue="3"
              >
                <option value="1">10px</option>
                <option value="2">13px</option>
                <option value="3">16px</option>
                <option value="4">18px</option>
                <option value="5">24px</option>
                <option value="6">32px</option>
                <option value="7">48px</option>
              </select>
            </div>

            {/* Colors */}
            <div className="flex items-center gap-1 mr-2">
              <div className="relative">
                <input
                  type="color"
                  onChange={(e) => executeCommand('foreColor', e.target.value)}
                  disabled={disabled || isPreview}
                  className="w-6 h-6 border border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed"
                  title="لون النص"
                  defaultValue="#000000"
                />
              </div>
              <div className="relative">
                <input
                  type="color"
                  onChange={(e) => executeCommand('backColor', e.target.value)}
                  disabled={disabled || isPreview}
                  className="w-6 h-6 border border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed"
                  title="لون الخلفية"
                  defaultValue="#ffffff"
                />
              </div>
            </div>

            {/* Alignment */}
            <div className="flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={() => executeCommand("justifyRight")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="محاذاة يمين"
              >
                <AlignRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("justifyCenter")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="محاذاة وسط"
              >
                <AlignCenter className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("justifyLeft")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="محاذاة يسار"
              >
                <AlignLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("justifyFull")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="ضبط"
              >
                <AlignJustify className="w-3 h-3" />
              </button>
            </div>

            {/* Lists */}
            <div className="flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={() => executeCommand("insertUnorderedList")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="قائمة نقطية"
              >
                <List className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand("insertOrderedList")}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="قائمة مرقمة"
              >
                <ListOrdered className="w-3 h-3" />
              </button>
            </div>

            {/* Insert Elements */}
            <div className="flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={insertLink}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="إدراج رابط"
              >
                <Link className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={insertImage}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="إدراج صورة"
              >
                <Image className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => toggleBlockFormat('blockquote')}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="اقتباس (اضغط مرة أخرى للإلغاء)"
              >
                <Quote className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => toggleBlockFormat('pre')}
                disabled={disabled || isPreview}
                className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed"
                title="كود (اضغط مرة أخرى للإلغاء)"
              >
                <Code className="w-3 h-3" />
              </button>
            </div>

            {/* Preview Toggle */}
            <div className="flex items-center gap-1 mr-auto">
              <button
                type="button"
                onClick={togglePreview}
                disabled={disabled}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors disabled:cursor-not-allowed ${
                  isPreview 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isPreview ? 'تحرير' : 'معاينة'}
              </button>
            </div>
          </div>
        </div>

        {/* Editor/Preview */}
        <div className="relative bg-white">
          <style>{`
            .flowbite-editor h1 {
              font-size: 2rem;
              font-weight: bold;
              margin: 1rem 0;
              color: #1f2937;
              line-height: 1.2;
            }
            .flowbite-editor h2 {
              font-size: 1.5rem;
              font-weight: bold;
              margin: 0.875rem 0;
              color: #374151;
              line-height: 1.3;
            }
            .flowbite-editor h3 {
              font-size: 1.25rem;
              font-weight: bold;
              margin: 0.75rem 0;
              color: #4b5563;
              line-height: 1.4;
            }
            .flowbite-editor blockquote {
              border-right: 4px solid #3b82f6;
              background: #f8fafc;
              padding: 1rem;
              margin: 1rem 0;
              font-style: italic;
              border-radius: 0.5rem;
            }
            .flowbite-editor pre {
              background: #1f2937;
              color: #f9fafb;
              padding: 1rem;
              border-radius: 0.5rem;
              overflow-x: auto;
              font-family: 'Courier New', monospace;
              margin: 1rem 0;
            }
            .flowbite-editor ul, .flowbite-editor ol {
              margin: 1rem 0;
              padding-right: 2rem;
            }
            .flowbite-editor li {
              margin: 0.5rem 0;
            }
          `}</style>
          {isPreview ? (
            <div
              className="flowbite-editor min-h-[150px] p-4 prose prose-lg max-w-none"
              style={{
                direction: isRTL ? 'rtl' : 'ltr',
                textAlign: isRTL ? 'right' : 'left',
                lineHeight: '1.8'
              }}
              dangerouslySetInnerHTML={{ __html: getPreviewContent() }}
            />
          ) : (
            <>
                                        <div
                            ref={editorRef}
                            contentEditable={!disabled}
                            onInput={handleEditorChange}
                            onClick={handleEditorClick}
                            onKeyUp={handleEditorKeyUp}
                            onMouseUp={handleEditorClick}
                            className={`flowbite-editor min-h-[150px] p-4 focus:outline-none ${error ? "border-red-500" : ""}`}
                            style={{
                              outline: 'none',
                              direction: isRTL ? 'rtl' : 'ltr',
                              textAlign: isRTL ? 'right' : 'left',
                              lineHeight: '1.8',
                              fontSize: '16px'
                            }}
                            suppressContentEditableWarning={true}
                          />
              {!editorContent && !disabled && (
                <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} text-gray-400 pointer-events-none text-base select-none`}>
                  {placeholderText}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="sm:max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Image className="w-4 h-4 text-blue-600" />
              </div>
              إضافة صورة
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Upload File */}
            <div>
              <Label className="text-sm font-medium">رفع صورة من الجهاز</Label>
              <div className="mt-2">
                <ImageUploader
                  value={imageUrl}
                  onChange={(val) => setImageUrl(val || "")}
                  maxSizeMb={10}
                />
              </div>
            </div>

            {/* OR Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">أو</span>
              </div>
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="image-url">رابط الصورة</Label>
              <Input
                id="image-url"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                dir="ltr"
              />
            </div>

            {/* Alt Text */}
            <div className="space-y-2">
              <Label htmlFor="image-alt">النص البديل (اختياري)</Label>
              <Input
                id="image-alt"
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="وصف مختصر للصورة"
              />
            </div>

            {/* Preview */}
            {imageUrl && (
              <div className="bg-gray-50 border rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">معاينة:</p>
                <img
                  src={imageUrl}
                  alt={imageAlt || 'معاينة الصورة'}
                  className="max-w-full h-auto rounded-lg max-h-32 mx-auto"
                  onError={() => setImageUrl('')}
                />
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowImageModal(false);
                setImageUrl('');
                setImageAlt('');
              }}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleImageInsert}
              disabled={!imageUrl.trim()}
            >
              إدراج الصورة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Link Modal */}
      <Dialog open={showLinkModal} onOpenChange={setShowLinkModal}>
        <DialogContent className="sm:max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Link className="w-4 h-4 text-blue-600" />
              </div>
              إضافة رابط
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="link-url">عنوان الرابط</Label>
              <Input
                id="link-url"
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com أو example.com"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link-text">نص الرابط</Label>
              <Input
                id="link-text"
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="النص الذي سيظهر للرابط"
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setShowLinkModal(false);
                setLinkUrl('');
                setLinkText('');
              }}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleLinkInsert}
              disabled={!linkUrl.trim()}
            >
              إدراج الرابط
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlowbiteTextEditor;