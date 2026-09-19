import { lazy, Suspense } from 'react'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import About from './components/sections/About'
import Capabilities from './components/sections/Capabilities'
import Contact from './components/sections/Contact'
import Education from './components/sections/Education'
import Experience from './components/sections/Experience'
import Focus from './components/sections/Focus'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Work from './components/sections/Work'

const Assistant = lazy(() => import('./components/assistant/Assistant'))

function App() {
  return (
    <div className="min-h-screen bg-page text-ink">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Projects />
        <Capabilities />
        <Focus />
        <Education />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Assistant />
      </Suspense>
    </div>
  )
}

export default App
