import styles from './Menu.module.css'
import useFadeIn from '../hooks/useFadeIn.js'

const signature = [
  {
    name: 'Ube',
    desc: 'The one that started it all. Velvety cheesecake made with real ube for a flavor you will not find anywhere else nearby.',
  },
  {
    name: 'Cinnabon',
    desc: 'Cinnamon roll meets cheesecake. Buttery brown sugar swirls with a cream cheese finish.',
  },
  {
    name: 'PB&J',
    desc: 'A childhood favorite all grown up. Creamy peanut butter ribboned with sweet jam.',
  },
]

const byRequest = [
  {
    name: 'Banana Crème',
    desc: 'Silky banana crème folded into classic cheesecake.',
  },
  {
    name: 'Peanut Butter',
    desc: 'Rich, nutty, and smooth from the first bite to the last.',
  },
  {
    name: 'Raspberry Swirl',
    desc: 'Bright raspberry ribbons for a tart, fruity finish.',
  },
]

export default function Menu() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="menu" className={styles.menu}>
      <div ref={ref} className={`container fadeIn ${visible ? 'visible' : ''}`}>
        <div className={styles.board}>
          <span className={styles.est}>Est. 2017</span>
          <h2 className={styles.title}>The Menu</h2>
          <span className={styles.flourish}>&#10022; &#10022; &#10022;</span>

          <h3 className={styles.group}>Signature Flavors</h3>
          {signature.map((f) => (
            <div key={f.name} className={styles.item}>
              <h4 className={styles.name}>&#9733; {f.name} &#9733;</h4>
              <p className={styles.desc}>{f.desc}</p>
            </div>
          ))}

          <span className={styles.flourish}>&#10022; &#10022; &#10022;</span>

          <h3 className={styles.group}>Available By Request</h3>
          {byRequest.map((f) => (
            <div key={f.name} className={styles.item}>
              <h4 className={styles.name}>{f.name}</h4>
              <p className={styles.desc}>{f.desc}</p>
            </div>
          ))}

          <p className={styles.note}>
            Every cheesecake is baked to order. By request flavors just need a
            little extra notice.
          </p>
        </div>
      </div>
    </section>
  )
}
