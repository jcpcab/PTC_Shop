import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Menu from './components/Menu.jsx'
import Sizes from './components/Sizes.jsx'
import Gallery from './components/Gallery.jsx'
import Order from './components/Order.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Sizes />
        <Gallery />
        <Order />
      </main>
      <Footer />
    </>
  )
}
