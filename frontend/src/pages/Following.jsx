import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/follow.css";

function Following() {
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    fetchFollowing();
  }, []);

  const fetchFollowing = async () => {
    try {
      const res = await API.get("/users/following", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFollowing(res.data);
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

        <h2>Following</h2>
      </div>

      <input
        className="follow-search"
        placeholder="Search..."
      />

      <div className="follow-list">

        {following.length === 0 ? (
          <p>Not following anyone.</p>
        ) : (
          following.map((item) => (
            <div className="follow-item" key={item.id}>
              <div className="follow-avatar">
                {item.following.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h4>{item.following.name}</h4>
                <p>@{item.following.username}</p>
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Following;