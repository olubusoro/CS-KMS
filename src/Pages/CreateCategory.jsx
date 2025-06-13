import React, { useState} from "react";
import Button from '../Props/Button'
import {FaTimes} from "react-icons/fa";
import FetchData from "../Utils/FetchData";

const CreateCategory = ({ open, onClose, onCategoryCreated }) => {
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState(0);
  const [departmentIds, setDepartmentIds] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (open) {
      const fetchData = async () => {
        const data = await FetchData("https://localhost:7161/api/users/profile");
        if (data && data.departmentIds && data.departmentIds.length > 0) {
          setDepartmentId(data.departmentIds[0]);
          setDepartmentIds(data.departmentIds);
          setDepartmentNames(data.departmentNames);
        }
      };
      fetchData();
    }
  }, [open]);


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
          description,
          departmentId
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
    setDescription("");
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
          {departmentIds.length > 1 && (
            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="department">
                Select Department
              </label>
              <select
                className="w-full border rounded px-3 py-2"
                id="department"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                required
              >
                {departmentIds.map((dept, i) => (
                  <option key={dept} value={dept}>
                    {departmentNames[i] || `Department ${dept}`}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Description
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
