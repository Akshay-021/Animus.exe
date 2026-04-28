import { useState } from "react"
import ChatWindow from "../components/assistant/ChatWindow"
import useAssistant from "../hooks/useAssistant"

export default function Assistant() {
  const { messages, sendAudio, loading } = useAssistant()
  const [recording, setRecording] = useState(false)
  const [recorder, setRecorder] = useState(null)

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)

    let chunks = []

    mediaRecorder.ondataavailable = e => chunks.push(e.data)

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/aac" })
      sendAudio(blob)
    }

    mediaRecorder.start()
    setRecorder(mediaRecorder)
    setRecording(true)
  }

  const stopRecording = () => {
    recorder.stop()
    setRecording(false)
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">🎤 JanVaani Assistant</h1>

      <ChatWindow messages={messages} />

      {!recording ? (
        <button onClick={startRecording} className="bg-green-600 text-white p-3 rounded">
          Start Talking
        </button>
      ) : (
        <button onClick={stopRecording} className="bg-red-600 text-white p-3 rounded">
          Stop
        </button>
      )}

      {loading && <p>Processing...</p>}
    </div>
  )
}