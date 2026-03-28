const express = require('express')
const router = express.Router()
const {
  getAvailableSlots,
  createAppointment,
} = require('../controllers/appointmentController')

// GET /api/appointments?date=YYYY-MM-DD
router.get('/', getAvailableSlots)

// POST /api/appointments
router.post('/', createAppointment)

module.exports = router
