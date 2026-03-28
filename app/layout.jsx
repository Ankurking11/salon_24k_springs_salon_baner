import './globals.css'

export const metadata = {
  title: '24K Springs Salon Baner | Luxury Hair & Beauty Salon in Pune',
  description:
    "24K Springs Salon in Baner, Pune — Baner's most trusted luxury salon offering premium haircuts, hair coloring, treatments, nail services and beauty grooming. Book your appointment today.",
  keywords:
    'luxury salon Baner, hair salon Pune, hair coloring Baner, nail services Baner, beauty salon Baner, 24K Springs Salon, best salon Baner Pune',
  authors: [{ name: '24K Springs Salon' }],
  openGraph: {
    type: 'website',
    title: '24K Springs Salon Baner | Luxury Hair & Beauty',
    description:
      "Baner's premium hair and beauty salon. Expert stylists, luxury products, personalized care.",
    url: 'https://24kspringssalon.com',
  },
  alternates: {
    canonical: 'https://24kspringssalon.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HairSalon',
              name: '24K Springs Salon',
              description: "Baner's premium luxury hair and beauty salon",
              address: {
                '@type': 'PostalAddress',
                streetAddress:
                  'Shop 4, Wing A, Sterling Towers, Pancard Club Rd, Near ICICI Bank',
                addressLocality: 'Baner',
                addressRegion: 'Pune, Maharashtra',
                postalCode: '411045',
                addressCountry: 'IN',
              },
              telephone: '+919226333059',
              openingHours: 'Mo-Su 10:00-21:00',
              priceRange: '₹₹₹',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '130',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
