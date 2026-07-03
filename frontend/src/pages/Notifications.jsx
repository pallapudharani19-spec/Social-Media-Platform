import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart, FaComment, FaUserPlus } from "react-icons/fa";
import "../styles/Notification.css";

function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      icon: <FaHeart color="red" />,
      text: "Ravi liked your post",
      time: "2m",
    },
    {
      id: 2,
      icon: <FaComment color="#1877f2" />,
      text: "Priya commented: Nice photo!",
      time: "10m",
    },
    {
      id: 3,
      icon: <FaUserPlus color="green" />,
      text: "Arjun started following you",
      time: "1h",
    },
  ];

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <button className="back-btn" onClick={() => navigate("/home")}>
          <FaArrowLeft />
        </button>
        <h2>Notifications</h2>
      </div>

      {notifications.map((item) => (
        <div className="notification-item" key={item.id}>
          <div className="icon">{item.icon}</div>

          <div className="notification-text">
            <p>{item.text}</p>
            <span>{item.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;