import { createContext, useContext, useMemo, useState } from "react";
import { sendVoice as sendVoiceRequest } from "../services/api";
import { formatAssistantResponse } from "../utils/helpers";

const AssistantContext = createContext(null);

export function AssistantProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { type: "user", text },
      { type: "bot", text: "Use the voice button to send this request to JanVaani AI." },
    ]);
  };

  const sendVoice = async (blob) => {
    setLoading(true);

    try {
      const data = await sendVoiceRequest(blob);
      setMessages((prev) => [
        ...prev,
        { type: "user", text: data.transcription || "Voice input" },
        { type: "bot", text: formatAssistantResponse(data) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ messages, loading, sendMessage, sendVoice }),
    [messages, loading]
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistantContext() {
  const context = useContext(AssistantContext);

  if (!context) {
    throw new Error("useAssistantContext must be used inside AssistantProvider");
  }

  return context;
}
