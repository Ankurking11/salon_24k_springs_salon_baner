import React, { useEffect, useRef, useState } from 'react'

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
    alt: 'Luxury salon interior',
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    alt: 'Professional hair styling',
  },
  {
    src: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    alt: 'Nail care treatment',
  },
  {
    src: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80',
    alt: 'Hair color transformation',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80',
    alt: 'Beauty treatment',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    alt: 'Facial treatment',
  },
]

export default function Gallery() {
  const [ref, visible] = useReveal()

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Our Work
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Beauty in Every{' '}
            <span className="italic text-gold">Detail</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            A glimpse into the artistry and transformations that happen every day at 24K Springs.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, i) => (
            <GalleryItem key={i} image={image} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryItem({ image, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`group relative overflow-hidden rounded-2xl aspect-square shadow-md cursor-pointer transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
        <p className="text-white text-sm font-medium">{image.alt}</p>
      </div>
      {/* Gold border on hover */}
      <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/50 rounded-2xl transition-all duration-400" />
    </div>
  )
}
