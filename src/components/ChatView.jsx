// import React, { useEffect, useState } from "react";
// import nhost from "../nhostClient";
// import { useAuthenticationStatus } from "@nhost/react";

// // ✅ GraphQL subscription for all messages (real-time)
// const SUBSCRIBE_MESSAGES = `
//   subscription {
//     messages(order_by: { created_at: asc }) {
//       id
//       content
//       created_at
//       user_id
//     }
//   }
// `;

// // ✅ GraphQL mutation to insert new message
// const INSERT_MESSAGE = `
//   mutation InsertMessage($content: String!) {
//     insert_messages_one(object: { content: $content }) {
//       id
//       content
//       created_at
//       user_id
//     }
//   }
// `;

// function ChatView() {
//   const { isAuthenticated } = useAuthenticationStatus();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔹 Subscribe to all messages
//   useEffect(() => {
//     if (!isAuthenticated) return;

//     const observable = nhost.graphql.subscribe(
//       SUBSCRIBE_MESSAGES,
//       {},
//       (res) => {
//         if (res.errors) {
//           console.error("Subscription error:", res.errors);
//           return;
//         }
//         if (res.data) {
//           setMessages(res.data.messages);
//         }
//       }
//     );

//     return () => observable.unsubscribe();
//   }, [isAuthenticated]);

//   // 🔹 Handle sending new message
//   const handleSendMessage = async () => {
//     if (!message.trim()) return alert("Message cannot be empty");
//     if (!isAuthenticated) return alert("You must be logged in");

//     try {
//       setLoading(true);
//       const result = await nhost.graphql.request(INSERT_MESSAGE, {
//         content: message,
//       });

//       if (result.error) {
//         console.error(result.error);
//         alert("Failed to send message");
//       } else {
//         console.log("Message saved:", result.data.insert_messages_one);
//         setMessage(""); // clear input after sending
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error sending message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isAuthenticated) {
//     return <p style={{ textAlign: "center" }}>⚠️ Please log in to chat</p>;
//   }

//   return (
//     <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px" }}>
//       <h2>Chat Room</h2>

//       {/* 🔹 Messages Section */}
//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: "10px",
//           height: "300px",
//           overflowY: "auto",
//           borderRadius: "8px",
//           background: "#f9f9f9",
//           marginBottom: "10px",
//         }}
//       >
//         {messages.length === 0 ? (
//           <p>No messages yet</p>
//         ) : (
//           messages.map((msg) => (
//             <div
//               key={msg.id}
//               style={{
//                 marginBottom: "10px",
//                 padding: "8px",
//                 background: "#fff",
//                 borderRadius: "8px",
//                 boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//               }}
//             >
//               <span style={{ fontSize: "14px", color: "#333" }}>
//                 {msg.content}
//               </span>
//               <br />
//               <small style={{ color: "#888" }}>
//                 {new Date(msg.created_at).toLocaleTimeString()}
//               </small>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🔹 Input Section */}
//       <div style={{ display: "flex", gap: "10px" }}>
//         <input
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//           style={{ flex: 1, padding: "10px" }}
//         />
//         <button onClick={handleSendMessage} disabled={loading}>
//           {loading ? "Sending..." : "Send"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatView;
