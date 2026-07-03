import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/createPost.css";

function CreatePost() {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const createPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      await API.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post created successfully!");
      navigate("/home");
    } catch (err) {
      console.log(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post-card">

        <button
          className="back-btn"
          onClick={() => navigate("/home")}
        >
          ← Back
        </button>

        <h2>Create New Post</h2>

        <form onSubmit={createPost}>
          <textarea
            className="post-input"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            className="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* Optional preview (VERY USEFUL) */}
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ width: "100px", marginTop: "10px" }}
            />
          )}

          <button className="post-btn" type="submit">
            Post
          </button>
        </form>

      </div>
    </div>
  );
}

export default CreatePost;