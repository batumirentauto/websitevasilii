'use client'

import React from 'react'
import { useApp, CITIES_DATA, PHONE_NUMBER, getCityName, getCityAddress, getCityLandmarks } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export default function ContactsPage() {
  const { lang } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block mb-2">
          {t.contactsTag}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight mb-4">
          {t.contactsTitle}
        </h1>
        <p className="text-sm text-[#6E6E73] leading-relaxed">
          {t.contactsSubtitle}
        </p>
      </div>

      {/* 3 City Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Batumi */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.05] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider">
                {t.batumiBaseTitle}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" title={t.openStatus} />
            </div>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-1">
              {getCityName('batumi', lang)}
            </h2>
            <p className="text-sm font-semibold text-[#1D1D1F] mb-2">
              {getCityAddress('batumi', lang)}
            </p>
            <p className="text-xs text-[#6E6E73] leading-relaxed mb-6">
              {getCityLandmarks('batumi', lang)}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/[0.06]">
            <div className="flex flex-wrap gap-2 text-xs">
              {CITIES_DATA.batumi.yandexMapUrl && (
                <a
                  href={CITIES_DATA.batumi.yandexMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
                >
                  {t.viewOnYandex}
                </a>
              )}
              {CITIES_DATA.batumi.googleMapUrl && (
                <a
                  href={CITIES_DATA.batumi.googleMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
                >
                  {t.viewOnGoogle}
                </a>
              )}
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
                {t.tbilisiBaseTitle}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" title={t.openStatus} />
            </div>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-1">
              {getCityName('tbilisi', lang)}
            </h2>
            <p className="text-sm font-semibold text-[#1D1D1F] mb-2">
              {getCityAddress('tbilisi', lang)}
            </p>
            <p className="text-xs text-[#6E6E73] leading-relaxed mb-6">
              {getCityLandmarks('tbilisi', lang)}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/[0.06]">
            <div className="flex flex-wrap gap-2 text-xs">
              {CITIES_DATA.tbilisi.yandexMapUrl && (
                <a
                  href={CITIES_DATA.tbilisi.yandexMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
                >
                  {t.viewOnYandex}
                </a>
              )}
              {CITIES_DATA.tbilisi.googleMapUrl && (
                <a
                  href={CITIES_DATA.tbilisi.googleMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
                >
                  {t.viewOnGoogle}
                </a>
              )}
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
                {t.kutaisiBaseTitle}
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" title={t.openStatus} />
            </div>
            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-1">
              {getCityName('kutaisi', lang)}
            </h2>
            <p className="text-sm font-semibold text-[#1D1D1F] mb-2">
              {getCityAddress('kutaisi', lang)}
            </p>
            <p className="text-xs text-[#6E6E73] leading-relaxed mb-6">
              {getCityLandmarks('kutaisi', lang)}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-black/[0.06]">
            <div className="flex flex-wrap gap-2 text-xs">
              {CITIES_DATA.kutaisi.googleMapUrl && (
                <a
                  href={CITIES_DATA.kutaisi.googleMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 bg-white border border-black/[0.08] rounded-xl text-center font-medium hover:bg-black hover:text-white transition-colors"
                >
                  {t.openMapBtn}
                </a>
              )}
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
            {t.globalPhoneTag}
          </span>
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
            className="text-2xl sm:text-4xl font-extrabold hover:text-[#0071E3] transition-colors"
          >
            {PHONE_NUMBER}
          </a>
          <p className="text-xs text-[#86868B] mt-2">
            {t.globalPhoneDesc}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/995591050752"
            target="_blank"
            rel="noreferrer"
            className="h-12 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            {t.termsCtaWhatsApp}
          </a>
        </div>
      </div>
    </div>
  )
}
