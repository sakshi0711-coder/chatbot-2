import React, { useState } from "react";
import nhost from "../nhostClient";
import { useUserData } from "@nhost/react";

const MessageInput = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const user = useUserData();

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const INSERT_MESSAGE = `
        mutation InsertMessage($content: String!, $sender: uuid!, $chat_id: uuid!) {
          insert_message_one(object: { content: $content, sender: $sender, chat_id: $chat_id }) {
            id
            content
            sender
            chat_id
            created_at
          }
        }
      `;

      const result = await nhost.graphql.request(INSERT_MESSAGE, {
        content: message,
        sender: user?.id,
        chat_id: chatId,
      });

      if (result.error) {
        console.error("❌ Full GraphQL error object:", result.error);
        alert(result.error.errors?.[0]?.message || "GraphQL error - check console");
      } else {
        console.log("✅ Message sent:", result.data);
        setMessage("");
      }
    } catch (err) {
      console.error("❌ Network/Unexpected error:", err);
      alert("Network/Unexpected error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSend} style={{ display: "flex", gap: "10px", padding: "10px" }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "10px 20px", background: "#007bff", color: "#fff", borderRadius: "6px" }}>
        Send
      </button>
    </form>
  );
};

export default MessageInput;
