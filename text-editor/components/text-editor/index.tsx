'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import MenuBar from './menu-bar'
import { forwardRef, useImperativeHandle } from 'react'
import { Editor } from '@tiptap/core'

export type TextEditorHandle = {
  getJSON: () => any;
}

interface TextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(({ content, onChange }, ref) => {
  const editor = useEditor({
    extensions: [
        StarterKit.configure({
            bulletList: {
                HTMLAttributes: {
                    class: "list-disc ml-3",
                },
            },
            orderedList: {
                HTMLAttributes: {
                    class: "list-decimal ml-3"
                }
            },
        }),
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Highlight.configure({
            HTMLAttributes: {
                class: 'my-custom-class',
            },
        }),
        // Link.configure({
        //     autolink: false,
        // })
    ],
    content: content || '',
    editorProps: {
        attributes: {
            class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
        },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
    },
  })

  useImperativeHandle(ref, () => ({
    getJSON: () => editor?.getJSON() || {}
  }), [editor])

  if (!editor) {
    return null
  }

  return (
    <div>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
    </div>
  )
})

TextEditor.displayName = 'TextEditor'

export default TextEditor