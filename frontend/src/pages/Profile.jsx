import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import EditProfileModal from "../components/EditProfileModal";

function Profile() {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    username: "",
    bio: "",
    posts: [],
  });
const [showEditModal, setshowEditModal] = useState(false);
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveProfile = async () => {
    try {
      await API.put(
        "/users/profile",
        {
          name: user.name,
          username: user.username,
          bio: user.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Profile Updated!");
      setEditing(false);
      fetchProfile();
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="profile-page">

      <div className="profile-header">
        <button className="back-btn" onClick={() => navigate("/home")}>
          ←
        </button>

        <h2>Profile</h2>
      </div>

      <div className="profile-top">

        <div className="left-section">
          <div className="profile-pic">👤</div>

          {editing ? (
            <>
              <input
                value={user.name}
                onChange={(e) =>
                  setUser({ ...user, name: e.target.value })
                }
              />

              <input
                value={user.username || ""}
                onChange={(e) =>
                  setUser({ ...user, username: e.target.value })
                }
              />

              <textarea
                value={user.bio || ""}
                onChange={(e) =>
                  setUser({ ...user, bio: e.target.value })
                }
              />
            </>
          ) : (
            <>
              <h3>{user.name}</h3>
              <p>@{user.username}</p>
              <p>{user.bio}</p>
            </>
          )}
        </div>

        <div className="profile-stats">

  <div>
    <h3>{user.posts?.length || 0}</h3>
    <p>Posts</p>
  </div>

  <div
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/followers")}
  >
    <h3>{user.followers?.length || 0}</h3>
    <p>Followers</p>
  </div>

  <div
    style={{ cursor: "pointer" }}
    onClick={() => navigate("/following")}
  >
    <h3>{user.following?.length || 0}</h3>
    <p>Following</p>
  </div>

</div>

      </div>

      <div className="profile-buttons">
        <button
  className="edit-btn"
  onClick={() => setshowEditModal(true)}
>
  Edit Profile
</button>

        <button className="share-btn">
          Share Profile
        </button>
      </div>

      <hr />

      <h4>Your Posts</h4>

      <div className="posts-grid">
        {user.posts?.map((post) => (
          <div key={post.id} className="grid-box">
            {post.image ? (
              <img
                src={`https://social-media-platform-gli9.onrender.com${post.image}`}
                alt=""
                className="grid-image"
              />
            ) : (
              <p>{post.content}</p>
            )}
          </div>
        ))}
      </div>
      {showEditModal && (
  <EditProfileModal
    user={user}
    setUser={setUser}
    closeModal={() => setshowEditModal(false)}
  />
)}

    </div>
  );
}

export default Profile;