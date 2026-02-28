import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Highlighter, Image, Italic, Link2, Link2Off, List, ListOrdered, Strikethrough, Underline } from "lucide-react"
import { Toggle } from "../ui/toggle"
import { Editor } from "@tiptap/react"
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import React, { useCallback } from 'react'

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null
  }

  const addImage = useCallback(() => {
    const url = window.prompt('URL')
    console.log(url);
    
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
        
    }
  }, [editor])

  if (!editor) {
    return null
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } catch (e) {
      alert(e.message)
    }
  }, [editor])

  const Options = [
    {
        icon: <Heading1 className="size-4" />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        pressed: editor.isActive("heading", { level: 1 }),
    },
    {
        icon: <Heading2 className="size-4" />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        pressed: editor.isActive("heading", { level: 2 }),
    },
    {
        icon: <Heading3 className="size-4" />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        pressed: editor.isActive("heading", { level: 3 }),
    },
    {
        icon: <Bold className="size-4" />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        pressed: editor.isActive("bold"),
    },
    {
        icon: <Italic className="size-4" />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        pressed: editor.isActive("italic"),
    },
    {
        icon: <Strikethrough className="size-4" />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        pressed: editor.isActive("strike"),
    },
    {
        icon: <Underline className="size-4" />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        pressed: editor.isActive("underline"),
    },
    {
        icon: <AlignLeft className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("left").run(),
        pressed: editor.isActive("left"),
    },
    {
        icon: <AlignCenter className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("center").run(),
        pressed: editor.isActive("center"),
    },
    {
        icon: <AlignRight className="size-4" />,
        onClick: () => editor.chain().focus().setTextAlign("right").run(),
        pressed: editor.isActive("right"),
    },
    {
        icon: <List className="size-4" />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        pressed: editor.isActive("bulletList"),
    },
    {
        icon: <ListOrdered className="size-4" />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        pressed: editor.isActive("orderedList"),
    },
    {
        icon: <Highlighter className="size-4" />,
        onClick: () => editor.chain().focus().toggleHighlight().run(),
        pressed: editor.isActive("highlight"),
    },
    {
        icon: <Link2 className="size-4" />,
        onClick: () => setLink(),
        pressed: editor.isActive("link"),
    },
    {
        icon: <Link2Off className="size-4" />,
        onClick: () => editor.chain().focus().unsetLink().run(),
        pressed: !editor.isActive("link"),
    },
    {
        icon: <Image className="size-4" />,
        onClick: () => addImage(),
        pressed: false,
    },
  ]

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
        {Options.map((option, index) => (
            <Toggle key={index} pressed={option.pressed} onPressedChange={option.onClick}>{option.icon}</Toggle>
        ))}
    </div>
  )
}