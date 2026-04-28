import { SUGGESTION_CHIPS } from '../constants'
import styles from './SuggestionChips.module.css'

export default function SuggestionChips({ onSelect }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Try asking:</p>
      <div className={styles.chips}>
        {SUGGESTION_CHIPS.map((chip, i) => (
          <button
            key={i}
            className={styles.chip}
            onClick={() => onSelect(chip.text)}
          >
            {chip.text}
          </button>
        ))}
      </div>
    </div>
  )
}
