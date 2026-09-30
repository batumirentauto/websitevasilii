'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useApp, CITIES_DATA, City, Currency, Lang, PHONE_NUMBER } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

const LANG_OPTIONS: { code: Lang; label: string; flag: string }[] = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

export const Header: React.FC = () => {
  const { city, setCity, currency, setCurrency, lang, setLang } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  const [scrolled, setScrolled] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentLangObj = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-black/[0.06] shadow-sm'
          : 'bg-white/50 backdrop-blur-md border-b border-black/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brandmark */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/images/vsl-logo-black.png"
            alt="VSL Car Rental Georgia"
            width={120}
            height={52}
            className="h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* City Segmented Picker (Center / Left) */}
        <div className="hidden lg:flex items-center bg-[#F5F5F7] p-1 rounded-full text-xs font-semibold">
          {(['batumi', 'tbilisi', 'kutaisi'] as City[]).map((cKey) => (
            <button
              key={cKey}
              onClick={() => setCity(cKey)}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                city === cKey
                  ? 'bg-white text-[#1D1D1F] shadow-sm font-bold'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {CITIES_DATA[cKey].nameRu}
            </button>
          ))}
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6E6E73]">
          <Link href="/#catalog" className="hover:text-[#1D1D1F] transition-colors">
            {t.navVehicles}
          </Link>
          <Link href="/terms" className="hover:text-[#1D1D1F] transition-colors">
            {t.navTerms}
          </Link>
          <Link href="/contacts" className="hover:text-[#1D1D1F] transition-colors">
            {t.navContacts}
          </Link>
        </nav>

        {/* Right Section: Currency Switcher + Lang Dropdown + Messenger Call */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Segmented Switcher */}
          <div className="flex bg-[#F5F5F7] p-0.5 rounded-full text-[11px] font-semibold">
            {(['GEL', 'USD', 'EUR'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  currency === c
                    ? 'bg-white text-[#1D1D1F] shadow-xs font-bold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                }`}
              >
                {c === 'GEL' ? '₾' : c === 'USD' ? '$' : '€'}
              </button>
            ))}
          </div>

          {/* Lang Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="h-8 px-2.5 rounded-full bg-[#F5F5F7] hover:bg-[#E5E5EA] text-[#1D1D1F] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>{currentLangObj.flag}</span>
              <span className="uppercase">{currentLangObj.code}</span>
              <span className="text-[10px] text-[#86868B]">▾</span>
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.08] py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setLangMenuOpen(false)}
              >
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLang(opt.code)}
                    className={`w-full px-4 py-2 text-left text-xs font-medium flex items-center gap-2.5 hover:bg-[#F5F5F7] transition-colors ${
                      lang === opt.code ? 'text-[#1D1D1F] font-bold bg-[#F5F5F7]' : 'text-[#6E6E73]'
                    }`}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direct WhatsApp Call button */}
          <a
            href={`https://wa.me/995591050752?text=${encodeURIComponent('Здравствуйте! Хочу уточнить по поводу аренды авто в Грузии.')}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex h-9 px-4 rounded-full bg-[#1D1D1F] text-white text-xs font-semibold items-center gap-1.5 hover:bg-black transition-all active:scale-95 shadow-sm"
          >
            <span>WhatsApp</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-sm"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-black/[0.08] px-6 py-4 space-y-4">
          {/* City selector on mobile */}
          <div>
            <span className="text-xs text-[#86868B] block mb-2">{t.citySelectLabel}</span>
            <div className="grid grid-cols-3 gap-1 bg-[#F5F5F7] p-1 rounded-2xl text-xs font-semibold">
              {(['batumi', 'tbilisi', 'kutaisi'] as City[]).map((cKey) => (
                <button
                  key={cKey}
                  onClick={() => setCity(cKey)}
                  className={`py-1.5 rounded-xl transition-all ${
                    city === cKey
                      ? 'bg-white text-[#1D1D1F] shadow-sm font-bold'
                      : 'text-[#6E6E73]'
                  }`}
                >
                  {CITIES_DATA[cKey].nameRu}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2 text-base font-semibold text-[#1D1D1F]">
            <Link
              href="/#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0071E3]"
            >
              {t.navVehicles}
            </Link>
            <Link
              href="/terms"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0071E3]"
            >
              {t.navTerms}
            </Link>
            <Link
              href="/contacts"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0071E3]"
            >
              {t.navContacts}
            </Link>
          </div>

          <div className="pt-2 flex gap-2">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
              className="flex-1 h-10 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-xs font-bold flex items-center justify-center"
            >
              {PHONE_NUMBER}
            </a>
            <a
              href="https://wa.me/995591050752"
              target="_blank"
              rel="noreferrer"
              className="flex-1 h-10 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
