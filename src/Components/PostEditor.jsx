import React, {useState} from "react";
import LexicalEditor from "./LexicalEditor"; // to import the WYSIWYG Editor
import Button from "../Props/Button";


const PostEditor = ({onClose}) => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [visibility, setVisibility] = useState("public");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("visibility", visibility);
    if (file) formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://localhost:7161/api/Posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Post created successfully!");
        setTitle("");
        setContent("");
        setFile(null);
        setVisibility("public");
        if (onClose) onclose()
      } else {
        alert("Error creating post");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Failed to submit");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-2"
      />

      <LexicalEditor onChange={setContent} />

      {/* <input
        type="file"
        accept=".pdf,.docx,.doc,image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className=""
      /> */}
      <input
        type="file"
        id="fileUpload"
        onChange={(e) => setFile(e.target.files[0])}
        class="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 file:bg-green-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:cursor-pointer"
      />

      <select
        onChange={(e) => setVisibility(e.target.value)}
        value={visibility}
        className="w-full border p-2 rounded"
      >
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="department">Department</option>
      </select>

      <Button
        label="Submit"
        type="submit"
        className="bg-green-400 text-white px-4 py-2 rounded cursor-pointer"
      />
    </form>
  );
};

export default PostEditor;
