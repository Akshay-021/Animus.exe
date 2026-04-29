import { useState } from "react";
import { sendVoice } from "../services/api";
import { formatAssistantResponse } from "../utils/helpers";

export default function useAssistant() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendAudio = async (blob) => {
    setLoading(true);

    try {
      const data = await sendVoice(blob);

      setMessages((prev) => [
        ...prev,
        { type: "user", text: data.transcription || "Voice input" },
        { type: "bot", text: formatAssistantResponse(data) },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: error.message || "Error connecting to backend" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text },
      { type: "bot", text: "Use voice recording to send this request to JanVaani AI." },
    ]);
  };

  return { messages, sendAudio, sendMessage, loading };
}
