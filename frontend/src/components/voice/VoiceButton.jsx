import { useState } from "react";

export default function VoiceButton({ onStop }) {
  const [recording, setRecording] = useState(false);

  let mediaRecorder;
  let chunks = [];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "audio/wav" });
      chunks = [];

      onStop(blob);
    };

    mediaRecorder.start();
    setRecording(true);

    setTimeout(() => {
      mediaRecorder.stop();
      setRecording(false);
    }, 5000);
  };

  return (
    <button onClick={startRecording}>
      {recording ? "Recording..." : "🎙️ Speak"}
    </button>
  );
}