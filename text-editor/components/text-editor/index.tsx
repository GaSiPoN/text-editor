'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
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
            link: {
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https',
                protocols: ['http', 'https'],
                isAllowedUri: (url, ctx) => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

                        // use default validation
                        if (!ctx.defaultValidate(parsedUrl.href)) {
                            return false
                        }

                        // disallowed protocols
                        const disallowedProtocols = ['ftp', 'file', 'mailto']
                        const protocol = parsedUrl.protocol.replace(':', '')

                        if (disallowedProtocols.includes(protocol)) {
                            return false
                        }

                        // only allow protocols specified in ctx.protocols
                        const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

                        if (!allowedProtocols.includes(protocol)) {
                            return false
                        }

                        // disallowed domains
                        const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
                        const domain = parsedUrl.hostname

                        if (disallowedDomains.includes(domain)) {
                            return false
                        }

                        // all checks have passed
                        return true
                    } catch {
                        return false
                    }
                },
                shouldAutoLink: url => {
                    try {
                        // construct URL
                        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

                        // only auto-link if the domain is not in the disallowed list
                        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
                        const domain = parsedUrl.hostname

                        return !disallowedDomains.includes(domain)
                    } catch {
                        return false
                    }
                },
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
        Image
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