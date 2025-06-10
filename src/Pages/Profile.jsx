import React, { useState, useEffect } from 'react';
import Button from "../Props/Button"
import Modal from '../Props/Modal';
import ChangePassword from '../Components/ChangePassword';


const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
    const [profile, setProfile] = useState(null);

     useEffect(() => {

        const token = localStorage.getItem("token");

        const fetchProfile = async () => {
            try {
                const res = await fetch(`https://localhost:7161/api/users/${parseInt(localStorage.getItem("userId"))}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                } else {
                    alert("failed to load profile ");
                }
            } catch (err) {
                console.error("profile error", err);
            }
        };
        fetchProfile();
    }, []);

    if (!profile) return <p>Loading Profile......</p>;

  return (
    <>
      <div
        className="p-6
     max-w-md mx-auto bg-white shadow-md rounded"
      >
        <h2 className="text-xl font-bold mb-7 text-center">User Profile</h2>
        <p className="text-gray-600 mb-10">
          <strong>Name:</strong> {profile.name || profile.fullName}
        </p>
        <p className="text-gray-600 mb-10">
          <strong>Email:</strong> {profile.email}
        </p>
        <p className="text-gray-600 mb-10">
          <strong>Role:</strong> {profile.role}
        </p>
        <p className="text-gray-600 mb-20">
          <strong>Department:</strong> {profile.departments || "N/A"}
        </p>
        <Button
          label="Change Password"
          onClick={openModal}
          className="bg-green-500 p-4 cursor-pointer ml-25 hover:bg-green-700 rounded-md"
        />

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ChangePassword onClose={closeModal} />
        </Modal>
      </div>
    </>
  );
}

export default Profile;
