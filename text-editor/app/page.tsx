"use client";
import TextEditor, { TextEditorHandle } from "@/components/text-editor";
import { useRef } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [content, setContent] = useState("");
  const editorRef = useRef<TextEditorHandle>(null);

  const downloadHTML = () => {
    if (!content) return;
    
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.download = `document-${Date.now()}.html`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  const downloadJSON = () => {
    if (!editorRef.current) return;
    
    const jsonContent = editorRef.current.getJSON();
    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.download = `document-${Date.now()}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="max-w-3xl mx-auto py-8">
        <TextEditor 
          ref={editorRef}
          content={content} 
          onChange={setContent}
        />
        <div className="mt-8 flex gap-2">
          <Button onClick={downloadHTML} disabled={!content}>
            Скачать HTML
          </Button>
          <Button onClick={downloadJSON} disabled={!content} variant="outline">
            Скачать JSON
          </Button>
        </div>
      </div>
    </>
  );
}