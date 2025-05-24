import React from "react";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import {$generateHtmlFromNodes} from "@lexical/html";
import "./LexicalEditor.css";

const editorConfig = {
  namespace: "PostEditor",
  onError: (error) => console.error("Lexical error:", error),
  theme: {},
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
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={
            <div className="editor-placeholder">Start writing...</div>
          }
          ErrorBoundary={({children}) => <>{children}</>}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
