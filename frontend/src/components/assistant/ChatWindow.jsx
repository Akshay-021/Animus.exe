// frontend/src/components/assistant/ChatWindow.jsx

export default function ChatWindow({ messages }) {
  return (
    <div style={{ background: "#f5f5f5", padding: "10px", minHeight: "200px" }}>
      {messages.length === 0 && <p>No messages yet</p>}

      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <strong>{msg.type === "user" ? "You" : "AI"}:</strong>
          <div>{msg.text}</div>
        </div>
      ))}
    </div>
  )
}