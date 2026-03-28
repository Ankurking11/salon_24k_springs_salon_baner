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

const services = [
  {
    icon: '✂️',
    title: 'Haircuts & Styling',
    description:
      'Precision cuts and expert styling tailored to your face shape, lifestyle, and personal aesthetic. Every strand crafted with intention.',
    tag: 'Signature',
  },
  {
    icon: '🎨',
    title: 'Hair Coloring',
    description:
      'From subtle highlights to bold transformations — balayage, ombré, global color, and creative toning using premium color lines.',
    tag: 'Popular',
  },
  {
    icon: '💆',
    title: 'Hair Treatments',
    description:
      'Restore shine, strength, and vitality with our deep conditioning, keratin, and scalp therapy treatments using top-tier products.',
    tag: 'Restorative',
  },
  {
    icon: '💅',
    title: 'Nail Services',
    description:
      'Luxurious manicures and pedicures with gel, acrylic, and nail art options — leaving your hands and feet flawlessly polished.',
    tag: 'Luxe',
  },
  {
    icon: '✨',
    title: 'Beauty & Grooming',
    description:
      'Comprehensive beauty services including threading, waxing, facials, and full grooming packages for a complete refresh.',
    tag: 'Complete Care',
  },
]

export default function Services() {
  const [ref, visible] = useReveal()

  return (
    <section id="services" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            What We Offer
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Premium Services,{' '}
            <span className="italic text-gold">Exceptional Results</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Each service is thoughtfully designed to elevate your natural beauty and leave you
            feeling completely refreshed.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service, index }) {
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
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gold/30 hover:-translate-y-2 cursor-default ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{service.icon}</span>
        <span className="text-xs font-semibold text-gold tracking-wider uppercase bg-gold/10 px-2.5 py-1 rounded-full">
          {service.tag}
        </span>
      </div>
      <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-gold transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <a
          href="#booking"
          className="text-gold text-sm font-semibold tracking-wide hover:underline underline-offset-4 flex items-center gap-1 group/link"
        >
          Book This Service
          <span className="group-hover/link:ml-1 transition-all duration-300">→</span>
        </a>
      </div>
    </div>
  )
}
