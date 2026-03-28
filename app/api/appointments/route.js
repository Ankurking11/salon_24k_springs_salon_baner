import { NextResponse } from 'next/server'
import { getBookedSlots, addAppointment } from '../../../lib/googleSheets'

const ALL_SLOTS = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
]

/**
 * GET /api/appointments?date=YYYY-MM-DD
 * Returns the booked time slots for a given date.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { success: false, message: 'Please provide a valid date in YYYY-MM-DD format.' },
      { status: 400 }
    )
  }

  try {
    const bookedSlots = await getBookedSlots(date)
    return NextResponse.json({
      success: true,
      date,
      bookedSlots,
      availableSlots: ALL_SLOTS.filter((s) => !bookedSlots.includes(s)),
    })
  } catch (err) {
    console.error('Error fetching slots:', err.message)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch availability. Please try again.' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/appointments
 * Body: { name, phone, service, date, time, notes }
 * Creates a new appointment in Google Sheets.
 */
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 }
    )
  }

  const { name, phone, service, date, time, notes } = body

  // Validation
  if (!name || !phone || !service || !date || !time) {
    return NextResponse.json(
      { success: false, message: 'Name, phone, service, date, and time are required.' },
      { status: 400 }
    )
  }

  if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
    return NextResponse.json(
      { success: false, message: 'Please provide a valid 10-digit phone number.' },
      { status: 400 }
    )
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { success: false, message: 'Please provide a valid date in YYYY-MM-DD format.' },
      { status: 400 }
    )
  }

  if (!ALL_SLOTS.includes(time)) {
    return NextResponse.json(
      { success: false, message: 'Invalid time slot selected.' },
      { status: 400 }
    )
  }

  try {
    // Check if slot is already booked
    const bookedSlots = await getBookedSlots(date)
    if (bookedSlots.includes(time)) {
      return NextResponse.json(
        {
          success: false,
          message: `The ${time} slot on ${date} is already booked. Please choose another time.`,
        },
        { status: 409 }
      )
    }

    await addAppointment({ name, phone, service, date, time, notes: notes || '' })

    return NextResponse.json(
      {
        success: true,
        message: `Appointment confirmed for ${name} on ${date} at ${time}. We'll send a WhatsApp confirmation shortly!`,
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error creating appointment:', err.message)
    return NextResponse.json(
      { success: false, message: 'Failed to book appointment. Please call us at 9226333059.' },
      { status: 500 }
    )
  }
}
