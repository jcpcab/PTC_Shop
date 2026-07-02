import { useState } from 'react'
import styles from './FlavorCard.module.css'

export default function FlavorCard({ flavor }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <button
      type="button"
      className={`${styles.card} ${flipped ? styles.flipped : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <span className={styles.cardInner}>
        <span className={styles.front} style={{ background: flavor.gradient }}>
          <span
            className={`${styles.tag} ${flavor.signature ? styles.tagSignature : styles.tagRequest}`}
          >
            {flavor.signature ? '★ Signature' : 'By Request'}
          </span>
          <span className={styles.name}>{flavor.name}</span>
          <span className={styles.hint}>Tap for details</span>
        </span>
        <span className={styles.back}>
          <span className={styles.backName}>{flavor.name}</span>
          <span className={styles.description}>{flavor.description}</span>
          <span className={styles.hintBack}>Tap to flip back</span>
        </span>
      </span>
    </button>
  )
}
