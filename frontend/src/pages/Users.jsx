import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="follow-page">
      <div className="follow-header">
        <button
          className="back-btn"
          onClick={() => navigate("/home")}
        >
          ←
        </button>

        <h2>Users</h2>
      </div>

      <input
        className="follow-search"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="follow-list">
        {filteredUsers.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            No users found.
          </p>
        ) : (
          filteredUsers.map((user) => (
            <div className="follow-item" key={user.id}>
              <div className="follow-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div style={{ flex: 1 }}>
                <h4>{user.name}</h4>
                <p>@{user.username || "user"}</p>
              </div>

              <button
                className="follow-btn"
                onClick={() => navigate(`/user/${user.id}`)}
              >
                View Profile
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Users;