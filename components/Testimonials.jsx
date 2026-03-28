'use client'

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

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Regular Client',
    rating: 5,
    text: "Absolutely the best salon experience I've had in Pune. My hair color turned out exactly as I envisioned — maybe even better! The stylist truly listened and didn't rush me. I'll never go anywhere else.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'Ananya Kulkarni',
    role: 'Loyal Client',
    rating: 5,
    text: "The keratin treatment I got here was life-changing. Super smooth, incredibly shiny hair for months! The ambiance is calming and luxurious. 24K Springs truly lives up to its name.",
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
  },
  {
    name: 'Ritu Mehendale',
    role: 'New Client',
    rating: 5,
    text: "I came in for a simple trim and left feeling like a completely new person. The team is warm, professional, and clearly passionate about their craft. Highly recommend to everyone in Baner!",
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
  },
]

export default function Testimonials() {
  const [ref, visible] = useReveal()

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Client Love
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            What Our Clients{' '}
            <span className="italic text-gold">Say</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
            <span className="ml-2 text-gray-500 text-sm font-medium">4.9 out of 5 • 130+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial, index }) {
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
      className={`bg-cream rounded-2xl p-8 border border-gray-100 hover:border-gold/30 hover:shadow-xl transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Quote mark */}
      <div className="text-gold/30 font-serif text-7xl leading-none mb-2">"</div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">★</span>
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-600 leading-relaxed text-sm italic mb-6">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-gold/30"
          loading="lazy"
        />
        <div>
          <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
          <div className="text-gold text-xs font-medium">{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}
