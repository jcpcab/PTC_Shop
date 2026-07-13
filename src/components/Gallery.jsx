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
import syrupSlice from '../assets/gallery-syrup-slice.jpg'
import syrupSliceWebp from '../assets/gallery-syrup-slice.webp'
import raspberry from '../assets/gallery-raspberry.jpg'
import raspberryWebp from '../assets/gallery-raspberry.webp'
import ubeHand from '../assets/gallery-ube-hand.jpg'
import ubeHandWebp from '../assets/gallery-ube-hand.webp'
import boxesGarden from '../assets/gallery-boxes-garden.jpg'
import boxesGardenWebp from '../assets/gallery-boxes-garden.webp'
import syrupPourVideo from '../assets/video-syrup-pour.mp4'
import syrupPourPoster from '../assets/video-syrup-pour-poster.jpg'
import raspberryCutVideo from '../assets/video-raspberry-cut.mp4'
import raspberryCutPoster from '../assets/video-raspberry-cut-poster.jpg'

// Each piece hangs in its own frame on the gallery wall. Order matters:
// position in this list maps to a named slot in the CSS grid composition.
// Videos are silent moving pictures — the audio track is stripped from the
// files themselves, and they stay muted everywhere they play.
const pics = [
  { src: dark, webp: darkWebp, alt: 'cheesecake at dinner', w: 506, h: 900, frame: 'gold' },
  // Full-frame on purpose: shown letterboxed in a cream mat, never cropped.
  {
    src: dog,
    webp: dogWebp,
    alt: 'my husky eyeing an ube cheesecake',
    w: 506,
    h: 900,
    frame: 'full',
  },
  {
    src: ubeBox,
    webp: ubeBoxWebp,
    alt: 'ube cheesecake boxed up',
    w: 506,
    h: 900,
    frame: 'snapshot',
  },
  {
    src: syrupSlice,
    webp: syrupSliceWebp,
    alt: 'ube cheesecake slice with homemade blueberry syrup',
    w: 720,
    h: 960,
    frame: 'gold',
  },
  {
    type: 'video',
    src: syrupPourVideo,
    poster: syrupPourPoster,
    alt: 'homemade blueberry syrup poured over an ube cheesecake',
    frame: 'wood',
  },
  {
    src: raspberry,
    webp: raspberryWebp,
    alt: 'whole raspberry swirl cheesecake',
    w: 720,
    h: 960,
    frame: 'mat',
  },
  {
    src: blueberry,
    webp: blueberryWebp,
    alt: 'blueberry cheesecake',
    w: 700,
    h: 933,
    frame: 'wood',
  },
  {
    src: outdoor,
    webp: outdoorWebp,
    alt: 'cheesecake ready for pickup',
    w: 506,
    h: 900,
    frame: 'mat',
  },
  {
    type: 'video',
    src: raspberryCutVideo,
    poster: raspberryCutPoster,
    alt: 'slicing a raspberry swirl cheesecake',
    frame: 'gold',
  },
  {
    src: slice,
    webp: sliceWebp,
    alt: 'slice of blueberry cheesecake',
    w: 675,
    h: 900,
    frame: 'snapshot',
  },
  {
    src: boxesGarden,
    webp: boxesGardenWebp,
    alt: 'cake boxes held up in the garden',
    w: 720,
    h: 1280,
    frame: 'gold',
  },
  {
    src: boxes,
    webp: boxesWebp,
    alt: 'boxed cheesecakes ready to go',
    w: 506,
    h: 900,
    frame: 'snapshot',
  },
  {
    src: ubeHand,
    webp: ubeHandWebp,
    alt: 'whole ube cheesecake held up, fresh out of the kitchen',
    w: 720,
    h: 1280,
    frame: 'wood',
  },
  {
    src: flowers,
    webp: flowersWebp,
    alt: 'boxed cheesecake in front of flowers',
    w: 506,
    h: 900,
    frame: 'snapshot',
  },
]

const frameClass = {
  gold: 'frameGold',
  wood: 'frameWood',
  mat: 'frameMat',
  snapshot: 'frameSnapshot',
  full: 'frameFull',
}

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
            <figure key={pic.alt} className={`${styles.item} ${styles[frameClass[pic.frame]]}`}>
              <button
                type="button"
                className={styles.itemButton}
                onClick={(e) => openLightbox(index, e)}
                aria-label={`Enlarge ${pic.type === 'video' ? 'video' : 'photo'}: ${pic.alt}`}
              >
                {pic.type === 'video' ? (
                  <video
                    className={styles.itemVideo}
                    src={pic.src}
                    poster={pic.poster}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    aria-label={pic.alt}
                  />
                ) : (
                  <picture>
                    <source srcSet={pic.webp} type="image/webp" />
                    <img src={pic.src} alt={pic.alt} loading="lazy" width={pic.w} height={pic.h} />
                  </picture>
                )}
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
            {active.type === 'video' ? (
              <video
                className={styles.dialogImage}
                src={active.src}
                poster={active.poster}
                muted
                loop
                autoPlay
                playsInline
                aria-label={active.alt}
              />
            ) : (
              <picture>
                <source srcSet={active.webp} type="image/webp" />
                <img src={active.src} alt={active.alt} className={styles.dialogImage} />
              </picture>
            )}
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
