import { useNavigate } from "react-router-dom";
function Search() {
  const navigate = useNavigate();

  return (
    <div className="search-page">

      <div className="search-header">
        <button
          className="back-btn"
          onClick={() => navigate("/home")}
        >
          ←
        </button>

        <h2>Search Users</h2>
      </div>

      <input
        className="search-input"
        placeholder="Search users..."
      />

      <div className="user-list">
        <p>No users found.</p>
      </div>

    </div>
  );
}

export default Search;