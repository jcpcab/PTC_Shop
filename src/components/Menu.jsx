import styles from './Menu.module.css'
import FlavorCard from './FlavorCard.jsx'
import useFadeIn from '../hooks/useFadeIn.js'

const flavors = [
  {
    name: 'Ube',
    signature: true,
    gradient: 'linear-gradient(150deg, #9b6fd0 0%, #6a3fa0 55%, #4c2a7a 100%)',
    description:
      'The one that started it all. Velvety cheesecake swirled with real ube for that deep purple color and a sweet, nutty vanilla flavor you will not find anywhere else nearby.',
  },
  {
    name: 'Cinnabon',
    signature: true,
    gradient: 'linear-gradient(150deg, #d9a066 0%, #a86a3a 55%, #6e421f 100%)',
    description:
      'Cinnamon roll meets cheesecake. Buttery brown sugar cinnamon swirls with a cream cheese finish, like the center of a fresh cinnamon roll in every bite.',
  },
  {
    name: 'PB&J',
    signature: true,
    gradient: 'linear-gradient(150deg, #c98bb9 0%, #96486e 55%, #5e2c48 100%)',
    description:
      'A childhood favorite all grown up. Creamy peanut butter cheesecake ribboned with sweet jam for the perfect salty and sweet balance.',
  },
  {
    name: 'Banana Crème',
    signature: false,
    gradient: 'linear-gradient(150deg, #f0d98c 0%, #d4ab4f 55%, #9a742c 100%)',
    description:
      'Silky banana crème folded into classic cheesecake. Available by request, so message us ahead and we will bake it fresh for you.',
  },
  {
    name: 'Peanut Butter',
    signature: false,
    gradient: 'linear-gradient(150deg, #d8a878 0%, #b07c48 55%, #7a4f26 100%)',
    description:
      'For the peanut butter purists. Rich, nutty, and smooth from the first bite to the last. Available by request with a little advance notice.',
  },
  {
    name: 'Raspberry Swirl',
    signature: false,
    gradient: 'linear-gradient(150deg, #e88ca0 0%, #c1476a 55%, #7e2544 100%)',
    description:
      'Bright raspberry ribbons swirled through creamy cheesecake for a tart, fruity finish. Available by request for your next celebration.',
  },
]

export default function Menu() {
  const [ref, visible] = useFadeIn()

  return (
    <section id="menu" className={styles.menu}>
      <div ref={ref} className={`container fadeIn ${visible ? 'visible' : ''}`}>
        <span className="sectionLabel">The Menu</span>
        <h2 className="sectionTitle">Pick your flavor</h2>
        <p className="sectionIntro">
          Three signature flavors always on the menu, plus three more available
          by request. Tap any card to learn more.
        </p>
        <div className={styles.grid}>
          {flavors.map((flavor) => (
            <FlavorCard key={flavor.name} flavor={flavor} />
          ))}
        </div>
      </div>
    </section>
  )
}
