'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useApp, CITIES_DATA, City, Currency, Lang, PHONE_NUMBER, getCityName } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

const LANG_OPTIONS: { code: Lang; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ua', label: 'Українська', flag: '🇺🇦' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

export const Header: React.FC = () => {
  const { city, setCity, currency, setCurrency, lang, setLang } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en || TRANSLATIONS.ru

  const [scrolled, setScrolled] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentLangObj = LANG_OPTIONS.find((l) => l.code === lang) || LANG_OPTIONS[0]

  let rawHeaderMsg = 'Здравствуйте! Хочу уточнить по поводу аренды авто в Грузии.'
  if (lang === 'ua') {
    rawHeaderMsg = 'Вітаю! Хочу уточнити щодо оренди авто в Грузії.'
  } else if (lang === 'en') {
    rawHeaderMsg = 'Hello! I would like to inquire about car rental in Georgia.'
  } else if (lang === 'de') {
    rawHeaderMsg = 'Hallo! Ich interessiere mich für eine Autovermietung in Georgien.'
  } else if (lang === 'fr') {
    rawHeaderMsg = 'Bonjour ! Je souhaite me renseigner sur la location de voiture en Géorgie.'
  } else if (lang === 'it') {
    rawHeaderMsg = 'Ciao! Vorrei informazioni sul noleggio auto in Georgia.'
  } else if (lang === 'pl') {
    rawHeaderMsg = 'Dzień dobry! Chciałbym zapytać o wynajem samochodu w Gruzji.'
  } else if (lang === 'tr') {
    rawHeaderMsg = "Merhaba! Gürcistan'da araç kiralama hakkında bilgi almak istiyorum."
  } else if (lang === 'ar') {
    rawHeaderMsg = 'مرحباً! أود الاستفسار عن تأجير سيارة في جورجيا.'
  } else if (lang === 'fa') {
    rawHeaderMsg = 'سلام! مایل به کسب اطلاعات درباره اجاره خودرو در گرجستان هستم.'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Phone & Contact Bar */}
      <div className="bg-[#1D1D1F] text-white text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Direct Phone Number */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <a
              href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1.5 font-bold text-white hover:text-[#34C759] transition-colors shrink-0 tracking-wide"
            >
              <span className="text-xs">📞</span>
              <span>{PHONE_NUMBER}</span>
            </a>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-white/70 text-[10px] sm:text-[11px] truncate hidden sm:inline">
              {lang === 'ru'
                ? 'Круглосуточно 24/7 (Звонки и WhatsApp)'
                : lang === 'ua'
                ? 'Цілодобово 24/7 (Дзвінки та WhatsApp)'
                : '24/7 Support (Calls & WhatsApp)'}
            </span>
          </div>

          {/* Quick links & Locations */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 text-[10px] sm:text-[11px]">
            <a
              href={`https://wa.me/995591050752?text=${encodeURIComponent(rawHeaderMsg)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-semibold"
            >
              <span>WhatsApp</span>
            </a>
            <span className="text-white/30">•</span>
            <a
              href="https://t.me/rentcarvasilii"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#29B6F6] hover:underline font-semibold"
            >
              <span>Telegram</span>
            </a>
            <span className="text-white/30 hidden md:inline">•</span>
            <span className="text-white/60 hidden md:inline">
              {lang === 'ru'
                ? 'Батуми • Тбилиси • Аэропорт Кутаиси'
                : lang === 'ua'
                ? 'Батумі • Тбілісі • Аеропорт Кутаїсі'
                : 'Batumi • Tbilisi • Kutaisi Airport'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-black/[0.06] shadow-sm'
            : 'bg-white/80 backdrop-blur-md border-b border-black/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Brandmark */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src="/images/vsl-logo-black.png"
            alt="VASILII RENT — Прокат автомобилей в Грузии"
            width={120}
            height={52}
            className="h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            priority
          />
        </Link>

        {/* City Segmented Picker (Center / Left) */}
        <div className="hidden lg:flex items-center bg-[#F5F5F7] p-1 rounded-full text-xs font-semibold">
          {(['batumi', 'tbilisi', 'kutaisi'] as City[]).map((cKey) => (
            <Link
              key={cKey}
              href={`/${cKey}`}
              onClick={() => setCity(cKey)}
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                city === cKey
                  ? 'bg-white text-[#1D1D1F] shadow-sm font-bold'
                  : 'text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {getCityName(cKey, lang)}
            </Link>
          ))}
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6E6E73]">
          <Link href="/#catalog" className="hover:text-[#1D1D1F] transition-colors">
            {t.navVehicles}
          </Link>
          <Link href="/reviews" className="hover:text-[#1D1D1F] transition-colors">
            {t.navReviews}
          </Link>
          <Link href="/terms" className="hover:text-[#1D1D1F] transition-colors">
            {t.navTerms}
          </Link>
          <Link href="/faq" className="hover:text-[#1D1D1F] transition-colors">
            {t.navFaq || 'FAQ'}
          </Link>
          <Link href="/guide" className="hover:text-[#1D1D1F] transition-colors">
            {t.navGuide || 'Памятка'}
          </Link>
          <Link href="/contacts" className="hover:text-[#1D1D1F] transition-colors">
            {t.navContacts}
          </Link>
          <Link
            href="/sos"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F5] hover:bg-[#FFE5E5] text-[#FF3B30] text-xs font-bold border border-[#FF3B30]/25 transition-all shadow-xs shrink-0"
          >
            <span>🚨</span>
            <span>{t.navSos || 'При ДТП / SOS'}</span>
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

          {/* Direct Phone Call for Desktop */}
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-[#1D1D1F] hover:text-[#0071E3] transition-colors whitespace-nowrap"
          >
            <span>📞</span>
            <span>{PHONE_NUMBER}</span>
          </a>

          {/* Direct WhatsApp Call button */}
          <a
            href={`https://wa.me/995591050752?text=${encodeURIComponent(rawHeaderMsg)}`}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex h-9 px-4 rounded-full bg-[#1D1D1F] text-white text-xs font-semibold items-center gap-1.5 hover:bg-black transition-all active:scale-95 shadow-sm"
          >
            <span>WhatsApp</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="md:hidden w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-sm"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
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
                <Link
                  key={cKey}
                  href={`/${cKey}`}
                  onClick={() => {
                    setCity(cKey)
                    setMobileMenuOpen(false)
                  }}
                  className={`py-1.5 rounded-xl transition-all text-center ${
                    city === cKey
                      ? 'bg-white text-[#1D1D1F] shadow-sm font-bold'
                      : 'text-[#6E6E73]'
                  }`}
                >
                  {getCityName(cKey, lang)}
                </Link>
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
              href="/reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0071E3]"
            >
              {t.navReviews}
            </Link>
            <Link
              href="/terms"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0071E3]"
            >
              {t.navTerms}
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0071E3]"
            >
              {t.navFaq || 'FAQ'}
            </Link>
            <Link
              href="/guide"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0071E3]"
            >
              {t.navGuide || 'Памятка водителю'}
            </Link>
            <Link
              href="/contacts"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#0071E3]"
            >
              {t.navContacts}
            </Link>
            <Link
              href="/sos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-2xl bg-[#FFF5F5] border border-[#FF3B30]/20 text-[#FF3B30] font-bold flex items-center gap-2"
            >
              <span>🚨</span>
              <span>{t.navSos || 'При ДТП / SOS'}</span>
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
