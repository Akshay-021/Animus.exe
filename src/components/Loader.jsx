import styles from './Loader.module.css'

export default function Loader({ message = 'Thinking...' }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sprout}>
        <div className={styles.stem} />
        <div className={styles.leaf1} />
        <div className={styles.leaf2} />
      </div>
      <p className={styles.message}>{message}</p>
    </div>
  )
}
