import React, {useState, useEffect} from "react";
import LexicalEditor from "./LexicalEditor"; // to import the WYSIWYG Editor
import Button from "../Props/Button";
import TiptapEditor from "./TiptapEditor";


const PostEditor = ({onClose, onPostCreated}) => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [categoryObjects, setCategoryObjects] = useState([]);

  
  useEffect(() => {
    if (open) {
      fetchCategory();
    }
  }, [open]);


  const fetchCategory = async () => {
    try {
      const res = await fetch("https://localhost:7161/api/Categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setCategoryObjects(data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
      setCategoryObjects([{id: 0, Name: "Error fetching Categories"}]);
      alert("Failed to fetch categories.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categoryId", category);
    formData.append("userId", 1)
    formData.append("visibility", visibility);
    if (file) formData.append("attachments", file);

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
        const newPost = await res.json(); // assuming backend returns the created post
        alert("Post created successfully!");
        setTitle("");
        setContent("");
        setCategory("");
        setFile(null);
        setVisibility("public");

        if (onPostCreated) onPostCreated(newPost);
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
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded border p-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full rounded border p-2"
      />

      <select
        className="w-full  border rounded px-3 py-2"
        id="category"
        value={category}
        onChange={(e) =>
          setCategory(
            Array.from(e.target.selectedOptions, (option) =>
              Number(option.value)
            )
          )
        }
        required
      >
        {categoryObjects.map((dep) => (
          <option key={dep.id} value={dep.id}>
            {dep.name}
          </option>
        ))}
      </select>

      <LexicalEditor onChange={setContent} />
      {/* <TiptapEditor onChange={setContent} /> */}

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
