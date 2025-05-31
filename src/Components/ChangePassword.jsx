import React, { useState } from "react";
import Button from "../Props/Button"

const ChangePassword= ({onClose}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        "https://localhost:7161/api/Users/change-password",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
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
        <input
          placeholder="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
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
