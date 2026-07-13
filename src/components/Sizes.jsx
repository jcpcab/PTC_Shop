import styles from './Sizes.module.css'
import useFadeIn from '../hooks/useFadeIn.js'

export const sizes = [
  {
    name: 'Personal',
    diameter: '6 inch',
    serves: 'Serves 4 to 6',
    note: 'Perfect for a small gathering or keeping all to yourself. No judgment here.',
  },
  {
    name: 'Round',
    diameter: '10 inch',
    serves: 'Serves 12 to 16',
    note: 'The classic. Just right for family dinners, parties, and celebrations.',
    featured: true,
  },
  {
    name: 'Square',
    diameter: '10 inch',
    serves: 'Serves 12 to 18',
    note: 'Our biggest bake, with corner pieces for everyone who wants one.',
  },
]

export default function Sizes() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="sizes" className={styles.sizes}>
      <div ref={ref} className={`container fadeIn ${visible ? 'visible' : ''}`}>
        <span className="sectionLabel">Sizes</span>
        <h2 className="sectionTitle">Made for every occasion</h2>
        <p className="sectionIntro">
          Every size is baked to order. Message us for current pricing and
          availability.
        </p>
        <div className={styles.grid}>
          {sizes.map((size) => (
            <div
              key={size.name}
              className={`${styles.card} ${size.featured ? styles.featured : ''}`}
            >
              {size.featured && <span className={styles.popular}>Most Popular</span>}
              <h3 className={styles.name}>{size.name}</h3>
              <p className={styles.diameter}>{size.diameter}</p>
              <p className={styles.serves}>{size.serves}</p>
              <p className={styles.note}>{size.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
