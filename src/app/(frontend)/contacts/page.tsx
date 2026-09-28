'use client'

import React from 'react'
import { CITIES_DATA, City, PHONE_NUMBER } from '@/context/AppContext'

export default function ContactsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block mb-2">
          ЛОКАЦИИ И СВЯЗЬ
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight mb-4">
          Наши базы и контакты
        </h1>
        <p className="text-sm text-[#6E6E73] leading-relaxed">
          Работаем ежедневно. Выдача авто на базах за 5 минут, встреча в аэропортах и круглосуточная поддержка.
        </p>
      </div>

      {/* 3 City Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Batumi */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.05] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                Основная база
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" title="Открыто" />
            </div>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-1">Батуми</h2>
            <p className="text-sm font-semibold text-[#1D1D1F] mb-2">
              ул. Варшанидзе 154
            </p>
            <p className="text-xs text-[#6E6E73] leading-relaxed mb-6">
              Ориентир: <strong>Adjara Detailing</strong>, вход на охраняемую территорию напротив здания <strong>Apolo</strong>.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/[0.06]">
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href={CITIES_DATA.batumi.yandexMapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
              >
                Яндекс Карты
              </a>
              <a
                href={CITIES_DATA.batumi.googleMapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
              >
                Google Maps
              </a>
            </div>
            <a
              href={`https://t.me/${CITIES_DATA.batumi.telegram}`}
              target="_blank"
              rel="noreferrer"
              className="w-full h-10 rounded-xl bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Telegram: @{CITIES_DATA.batumi.telegram}</span>
            </a>
          </div>
        </div>

        {/* Tbilisi */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.05] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                База в столице
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" title="Открыто" />
            </div>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-1">Тбилиси</h2>
            <p className="text-sm font-semibold text-[#1D1D1F] mb-2">
              3-й мкрн Нуцубидзе, 4-й квартал
            </p>
            <p className="text-xs text-[#6E6E73] leading-relaxed mb-6">
              Координаты для навигатора: <strong>41.730792, 44.735812</strong>. Удобный заезд и бесплатная выдача.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/[0.06]">
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href={CITIES_DATA.tbilisi.yandexMapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
              >
                Яндекс Карты
              </a>
              <a
                href={CITIES_DATA.tbilisi.googleMapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
              >
                Google Maps
              </a>
            </div>
            <a
              href={`https://t.me/${CITIES_DATA.tbilisi.telegram}`}
              target="_blank"
              rel="noreferrer"
              className="w-full h-10 rounded-xl bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Telegram: @{CITIES_DATA.tbilisi.telegram}</span>
            </a>
          </div>
        </div>

        {/* Kutaisi */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.05] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                Аэропорт KUT
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" title="Открыто" />
            </div>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-1">Кутаиси</h2>
            <p className="text-sm font-semibold text-[#1D1D1F] mb-2">
              Международный Аэропорт (KUT)
            </p>
            <p className="text-xs text-[#6E6E73] leading-relaxed mb-6">
              Базовая выдача прямо в зале прилёта. Встречаем к рейсам Wizz Air и других авиалиний 24/7.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/[0.06]">
            <div className="flex flex-wrap gap-2 text-xs">
              <a
                href={CITIES_DATA.kutaisi.googleMapUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
              >
                Открыть на карте
              </a>
            </div>
            <a
              href={`https://t.me/${CITIES_DATA.kutaisi.telegram}`}
              target="_blank"
              rel="noreferrer"
              className="w-full h-10 rounded-xl bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Telegram: @{CITIES_DATA.kutaisi.telegram}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Global Phone & WhatsApp Banner */}
      <div className="bg-[#1D1D1F] text-white p-8 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs text-[#86868B] uppercase tracking-wider block mb-1">
            ЕДИНЫЙ ТЕЛЕФОН И WHATSAPP
          </span>
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
            className="text-2xl sm:text-4xl font-extrabold hover:text-[#0071E3] transition-colors"
          >
            {PHONE_NUMBER}
          </a>
          <p className="text-xs text-[#86868B] mt-2">
            Круглосуточный приём звонков и сообщений в мессенджерах по всей Грузии
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/995591050752"
            target="_blank"
            rel="noreferrer"
            className="h-12 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            Написать в WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
