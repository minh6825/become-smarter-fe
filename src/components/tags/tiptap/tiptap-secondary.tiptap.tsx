import './styles.scss';
import './style.scss';
import { FaBold, FaItalic, FaStrikethrough, FaCode, FaUndo, FaRedo, FaListUl, FaListOl, FaQuoteRight, FaHeading, FaTable } from 'react-icons/fa';
import { MdClear, MdHorizontalRule } from 'react-icons/md';

import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockComponent from './CodeBlockComponent';
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

// you can also register individual languages
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: element => element.getAttribute('data-background-color'),
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})

export const tableHTML = `
 
`

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

    return (
      <div className="text-primary p-2 bg-primary-background !rounded-md">
        <div className="button-group flex flex-wrap gap-2">
          {/* Bold */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`text-primary  ${editor.isActive('bold') ? '' : ''}`}
          >
            <FaBold className="text-primary" />
          </button>
  
          {/* Italic */}
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`btn ${editor.isActive('italic') ? 'btn-active' : ''}`}
          >
            <FaItalic className="text-primary" />
          </button>
  
          {/* Strikethrough */}
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`btn ${editor.isActive('strike') ? 'btn-active' : ''}`}
          >
            <FaStrikethrough className="text-primary" />
          </button>
  
          {/* Code */}
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={`btn ${editor.isActive('code') ? 'btn-active' : ''}`}
          >
            <FaCode className="text-primary" />
          </button>
  
          {/* Clear Marks */}
          <button
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            className="btn"
          >
            <MdClear className="text-primary" />
          </button>
  
          {/* Undo */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className="btn"
          >
            <FaUndo className="text-primary" />
          </button>
  
          {/* Redo */}
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className="btn"
          >
            <FaRedo className="text-primary" />
          </button>
  
          {/* Bullet List */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`btn ${editor.isActive('bulletList') ? 'btn-active' : ''}`}
          >
            <FaListUl className="text-primary" />
          </button>
  
          {/* Ordered List */}
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`btn ${editor.isActive('orderedList') ? 'btn-active' : ''}`}
          >
            <FaListOl className="text-primary" />
          </button>
  
          {/* Blockquote */}
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`btn ${editor.isActive('blockquote') ? 'btn-active' : ''}`}
          >
            <FaQuoteRight className="text-primary" />
          </button>
  
          {/* Horizontal Rule */}
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="btn"
          >
            <MdHorizontalRule className="text-primary" />
          </button>
  
          {/* Heading Levels */}
          {[1, 2, 3].map((level) => (
            <button
              key={level}
              onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
              className={`flex btn ${editor.isActive('heading', { level }) ? 'btn-active' : ''}`}
            >
              <FaHeading className="text-primary" />
              {level}
            </button>
          ))}
  
          {/* Insert Table */}
          <button
            onClick={() =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
            className="btn"
          >
            <FaTable className="text-primary" />
          </button>
        </div>
      </div>
    );
  }

type Props = {
  onchange: (e: any) => void;
  value: string;
  height?: number
  isShowMenuBar?: boolean,
  placeholder?: string
}
const TiptapSecondary = ({ onchange, value, height, isShowMenuBar, placeholder }: Props) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      Placeholder.configure({
        placeholder: placeholder || 'Write something …',
      }),
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      CustomTableCell,
      TableHeader,     
      Document,
      Paragraph,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent as any)
        },
      })
      .configure({ lowlight }),
    ],
    content: '<p></p>',
    onUpdate: ({ editor }) => {
      onchange(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  useEffect(() => {
    if(!value) {
      editor?.commands.setContent('<p></p>')
    }
    return () => {}
  }, [value])
  

  return (
    <div className='tiptap-wrap border rounded-md' onClick={() => editor?.chain().focus().run()}>
      <div className={`h-[400px] rounded-md`} style={{height: `${height}px`}}>
      {isShowMenuBar && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TiptapSecondary;
