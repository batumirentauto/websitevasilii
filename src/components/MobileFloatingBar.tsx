'use client'

import React from 'react'
import { useApp, CITIES_DATA, City } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export const MobileFloatingBar: React.FC = () => {
  const { lang, city, setCity } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru
  const currentCity = CITIES_DATA[city]

  return (
    <div className="md:hidden fixed bottom-3 left-3 right-3 z-40">
      <div className="bg-[#1D1D1F]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2.5 px-3.5 shadow-[0_16px_36px_-4px_rgba(0,0,0,0.35)] flex items-center justify-between gap-2 text-white">
        <div>
          <span className="text-[10px] text-[#86868B] block uppercase font-bold tracking-wider">
            {currentCity.nameRu} • 80+ авто
          </span>
          <span className="text-xs font-semibold text-white">
            База: 0₾ выдача
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <a
            href={`https://wa.me/995591050752?text=${encodeURIComponent(`Здравствуйте! Хочу узнать наличие авто в городе ${currentCity.nameRu}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="h-9 px-3.5 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          >
            WhatsApp
          </a>
          <a
            href={`https://t.me/${currentCity.telegram}?text=${encodeURIComponent(`Здравствуйте! Хочу узнать наличие авто в городе ${currentCity.nameRu}.`)}`}
            target="_blank"
            rel="noreferrer"
            className="h-9 px-3.5 bg-white text-[#1D1D1F] rounded-xl text-xs font-bold flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          >
            Telegram
          </a>
        </div>
      </div>
    </div>
  )
}
