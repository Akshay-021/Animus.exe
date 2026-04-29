import { useState } from "react";
import ChatWindow from "../components/assistant/ChatWindow";
import SuggestionChips from "../components/assistant/SuggestionChips";
import Loader from "../components/common/Loader";
import useAssistant from "../hooks/useAssistant";

export default function Assistant() {
  const { messages, sendAudio, sendMessage, loading } = useAssistant();
  const [recording, setRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (event) => chunks.push(event.data);
    mediaRecorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(chunks, { type: "audio/aac" });
      sendAudio(blob);
    };

    mediaRecorder.start();
    setRecorder(mediaRecorder);
    setRecording(true);
  };

  const stopRecording = () => {
    recorder?.stop();
    setRecording(false);
  };

  return (
    <div className="page two-column">
      <section className="panel">
        <p className="eyebrow">Voice AI</p>
        <h1>Assistant</h1>
        <p className="muted">
          Ask about farmer schemes, crop support, or soil guidance using voice.
        </p>
        <SuggestionChips onSelect={sendMessage} />

        <button
          className={recording ? "primary danger" : "primary"}
          onClick={recording ? stopRecording : startRecording}
          disabled={loading}
        >
          {recording ? "Stop recording" : "Start recording"}
        </button>

        {loading && <Loader text="Processing voice..." />}
      </section>

      <section className="panel chat-panel">
        <ChatWindow messages={messages} />
      </section>
    </div>
  );
}
