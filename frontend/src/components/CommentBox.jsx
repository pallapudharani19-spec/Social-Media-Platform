import { useState } from "react";
import API from "../services/api";

function CommentBox({ postId, refreshPosts }) {
  const [text, setText] = useState("");

  const addComment = async () => {
    if (!text.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      await API.post(
        `/posts/${postId}/comment`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setText("");
      refreshPosts();
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addComment}>Comment</button>
    </div>
  );
}

export default CommentBox;