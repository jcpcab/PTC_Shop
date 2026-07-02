import styles from './Footer.module.css'
import logoWhite from '../assets/logo-white.png'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <img src={logoWhite} alt="Pass The Cake" className={styles.logo} />
        <p className={styles.tagline}>Small batch cheesecakes, made to order since 2017.</p>
        <a
          href="https://instagram.com/passthecakeshop"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.social}
        >
          @passthecakeshop
        </a>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Pass The Cake Shop. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
