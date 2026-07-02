import styles from './Hero.module.css'
import heroImg from '../assets/hero-cheesecake.jpg'

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
          <img src={heroImg} alt="blueberry cheesecake" className={styles.image} />
        </div>
      </div>
    </section>
  )
}
