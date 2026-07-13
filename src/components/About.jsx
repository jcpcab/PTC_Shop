import styles from './About.module.css'
import useFadeIn from '../hooks/useFadeIn.js'
import aboutImg from '../assets/about-family.jpg'
import aboutImgWebp from '../assets/about-family.webp'

export default function About() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="about" className={styles.about}>
      <div ref={ref} className={`container ${styles.inner} fadeIn ${visible ? 'visible' : ''}`}>
        <div className={styles.imageWrap}>
          <picture>
            <source srcSet={aboutImgWebp} type="image/webp" />
            <img
              src={aboutImg}
              alt="me with two fresh cheesecakes"
              className={styles.image}
              width="750"
              height="1000"
              loading="lazy"
            />
          </picture>
        </div>
        <div className={styles.copy}>
          <span className="sectionLabel">Our Story</span>
          <h2 className={styles.title}>It started with one Thanksgiving cheesecake</h2>
          <p>
            Back in 2017, one homemade cheesecake at the family Thanksgiving
            table got passed around until the plate came back empty. The family
            said keep going, so every holiday after that became a chance to
            refine the recipe a little more.
          </p>
          <p>
            Then came the flavor nobody around was making: ube. That deep purple
            classic became our signature, and word spread the best way it can,
            from one happy slice to the next. Today every cheesecake is still
            baked in small batches, made to order, and shared with the same
            spirit it started with.
          </p>
          <p className={styles.signoff}>Pass the cake. That is the whole idea.</p>
        </div>
      </div>
    </section>
  )
}
