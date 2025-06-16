import React from "react";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {ToolbarPlugin} from "./ToolBarPlugin";
import {$generateHtmlFromNodes} from "@lexical/html";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";
import "./LexicalEditor.css";
import {ListNode, ListItemNode} from "@lexical/list";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";

const editorConfig = {
  namespace: "PostEditor",
  theme: {
    // Add custom styles here if needed
    paragraph: "editor-paragraph",
  },
  onError(error) {
    console.error("Lexical Error:", error);
  },
  nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode],
};

const LexicalEditor = ({onChange}) => {
  const handleChange = (editorState, editor) => {
    editor.update(() => {
      const html = $generateHtmlFromNodes(editor, null);
      onChange(html);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-wrapper">
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder mt-64">Start writing…</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
