import React from "react";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

const TiptapEditor = ({onChange}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {keepMarks: true, keepAttributes: false},
        orderedList: {keepMarks: true, keepAttributes: false},
      }),
      Paragraph,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start typing your content here...",
      }),
    ],
    content: "",
    onUpdate({editor}) {
      onChange(editor.getHTML());
    },
  });

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({src: url}).run();
    }
  };

  if (!editor) return null;

  return (
    <div className="border rounded p-4 space-y-2 w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="p-2 bg-gray-200 rounded"
        >
          🅱️
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="p-2 bg-gray-200 rounded"
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="p-2 bg-gray-200 rounded"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="p-2 bg-gray-200 rounded"
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
          className="p-2 bg-gray-200 rounded"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          className="p-2 bg-gray-200 rounded"
        >
          ➡️
        </button>
        <button
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          className="p-2 bg-gray-200 rounded"
        >
          ⬅️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="p-2 bg-gray-200 rounded"
        >
          ⬅️ Align
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="p-2 bg-gray-200 rounded"
        >
          ↔️ Align
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="p-2 bg-gray-200 rounded"
        >
          ➡️ Align
        </button>
        <button onClick={addImage} className="p-2 bg-gray-200 rounded">
          🖼️
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[300px] w-full bg-white text-black p-4 border border-gray-300 rounded shadow-sm focus:outline-none resize-none"
      />
    </div>
  );
};

export default TiptapEditor;
