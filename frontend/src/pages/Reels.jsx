import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegComment,
  FaPaperPlane,
  FaRegBookmark,
} from "react-icons/fa";

function Reels() {
  const navigate = useNavigate();

  const [muted, setMuted] = useState(false);

  const [reels, setReels] = useState([
    {
      id: 1,
      user: "Honey_Bear",
      caption: "Connect • Share • Inspire 🚀",
      likes: 2300,
      comments: 185,
      liked: false,
      following: false,
      saved: false,
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      user: "kitty",
      caption: "Welcome to Social Hub ❤️",
      likes: 1800,
      comments: 96,
      liked: false,
      following: false,
      saved: false,
      video: "https://www.w3schools.com/html/movie.mp4",
    },
  ]);

  const toggleLike = (id) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === id
          ? {
              ...reel,
              liked: !reel.liked,
              likes: reel.liked ? reel.likes - 1 : reel.likes + 1,
            }
          : reel
      )
    );
  };

  const toggleFollow = (id) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === id
          ? { ...reel, following: !reel.following }
          : reel
      )
    );
  };

  const toggleSave = (id) => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === id
          ? { ...reel, saved: !reel.saved }
          : reel
      )
    );
  };

  const shareReel = () => {
    alert("Reel shared!");
  };

  return (
    <div className="reels-page">

      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/home")}
      >
        ← Back
      </button>

      {reels.map((reel) => (
        <div className="reel" key={reel.id}>

          <video
            src={reel.video}
            autoPlay
            loop
            muted={muted}
            playsInline
            className="reel-video"
            onDoubleClick={() => toggleLike(reel.id)}
          />

          <button
            className="sound-btn"
            onClick={() => setMuted(!muted)}
          >
            {muted ? "🔇" : "🔊"}
          </button>

          <div className="reel-overlay"></div>

          <div className="reel-bottom">

            <div className="user-row">

              <div className="profile-circle">
                {reel.user.charAt(0)}
              </div>

              <h4>@{reel.user}</h4>

              <button
                className="follow-btn"
                onClick={() => toggleFollow(reel.id)}
              >
                {reel.following ? "Following" : "Follow"}
              </button>

            </div>

            <p>{reel.caption}</p>

            <span>🎵 Original Audio</span>

          </div>

          <div className="action-buttons">

            <div
              onClick={() => toggleLike(reel.id)}
              style={{ cursor: "pointer" }}
            >
              <FaHeart
                size={28}
                color={reel.liked ? "red" : "white"}
              />
              <span>{reel.likes}</span>
            </div>

            <div>
              <FaRegComment size={28} />
              <span>{reel.comments}</span>
            </div>

            <div
              onClick={shareReel}
              style={{ cursor: "pointer" }}
            >
              <FaPaperPlane size={28} />
            </div>

            <div
              onClick={() => toggleSave(reel.id)}
              style={{ cursor: "pointer" }}
            >
              <FaRegBookmark
                size={28}
                color={reel.saved ? "gold" : "white"}
              />
            </div>

          </div>

        </div>
      ))}
    </div>
  );
}

export default Reels;