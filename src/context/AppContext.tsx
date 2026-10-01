'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { TRANSLATIONS } from './translations'

export type Currency = 'GEL' | 'USD' | 'EUR'
export type City = 'batumi' | 'tbilisi' | 'kutaisi'
export type Lang = 'ru' | 'en' | 'ar' | 'fa' | 'pl' | 'de' | 'it' | 'fr'

// Currency exchange rates relative to 1 GEL
// 1 USD = 2.60 GEL
// 1 EUR = 2.94 GEL
const RATES: Record<Currency, number> = {
  GEL: 1,
  USD: 2.60, // GEL per 1 USD
  EUR: 2.94, // GEL per 1 EUR
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
    baseAddressRu: 'ул. Мамия Варшанидзе 154',
    baseAddressEn: '154 Mamiya Varshanidze St, Batumi',
    landmarksRu: 'Ориентир: Adjara Detailing, вход на территорию напротив здания Apolo\nКоординаты: 41.6239948640617, 41.63840215223446',
    landmarksEn: 'Landmark: Adjara Detailing, entrance opposite the Apolo building\nCoordinates: 41.6239948640617, 41.63840215223446',
    pickupType: 'base',
    deliveryNoteRu: 'Выдача с базы бесплатно. Бесплатная подача в аэропорт Батуми / по городу — по запросу.',
    deliveryNoteEn: 'Free pick-up at our base. Free Batumi Airport / city delivery on request.',
    telegram: 'rentcarvasilii',
    yandexMapUrl: 'https://yandex.ru/maps/?text=Batumi+Varshanidze+154',
    googleMapUrl: 'https://maps.app.goo.gl/paKrzJftPzEZDA1G7',
  },
  tbilisi: {
    nameRu: 'Тбилиси',
    nameEn: 'Tbilisi',
    baseAddressRu: '3-й микрорайон Нуцубидзе, 4-й квартал',
    baseAddressEn: 'Nutsubidze 3rd Microdistrict, 4th Quarter, Tbilisi',
    landmarksRu: 'Координаты: 41.730792, 44.735812',
    landmarksEn: 'Coordinates: 41.730792, 44.735812',
    pickupType: 'base',
    deliveryNoteRu: 'Выдача с базы бесплатно. Доставка в аэропорт Тбилиси (TBS) / к отелю — по запросу. Стоимость 30 ₾ днем и 50 ₾ ночью.',
    deliveryNoteEn: 'Free pick-up at our base. Tbilisi Airport (TBS) / hotel delivery on request (30 ₾ daytime, 50 ₾ nighttime).',
    telegram: 'bicho_car_rental_tbilisi',
    yandexMapUrl: 'https://yandex.ru/maps/?whatshere%5Bzoom%5D=16&whatshere%5Bpoint%5D=44.735812%2C41.730792',
    googleMapUrl: 'https://maps.google.com/?q=41.730792,44.735812',
  },
  kutaisi: {
    nameRu: 'Кутаиси',
    nameEn: 'Kutaisi',
    baseAddressRu: 'Международный Аэропорт Кутаиси (KUT)',
    baseAddressEn: 'Kutaisi International Airport (KUT)',
    landmarksRu: 'Встречаем у терминала прилёта круглосуточно\nКоординаты: 42.1820426721349, 42.465328413138685',
    landmarksEn: 'Direct meet & greet outside arrivals terminal 24/7\nCoordinates: 42.1820426721349, 42.465328413138685',
    pickupType: 'airport',
    deliveryNoteRu: 'Базовая выдача прямо в аэропорту Кутаиси к вашему рейсу 24 часа в сутки. Доставка в город 30 ₾.',
    deliveryNoteEn: 'Direct handover right at Kutaisi Airport terminal to your flight 24/7. City delivery 30 ₾.',
    telegram: 'kutaisi_rent_car_vasilii',
    yandexMapUrl: 'https://yandex.com.ge/maps/-/CXaqy-9K',
    googleMapUrl: 'https://maps.google.com/?q=42.1820426721349,42.465328413138685',
  },
}

export const PHONE_NUMBER = '+995 591 050 752'
export const WHATSAPP_PHONE = '995591050752'
export const EMERGENCY_PHONE = '+995 591 181 430'
export const EMERGENCY_WHATSAPP = '995591181430'

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

export function getTierLabel(tier: DurationTier, lang: Lang, short = false): string {
  if (lang === 'ru') {
    if (short) return tier.label.replace(' дня', ' дн').replace(' дней', ' дн')
    return tier.label
  }
  if (lang === 'de') {
    const dayWord = short ? 'T.' : 'Tage'
    return `${tier.id.replace('-', '–')} ${dayWord}`
  }
  if (lang === 'fr') {
    const dayWord = short ? 'j.' : 'jours'
    return `${tier.id.replace('-', '–')} ${dayWord}`
  }
  if (lang === 'it') {
    const dayWord = short ? 'gg.' : 'giorni'
    return `${tier.id.replace('-', '–')} ${dayWord}`
  }
  if (lang === 'pl') {
    const dayWord = short ? 'd.' : 'dni'
    return `${tier.id.replace('-', '–')} ${dayWord}`
  }
  if (lang === 'ar') {
    return `${tier.id.replace('-', '–')} يوم`
  }
  if (lang === 'fa') {
    return `${tier.id.replace('-', '–')} روز`
  }
  const dayWord = short ? 'd' : 'days'
  if (tier.id === '1-2') return `1–2 ${dayWord}`
  if (tier.id === '3-5') return `3–5 ${dayWord}`
  if (tier.id === '6-13') return `6–13 ${dayWord}`
  if (tier.id === '14-29') return `14–29 ${dayWord}`
  if (tier.id === '30+') return `30+ ${dayWord}`
  return tier.label
}

export function getCityName(cityKey: City, lang: Lang): string {
  const city = CITIES_DATA[cityKey]
  if (!city) return ''
  return lang === 'ru' ? city.nameRu : city.nameEn
}

export function getCityAddress(cityKey: City, lang: Lang): string {
  const city = CITIES_DATA[cityKey]
  if (!city) return ''
  return lang === 'ru' ? city.baseAddressRu : city.baseAddressEn
}

export function getCityLandmarks(cityKey: City, lang: Lang): string {
  const city = CITIES_DATA[cityKey]
  if (!city) return ''
  return lang === 'ru' ? city.landmarksRu : city.landmarksEn
}

export function getCityDeliveryNote(cityKey: City, lang: Lang): string {
  const city = CITIES_DATA[cityKey]
  if (!city) return ''
  return lang === 'ru' ? city.deliveryNoteRu : city.deliveryNoteEn
}

interface AppContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  city: City
  setCity: (city: City) => void
  lang: Lang
  setLang: (lang: Lang) => void
  t: (typeof TRANSLATIONS)['ru']
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
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search)

        // 1. Language from URL (?lang=... or ?l=...)
        const urlLang = (params.get('lang') || params.get('l'))?.toLowerCase() as Lang
        const validLangs: Lang[] = ['ru', 'en', 'ar', 'fa', 'pl', 'de', 'it', 'fr']
        if (urlLang && validLangs.includes(urlLang)) {
          setLangState(urlLang)
          localStorage.setItem('vasilii_lang', urlLang)
          document.documentElement.lang = urlLang
          document.documentElement.dir = urlLang === 'ar' || urlLang === 'fa' ? 'rtl' : 'ltr'
        } else {
          const savedLang = localStorage.getItem('vasilii_lang') as Lang
          if (savedLang && validLangs.includes(savedLang)) {
            setLangState(savedLang)
            document.documentElement.lang = savedLang
            document.documentElement.dir = savedLang === 'ar' || savedLang === 'fa' ? 'rtl' : 'ltr'
          }
        }

        // 2. City from URL path or param (?city=... or ?c=...)
        const pathname = window.location.pathname.toLowerCase()
        let pathCity: City | null = null
        if (pathname.includes('/batumi')) pathCity = 'batumi'
        else if (pathname.includes('/tbilisi')) pathCity = 'tbilisi'
        else if (pathname.includes('/kutaisi')) pathCity = 'kutaisi'

        const urlCity = (params.get('city') || params.get('c'))?.toLowerCase() as City
        const validCities: City[] = ['batumi', 'tbilisi', 'kutaisi']

        if (pathCity) {
          setCityState(pathCity)
          localStorage.setItem('vasilii_city', pathCity)
        } else if (urlCity && validCities.includes(urlCity)) {
          setCityState(urlCity)
          localStorage.setItem('vasilii_city', urlCity)
        } else {
          const savedCity = localStorage.getItem('vasilii_city') as City
          if (savedCity && validCities.includes(savedCity)) {
            setCityState(savedCity)
          }
        }

        // 3. Currency from URL (?currency=... or ?cur=...)
        const urlCurr = (params.get('currency') || params.get('cur'))?.toUpperCase() as Currency
        const validCurrs: Currency[] = ['GEL', 'USD', 'EUR']
        if (urlCurr && validCurrs.includes(urlCurr)) {
          setCurrencyState(urlCurr)
          localStorage.setItem('vasilii_currency', urlCurr)
        } else {
          const savedCurr = localStorage.getItem('vasilii_currency') as Currency
          if (savedCurr && validCurrs.includes(savedCurr)) {
            setCurrencyState(savedCurr)
          }
        }
      }

      // Ensure duration always defaults to '1-2' days for every visit
      localStorage.removeItem('vasilii_duration')
      setDurationState('1-2')
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
      document.documentElement.lang = l
      if (l === 'ar' || l === 'fa') {
        document.documentElement.dir = 'rtl'
      } else {
        document.documentElement.dir = 'ltr'
      }
    } catch {}
  }

  const setDuration = (d: RentalDuration) => {
    setDurationState(d)
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
    const cityName = getCityName(city, lang)
    const priceText = formatPrice(effectivePriceGel)
    const tier = DURATION_TIERS.find((t) => t.id === activeDur)
    const durLabel = getTierLabel(tier || DURATION_TIERS[0], lang)

    let messageText = `Здравствуйте! Интересует аренда автомобиля ${carName} на ${durLabel} (${priceText}/сутки) в городе ${cityName}. Свободна ли машина на мои даты?`
    if (lang === 'en') {
      messageText = `Hello! I would like to rent the ${carName} for ${durLabel} (${priceText}/day) in ${cityName}. Is it available for my dates?`
    } else if (lang === 'de') {
      messageText = `Hallo! Ich interessiere mich für den ${carName} für ${durLabel} (${priceText}/Tag) in ${cityName}. Ist der Wagen verfügbar?`
    } else if (lang === 'fr') {
      messageText = `Bonjour ! Je souhaite louer la ${carName} pour ${durLabel} (${priceText}/jour) à ${cityName}. Est-elle disponible ?`
    } else if (lang === 'it') {
      messageText = `Ciao! Vorrei noleggiare la ${carName} per ${durLabel} (${priceText}/giorno) a ${cityName}. È disponibile per le mie date?`
    } else if (lang === 'pl') {
      messageText = `Dzień dobry! Interesuje mnie wynajem ${carName} na ${durLabel} (${priceText}/dzień) w mieście ${cityName}. Czy auto jest dostępne?`
    } else if (lang === 'ar') {
      messageText = `مرحباً! أود استئجار سيارة ${carName} لمدة ${durLabel} (${priceText}/يوم) في ${cityName}. هل هي متوفرة لتاريخ رحلتي؟`
    } else if (lang === 'fa') {
      messageText = `سلام! مایل به اجاره خودروی ${carName} برای ${durLabel} (${priceText}/روز) در ${cityName} هستم. آیا در تاریخ‌های من موجود است؟`
    }

    const message = encodeURIComponent(messageText)

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
        t: TRANSLATIONS[lang] || TRANSLATIONS.ru,
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
