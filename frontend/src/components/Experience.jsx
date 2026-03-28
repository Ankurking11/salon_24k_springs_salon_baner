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

const features = [
  {
    icon: '👩‍🎨',
    title: 'Expert Stylists',
    description:
      'Our certified stylists bring advanced training and years of hands-on expertise, staying ahead of every global trend and technique.',
  },
  {
    icon: '💎',
    title: 'Premium Products',
    description:
      'We use only the finest professional-grade products — gentle on your hair, powerful in results, and free from harsh chemicals.',
  },
  {
    icon: '🌿',
    title: 'Personalized Consultation',
    description:
      'Every visit begins with a thorough consultation. We listen, understand your goals, and create a tailored plan just for you.',
  },
  {
    icon: '🏆',
    title: 'Hygienic Environment',
    description:
      'We maintain the highest standards of cleanliness and hygiene — from sterilized tools to sanitized workstations — every single time.',
  },
]

export default function Experience() {
  const [ref, visible] = useReveal()

  return (
    <section id="experience" className="py-24 lg:py-32 bg-gray-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            The 24K Difference
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            The Signature{' '}
            <span className="italic text-gold">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Every detail is crafted to ensure you receive nothing short of a five-star salon experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }) {
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
      style={{ transitionDelay: `${index * 120}ms` }}
      className={`group bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-gold/40 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="text-4xl mb-5">{feature.icon}</div>
      <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
        {feature.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
    </div>
  )
}
