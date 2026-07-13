import styles from './Sizes.module.css'
import useFadeIn from '../hooks/useFadeIn.js'

export const sizes = [
  {
    name: 'Personal',
    diameter: '6 inch',
    serves: 'Serves 4 to 6',
    note: 'Perfect for a small gathering or keeping all to yourself. No judgment here.',
    price: '$25',
  },
  {
    name: 'Round',
    diameter: '10 inch',
    serves: 'Serves 12 to 16',
    note: 'The classic. Just right for family dinners, parties, and celebrations.',
    featured: true,
    price: '$50',
  },
  {
    name: 'Square',
    diameter: '10 inch',
    serves: 'Serves 12 to 16',
    note: 'Our biggest bake, with corner pieces for everyone who wants one.',
    price: '$50',
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
          Every size is baked to order. By-request flavors are priced individually &mdash;
          we&rsquo;ll confirm the price with you when you order.
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
              and Peanut Butter flavors contain peanuts. Everything is made in a kitchen that also
              handles peanuts, wheat, dairy, and eggs, so cross-contact is possible. Let us know
              about any allergies when you order and we&rsquo;re happy to talk through options, but
              we do not offer dedicated gluten-free, dairy-free, or nut-free bakes.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Pickup &amp; delivery</h3>
            <ul className={styles.infoList}>
              <li>
                <strong>Pickup:</strong> Loma Linda &mdash; we&rsquo;ll arrange a time and share the
                exact address when your order is confirmed
              </li>
              <li>
                <strong>Also available:</strong> pickup in Koreatown, Los Angeles by arrangement
              </li>
              <li>
                <strong>Delivery:</strong> pickup is preferred, but delivery may be possible
                case-by-case for an extra fee &mdash; just ask
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
