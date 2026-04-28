import { useState } from "react";
import VoiceButton from "../components/voice/VoiceButton";
import SchemeCard from "../components/results/SchemeCard";
import { sendVoiceToAssistant } from "../services/assistant";

export default function Assistant() {
  const [transcription, setTranscription] = useState("");
  const [schemes, setSchemes] = useState([]);

  const handleVoice = async (blob) => {
    const data = await sendVoiceToAssistant(blob);

    setTranscription(data.transcription || "");

    if (data.result?.schemes) {
      setSchemes(data.result.schemes);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎙️ Voice Assistant</h2>

      <VoiceButton onStop={handleVoice} />

      {transcription && (
        <p><b>You said:</b> {transcription}</p>
      )}

      {schemes.map((s, i) => (
        <SchemeCard key={i} scheme={s} />
      ))}
    </div>
  );
}