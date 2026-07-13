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
      <a href="#main-content" className="skipLink">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
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
