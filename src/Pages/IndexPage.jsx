import React from "react";
import PostList from "../Components/PostList";


const IndexPage = () => {
    const [posts, setPosts] = React.useState([]);
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://localhost:7161/api/Posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const sortedPosts = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  },[]);

  return (
    <div>
        <PostList posts={posts} />
    </div>
  );
};

export default IndexPage;
