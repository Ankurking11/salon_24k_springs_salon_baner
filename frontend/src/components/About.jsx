import React, { useEffect, useRef, useState } from 'react'

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

export default function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Image Side */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/30 rounded-2xl" />
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80"
              alt="24K Springs Salon interior"
              className="relative w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              loading="lazy"
            />
            {/* Gold badge */}
            <div className="absolute -bottom-6 -right-6 bg-gold text-white rounded-2xl p-5 shadow-xl">
              <div className="text-3xl font-serif font-bold">4.9</div>
              <div className="text-xs font-medium tracking-wide">★★★★★ Rating</div>
              <div className="text-xs opacity-80 mt-0.5">130+ Reviews</div>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Our Story
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Crafting Beauty,{' '}
              <span className="italic text-gold">One Client at a Time</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                Nestled in the heart of Baner, 24K Springs Salon was born from a singular vision —
                to create a sanctuary where every client walks out feeling transformed, confident,
                and radiant.
              </p>
              <p>
                Our team of expert stylists brings years of craft, artistry, and passion to every
                appointment. We believe that great hair isn't just about technique — it's about
                understanding you, your lifestyle, and your unique vision of beauty.
              </p>
              <p>
                From the moment you step through our doors, you're wrapped in an experience of
                pure luxury. Premium products, meticulous attention to detail, and a deeply personal
                approach define everything we do at 24K Springs.
              </p>
            </div>
            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              {[
                { value: '130+', label: 'Happy Clients' },
                { value: '4.9★', label: 'Average Rating' },
                { value: '5+', label: 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-2xl font-bold text-gold">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1 tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
