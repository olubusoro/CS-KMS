import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';



const Posts = () => {
    const navigate = useNavigate();
    
    const handleNewPost = () => {
        navigate("/dashboardLayout/new-post/Editor");
    }
  return (
    <>
      <button
      onClick={handleNewPost}
      className='border rounded-xl w-30 cursor-pointer bg-green-500 p-3'
      >
      New Post
     
    </button>
     <Outlet />
    </>
  );
}

export default Posts;
