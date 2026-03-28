import React, { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80)',
        }}
      />

      {/* Dark + Gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div
          className={`transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-5 py-1.5 border border-gold/60 text-gold text-xs font-semibold tracking-[0.25em] uppercase rounded-full mb-6">
            Baner, Pune · Est. 2020
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Baner's Premium{' '}
          <span className="block mt-1 text-gold-light italic">
            Hair & Beauty Experience
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-white/80 text-lg sm:text-xl md:text-2xl font-light leading-relaxed mb-10 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Where style meets precision and luxury care.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="#booking"
            className="group px-8 py-4 bg-gold text-white font-semibold text-base rounded-full hover:bg-gold-dark transition-all duration-300 shadow-[0_0_30px_rgba(201,162,74,0.4)] hover:shadow-[0_0_40px_rgba(201,162,74,0.6)] hover:-translate-y-1"
          >
            Book Appointment
            <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
          </a>
          <a
            href="tel:9226333059"
            className="px-8 py-4 border-2 border-white/70 text-white font-semibold text-base rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 hover:-translate-y-1"
          >
            📞 Call Now
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className={`mt-16 flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${
            visible ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  )
}
