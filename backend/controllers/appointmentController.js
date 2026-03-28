const { getBookedSlots, addAppointment } = require('../services/googleSheets')

const ALL_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
]

/**
 * GET /api/appointments?date=YYYY-MM-DD
 * Returns the booked time slots for a given date.
 */
async function getAvailableSlots(req, res) {
  const { date } = req.query

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid date in YYYY-MM-DD format.',
    })
  }

  try {
    const bookedSlots = await getBookedSlots(date)
    return res.json({
      success: true,
      date,
      bookedSlots,
      availableSlots: ALL_SLOTS.filter((s) => !bookedSlots.includes(s)),
    })
  } catch (err) {
    console.error('Error fetching slots:', err.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch availability. Please try again.',
    })
  }
}

/**
 * POST /api/appointments
 * Body: { name, phone, service, date, time, notes }
 * Creates a new appointment in Google Sheets.
 */
async function createAppointment(req, res) {
  const { name, phone, service, date, time, notes } = req.body

  // Validation
  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'Name, phone, service, date, and time are required.',
    })
  }

  if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid 10-digit phone number.',
    })
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid date in YYYY-MM-DD format.',
    })
  }

  if (!ALL_SLOTS.includes(time)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid time slot selected.',
    })
  }

  try {
    // Check if slot is already booked
    const bookedSlots = await getBookedSlots(date)
    if (bookedSlots.includes(time)) {
      return res.status(409).json({
        success: false,
        message: `The ${time} slot on ${date} is already booked. Please choose another time.`,
      })
    }

    await addAppointment({ name, phone, service, date, time, notes: notes || '' })

    return res.status(201).json({
      success: true,
      message: `Appointment confirmed for ${name} on ${date} at ${time}. We'll send a WhatsApp confirmation shortly!`,
    })
  } catch (err) {
    console.error('Error creating appointment:', err.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to book appointment. Please call us at 9226333059.',
    })
  }
}

module.exports = { getAvailableSlots, createAppointment }
