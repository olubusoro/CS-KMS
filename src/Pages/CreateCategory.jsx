import React, { useState} from "react";
import Button from '../Props/Button'
import {FaTimes} from "react-icons/fa";

const CreateCategory = ({ open, onClose, onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://localhost:7161/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          category,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Category created successfully!");
        onCategoryCreated && onCategoryCreated();
        handleClose();
      } else {
        alert(data.message || "Category creation failed.");
      }
    } catch (error) {
        console.error("Error: ", error)
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  const handleClose = () => {
    setName("");
    setCategory("");
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px] bg-black/60"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md p-3 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Create User
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Description
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              id="description"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="Description of the Category"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded hover:opacity-70 cursor-pointer transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
