import React, { useState } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import PostEditor from '../Components/PostEditor';
import Modal from '../Components/Modal';
import Button from '../Props/Button';



const Posts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
    // const navigate = useNavigate();
    
  const handleNewPost = () => {
    setIsModalOpen(true);
    // navigate("/dashboardLayout/new-post/Editor");
  };
  const closeModal = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Button
        label="New Post"
      onClick={handleNewPost}
      className='border rounded-xl w-30 cursor-pointer bg-green-500 p-3'
      />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PostEditor onClose={closeModal} />
     </Modal>
     
 
     <Outlet />
    </>
  );
}

export default Posts;
