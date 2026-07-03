import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Messages() {
  const navigate = useNavigate();

  const chats = [
    {
      id: 1,
      name: "Arjun",
      message: "Hey! How are you?",
      time: "2m",
    },
    {
      id: 2,
      name: "Ravi",
      message: "Let's meet tomorrow.",
      time: "10m",
    },
    {
      id: 3,
      name: "Priya",
      message: "Sent a photo 📷",
      time: "1h",
    },
  ];

  return (
    <div className="messages-page">

      <div className="messages-header">
  <button
    className="back-btn"
    onClick={() => navigate("/home")}
  >
    <FaArrowLeft />
  </button>

  <h2>Messages</h2>
</div>
      <input
        className="search-box"
        placeholder="Search"
      />

      <div className="chat-list">
        {chats.map((chat) => (
          <div
  className="chat-item"
  key={chat.id}
  onClick={() => navigate("/chat")}
>
            <div className="chat-avatar">
              {chat.name.charAt(0)}
            </div>

            <div className="chat-info">
              <h4>{chat.name}</h4>
              <p>{chat.message}</p>
            </div>

            <span className="chat-time">
              {chat.time}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Messages;