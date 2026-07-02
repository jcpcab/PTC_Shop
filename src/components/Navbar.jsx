import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import logo from '../assets/logo-circle.png'

const links = [
  { href: '#about', label: 'Our Story' },
  { href: '#menu', label: 'Flavors' },
  { href: '#sizes', label: 'Sizes' },
  { href: '#gallery', label: 'Gallery' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`container ${styles.nav}`}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <img src={logo} alt="Pass The Cake logo" className={styles.logo} />
          <span className={styles.brandName}>Pass The Cake</span>
        </a>

        <button
          className={styles.toggle}
          aria-label="menu"
          onClick={() => setOpen(!open)}
        >
          <span className={`${styles.bar} ${open ? styles.barTopOpen : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barMidOpen : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barBotOpen : ''}`} />
        </button>

        <ul className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#order" className={styles.cta} onClick={() => setOpen(false)}>
              Order Now
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
