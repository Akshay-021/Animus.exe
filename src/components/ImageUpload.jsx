import { useRef, useState } from 'react'
import styles from './ImageUpload.module.css'

export default function ImageUpload({ onImageSelect, image }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const url = URL.createObjectURL(file)
    onImageSelect({ file, url })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleChange = (e) => handleFile(e.target.files[0])

  const handleRemove = (e) => {
    e.stopPropagation()
    onImageSelect(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  if (image) {
    return (
      <div className={styles.preview}>
        <img src={image.url} alt="Uploaded crop" className={styles.previewImg} />
        <button className={styles.removeBtn} onClick={handleRemove} aria-label="Remove image">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <span className={styles.previewLabel}>Crop image ready</span>
      </div>
    )
  }

  return (
    <div
      className={`${styles.zone} ${dragging ? styles.dragging : ''}`}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload crop image"
      onKeyDown={e => e.key === 'Enter' && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className={styles.hiddenInput}
        onChange={handleChange}
      />
      <div className={styles.zoneContent}>
        <div className={styles.zoneIcon}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <p className={styles.zoneText}>
          <span className={styles.zoneMain}>Upload leaf / crop photo</span>
          <span className={styles.zoneSub}>tap to camera or drag & drop</span>
        </p>
      </div>
    </div>
  )
}
