'use client'

import React, { useState, useEffect, useRef } from 'react'

const TIME_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
]

const SERVICES = [
  'Haircuts & Styling',
  'Hair Coloring',
  'Hair Treatments',
  'Nail Services',
  'Beauty & Grooming',
]

const initialForm = { name: '', phone: '', service: '', date: '', time: '', notes: '' }

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

export default function Booking() {
  const [ref, visible] = useReveal()
  const [form, setForm] = useState(initialForm)
  const [bookedSlots, setBookedSlots] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('')

  // Fetch booked slots when date changes
  useEffect(() => {
    if (!form.date) { setBookedSlots([]); return }
    setSlotsLoading(true)
    fetch(`/api/appointments?date=${form.date}`)
      .then((r) => r.json())
      .then((data) => {
        setBookedSlots(data.bookedSlots || [])
        // Reset selected time if it becomes booked
        if (data.bookedSlots?.includes(form.time)) {
          setForm((f) => ({ ...f, time: '' }))
        }
      })
      .catch(() => setBookedSlots([]))
      .finally(() => setSlotsLoading(false))
  }, [form.date])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (status) setStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.service || !form.date || !form.time) {
      setStatus('error')
      setStatusMsg('Please fill in all required fields.')
      return
    }
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setStatusMsg(data.message || "Appointment booked successfully! We'll confirm via WhatsApp.")
        setForm(initialForm)
        setBookedSlots([])
      } else {
        setStatus('error')
        setStatusMsg(data.message || 'Something went wrong. Please try again or call us.')
      }
    } catch {
      setStatus('error')
      setStatusMsg('Unable to connect. Please call us at 9226333059 to book.')
    } finally {
      setSubmitting(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="booking" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left — Info */}
          <div className="lg:sticky lg:top-28">
            <span className="inline-block text-gold text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Reserve Your Spot
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Book Your{' '}
              <span className="italic text-gold">Appointment</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Reserve your slot in just a few clicks. Our team will confirm your booking via WhatsApp
              within minutes.
            </p>

            <div className="space-y-4">
              {[
                { icon: '📅', title: 'Flexible Scheduling', text: 'Open daily 10 AM – 9 PM' },
                { icon: '✅', title: 'Instant Confirmation', text: 'WhatsApp confirmation in minutes' },
                { icon: '🔄', title: 'Easy Rescheduling', text: 'Reschedule up to 2 hours before' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                    <div className="text-gray-500 text-sm">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-gray-900 rounded-2xl text-white">
              <div className="text-gold font-semibold text-sm mb-1">Prefer to call?</div>
              <a
                href="tel:9226333059"
                className="text-2xl font-serif font-bold hover:text-gold transition-colors duration-200"
              >
                9226333059
              </a>
              <div className="text-gray-400 text-xs mt-1">Available 10 AM – 9 PM, Daily</div>
            </div>
          </div>

          {/* Right — Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-cream rounded-3xl p-8 lg:p-10 border border-gray-200 shadow-lg"
          >
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-8">Fill in your details</h3>

            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 text-sm"
                />
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service <span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 text-sm appearance-none cursor-pointer"
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 text-sm cursor-pointer"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Time <span className="text-red-500">*</span>
                  {slotsLoading && (
                    <span className="ml-2 text-gold text-xs font-normal animate-pulse">
                      Checking availability…
                    </span>
                  )}
                </label>
                {!form.date ? (
                  <p className="text-gray-400 text-sm italic py-3">Please select a date first</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {TIME_SLOTS.map((slot) => {
                      const isBooked = bookedSlots.includes(slot)
                      const isSelected = form.time === slot
                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={isBooked}
                          onClick={() => !isBooked && setForm((f) => ({ ...f, time: slot }))}
                          className={`py-2 px-1 text-xs font-medium rounded-lg border transition-all duration-200 ${
                            isBooked
                              ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-gold text-white border-gold shadow-md'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-gold hover:text-gold cursor-pointer'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any specific requests, allergies, or details…"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-200 text-sm resize-none"
                />
              </div>

              {/* Status Message */}
              {status === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 text-lg">✅</span>
                    <div>
                      <div className="text-green-800 font-semibold text-sm">Booking Confirmed!</div>
                      <div className="text-green-700 text-sm mt-0.5">{statusMsg}</div>
                    </div>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 text-lg">⚠️</span>
                    <div>
                      <div className="text-red-800 font-semibold text-sm">Oops!</div>
                      <div className="text-red-700 text-sm mt-0.5">{statusMsg}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-gold text-white font-bold text-base rounded-xl hover:bg-gold-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Booking…
                  </span>
                ) : (
                  'Confirm Appointment →'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
