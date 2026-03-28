const { google } = require('googleapis')

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const SHEET_NAME = 'Appointments'

// Column indices (0-based)
const COL = {
  TIMESTAMP: 0,
  NAME: 1,
  PHONE: 2,
  SERVICE: 3,
  DATE: 4,
  TIME: 5,
  NOTES: 6,
  STATUS: 7,
}

/**
 * Create and return an authenticated Google Sheets client.
 */
function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  return google.sheets({ version: 'v4', auth })
}

/**
 * Ensure the header row exists in the sheet.
 */
async function ensureHeaders(sheets) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1:H1`,
    })
    const rows = response.data.values || []
    if (!rows.length || rows[0][0] !== 'Timestamp') {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_NAME}!A1:H1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Timestamp', 'Name', 'Phone', 'Service', 'Date', 'Time', 'Notes', 'Status']],
        },
      })
    }
  } catch (err) {
    console.warn('Could not verify/create headers:', err.message)
  }
}

/**
 * Fetch all appointments for a specific date and return booked time slots.
 * @param {string} date - YYYY-MM-DD
 * @returns {Promise<string[]>} Array of booked time slot strings
 */
async function getBookedSlots(date) {
  if (!SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL) {
    console.warn('Google Sheets not configured — returning empty slots.')
    return []
  }

  const sheets = getSheetsClient()

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:H`,
    })

    const rows = response.data.values || []
    // Skip header row, filter by date column
    return rows
      .slice(1)
      .filter((row) => row[COL.DATE] === date && row[COL.STATUS] !== 'Cancelled')
      .map((row) => row[COL.TIME])
      .filter(Boolean)
  } catch (err) {
    console.error('Error reading Google Sheet:', err.message)
    return []
  }
}

/**
 * Append a new appointment row to the Google Sheet.
 * @param {{ name, phone, service, date, time, notes }} data
 */
async function addAppointment({ name, phone, service, date, time, notes }) {
  if (!SHEET_ID || !process.env.GOOGLE_CLIENT_EMAIL) {
    throw new Error('Google Sheets is not configured. Set GOOGLE_SHEET_ID and GOOGLE_CLIENT_EMAIL in .env')
  }

  const sheets = getSheetsClient()
  await ensureHeaders(sheets)

  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:H`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[timestamp, name, phone, service, date, time, notes, 'Confirmed']],
    },
  })
}

module.exports = { getBookedSlots, addAppointment }
