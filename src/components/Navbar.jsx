import { useState, useEffect, useRef } from 'react'
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
  const [activeHref, setActiveHref] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape or on a click/tap outside the nav.
  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }

    function handleOutsideClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('touchstart', handleOutsideClick)
    }
  }, [open])

  // Highlight the nav link for whichever section is currently in view.
  useEffect(() => {
    const sections = links.map((link) => document.querySelector(link.href)).filter(Boolean)

    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav ref={navRef} className={`container ${styles.nav}`}>
        <a href="#top" className={styles.brand} onClick={() => setOpen(false)}>
          <img src={logo} alt="Pass The Cake logo" className={styles.logo} />
          <span className={styles.brandName}>Pass The Cake</span>
        </a>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          <span className={`${styles.bar} ${open ? styles.barTopOpen : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barMidOpen : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barBotOpen : ''}`} />
        </button>

        <ul id="primary-navigation" className={`${styles.links} ${open ? styles.linksOpen : ''}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeHref === link.href ? styles.active : undefined}
                aria-current={activeHref === link.href ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
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
