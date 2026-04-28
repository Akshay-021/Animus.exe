import { useState, useRef } from 'react'
import styles from './VoiceButton.module.css'

export default function VoiceButton({ onTranscript, language = 'en' }) {
  const [state, setState] = useState('idle') // idle | recording | processing
  const mediaRef = useRef(null)
  const chunksRef = useRef([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      chunksRef.current = []
      recorder.ondataavailable = e => chunksRef.current.push(e.data)
      recorder.onstop = async () => {
        setState('processing')
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const formData = new FormData()
        formData.append('audio', blob, 'recording.webm')
        formData.append('language', language)
        try {
          const res = await fetch('/api/voice/transcribe', { method: 'POST', body: formData })
          const data = await res.json()
          onTranscript(data.text || '')
        } catch {
          onTranscript('')
        }
        setState('idle')
        stream.getTracks().forEach(t => t.stop())
      }
      recorder.start()
      mediaRef.current = recorder
      setState('recording')
    } catch {
      alert('Microphone access denied. Please allow microphone access.')
    }
  }

  const stopRecording = () => {
    if (mediaRef.current && state === 'recording') {
      mediaRef.current.stop()
    }
  }

  const handleClick = () => {
    if (state === 'idle') startRecording()
    else if (state === 'recording') stopRecording()
  }

  return (
    <button
      className={`${styles.btn} ${styles[state]}`}
      onClick={handleClick}
      aria-label={state === 'recording' ? 'Stop recording' : 'Start voice input'}
      disabled={state === 'processing'}
    >
      {state === 'processing' ? (
        <svg className={styles.spinner} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ) : state === 'recording' ? (
        <span className={styles.stopIcon} />
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
        </svg>
      )}
      {state === 'recording' && <span className={styles.pulse} />}
    </button>
  )
}
