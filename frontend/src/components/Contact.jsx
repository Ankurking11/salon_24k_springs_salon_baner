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

export default function Contact() {
  const [ref, visible] = useReveal()

  return (
    <section id="contact" className="py-24 lg:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Visit Us
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Find Us in{' '}
            <span className="italic text-gold">Baner</span>
          </h2>
          <p className="text-gray-600 text-lg">
            We'd love to welcome you. Walk in or book ahead for the best experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                  📍
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Our Address</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Shop 4, Wing A, Sterling Towers,<br />
                    Pancard Club Rd, Near ICICI Bank,<br />
                    Baner, Pune, Maharashtra 411045
                  </p>
                  <a
                    href="https://maps.google.com/?q=Shop+4+Wing+A+Sterling+Towers+Pancard+Club+Rd+Baner+Pune+411045"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-gold text-sm font-semibold hover:underline underline-offset-4"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                  📞
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <a
                    href="tel:9226333059"
                    className="text-gold font-bold text-xl hover:underline underline-offset-4 transition-colors duration-200"
                  >
                    9226333059
                  </a>
                  <p className="text-gray-500 text-sm mt-1">Call or WhatsApp us anytime</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                  🕐
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Opening Hours</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Monday – Sunday</span>
                      <span className="font-semibold text-gray-900">10:00 AM – 9:00 PM</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-green-700 text-xs font-medium">Open Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social / WhatsApp CTA */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
              <div className="text-gold font-semibold text-sm mb-2">Reach Us on WhatsApp</div>
              <p className="text-gray-400 text-sm mb-4">
                Chat with us instantly for bookings, queries, or to share your look inspiration!
              </p>
              <a
                href="https://wa.me/919226333059"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-sm font-semibold rounded-full hover:bg-[#1ebe5d] transition-colors duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Start Chat
              </a>
            </div>
          </div>

          {/* Google Maps */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-[500px] lg:h-full min-h-[400px]">
            <iframe
              title="24K Springs Salon Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.9!2d73.7784!3d18.5593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMzJzMzLjUiTiA3M8KwNDYnNDIuMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&q=Shop+4+Wing+A+Sterling+Towers+Pancard+Club+Rd+Baner+Pune+411045"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
