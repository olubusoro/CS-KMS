import React, {useState, useEffect} from "react";
import Button from "../Props/Button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "froala-editor/js/plugins/image.min.js";



const PostEditor = ({ onClose, onPostCreated }) => {
  const [content, setContent] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{list: "ordered"}, {list: "bullet"}],
      ["link", "image"], 
    ],
  };

  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [visibility, setVisibility] = useState("public");
  const [categoryObjects, setCategoryObjects] = useState([]);
  const [departmentIds, setDepartmentIds] = useState([]);
  const [departmentId, setDepartmentId] = useState(0);
  const [departmentNames, setDepartmentNames] = useState([]);

  
  useEffect(() => {
      if (open) {
        const fetchData = async () => {
          const data = await fetchUser();
          setDepartmentIds(data.departmentIds)
          setDepartmentNames(data.departmentNames)
          await fetchDepartment(data.departmentIds[0]);
        };
        fetchData();
      }
  }, [open]);

const fetchUser = async () => {
    try {
        const ires = await fetch("https://localhost:7161/api/users/profile",{
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }
            });
          const user = await ires.json();
          console.log("User fetched successfully");
          return user;
         
          
        }catch (error) {
          console.error("Error fetching user:", error);
        }
      }

  const fetchDepartment = async (deptId) => {
    try { 
      const res = await fetch(`https://localhost:7161/api/Departments/${deptId}`, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if(res.ok) {
        console.log("Department fetched successfully",data);
        setDepartment(data);
        setCategoryObjects(data.categories || [{id: 0, Name: "Error fetching Categories"}]);
        // Set the first category as default if available
      if (data.categories && data.categories.length > 0) {
        setCategory(data.categories[0].id);
      } else {
        setCategory(""); // or 0 if you prefer
      }
     }
    }catch (error) {
      console.error("Error fetching Departments:", error);
      setDepartment([{id: 0, Name: "Error fetching Departments"}]);
      alert("Failed to fetch departments.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("content", content);
    formData.append("categoryId", parseInt(category));
    formData.append("visibility", visibility);
    if (file){ formData.append("attachments", file);
      const categoryName = categoryObjects.find(cat => cat.id === parseInt(category))?.name;
      const departmentName = department.name || "General";
      formData.append("departmentName", departmentName);
      formData.append("categoryName", categoryName);
    };

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
        setDescription("");
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

      {/* Show department select only if more than one department */}
      {departmentIds.length > 1 && (
        <>
          <label
            htmlFor="department"
            className="block mb-2 text-sm font-medium"
          >
            Select Department
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            id="department"
            value={departmentId}
            onChange={async (e) => {
              setDepartmentId(e.target.value);
              await fetchDepartment(e.target.value);
            }}
            required
          >
            {departmentIds.map((dept, i) => (
              <option key={dept} value={dept}>
                {departmentNames[i] || `Department ${dept}`}
              </option>
            ))}
          </select>
        </>
      )}

      <select
        className="w-full border rounded px-3 py-2"
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        {categoryObjects.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        theme="snow"
      />
    

      <input
        type="file"
        id="fileUpload"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full border border-gray-300 rounded-lg p-2 text-gray-700 file:bg-green-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:cursor-pointer"
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
