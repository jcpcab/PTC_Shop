import styles from './Gallery.module.css'
import useFadeIn from '../hooks/useFadeIn.js'

import slice from '../assets/gallery-slice.jpg'
import ubeBox from '../assets/gallery-ube-box.jpg'
import dog from '../assets/gallery-dog.jpg'
import flowers from '../assets/gallery-flowers.jpg'
import outdoor from '../assets/gallery-outdoor.jpg'
import dark from '../assets/gallery-dark.jpg'
import boxes from '../assets/gallery-boxes.jpg'
import blueberry from '../assets/hero-cheesecake.jpg'

const pics = [
  { src: slice, alt: 'slice of blueberry cheesecake' },
  { src: ubeBox, alt: 'ube cheesecake boxed up' },
  { src: blueberry, alt: 'blueberry cheesecake' },
  { src: dog, alt: 'my husky eyeing an ube cheesecake' },
  { src: flowers, alt: 'boxed cheesecake in front of flowers' },
  { src: outdoor, alt: 'cheesecake ready for pickup' },
  { src: dark, alt: 'cheesecake at dinner' },
  { src: boxes, alt: 'boxed cheesecakes ready to go' },
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
              <img src={pic.src} alt={pic.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
