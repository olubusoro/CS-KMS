import React, { useState, useEffect } from "react";
import {FaTimes} from "react-icons/fa";

const roles = [
  { value: 0, label: "Staff" },
  { value: 1, label: "Department Admin" },
  { value: 2, label: "Super Admin" },
];

const CreateUserModal = ({ open, onClose, onUserCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [departmentsObjects, setDepartmentsObjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchDepartments();
    }
  }, [open]);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("https://localhost:7161/api/Departments", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setDepartmentsObjects(data);
    } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartmentsObjects([{ id: 0, Name: "Error fetching departments" }]);
      alert("Failed to fetch departments.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://localhost:7161/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          departments,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "User created successfully!");
        onUserCreated && onUserCreated();
        handleClose();
      } else {
        alert(data.message || "User creation failed.");
      }
    } catch (error) {
        console.error("Error: ", error)
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole(0);
    setDepartments([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px] bg-black/60"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          onClick={handleClose}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
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
              Email
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full border rounded px-3 py-2"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="role">
              Role
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              id="role"
              value={role}
              onChange={(e) => setRole(Number(e.target.value))}
              required
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="departments"
            >
              Departments
            </label>
            <select
              className="w-full border rounded px-3 py-2"
              id="departments"
              multiple
              value={departments}
              onChange={(e) =>
                setDepartments(
                  Array.from(e.target.selectedOptions, (option) =>
                    Number(option.value)
                  )
                )
              }
              required
            >
              {departmentsObjects.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.Name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded hover:opacity-70 transition cursor-pointer"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;