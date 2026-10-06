'use client'

import React from 'react'
import { useApp, CITIES_DATA, getCityName } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export const MobileFloatingBar: React.FC = () => {
  const { lang, city } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru
  const currentCity = CITIES_DATA[city]
  const cityName = getCityName(city, lang)

  let rawInquiry = `Здравствуйте! Хочу узнать наличие авто в городе ${cityName}.`
  if (lang === 'uk') {
    rawInquiry = `Вітаю! Хочу дізнатися про наявність авто у місті ${cityName}.`
  } else if (lang === 'en') {
    rawInquiry = `Hello! I would like to check car availability in ${cityName}.`
  } else if (lang === 'de') {
    rawInquiry = `Hallo! Ich möchte die Verfügbarkeit von Autos in ${cityName} prüfen.`
  } else if (lang === 'fr') {
    rawInquiry = `Bonjour ! Je souhaite vérifier la disponibilité des voitures à ${cityName}.`
  } else if (lang === 'it') {
    rawInquiry = `Ciao! Vorrei verificare la disponibilità delle auto a ${cityName}.`
  } else if (lang === 'pl') {
    rawInquiry = `Dzień dobry! Chciałbym sprawdzić dostępność samochodów w mieście ${cityName}.`
  } else if (lang === 'ar') {
    rawInquiry = `مرحباً! أود معرفة السيارات المتاحة في مدينة ${cityName}.`
  } else if (lang === 'fa') {
    rawInquiry = `سلام! می‌خواستم از موجودی خودروها در شهر ${cityName} مطلع شوم.`
  }

  const inquiryMsg = encodeURIComponent(rawInquiry)

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40">
      <div className="bg-[#1D1D1F]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 px-3.5 shadow-[0_16px_36px_-4px_rgba(0,0,0,0.35)] flex items-center justify-between gap-2 text-white">
        <div className="flex-1 pr-1.5 min-w-0">
          <p className="text-[11px] sm:text-xs font-semibold text-white leading-tight">
            {t.floatingBarCta || 'Напиши даты поездки, чтобы получить список доступных автомобилей'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={`https://wa.me/995591050752?text=${inquiryMsg}`}
            target="_blank"
            rel="noreferrer"
            className="h-9 px-3 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          >
            WhatsApp
          </a>
          <a
            href={`https://t.me/${currentCity.telegram}?text=${inquiryMsg}`}
            target="_blank"
            rel="noreferrer"
            className="h-9 px-3 bg-white text-[#1D1D1F] rounded-xl text-xs font-bold flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          >
            Telegram
          </a>
        </div>
      </div>
    </div>
  )
}
