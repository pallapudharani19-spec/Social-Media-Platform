import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/profile.css";

function UserProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(res.data);
      setIsFollowing(res.data.isFollowing);
    } catch (err) {
      console.log(err);
    }
  };

  const followUser = async () => {
    try {
      await API.post(
        `/users/${id}/follow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchUser();
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="profile-page">

      <div className="profile-header">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h2>{user.name}</h2>
      </div>

      <div className="profile-top">

        <div className="left-section">
          <div className="profile-pic">👤</div>

          <h3>{user.name}</h3>
          <p>@{user.username}</p>
          <p>{user.bio}</p>
        </div>

        <div className="profile-stats">

          <div>
            <h3>{user.posts?.length || 0}</h3>
            <p>Posts</p>
          </div>

          <div>
            <h3>{user.followers?.length || 0}</h3>
            <p>Followers</p>
          </div>

          <div>
            <h3>{user.following?.length || 0}</h3>
            <p>Following</p>
          </div>

        </div>

      </div>

      <div className="profile-buttons">
        <button
          className="edit-btn"
          onClick={followUser}
        >
          {isFollowing ? "Following ✓" : "Follow"}
        </button>
      </div>

      <hr />

      <h4>Posts</h4>

      <div className="posts-grid">
        {user.posts?.map((post) => (
          <div key={post.id} className="grid-box">
            {post.image ? (
              <img
                src={`https://localhost:5000${post.image}`}
                alt=""
                className="grid-image"
              />
            ) : (
              <p>{post.content}</p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default UserProfile;