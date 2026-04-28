export default function MessageBubble({ message }) {
  const isUser = message.type === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`p-3 rounded-lg max-w-xs ${
          isUser ? "bg-green-500 text-white" : "bg-gray-200"
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}