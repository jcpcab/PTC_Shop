import styles from './Order.module.css'
import useFadeIn from '../hooks/useFadeIn.js'

const steps = [
  {
    number: '1',
    title: 'Pick your cake',
    text: 'Choose a flavor and size. Signature flavors are always available, by request flavors just need extra notice.',
  },
  {
    number: '2',
    title: 'Send us a message',
    text: 'DM us on Instagram with your order and the date you need it by. We recommend at least 3 days ahead.',
  },
  {
    number: '3',
    title: 'Pass the cake',
    text: 'We bake it fresh, box it up, and get it to you. All that is left is deciding who gets the first slice.',
  },
]

export default function Order() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="order" className={styles.order}>
      <div ref={ref} className={`container fadeIn ${visible ? 'visible' : ''}`}>
        <span className={styles.label}>Order</span>
        <h2 className={styles.title}>Ready when you are</h2>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.ctaWrap}>
          <a
            href="https://instagram.com/passthecakeshop"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            DM us on Instagram
          </a>
          <p className={styles.ctaNote}>@passthecakeshop</p>
        </div>
      </div>
    </section>
  )
}
