'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Currency = 'GEL' | 'USD' | 'EUR'
export type City = 'batumi' | 'tbilisi' | 'kutaisi'
export type Lang = 'ru' | 'en' | 'ar' | 'fa' | 'pl' | 'de' | 'it' | 'fr'

// Currency exchange rates relative to 1 GEL
// 1 USD ~ 2.70 GEL -> 1 GEL ~ 0.370 USD
// 1 EUR ~ 2.95 GEL -> 1 GEL ~ 0.339 EUR
const RATES: Record<Currency, number> = {
  GEL: 1,
  USD: 2.70, // GEL per 1 USD
  EUR: 2.95, // GEL per 1 EUR
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GEL: '₾',
  USD: '$',
  EUR: '€',
}

export const CITIES_DATA: Record<
  City,
  {
    nameRu: string
    nameEn: string
    baseAddressRu: string
    baseAddressEn: string
    landmarksRu: string
    landmarksEn: string
    pickupType: 'base' | 'airport'
    deliveryNoteRu: string
    deliveryNoteEn: string
    telegram: string
    yandexMapUrl?: string
    googleMapUrl?: string
  }
> = {
  batumi: {
    nameRu: 'Батуми',
    nameEn: 'Batumi',
    baseAddressRu: 'ул. Варшанидзе 154',
    baseAddressEn: '154 Varshanidze St, Batumi',
    landmarksRu: 'Ориентир: Adjara Detailing, вход на территорию напротив здания Apolo',
    landmarksEn: 'Landmark: Adjara Detailing, entrance opposite the Apolo building',
    pickupType: 'base',
    deliveryNoteRu: 'Выдача с базы бесплатно за 5 минут. Подача в аэропорт Батуми / по городу — по согласованию.',
    deliveryNoteEn: 'Free 5-minute pick-up at our base. Airport / city delivery on request.',
    telegram: 'rentcarvasilii',
    yandexMapUrl: 'https://yandex.ru/maps/?text=Batumi+Varshanidze+154',
    googleMapUrl: 'https://maps.google.com/?q=Batumi+Varshanidze+154',
  },
  tbilisi: {
    nameRu: 'Тбилиси',
    nameEn: 'Tbilisi',
    baseAddressRu: '3-й микрорайон Нуцубидзе, 4-й квартал',
    baseAddressEn: 'Nutsubidze 3rd Microdistrict, 4th Quarter, Tbilisi',
    landmarksRu: 'Координаты: 41.730792, 44.735812',
    landmarksEn: 'Coordinates: 41.730792, 44.735812',
    pickupType: 'base',
    deliveryNoteRu: 'Выдача с базы бесплатно. Доставка в аэропорт Тбилиси (TBS) / к отелю — по согласованию.',
    deliveryNoteEn: 'Free pick-up at our base. Tbilisi Airport (TBS) / hotel delivery on request.',
    telegram: 'bicho_car_rental_tbilisi',
    yandexMapUrl: 'https://yandex.ru/maps/?whatshere%5Bzoom%5D=16&whatshere%5Bpoint%5D=44.735812%2C41.730792',
    googleMapUrl: 'https://maps.google.com/?q=41.730792,44.735812',
  },
  kutaisi: {
    nameRu: 'Кутаиси (Аэропорт)',
    nameEn: 'Kutaisi (Airport KUT)',
    baseAddressRu: 'Международный Аэропорт Кутаиси (KUT)',
    baseAddressEn: 'Kutaisi International Airport (KUT)',
    landmarksRu: 'Встречаем в терминале прилёта круглосуточно',
    landmarksEn: 'Direct meet & greet in arrivals hall 24/7',
    pickupType: 'airport',
    deliveryNoteRu: 'Базовая выдача прямо в аэропорту Кутаиси к вашему рейсу.',
    deliveryNoteEn: 'Standard convenient pick-up right at Kutaisi Airport upon arrival.',
    telegram: 'kutaisi_rent_car_vasilii',
    yandexMapUrl: 'https://yandex.ru/maps/?text=Kutaisi+Airport',
    googleMapUrl: 'https://maps.google.com/?q=Kutaisi+International+Airport',
  },
}

export const PHONE_NUMBER = '+995 591 050 752'
export const WHATSAPP_PHONE = '995591050752'

export type RentalDuration = '1-2' | '3-5' | '6-13' | '14-29' | '30+'

export interface DurationTier {
  id: RentalDuration
  label: string
  daysLabel: string
  discountPercent: number
}

export const DURATION_TIERS: DurationTier[] = [
  { id: '1-2', label: '1–2 дня', daysLabel: '1–2 дня', discountPercent: 0 },
  { id: '3-5', label: '3–5 дней', daysLabel: '3–5 дней', discountPercent: 10 },
  { id: '6-13', label: '6–13 дней', daysLabel: '6–13 дней', discountPercent: 20 },
  { id: '14-29', label: '14–29 дней', daysLabel: '14–29 дней', discountPercent: 30 },
  { id: '30+', label: '30+ дней', daysLabel: 'от 30 дней', discountPercent: 40 },
]

export const calculateDailyPrice = (
  basePriceGel: number,
  dur: RentalDuration = '1-2',
  customPrices?: Partial<Record<RentalDuration, number>>
): number => {
  if (customPrices && customPrices[dur] !== undefined) {
    return customPrices[dur]!
  }
  const tier = DURATION_TIERS.find((t) => t.id === dur)
  if (!tier || tier.discountPercent === 0) return basePriceGel
  return Math.round(basePriceGel * (1 - tier.discountPercent / 100))
}

interface AppContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  city: City
  setCity: (city: City) => void
  lang: Lang
  setLang: (lang: Lang) => void
  duration: RentalDuration
  setDuration: (d: RentalDuration) => void
  convertPrice: (priceGel: number) => number
  formatPrice: (priceGel: number) => string
  calculatePrice: (
    basePriceGel: number,
    dur?: RentalDuration,
    customPrices?: Partial<Record<RentalDuration, number>>
  ) => number
  getBookingLink: (
    carName: string,
    basePriceGel: number,
    type: 'whatsapp' | 'telegram',
    customDuration?: RentalDuration,
    customPrices?: Partial<Record<RentalDuration, number>>
  ) => string
}

const AppContext = createContext<AppContextType | null>(null)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('GEL')
  const [city, setCityState] = useState<City>('batumi')
  const [lang, setLangState] = useState<Lang>('ru')
  const [duration, setDurationState] = useState<RentalDuration>('1-2')

  useEffect(() => {
    try {
      const savedCurr = localStorage.getItem('vasilii_currency') as Currency
      if (savedCurr && (savedCurr === 'GEL' || savedCurr === 'USD' || savedCurr === 'EUR')) {
        setCurrencyState(savedCurr)
      }
      const savedCity = localStorage.getItem('vasilii_city') as City
      if (savedCity && (savedCity === 'batumi' || savedCity === 'tbilisi' || savedCity === 'kutaisi')) {
        setCityState(savedCity)
      }
      const savedLang = localStorage.getItem('vasilii_lang') as Lang
      if (savedLang) {
        setLangState(savedLang)
      }
      const savedDur = localStorage.getItem('vasilii_duration') as RentalDuration
      if (savedDur && ['1-2', '3-5', '6-13', '14-29', '30+'].includes(savedDur)) {
        setDurationState(savedDur)
      }
    } catch {}
  }, [])

  const setCurrency = (c: Currency) => {
    setCurrencyState(c)
    try {
      localStorage.setItem('vasilii_currency', c)
    } catch {}
  }

  const setCity = (c: City) => {
    setCityState(c)
    try {
      localStorage.setItem('vasilii_city', c)
    } catch {}
  }

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('vasilii_lang', l)
      if (l === 'ar' || l === 'fa') {
        document.documentElement.dir = 'rtl'
      } else {
        document.documentElement.dir = 'ltr'
      }
    } catch {}
  }

  const setDuration = (d: RentalDuration) => {
    setDurationState(d)
    try {
      localStorage.setItem('vasilii_duration', d)
    } catch {}
  }

  // Convert GEL to target currency with upward rounding (Math.ceil)
  const convertPrice = (priceGel: number): number => {
    if (currency === 'GEL') return priceGel
    const rate = RATES[currency]
    return Math.ceil(priceGel / rate)
  }

  const formatPrice = (priceGel: number): string => {
    const val = convertPrice(priceGel)
    const sym = CURRENCY_SYMBOLS[currency]
    return currency === 'GEL' ? `${val} ${sym}` : `${sym}${val}`
  }

  const calculatePrice = (
    basePriceGel: number,
    dur?: RentalDuration,
    customPrices?: Partial<Record<RentalDuration, number>>
  ): number => {
    return calculateDailyPrice(basePriceGel, dur || duration, customPrices)
  }

  const getBookingLink = (
    carName: string,
    basePriceGel: number,
    type: 'whatsapp' | 'telegram',
    customDuration?: RentalDuration,
    customPrices?: Partial<Record<RentalDuration, number>>
  ) => {
    const activeDur = customDuration || duration
    const effectivePriceGel = calculateDailyPrice(basePriceGel, activeDur, customPrices)
    const cityName = CITIES_DATA[city].nameRu
    const priceText = formatPrice(effectivePriceGel)
    const tier = DURATION_TIERS.find((t) => t.id === activeDur)
    const durLabel = tier ? tier.daysLabel : 'аренду'

    const message = encodeURIComponent(
      `Здравствуйте! Интересует аренда автомобиля ${carName} на ${durLabel} (${priceText}/сутки) в городе ${cityName}. Свободна ли машина на мои даты?`
    )

    if (type === 'whatsapp') {
      return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`
    } else {
      const tgUser = CITIES_DATA[city].telegram
      return `https://t.me/${tgUser}?text=${message}`
    }
  }

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        city,
        setCity,
        lang,
        setLang,
        duration,
        setDuration,
        convertPrice,
        formatPrice,
        calculatePrice,
        getBookingLink,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
