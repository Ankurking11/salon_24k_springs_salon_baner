# 24K Springs Salon — Baner, Pune

> **Baner's Premium Hair & Beauty Experience** — A production-ready luxury salon website with online booking, Google Sheets integration, and a stunning gold-accented design.

[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-4-purple)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-teal)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org)

---

## ✨ Features

- **Luxury UI** — Gold accents (`#C9A24A`), Playfair Display + Inter fonts, cream backgrounds
- **Scroll Animations** — IntersectionObserver-powered fade-in-up transitions throughout
- **Online Booking** — Full form with dynamic time slot availability (no double-bookings)
- **Google Sheets Backend** — Appointments stored in a Google Sheet (no database needed)
- **WhatsApp Integration** — Floating button + CTA for instant chat
- **Mobile Responsive** — Hamburger nav, stacked layouts, touch-friendly
- **SEO Ready** — Meta tags, Open Graph, Schema.org structured data
- **5 Services** — Haircuts, Coloring, Treatments, Nails, Beauty & Grooming

---

## 🏗️ Project Structure

```
.
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css       # Tailwind + custom styles
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       ├── Hero.jsx
│   │       ├── SocialProof.jsx
│   │       ├── About.jsx
│   │       ├── Services.jsx
│   │       ├── Experience.jsx
│   │       ├── Gallery.jsx
│   │       ├── Testimonials.jsx
│   │       ├── CTA.jsx
│   │       ├── Booking.jsx
│   │       ├── Contact.jsx
│   │       ├── Footer.jsx
│   │       └── WhatsAppButton.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/                # Node.js + Express API
    ├── server.js
    ├── routes/
    │   └── appointments.js
    ├── controllers/
    │   └── appointmentController.js
    ├── services/
    │   └── googleSheets.js
    └── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A Google Cloud service account with Sheets API enabled
- A Google Sheet with the service account as editor

### 1. Clone & Install

```bash
# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 2. Configure Backend Environment

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env`:

```env
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
PORT=5000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

> ⚠️ Wrap `GOOGLE_PRIVATE_KEY` in double quotes and keep `\n` as literal `\n` — the service handles the replacement.

### 3. Configure Frontend Environment (optional)

```bash
cp frontend/.env.example frontend/.env
```

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4. Run Development Servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev        # uses nodemon for hot reload
# or: npm start
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Google Sheets Setup

1. **Create a Google Sheet** named "Appointments" (or any name)
2. **Enable Google Sheets API** in Google Cloud Console
3. **Create a Service Account** and download the JSON key
4. **Share the sheet** with the service account email (Editor access)
5. **Copy the Sheet ID** from the URL: `https://docs.google.com/spreadsheets/d/**SHEET_ID**/edit`
6. Set `GOOGLE_SHEET_ID` and credentials in `backend/.env`

The backend will auto-create the header row on first run:
```
| Timestamp | Name | Phone | Service | Date | Time | Notes | Status |
```

---

## 📡 API Reference

### `GET /api/appointments?date=YYYY-MM-DD`

Returns booked time slots for a date.

**Response:**
```json
{
  "success": true,
  "date": "2024-12-25",
  "bookedSlots": ["10:00 AM", "2:00 PM"],
  "availableSlots": ["11:00 AM", "12:00 PM", "1:00 PM", ...]
}
```

### `POST /api/appointments`

Create a new appointment.

**Request body:**
```json
{
  "name": "Priya Sharma",
  "phone": "9876543210",
  "service": "Hair Coloring",
  "date": "2024-12-25",
  "time": "11:00 AM",
  "notes": "Balayage with golden tones"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment confirmed for Priya Sharma on 2024-12-25 at 11:00 AM."
}
```

---

## 🏭 Production Build

```bash
# Build frontend
cd frontend && npm run build
# Output: frontend/dist/

# Start backend in production
cd backend && npm start
```

---

## 📱 Contact

- **Salon:** Shop 4, Wing A, Sterling Towers, Pancard Club Rd, Near ICICI Bank, Baner, Pune 411045
- **Phone:** [9226333059](tel:9226333059)
- **WhatsApp:** [wa.me/919226333059](https://wa.me/919226333059)
- **Hours:** Open Daily · 10:00 AM – 9:00 PM

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `gold` | `#C9A24A` | Accents, CTAs, highlights |
| `gold-light` | `#E2C070` | Hero text, hover states |
| `gold-dark` | `#A8823A` | Hover on gold elements |
| `cream` | `#F8F5F0` | Page background |
| Font Serif | Playfair Display | Headings, brand name |
| Font Sans | Inter | Body text, UI elements |
Website for baner 24k springs salon
