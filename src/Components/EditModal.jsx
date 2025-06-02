import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const EditModal = ({ open, title, fields, initialData, onClose, onSubmit }) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px] bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={e => e.stopPropagation()}
      >
        <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500" onClick={onClose}>
          <FaTimes />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title || "Edit"}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-1 text-sm font-medium">{field.label}</label>
              <input
                className="w-full border rounded px-3 py-2"
                name={field.name}
                type={field.type || "text"}
                value={form[field.name] || ""}
                onChange={handleChange}
                required={field.required}
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

// Example usage:
/* <EditModal
  open={open}
  title="Edit Department"
  fields={[
    { name: "name", label: "Name", required: true },
    { name: "description", label: "Description" }
  ]}
  initialData={departmentData}
  onClose={closeModal}
  onSubmit={handleDepartmentUpdate}
/> */

export default EditModal;