export default function MessageBubble({ message }) {
  const isUser = message.type === "user";

  return (
    <div className={isUser ? "message-row user" : "message-row bot"}>
      <div className="message-bubble">{message.text}</div>
    </div>
  );
}
