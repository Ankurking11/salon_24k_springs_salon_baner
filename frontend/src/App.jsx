import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import About from './components/About'
import Services from './components/Services'
import Experience from './components/Experience'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Booking from './components/Booking'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

function App() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <About />
        <Services />
        <Experience />
        <Gallery />
        <Testimonials />
        <CTA />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
