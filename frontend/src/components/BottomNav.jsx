import { useNavigate } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>

      <button onClick={() => navigate("/home")}>🏠</button>

      <button onClick={() => navigate("/users")}>🔍</button>

      <button onClick={() => navigate("/reels")}>🎬</button>

      <button onClick={() => navigate("/create-post")}>➕</button>

      <button onClick={() => navigate("/messages")}>💬</button>

      <button onClick={() => navigate("/profile")}>👤</button>

    </div>
  );
}

const styles = {
  navbar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    background: "#fff",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    borderTop: "1px solid #ddd",
    zIndex: 1000,
  },

  button: {
    border: "none",
    background: "none",
    fontSize: "24px",
    cursor: "pointer",
  },
};

export default BottomNav;