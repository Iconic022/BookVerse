import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EditorToolbar from './EditorToolbar';
import Button from '../ui/Button';
import { BookMarked, Save, Trash, Settings } from 'lucide-react';

interface BookEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
}

const BookEditor: React.FC<BookEditorProps> = ({ initialContent = '', onSave }) => {
  const [content, setContent] = useState(initialContent);
  const [previewMode, setPreviewMode] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePosition, setImagePosition] = useState<'left' | 'right' | 'center' | 'background'>('left');
  const [isUnsaved, setIsUnsaved] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsUnsaved(true);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
    setIsUnsaved(false);
  };

  const handleFormatting = (format: string) => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let newCursorPosition = 0;
    
    switch (format) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        newCursorPosition = start + 8;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        newCursorPosition = start + 4;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        newCursorPosition = start + 3;
        break;
      case 'h1':
        formattedText = `<h1>${selectedText}</h1>`;
        newCursorPosition = start + 4;
        break;
      case 'h2':
        formattedText = `<h2>${selectedText}</h2>`;
        newCursorPosition = start + 4;
        break;
      case 'blockquote':
        formattedText = `<blockquote>${selectedText}</blockquote>`;
        newCursorPosition = start + 12;
        break;
      case 'ul':
        formattedText = `<ul>\n  <li>${selectedText}</li>\n</ul>`;
        newCursorPosition = start + 9;
        break;
      case 'ol':
        formattedText = `<ol>\n  <li>${selectedText}</li>\n</ol>`;
        newCursorPosition = start + 9;
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    setIsUnsaved(true);
    
    // Set cursor position after formatting tags
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        selectedText ? start + formattedText.length : newCursorPosition,
        selectedText ? start + formattedText.length : newCursorPosition
      );
    }, 0);
  };

  const handleAlignment = (alignment: string) => {
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    const alignedText = `<div style="text-align: ${alignment}">${selectedText}</div>`;
    const newContent = content.substring(0, start) + alignedText + content.substring(end);
    
    setContent(newContent);
    setIsUnsaved(true);
  };

  const handleInsert = (type: string) => {
    if (type === 'link') {
      const url = prompt('Enter URL:');
      const text = prompt('Enter link text:');
      
      if (url && text) {
        const linkHtml = `<a href="${url}" target="_blank">${text}</a>`;
        const textarea = document.getElementById('editor') as HTMLTextAreaElement;
        
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          
          const newContent = content.substring(0, start) + linkHtml + content.substring(end);
          setContent(newContent);
          setIsUnsaved(true);
        }
      }
    } else if (type === 'image') {
      setShowImageModal(true);
    }
  };

  const insertImage = () => {
    if (!imageUrl) return;
    
    let imageHtml = '';
    
    switch (imagePosition) {
      case 'left':
        imageHtml = `<img src="${imageUrl}" alt="Book illustration" style="float: left; margin-right: 10px; margin-bottom: 10px; max-width: 40%;" />`;
        break;
      case 'right':
        imageHtml = `<img src="${imageUrl}" alt="Book illustration" style="float: right; margin-left: 10px; margin-bottom: 10px; max-width: 40%;" />`;
        break;
      case 'center':
        imageHtml = `<div style="text-align: center; margin: 15px 0;"><img src="${imageUrl}" alt="Book illustration" style="max-width: 80%;" /></div>`;
        break;
      case 'background':
        imageHtml = `<div style="position: relative; margin: 15px 0; padding: 20px;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: url('${imageUrl}'); background-size: cover; opacity: 0.15; z-index: -1;"></div>
          <p>Your text will display over this background image. Replace this placeholder.</p>
        </div>`;
        break;
      default:
        imageHtml = `<img src="${imageUrl}" alt="Book illustration" style="max-width: 100%; margin: 15px 0;" />`;
    }
    
    const textarea = document.getElementById('editor') as HTMLTextAreaElement;
    
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newContent = content.substring(0, start) + imageHtml + content.substring(end);
      setContent(newContent);
      setIsUnsaved(true);
    }
    
    setShowImageModal(false);
    setImageUrl('');
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <BookMarked className="mr-2 h-5 w-5 text-amber-600" />
          <h3 className="font-medium">Book Editor</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Settings size={16} />}
          >
            Options
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Trash size={16} />}
            className="text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Clear
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Save size={16} />}
            onClick={handleSave}
            isLoading={false}
            disabled={!isUnsaved}
          >
            Save
          </Button>
        </div>
      </div>
      
      {!previewMode && (
        <>
          <EditorToolbar 
            onFormatClick={handleFormatting}
            onInsertClick={handleInsert}
            onAlignClick={handleAlignment}
          />
          <div className="p-4">
            <textarea
              id="editor"
              value={content}
              onChange={handleContentChange}
              className="w-full min-h-[500px] resize-y rounded-md border border-gray-300 p-3 font-serif text-gray-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Start writing your book here..."
            ></textarea>
          </div>
        </>
      )}
      
      {previewMode && (
        <div className="p-6">
          <div 
            className="prose max-w-none font-serif"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      )}
      
      {showImageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowImageModal(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="mb-4 text-lg font-medium">Insert Image</h3>
            <div className="mb-4">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                id="imageUrl"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-amber-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <select
                id="position"
                value={imagePosition}
                onChange={e => setImagePosition(e.target.value as any)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-amber-500 focus:outline-none focus:ring-amber-500"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="center">Center</option>
                <option value="background">Background</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline"
                onClick={() => setShowImageModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={insertImage}>
                Insert Image
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BookEditor;