'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useApp, CITIES_DATA, PHONE_NUMBER, getCityName, getCityAddress, getCityLandmarks } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export const Footer: React.FC = () => {
  const { lang, city } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru
  const currentCityData = CITIES_DATA[city]

  return (
    <footer className="bg-[#F5F5F7] text-[#1D1D1F] border-t border-black/[0.06] pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/vsl-logo-black.png"
                alt="VSL Car Rental Georgia"
                width={130}
                height={56}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-[#6E6E73] leading-relaxed mb-4">
              {t.heroSubtitle}
            </p>
            <p className="text-xs text-[#86868B]">
              {t.footerCities}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#86868B] mb-4">
              {t.footerNav}
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#6E6E73]">
              <li>
                <Link href="/#catalog" className="hover:text-[#1D1D1F] transition-colors">
                  {t.navVehicles}
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#1D1D1F] transition-colors">
                  {t.navReviews}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#1D1D1F] transition-colors">
                  {t.navTerms}
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-[#1D1D1F] transition-colors">
                  {t.navContacts}
                </Link>
              </li>
              <li>
                <Link href="/sos" className="text-[#FF3B30] hover:underline font-semibold flex items-center gap-1">
                  <span>🚨</span> {t.navSos || 'При ДТП / SOS'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Current Selected City Base & Regional Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#86868B] mb-3">
              {t.baseLabel}: {getCityName(city, lang)}
            </h4>
            <div className="flex items-center gap-2 mb-3 text-xs">
              <Link
                href="/batumi"
                className={`transition-colors ${city === 'batumi' ? 'font-bold text-[#1D1D1F] underline decoration-2' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
              >
                {getCityName('batumi', lang)}
              </Link>
              <span className="text-[#D2D2D7]">•</span>
              <Link
                href="/tbilisi"
                className={`transition-colors ${city === 'tbilisi' ? 'font-bold text-[#1D1D1F] underline decoration-2' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
              >
                {getCityName('tbilisi', lang)}
              </Link>
              <span className="text-[#D2D2D7]">•</span>
              <Link
                href="/kutaisi"
                className={`transition-colors ${city === 'kutaisi' ? 'font-bold text-[#1D1D1F] underline decoration-2' : 'text-[#6E6E73] hover:text-[#1D1D1F]'}`}
              >
                {getCityName('kutaisi', lang)}
              </Link>
            </div>
            <p className="text-xs text-[#1D1D1F] font-semibold mb-1">
              {getCityAddress(city, lang)}
            </p>
            <p className="text-xs text-[#6E6E73] leading-relaxed mb-3">
              {getCityLandmarks(city, lang)}
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {currentCityData.yandexMapUrl && (
                <a
                  href={currentCityData.yandexMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-white border border-black/[0.08] rounded-md font-medium text-[#1D1D1F] hover:bg-black hover:text-white transition-colors"
                >
                  {t.viewOnYandex || 'Yandex Maps'}
                </a>
              )}
              {currentCityData.googleMapUrl && (
                <a
                  href={currentCityData.googleMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-white border border-black/[0.08] rounded-md font-medium text-[#1D1D1F] hover:bg-black hover:text-white transition-colors"
                >
                  {t.viewOnGoogle || 'Google Maps'}
                </a>
              )}
            </div>
          </div>

          {/* Col 4: Direct Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#86868B] mb-4">
              {t.footerContact}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
                  className="block text-sm font-bold text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
                >
                  {PHONE_NUMBER}
                </a>
                <p className="text-xs text-[#86868B]">{t.footer247}</p>
                <div className="flex gap-2 pt-2">
                  <a
                    href="https://wa.me/995591050752"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-[#25D366] text-white font-semibold text-xs hover:bg-[#20ba59] transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`https://t.me/${currentCityData.telegram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-[#1D1D1F] text-white font-semibold text-xs hover:bg-black transition-colors"
                  >
                    Telegram
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-black/[0.06]">
                <span className="text-[10px] font-bold text-[#FF3B30] uppercase tracking-wider block mb-0.5">
                  🚨 SOS / При ДТП (24/7):
                </span>
                <a
                  href="tel:+995591181430"
                  className="block text-sm font-bold text-[#1D1D1F] hover:text-[#FF3B30] transition-colors"
                >
                  +995 591 181 430
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868B] gap-4">
          <p>© {new Date().getFullYear()} VASILII RENT. {t.footerCopyright}</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-[#1D1D1F]">
              {t.footerTerms}
            </Link>
            <Link href="/contacts" className="hover:text-[#1D1D1F]">
              {t.footerContacts}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
