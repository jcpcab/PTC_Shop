import styles from './Sizes.module.css'
import useFadeIn from '../hooks/useFadeIn.js'

export const sizes = [
  {
    name: 'Personal',
    diameter: '6 inch',
    serves: 'Serves 4 to 6',
    note: 'Perfect for a small gathering or keeping all to yourself. No judgment here.',
    // Placeholder — replace with real pricing before launch.
    price: '$XX',
  },
  {
    name: 'Round',
    diameter: '10 inch',
    serves: 'Serves 12 to 16',
    note: 'The classic. Just right for family dinners, parties, and celebrations.',
    featured: true,
    // Placeholder — replace with real pricing before launch.
    price: '$XX–$XX',
  },
  {
    name: 'Square',
    diameter: '10 inch',
    serves: 'Serves 12 to 18',
    note: 'Our biggest bake, with corner pieces for everyone who wants one.',
    // Placeholder — replace with real pricing before launch.
    price: '$XX–$XX',
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
          Every size is baked to order. Message us for current pricing and availability.
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
              <p className={styles.price}>
                {size.price} <span className={styles.priceNote}>starting</span>
              </p>
              <p className={styles.note}>{size.note}</p>
            </div>
          ))}
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Allergen info</h3>
            <p className={styles.infoText}>
              All cheesecakes contain dairy and eggs, and the crust contains gluten. The PB&amp;J
              and Peanut Butter flavors contain peanuts. Let us know about any allergies when you
              order and we&rsquo;re happy to talk through options, but we do not currently offer
              dedicated gluten-free, dairy-free, or nut-free bakes.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Pickup &amp; delivery</h3>
            <ul className={styles.infoList}>
              {/* Placeholders — fill in real service details. */}
              <li>
                <strong>Area served:</strong> [add your delivery radius / city]
              </li>
              <li>
                <strong>Pickup:</strong> [add pickup location or neighborhood]
              </li>
              <li>
                <strong>Delivery:</strong> [add delivery availability and any fee]
              </li>
              <li>
                <strong>Lead time:</strong> at least 3 days for signature flavors, more for
                by-request flavors
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
