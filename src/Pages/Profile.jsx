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
      <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">User Profile</h2>
        <p>
        <strong>Name:</strong> {profile.name || profile.fullName}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Role:</strong> {profile.role}
      </p>
      <p>
        <strong>Department:</strong> {profile.department || "N/A"}
      </p>
         <Button label="Change Password" onClick={openModal} className='bg-green-500 p-4 cursor-pointer hover:bg-green-700 rounded-md' />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ChangePassword onClose={closeModal} />
      </Modal>
      </div>
     
    </>
  );
}

export default Profile;
