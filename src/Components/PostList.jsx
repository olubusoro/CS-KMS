import React, {useEffect, useState} from "react";
import Modal from "../Props/Modal";
import {useOutletContext} from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 11;
  const { searchTerm} = useOutletContext()
  const [attachmentUrls, setAttachmentUrls] = useState({});

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm]);
  

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://localhost:7161/api/Posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // Sort by newest first
      const sortedPosts = data.sort((a, b) => b.id - a.id);

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const filteredPosts = posts.filter(
    (post) =>
      post.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const getAttachmentUrl = async (PostId, AttachmnetId, contentType) => {
    try {
      const res = await fetch(
        `https://localhost:7161/api/Posts/${PostId}/attachments/${AttachmnetId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": contentType,
          },
        }
      );
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        console.log("Attachment URL:", url);
        return url;
      } else {
        console.error("Failed to fetch attachment URL");
      }
    } catch (error) {
      console.error("Failed to fetch attachment URL:", error);
      return null;
    }
  }

  useEffect(() => {
    const fetchUrls = async () => {
      if (selectedPost && selectedPost.attachments.length > 0) {
        const urls = {};
        for (const attachment of selectedPost.attachments) {
          urls[attachment.id] = await getAttachmentUrl(selectedPost.id, attachment.id, attachment.contentType);
        }
        setAttachmentUrls(urls);
      }
    };
    fetchUrls();
  }, [selectedPost]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">My Posts</h2>

      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded p-4 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedPost(post)}
          >
            <h3 className="font-bold text-lg">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-2">
              {post.description}
            </p>
          </div>
        ))
      )}

      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
        {Array.from({length: totalPages}, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === number
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border-green-600"
            }`}
          >
            {number}
          </button>
        ))}
      </div>

      {/* Modal for full post */}
      <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)}>
        {selectedPost && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{selectedPost.title}</h3>
            <p className="text-gray-600">{selectedPost.description}</p>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{__html: selectedPost.content}}
            />
            {selectedPost.attachments.length > 0 && (
              selectedPost.attachments.map((attachment) => {
                const ext = attachment.originalFileName.split('.').pop().toLowerCase();
                const isDocx = ext === "docx";
                return (
                  <span className="block">📎
                  <a
                    key={attachment.id}
                    href={attachmentUrls[attachment.id] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-4"
                  >
                     {isDocx ? "Download" : "View"} {attachment.originalFileName}
                  </a></span>
                );
              })
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PostList;
