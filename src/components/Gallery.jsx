import { useEffect, useRef, useState } from 'react'
import styles from './Gallery.module.css'
import useFadeIn from '../hooks/useFadeIn.js'

import slice from '../assets/gallery-slice.jpg'
import sliceWebp from '../assets/gallery-slice.webp'
import ubeBox from '../assets/gallery-ube-box.jpg'
import ubeBoxWebp from '../assets/gallery-ube-box.webp'
import dog from '../assets/gallery-dog.jpg'
import dogWebp from '../assets/gallery-dog.webp'
import flowers from '../assets/gallery-flowers.jpg'
import flowersWebp from '../assets/gallery-flowers.webp'
import outdoor from '../assets/gallery-outdoor.jpg'
import outdoorWebp from '../assets/gallery-outdoor.webp'
import dark from '../assets/gallery-dark.jpg'
import darkWebp from '../assets/gallery-dark.webp'
import boxes from '../assets/gallery-boxes.jpg'
import boxesWebp from '../assets/gallery-boxes.webp'
import blueberry from '../assets/hero-cheesecake.jpg'
import blueberryWebp from '../assets/hero-cheesecake.webp'

const pics = [
  { src: slice, webp: sliceWebp, alt: 'slice of blueberry cheesecake', w: 675, h: 900 },
  { src: ubeBox, webp: ubeBoxWebp, alt: 'ube cheesecake boxed up', w: 506, h: 900 },
  { src: blueberry, webp: blueberryWebp, alt: 'blueberry cheesecake', w: 700, h: 933 },
  { src: dog, webp: dogWebp, alt: 'my husky eyeing an ube cheesecake', w: 506, h: 900 },
  { src: flowers, webp: flowersWebp, alt: 'boxed cheesecake in front of flowers', w: 506, h: 900 },
  { src: outdoor, webp: outdoorWebp, alt: 'cheesecake ready for pickup', w: 506, h: 900 },
  { src: dark, webp: darkWebp, alt: 'cheesecake at dinner', w: 506, h: 900 },
  { src: boxes, webp: boxesWebp, alt: 'boxed cheesecakes ready to go', w: 506, h: 900 },
]

export default function Gallery() {
  const [ref, visible] = useFadeIn()
  const [activeIndex, setActiveIndex] = useState(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerRef = useRef(null)

  const isOpen = activeIndex !== null

  function openLightbox(index, e) {
    triggerRef.current = e.currentTarget
    setActiveIndex(index)
  }

  function closeLightbox() {
    setActiveIndex(null)
    if (triggerRef.current) triggerRef.current.focus()
  }

  function showPrev() {
    setActiveIndex((i) => (i - 1 + pics.length) % pics.length)
  }

  function showNext() {
    setActiveIndex((i) => (i + 1) % pics.length)
  }

  // Move focus into the dialog when it opens, trap Tab within it, and
  // close on Escape.
  useEffect(() => {
    if (!isOpen) return undefined

    closeButtonRef.current?.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        closeLightbox()
        return
      }
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const active = isOpen ? pics[activeIndex] : null

  return (
    <section id="gallery" className={styles.gallery}>
      <div ref={ref} className={`container fadeIn ${visible ? 'visible' : ''}`}>
        <span className="sectionLabel">Gallery</span>
        <h2 className="sectionTitle">Fresh out of the kitchen</h2>
        <p className="sectionIntro">
          Real bakes from real orders. Tag us @passthecakeshop when yours arrives and you might end
          up here too.
        </p>
        <div className={styles.grid}>
          {pics.map((pic, index) => (
            <figure key={pic.alt} className={styles.item}>
              <button
                type="button"
                className={styles.itemButton}
                onClick={(e) => openLightbox(index, e)}
                aria-label={`Enlarge photo: ${pic.alt}`}
              >
                <picture>
                  <source srcSet={pic.webp} type="image/webp" />
                  <img src={pic.src} alt={pic.alt} loading="lazy" width={pic.w} height={pic.h} />
                </picture>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className={styles.overlay} onClick={closeLightbox}>
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.close}
              onClick={closeLightbox}
              aria-label="Close"
            >
              &times;
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.navPrev}`}
              onClick={showPrev}
              aria-label="Previous photo"
            >
              &#8249;
            </button>
            <picture>
              <source srcSet={active.webp} type="image/webp" />
              <img src={active.src} alt={active.alt} className={styles.dialogImage} />
            </picture>
            <button
              type="button"
              className={`${styles.nav} ${styles.navNext}`}
              onClick={showNext}
              aria-label="Next photo"
            >
              &#8250;
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
