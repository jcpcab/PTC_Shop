import styles from './Hero.module.css'
import heroImg from '../assets/gallery-slice.jpg'
import heroImgWebp from '../assets/gallery-slice.webp'

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={styles.badge}>Small batch, made to order</span>
          <h1 className={styles.title}>
            Cheesecake worth <span className={styles.highlight}>passing around</span>
          </h1>
          <p className={styles.subtitle}>
            Home of the signature Ube Cheesecake. Baked in small batches since
            2017 and made fresh for every single order.
          </p>
          <div className={styles.actions}>
            <a href="#order" className={styles.primary}>
              Place an Order
            </a>
            <a href="#menu" className={styles.secondary}>
              See the Flavors
            </a>
          </div>
        </div>
        <div className={styles.imageWrap}>
          <picture>
            <source srcSet={heroImgWebp} type="image/webp" />
            <img
              src={heroImg}
              alt="slice of blueberry cheesecake"
              className={styles.image}
              width="675"
              height="900"
              fetchpriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  )
}
