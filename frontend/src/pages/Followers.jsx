import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/follow.css";

function Followers() {
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    fetchFollowers();
  }, []);

  const fetchFollowers = async () => {
    try {
      const res = await API.get("/users/followers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFollowers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="follow-page">

      <div className="follow-header">
        <button
          className="back-btn"
          onClick={() => navigate("/profile")}
        >
          ←
        </button>

        <h2>Followers</h2>
      </div>

      <input
        className="follow-search"
        placeholder="Search..."
      />

      <div className="follow-list">

        {followers.length === 0 ? (
          <p>No followers yet.</p>
        ) : (
          followers.map((item) => (
            <div className="follow-item" key={item.id}>
              <div className="follow-avatar">
                {item.follower.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h4>{item.follower.name}</h4>
                <p>@{item.follower.username}</p>
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Followers;