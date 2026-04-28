import styles from './MessageBubble.module.css'

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.userWrapper : styles.aiWrapper}`}>
      {!isUser && (
        <div className={styles.avatar}>🌾</div>
      )}
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
        {message.image && (
          <img src={message.image} alt="Uploaded" className={styles.bubbleImage} />
        )}
        <div className={styles.text} dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
        {message.intent && (
          <div className={styles.intentTag}>
            <span className={styles.intentDot} data-intent={message.intent} />
            {formatIntent(message.intent)}
          </div>
        )}
      </div>
    </div>
  )
}

function formatMessage(text) {
  if (!text) return ''
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
}

function formatIntent(intent) {
  const labels = {
    disease_detection: 'Disease Detection',
    crop_recommendation: 'Crop Advice',
    soil_advice: 'Soil Analysis',
    scheme_help: 'Govt Scheme',
    general_farming: 'General Farming',
  }
  return labels[intent] || intent
}
