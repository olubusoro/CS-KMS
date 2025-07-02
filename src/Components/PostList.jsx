import React, {useEffect, useState} from "react";
import Modal from "../Props/Modal";
import { useOutletContext } from "react-router-dom";
import { FaMountainSun } from "react-icons/fa6";
import toast from "react-hot-toast"

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 11;
  const {searchTerm} = useOutletContext();
  const [attachmentUrls, setAttachmentUrls] = useState({});
  const [reason, setReason] = useState("");
  const [postId, setPostId] = useState(0);

  const baseUrl = import.meta.env.VITE_BACKEND_URL || "https://localhost:7161";

  useEffect(() => {
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm]);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseUrl}/api/Posts`, {
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

  const handlePostClick = async (post) => {
    await fetch(`${baseUrl}/api/Posts/${post.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedPost(data);
      })
      .catch((error) => {
        console.error("Failed to fetch post details:", error);
      });
  };

  const handleRequestAccess = async () => {
    if (!reason.trim()) {
      toast.error("Please provide a reason for the access request.");
      return;
    }
    await fetch(`${baseUrl}/api/access-requests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId: postId,
        reason: reason,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Access request sent successfully!");
        setSelectedPost((prev) => ({
          ...prev,
          accessRequestStatus: "Requested",
        }));
      })
      .catch((error) => {
        console.error("Failed to send access request:", error);
        toast.error("An error occurred while sending the access request.");
      });
  };



  const getAttachmentUrl = async (PostId, AttachmentId, contentType) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/Posts/${PostId}/attachments/${AttachmentId}`,
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
  };

  useEffect(() => {
    const fetchUrls = async () => {
      if (selectedPost?.post && selectedPost.post.attachments.length > 0) {
        const urls = {};
        for (const attachment of selectedPost.post.attachments) {
          urls[attachment.id] = await getAttachmentUrl(
            selectedPost.post.id,
            attachment.id,
            attachment.contentType
          );
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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white h-70 shadow-md border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => {
                handlePostClick(post);
                setPostId(post.id);
              }}
            >
              <h3 className="font-bold text-2xl text-green-600 truncate">
                {post.title}
              </h3>
              <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                {post.description}
              </p>
              <span className="flex align-center justify-center text-9xl text-gray-500" >
                <FaMountainSun />
              </span>
              
              <div className="flex mt-12 justify-between text-xs text-gray-400">
                <span>{post.categoryName || "General"}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
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
            {selectedPost.accessGranted === true ? (
              <>
                <p className="text-gray-600">{selectedPost.post.description}</p>
                <div
                  className="prose max-w-none wrap-break-word"
                  dangerouslySetInnerHTML={{__html: selectedPost.post.content}}
                />
                {selectedPost.post.attachments.length > 0 &&
                  selectedPost.post.attachments.map((attachment) => {
                    const ext = attachment.originalFileName
                      .split(".")
                      .pop()
                      .toLowerCase();
                    const isDocx = ext === "docx";
                    return (
                      <span className="block" key={attachment.id}>
                        📎
                        <a
                          href={attachmentUrls[attachment.id] || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline mt-4"
                        >
                          {isDocx ? "Download" : "View"}{" "}
                          {attachment.originalFileName}
                        </a>
                      </span>
                    );
                  })}
              </>
            ) : selectedPost.accessRequestStatus === "NotRequested" ? (
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                <p className="text-red-600 text-lg mb-4">
                  Access Denied: You do not have permission to view this post.
                </p>
                <input
                  type="text"
                  placeholder="Reason for access request"
                  className="border rounded px-3 py-2 mb-4 w-full max-w-md"
                  onChange={(e) => setReason(e.target.value)}
                  required
                  value={reason}
                />
                <button
                  className="bg-green-600 text-white px-6 py-3 rounded shadow"
                  onClick={() => {
                    // Implement your access request logic here
                    handleRequestAccess();
                  }}
                >
                  Request Access
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                <p className="text-gray-700 text-lg">
                  Access Request Status: {selectedPost.accessRequestStatus}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PostList;
