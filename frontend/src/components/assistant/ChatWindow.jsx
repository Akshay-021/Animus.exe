import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.length === 0 && (
        <div className="empty-state">
          <strong>No messages yet</strong>
          <span>Press the voice button and ask about schemes or farm support.</span>
        </div>
      )}

      {messages.map((message, index) => (
        <MessageBubble key={`${message.type}-${index}`} message={message} />
      ))}
    </div>
  );
}
