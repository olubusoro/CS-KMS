import React, {useEffect} from "react";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

const TiptapEditor = ({onChange}) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "",
    onUpdate({editor}) {
      onChange(editor.getHTML());
    },
  });

  // Optional: Add custom image upload handler
  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({src: url}).run();
    }
  };

  return (
    <div className="border rounded p-4">
      <div className="mb-2 space-x-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          H2
        </button>
        <button
          type="button"
          onClick={addImage}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Add Image
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
