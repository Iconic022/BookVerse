import React from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Image, Link, Heading1, Heading2, Quote } from 'lucide-react';

interface EditorToolbarProps {
  onFormatClick: (format: string) => void;
  onInsertClick: (type: string) => void;
  onAlignClick: (alignment: string) => void;
}

const EditorToolbar: React.FC<EditorToolbarProps> = ({ 
  onFormatClick, 
  onInsertClick,
  onAlignClick
}) => {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-lg border-b border-gray-200 bg-white p-2">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onFormatClick('bold')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => onFormatClick('italic')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => onFormatClick('underline')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Underline"
        >
          <Underline size={18} />
        </button>
      </div>

      <div className="mx-2 h-6 w-px bg-gray-300"></div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onFormatClick('h1')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onClick={() => onFormatClick('h2')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => onFormatClick('blockquote')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Quote"
        >
          <Quote size={18} />
        </button>
      </div>

      <div className="mx-2 h-6 w-px bg-gray-300"></div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onAlignClick('left')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => onAlignClick('center')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => onAlignClick('right')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
      </div>

      <div className="mx-2 h-6 w-px bg-gray-300"></div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onFormatClick('ul')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Bulleted List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => onFormatClick('ol')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>

      <div className="mx-2 h-6 w-px bg-gray-300"></div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onInsertClick('link')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Insert Link"
        >
          <Link size={18} />
        </button>
        <button
          type="button"
          onClick={() => onInsertClick('image')}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          title="Insert Image"
        >
          <Image size={18} />
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;