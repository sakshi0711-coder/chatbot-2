import { useUserData, useAuthenticationStatus } from "@nhost/react";
import { useState } from "react";
import nhost from "../nhostClient";
import { gql } from "graphql-request";

// Correct mutation name: insert_message
const INSERT_MESSAGE = gql`
  mutation InsertMessage($content: String!, $sender: uuid!, $chat_id: uuid!) {
    insert_message(objects: { content: $content, sender: $sender, chat_id: $chat_id }) {
      affected_rows
      returning {
        id
        content
        sender
        chat_id
        created_at
      }
    }
  }
`;


function MessageInput({ chatId }) {
  const { isAuthenticated } = useAuthenticationStatus();
  const user = useUserData(); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return alert("Message cannot be empty");
    if (!isAuthenticated) return alert("You must be logged in to send messages");

   try {
  const result = await nhost.graphql.request(INSERT_MESSAGE, {
    content: message,
    sender: user?.id,                       // UUID
    chat_id: chatId                          // valid UUID
  });

  // Access directly
  console.log("Message saved:", result.insert_message.returning[0]);
  setMessage("");

} catch (err) {
  console.error("GraphQL error:", err);
  alert("Error sending message");
}
  }

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px" }}>
      <h2>Chat</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
