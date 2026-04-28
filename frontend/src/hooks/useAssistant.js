// frontend/src/hooks/useAssistant.js

import { useState } from "react"

export default function useAssistant() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendAudio = async (blob) => {
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", blob)

      const res = await fetch("http://localhost:8000/assistant/voice", {
        method: "POST",
        body: formData
      })

      const data = await res.json()

      setMessages(prev => [
        ...prev,
        { type: "user", text: "🎤 Voice input" },
        { type: "bot", text: JSON.stringify(data.result || data, null, 2) }
      ])

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { type: "bot", text: "Error connecting to backend" }
      ])
    }

    setLoading(false)
  }

  return { messages, sendAudio, loading }
}