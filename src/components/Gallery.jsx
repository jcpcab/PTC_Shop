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

  return (
    <section id="gallery" className={styles.gallery}>
      <div ref={ref} className={`container fadeIn ${visible ? 'visible' : ''}`}>
        <span className="sectionLabel">Gallery</span>
        <h2 className="sectionTitle">Fresh out of the kitchen</h2>
        <p className="sectionIntro">
          Real bakes from real orders. Tag us @passthecakeshop when yours
          arrives and you might end up here too.
        </p>
        <div className={styles.grid}>
          {pics.map((pic) => (
            <figure key={pic.alt} className={styles.item}>
              <picture>
                <source srcSet={pic.webp} type="image/webp" />
                <img
                  src={pic.src}
                  alt={pic.alt}
                  loading="lazy"
                  width={pic.w}
                  height={pic.h}
                />
              </picture>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
