import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
} from "lexical";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {INSERT_UNORDERED_LIST_COMMAND} from "@lexical/list";
import {FORMAT_ELEMENT_COMMAND} from "lexical";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import {FaListUl} from "react-icons/fa6";
import {useEffect, useState} from "react";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState("");

  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          setIsBold(selection.hasFormat("bold"));
          setIsItalic(selection.hasFormat("italic"));
          setIsUnderline(selection.hasFormat("underline"));

          const parent = selection.getNodes()[0]?.getParent();
          if (parent && typeof parent.getFormat === "function") {
            const format = parent.getFormat();
            setAlignment(format?.textAlign || "");
          } else {
            setAlignment("");
          }
          
        }
      });
    });
  }, [editor]);

  const baseStyle = "p-2 rounded hover:bg-gray-300";
  const activeStyle = "bg-gray-500 text-white";

  return (
    <div className="flex flex-wrap gap-2 p-2 border rounded mb-3 bg-gray-100">
      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`${baseStyle} ${isBold ? activeStyle : ""}`}
      >
        <FaBold />
      </button>

      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`${baseStyle} ${isItalic ? activeStyle : ""}`}
      >
        <FaItalic />
      </button>

      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`${baseStyle} ${isUnderline ? activeStyle : ""}`}
      >
        <FaUnderline />
      </button>

      <button
        type="button"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND)}
        className={baseStyle}
      >
        <FaListUl />
      </button>

      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        className={`${baseStyle} ${alignment === "left" ? activeStyle : ""}`}
      >
        <FaAlignLeft />
      </button>

      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        className={`${baseStyle} ${alignment === "center" ? activeStyle : ""}`}
      >
        <FaAlignCenter />
      </button>

      <button
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        className={`${baseStyle} ${alignment === "right" ? activeStyle : ""}`}
      >
        <FaAlignRight />
      </button>
    </div>
  );
}
