import React, { useState } from "react";
import Button from "../Props/Button"

const ChangePassword= ({onClose}) => {
  const [oldPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://localhost:7161/api/Users/${parseInt(localStorage.getItem("userId"))}/change-password`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
            confirmNewPassword
          }),
        }
      );

      if (res.ok) {
        alert("Password changed successfully");
        onClose();
      } else {
        const error = await res.text();
        alert(`Error: ${error}`);
      }
    } catch (err) {
      console.error("Password change error", err);
      alert("Failed to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="pr-4" htmlFor="">
          Current Password
        </label>
        <input
          placeholder="Current Password"
          type="password"
          className="w-full rounded border p-2"
          value={oldPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="New Password"
          className="w-full rounded border p-2"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full rounded border p-2"
          value={confirmNewPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <Button
        label="Change Password"
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      />
    </form>
  );
};

export default ChangePassword;
