import { useEffect, useState } from "react";
import API from "../services/api";
import CommentBox from "../components/CommentBox";
import BottomNav from "../components/BottomNav";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const likePost = async (id) => {
    try {
      await API.post(
        `/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
  try {
    await API.delete(`/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Post deleted successfully!");
    fetchPosts();
  } catch (err) {
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Failed to delete post");
  }
};
  const deleteComment = async (commentId) => {
    try {
      await API.delete(`/posts/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchPosts();
    } catch (err) {
      console.log(err);
      alert("Failed to delete comment");
    }
  };

  // ✅ SAFE IMAGE HANDLER (IMPORTANT FIX)
  const getImageUrl = (img) => {
  if (!img) return "";

  if (img.startsWith("http")) return img;

  return `https://social-media-platform-1-8ssl.onrender.com${img}`;
};
  return (
    <>
      <div className="home-wrapper">

        {/* Header */}
        <div className="top-header">
          <h1 className="app-name">Social Hub</h1>

          <button
            className="users-btn"
            onClick={() => navigate("/users")}
          >
            <FaUsers />
          </button>
        </div>

        {/* Stories */}
        <div className="stories-container">
          <div className="story">
            <div className="story-circle">+</div>
            <span>You</span>
          </div>

          <div className="story">
            <div className="story-circle">A</div>
            <span>Arjun</span>
          </div>

          <div className="story">
            <div className="story-circle">R</div>
            <span>Ravi</span>
          </div>
        </div>

        {/* Feed */}
        <div className="feed">
          {posts.map((post) => (
            <div className="post" key={post.id}>

              <div className="post-header">
                <div className="avatar">
                  {post.author?.name?.charAt(0).toUpperCase()}
                </div>

                <div className="username">
                  {post.author?.name}
                </div>
              </div>

              <div className="post-content">
                {post.content}

                {post.image && (
                  <img
                    src={getImageUrl(post.image)}
                    alt="Post"
                    className="post-image"
                  />
                )}
              </div>

              <div className="post-actions">
                <button onClick={() => likePost(post.id)}>
                  <span
                    style={{
                      color: post.likes.some(
                        (like) =>
                          like.userId === Number(localStorage.getItem("userId"))
                      )
                        ? "red"
                        : "black",
                    }}
                  >
                    ❤️
                  </span>{" "}
                  {post.likes.length}
                </button>

                <button>💬</button>

                {post.authorId === Number(localStorage.getItem("userId")) && (
  <button
    className="delete-btn"
    onClick={() => deletePost(post.id)}
  >
    🗑️ Delete
  </button>
)}
              </div>

              {post.comments?.length > 0 && (
                <div className="comments-section">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <div className="comment-content">
                        <span className="comment-user">
                          {comment.user?.name}
                        </span>

                        <span className="comment-text">
                          {comment.text}
                        </span>
                      </div>

                      <button
                        className="delete-comment-btn"
                        onClick={() => deleteComment(comment.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <CommentBox
                postId={post.id}
                refreshPosts={fetchPosts}
              />

            </div>
          ))}
        </div>

      </div>

      <BottomNav />
    </>
  );
}

export default Home;