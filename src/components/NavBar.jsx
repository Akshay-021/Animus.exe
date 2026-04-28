import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../AppContext'
import { LANGUAGES } from '../constants'
import styles from './NavBar.module.css'

export default function NavBar() {
  const { language, setLanguage } = useApp()
  const location = useLocation()
  const [langOpen, setLangOpen] = useState(false)

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0]

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>
        <span className={styles.brandIcon}>🌾</span>
        <div>
          <span className={styles.brandName}>JanVaani AI</span>
          <span className={styles.brandTagline}>Kisan Ka Saathi</span>
        </div>
      </Link>

      <div className={styles.actions}>
        <div className={styles.langPicker}>
          <button
            className={styles.langBtn}
            onClick={() => setLangOpen(!langOpen)}
            aria-label="Select language"
          >
            <span className={styles.langNative}>{currentLang.native}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {langOpen && (
            <div className={styles.langDropdown}>
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`${styles.langOption} ${lang.code === language ? styles.langActive : ''}`}
                  onClick={() => { setLanguage(lang.code); setLangOpen(false) }}
                >
                  <span className={styles.langOptionNative}>{lang.native}</span>
                  <span className={styles.langOptionLabel}>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <Link
          to="/assistant"
          className={`${styles.assistantBtn} ${location.pathname === '/assistant' ? styles.assistantBtnActive : ''}`}
        >
          Ask AI
        </Link>
      </div>
    </nav>
  )
}
