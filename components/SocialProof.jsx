import React from 'react'

export default function SocialProof() {
  return (
    <div className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">⭐</span>
            <span className="font-semibold text-sm sm:text-base tracking-wide">4.9 Rating</span>
          </div>
          <span className="text-gold/60 hidden sm:block">|</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <span className="font-semibold text-sm sm:text-base tracking-wide">130+ Happy Clients</span>
          </div>
          <span className="text-gold/60 hidden sm:block">|</span>
          <div className="flex items-center gap-2">
            <span className="text-lg">👑</span>
            <span className="font-semibold text-sm sm:text-base tracking-wide text-gold">
              Baner's Most Trusted Salon
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
