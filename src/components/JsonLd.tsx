import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'

export const JsonLd: React.FC = () => {
  const siteUrl = getServerSideURL()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AutoRental',
    name: 'VASILII RENT — Прокат автомобилей в Грузии',
    alternateName: ['VSL Car Rental Georgia', 'VASILII RENT Batumi'],
    url: siteUrl,
    logo: `${siteUrl}/apple-icon.png`,
    image: `${siteUrl}/images/og-image.jpg`,
    description:
      'Аренда автомобилей в Грузии от 1 суток без депозита и предоплаты. Автопарк в Батуми, Тбилиси и аэропорту Кутаиси. Полное страхование КАСКО + ОСАГО, неограниченный пробег, бесплатный 1-й час продления.',
    telephone: '+995591181430',
    priceRange: '₾₾',
    currenciesAccepted: 'GEL, USD, EUR, RUB',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Georgia',
    },
    department: [
      {
        '@type': 'AutoRental',
        name: 'VASILII RENT — Батуми (Главный офис)',
        telephone: '+995591181430',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Мамия Варшанидзе',
          addressLocality: 'Батуми',
          addressRegion: 'Аджария',
          addressCountry: 'GE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 41.6239948640617,
          longitude: 41.63840215223446,
        },
        hasMap: 'https://maps.app.goo.gl/paKrzJftPzEZDA1G7',
      },
      {
        '@type': 'AutoRental',
        name: 'VASILII RENT — Тбилиси',
        telephone: '+995591181430',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Коте Марджанишвили',
          addressLocality: 'Тбилиси',
          addressCountry: 'GE',
        },
      },
      {
        '@type': 'AutoRental',
        name: 'VASILII RENT — Международный аэропорт Кутаиси',
        telephone: '+995591181430',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Международный аэропорт Кутаиси им. Давида Агмашенебели',
          addressLocality: 'Кутаиси',
          addressRegion: 'Имеретия',
          addressCountry: 'GE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 42.1820426721349,
          longitude: 42.465328413138685,
        },
        hasMap: 'https://yandex.com.ge/maps/-/CXaqy-9K',
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
