import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

function Chat() {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! 👋", sender: "other" },
    { id: 2, text: "Hello!", sender: "me" },
    { id: 3, text: "How are you?", sender: "other" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: input,
        sender: "me",
      },
    ]);

    setInput("");
  };

  return (
    <div className="chat-page">

      <div className="chat-header">
        <button onClick={() => navigate("/messages")}>
          <FaArrowLeft />
        </button>

        <h3>Arjun</h3>
      </div>

      <div className="chat-body">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              msg.sender === "me"
                ? "my-message"
                : "other-message"
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>

    </div>
  );
}

export default Chat;