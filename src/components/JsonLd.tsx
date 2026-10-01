import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'
import carsData from '@/data/cars.json'

export const JsonLd: React.FC = () => {
  const siteUrl = getServerSideURL()

  // AutoRental organization & locations
  const autoRentalSchema = {
    '@type': 'AutoRental',
    '@id': `${siteUrl}/#organization`,
    name: 'VASILII RENT — Прокат автомобилей в Грузии',
    alternateName: ['VSL Car Rental Georgia', 'VASILII RENT Batumi', 'VASILII RENT Tbilisi', 'VASILII RENT Kutaisi'],
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
          streetAddress: 'ул. Мамия Варшанидзе 154',
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
          streetAddress: '3-й микрорайон Нуцубидзе, 4-й квартал',
          addressLocality: 'Тбилиси',
          addressCountry: 'GE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 41.730792,
          longitude: 44.735812,
        },
        hasMap: 'https://maps.google.com/?q=41.730792,44.735812',
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

  // FAQ Schema for Rich Google Snippets
  const faqSchema = {
    '@type': 'FAQPage',
    '@id': `${siteUrl}/#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Какой минимальный возраст и стаж водителя для аренды автомобиля в Грузии?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Минимальный возраст водителя — 21 год. Стаж вождения — от 0 лет. Для водителей со стажем от 2 лет страховка КАСКО действует абсолютно без франшизы (0 ₾). Для начинающих водителей со стажем до 2 лет действует стандартная прозрачная франшиза.',
        },
      },
      {
        '@type': 'Question',
        name: 'Нужен ли залог (депозит) при аренде автомобиля?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'На большинство автомобилей нашего автопарка залог не требуется (0 ₾). Мы не блокируем средства на вашей банковской карте.',
        },
      },
      {
        '@type': 'Question',
        name: 'Нужно ли вносить предоплату при бронировании машины?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Бронирование полностью бесплатное без предоплаты. Оплата производится исключительно в момент получения автомобиля после осмотра и подписания договора.',
        },
      },
      {
        '@type': 'Question',
        name: 'Включена ли страховка в цену аренды авто?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да, в стоимость включена полная страховка КАСКО + ОСАГО (ущерб, угон, третьи лица, остекление). Франшиза взимается страховой компанией только при ДТП по вине нашего арендатора; если виновник третье лицо — страховка покрывает всё без франшизы.',
        },
      },
      {
        '@type': 'Question',
        name: 'Как устроено продление аренды авто?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Если вы задерживаетесь, первый дополнительный час (+1 час) предоставляется бесплатно в подарок при предварительном уведомлении менеджера. Следующие до 6 часов оплачиваются по почасовому тарифу (10–20 ₾/час в зависимости от авто) без переплаты за целые сутки.',
        },
      },
      {
        '@type': 'Question',
        name: 'Можно ли взять машину в Батуми, а вернуть в Тбилиси или Кутаиси?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Да! Возврат автомобиля в другом городе (Батуми, Тбилиси или Международный аэропорт Кутаиси) доступен без доплаты за перегон (0 ₾) по предварительной договоренности при бронировании.',
        },
      },
      {
        '@type': 'Question',
        name: 'Есть ли лимит по суточному пробегу?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Лимита пробега нет — действует безлимитный пробег по всей территории Грузии. Вы можете наслаждаться поездками без доплат за километраж.',
        },
      },
      {
        '@type': 'Question',
        name: 'Куда запрещено выезжать на автомобиле?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Разрешено движение по всем дорогам общего пользования Грузии, перевалам и смотровым локациям. Строго запрещены опасная грунтовая дорога в Тушетию («дорога смерти»), жесткий оффроуд без дорог, выезд за пределы Грузии и въезд на оккупированные территории (Абхазия, Южная Осетия).',
        },
      },
    ],
  }

  // Vehicles / Fleet ItemList Schema
  const fleetSchema = {
    '@type': 'ItemList',
    '@id': `${siteUrl}/#fleet`,
    name: 'Автопарк проката автомобилей в Грузии — VASILII RENT',
    itemListElement: carsData.slice(0, 30).map((car, index) => {
      const minDailyPrice = car.prices?.['30+'] || Math.round(car.priceGel * 0.6)
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Car',
          name: car.name,
          image: car.images?.[0] ? `${siteUrl}${car.images[0]}` : undefined,
          modelDate: car.year?.toString(),
          vehicleTransmission: car.transmission === 'Automatic' ? 'Automatic' : 'Manual',
          numberOfDoors: car.category === 'cabrio' ? 2 : 4,
          seatingCapacity: car.seats || 5,
          driveWheelConfiguration: car.drive?.includes('4x4') || car.drive?.includes('AWD')
            ? 'https://schema.org/AllWheelDriveConfiguration'
            : 'https://schema.org/FrontWheelDriveConfiguration',
          offers: {
            '@type': 'Offer',
            price: minDailyPrice,
            priceCurrency: 'GEL',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/UsedCondition',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: minDailyPrice,
              priceCurrency: 'GEL',
              unitText: 'DAY',
            },
          },
        },
      }
    }),
  }

  const rootSchema = {
    '@context': 'https://schema.org',
    '@graph': [autoRentalSchema, faqSchema, fleetSchema],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rootSchema) }}
    />
  )
}
