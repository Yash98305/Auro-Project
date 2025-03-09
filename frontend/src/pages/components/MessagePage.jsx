import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); // Change to your backend URL

const MessagePage = () => {
  const { itemId, sellerId } = useParams(); // Get item & seller IDs from URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userId = localStorage.getItem("userId"); // Assume user is logged in

  useEffect(() => {
    // Join the chat room
    socket.emit("joinRoom", { itemId, userId, sellerId });

    // Listen for incoming messages
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [itemId, userId, sellerId]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        senderId: userId,
        receiverId: sellerId,
        itemId,
        text: newMessage,
      };

      socket.emit("sendMessage", messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto p-4 border shadow-lg">
      <h2 className="text-xl font-semibold text-center">Chat with Seller</h2>
      
      <div className="flex-1 overflow-y-auto p-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-1 max-w-xs rounded-lg ${
              msg.senderId === userId ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center border-t p-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagePage;
