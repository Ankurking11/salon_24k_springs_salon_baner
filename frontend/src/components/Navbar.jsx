import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-tight group">
          <span
            className={`font-serif font-bold text-xl sm:text-2xl transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            24K Springs
          </span>
          <span
            className={`text-xs font-medium tracking-widest uppercase transition-colors duration-300 ${
              scrolled ? 'text-gold' : 'text-gold-light'
            }`}
          >
            Salon · Baner
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-gold ${
                scrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            className="ml-2 px-5 py-2.5 bg-gold text-white text-sm font-semibold rounded-full tracking-wide hover:bg-gold-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Book Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors duration-300 ${
            scrolled ? 'text-gray-900' : 'text-white'
          }`}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/98 backdrop-blur-lg transition-all duration-400 overflow-hidden ${
          menuOpen ? 'max-h-screen py-4 border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-4 text-gray-700 font-medium hover:text-gold hover:bg-cream rounded-lg transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="mt-2 mx-4 py-3 text-center bg-gold text-white font-semibold rounded-full hover:bg-gold-dark transition-colors duration-300"
          >
            Book Now
          </a>
        </div>
      </div>
    </nav>
  )
}
