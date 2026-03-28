import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-800">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <span className="font-serif font-bold text-2xl text-white">24K Springs</span>
              <span className="block text-gold text-xs font-semibold tracking-widest uppercase mt-0.5">
                Salon · Baner
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Baner's premium luxury hair and beauty salon. Where style meets precision and
              every visit is a transformative experience.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://wa.me/919226333059"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#25D366] transition-colors duration-200 text-sm"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="tel:9226333059"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold transition-colors duration-200 text-sm"
                aria-label="Call us"
              >
                📞
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['About Us', '#about'],
                ['Services', '#services'],
                ['Gallery', '#gallery'],
                ['Testimonials', '#testimonials'],
                ['Book Appointment', '#booking'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-gold transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wide mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Address</div>
                <p className="leading-relaxed">
                  Shop 4, Wing A, Sterling Towers,<br />
                  Pancard Club Rd, Baner,<br />
                  Pune 411045
                </p>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Phone</div>
                <a href="tel:9226333059" className="hover:text-gold transition-colors duration-200 font-medium">
                  9226333059
                </a>
              </div>
              <div>
                <div className="text-gray-500 text-xs uppercase tracking-wide mb-1">Hours</div>
                <p>Open Daily · 10 AM – 9 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {year} 24K Springs Salon, Baner. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-500">♥</span> for beauty lovers in Baner, Pune
          </p>
        </div>
      </div>
    </footer>
  )
}
