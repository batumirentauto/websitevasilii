'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useApp, DURATION_TIERS, calculateDailyPrice, RentalDuration, getTierLabel, Lang } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export interface CarItem {
  id: string
  name: string
  slug: string
  category: 'suv' | 'sedan' | 'cabrio' | 'minivan'
  year: number
  transmission: string
  climate: boolean
  seats: number
  drive: string
  carplay: boolean
  bluetooth: boolean
  winterTires: boolean
  panoramicRoof: boolean
  fuelType: string
  engine?: string
  engineEn?: string
  consumptionHighway?: string
  consumptionMixed?: string
  fuelConsumption: string
  priceGel: number
  prices?: Partial<Record<RentalDuration, number>>
  depositGel: number
  featured?: boolean
  images: string[]
}

export function formatFuel(fuelType: string, lang: string): string {
  const t = TRANSLATIONS[lang as Lang] || TRANSLATIONS.ru
  const key = (fuelType || '').toLowerCase()
  if (key.includes('petrol') || key.includes('gas') || key.includes('benzin')) return t.fuelPetrol || fuelType
  if (key.includes('diesel')) return t.fuelDiesel || fuelType
  if (key.includes('hybrid')) return t.fuelHybrid || fuelType
  if (key.includes('electric')) return t.fuelElectric || fuelType
  return fuelType
}

export function formatTransmission(trans: string, lang: string): string {
  const t = TRANSLATIONS[lang as Lang] || TRANSLATIONS.ru
  const key = (trans || '').toLowerCase()
  if (key.includes('auto')) return t.transmissionAuto || 'Automatic'
  if (key.includes('man')) return t.transmissionManual || 'Manual'
  return trans
}

export function formatDrive(drive: string, lang: string): string {
  const t = TRANSLATIONS[lang as Lang] || TRANSLATIONS.ru
  const key = (drive || '').toUpperCase()
  if (key.includes('AWD') || key.includes('4X4') || key.includes('4WD')) return t.driveAwd || drive
  if (key.includes('FWD')) return t.driveFwd || drive
  if (key.includes('RWD')) return t.driveRwd || drive
  return drive
}

export function formatConsumption(consumption: string, lang: string): string {
  if (lang === 'ru') {
    return consumption.replace(/L\/100km/i, 'л / 100 км').replace(/l\/100km/i, 'л / 100 км')
  }
  return consumption
}

export function formatSeats(seats: number, lang: string, fallback: string): string {
  if (lang === 'ru') {
    if (seats >= 2 && seats <= 4) return `${seats} места`
    return `${seats} мест`
  }
  return `${seats} ${fallback}`
}

export function getExtensionHourlyRate(dailyPriceGel: number): number {
  if (dailyPriceGel <= 160) return 10
  if (dailyPriceGel <= 260) return 15
  return 20
}

export const CarCard: React.FC<{ car: CarItem }> = ({ car }) => {
  const { formatPrice, getBookingLink, lang, duration: globalDuration } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [datesInput, setDatesInput] = useState('')
  const [localDuration, setLocalDuration] = useState<RentalDuration>(globalDuration || '1-2')

  const isEn = lang !== 'ru'

  useEffect(() => {
    setLocalDuration(globalDuration || '1-2')
  }, [globalDuration])

  const duration = localDuration
  const setDuration = setLocalDuration

  const effectivePriceGel = calculateDailyPrice(car.priceGel, duration, car.prices)
  const hasDiscount = duration !== '1-2' || effectivePriceGel < car.priceGel
  const activeTier = DURATION_TIERS.find((t) => t.id === duration)

  const hasImages = car.images && car.images.length > 0
  const currentImg = hasImages ? car.images[activeImageIdx] : '/favicon.ico'

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasImages) return
    setActiveImageIdx((prev) => (prev + 1) % car.images.length)
  }

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasImages) return
    setActiveImageIdx((prev) => (prev - 1 + car.images.length) % car.images.length)
  }

  return (
    <>
      <article
        onClick={() => setModalOpen(true)}
        className="group relative bg-white rounded-3xl border border-black/[0.07] hover:border-black/[0.14] transition-all duration-300 p-5 flex flex-col justify-between hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.06)] cursor-pointer"
      >
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg text-[#1D1D1F] tracking-tight group-hover:text-black transition-colors">
                {car.name}
              </h3>
              <p className="text-xs text-[#86868B] font-normal mt-0.5">
                {car.year} • {formatFuel(car.fuelType, lang)} • {formatTransmission(car.transmission, lang)} • <span className="text-[#6E6E73]">{t.orSimilarCar || 'или аналогичный'}</span>
              </p>
            </div>
            {car.depositGel === 0 ? (
              <span className="text-[11px] font-medium text-[#34C759] bg-[#34C759]/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                {t.noDeposit}
              </span>
            ) : (
              <span className="text-[11px] font-medium text-[#6E6E73] bg-[#F5F5F7] px-2.5 py-1 rounded-full whitespace-nowrap">
                {t.deposit}: {formatPrice(car.depositGel)}
              </span>
            )}
          </div>

          {/* Image Stage */}
          <div className="relative w-full aspect-[16/10] my-4 overflow-hidden rounded-2xl bg-[#F5F5F7]">
            <Image
              src={currentImg}
              alt={`${car.name} — ${t.heroTag || 'Аренда авто в Грузии'}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Floating feature badges on image (A/C & CarPlay) */}
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 pointer-events-none">
              {car.climate !== false && (
                <span
                  className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/20 shadow-xs"
                  title={t.specAcValue || 'Кондиционер'}
                >
                  <svg className="w-3 h-3 text-[#70D6FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-2.5 2.5m2.5-2.5l2.5 2.5m-2.5 15.5l-2.5-2.5m2.5 2.5l2.5-2.5M3 12h18m-18 0l2.5-2.5M3 12l2.5 2.5m15.5-2.5l-2.5-2.5m2.5 2.5l-2.5 2.5" />
                  </svg>
                  <span>A/C</span>
                </span>
              )}
              {car.carplay && (
                <span
                  className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/20 shadow-xs"
                  title="Apple CarPlay"
                >
                  <svg className="w-2.5 h-2.5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.67-.82 1.13-1.96.99-3.1-.98.04-2.16.65-2.84 1.47-.6.7-1.12 1.83-.98 2.96 1.09.08 2.21-.56 2.83-1.33z" />
                  </svg>
                  <span>CarPlay</span>
                </span>
              )}
            </div>

            {/* Insurance badge on top right of image */}
            <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
              <span
                className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/20 shadow-xs"
                title="КАСКО + ОСАГО"
              >
                <svg className="w-3 h-3 text-[#34C759]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>{t.badgeInsurance || 'КАСКО + ОСАГО'}</span>
              </span>
            </div>

            {/* Gallery Arrows on hover */}
            {car.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={prevImg}
                  aria-label="Предыдущее фото автомобиля"
                  className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black text-xs"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextImg}
                  aria-label="Следующее фото автомобиля"
                  className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black text-xs"
                >
                  ›
                </button>
              </div>
            )}

            {/* Trust badge on bottom left of image */}
            <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-white/20 shadow-xs">
                <span className="text-[#34C759] font-bold">✓</span>
                <span>{t.badgeNoPrepaymentZeroCancel || 'Бронь без предоплаты • Отмена 0 ₾'}</span>
              </span>
            </div>

            {/* Photo Counter */}
            {car.images.length > 1 && (
              <div className="absolute bottom-2.5 right-2.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
                {activeImageIdx + 1} / {car.images.length}
              </div>
            )}
          </div>

          {/* Micro-Badges Specification Layer */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            <span className="text-[11px] font-medium text-[#1D1D1F] bg-[#F5F5F7] px-2.5 py-1 rounded-md">
              {formatDrive(car.drive, lang)}
            </span>
            <span className="text-[11px] font-medium text-[#1D1D1F] bg-[#F5F5F7] px-2.5 py-1 rounded-md">
              {formatSeats(car.seats, lang, t.seatsCount)}
            </span>
            {car.panoramicRoof && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1D1D1F] bg-[#F5F5F7] px-2.5 py-1 rounded-md">
                <span>✨</span>
                <span>{t.panorama}</span>
              </span>
            )}
          </div>
        </div>

        {/* Interactive Duration Radio Dots directly on Card */}
        <div className="pt-2.5 pb-2 border-t border-black/[0.05]" onClick={(e) => e.stopPropagation()}>
          <div className="mb-1.5 px-0.5">
            <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider">
              {t.rentalPeriodLabel}
            </span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {DURATION_TIERS.map((tier) => {
              const isSelected = duration === tier.id
              const tierPrice = calculateDailyPrice(car.priceGel, tier.id, car.prices)
              const tierDiscount =
                car.priceGel > 0 && tierPrice < car.priceGel
                  ? Math.round(((car.priceGel - tierPrice) / car.priceGel) * 100)
                  : tier.discountPercent

              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setDuration(tier.id)}
                  className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs scale-[1.02]'
                      : 'bg-[#F5F5F7] text-[#1D1D1F] border-transparent hover:border-black/[0.12] hover:bg-[#EBEBEF]'
                  }`}
                >
                  {/* Radio dot */}
                  <span
                    className={`w-3 h-3 rounded-full border mb-1 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-white bg-white'
                        : 'border-[#86868B] bg-white'
                    }`}
                  >
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D1D1F]" />
                    )}
                  </span>
                  <span className={`text-[10px] font-semibold leading-tight ${isSelected ? 'text-white' : 'text-[#1D1D1F]'}`}>
                    {getTierLabel(tier, lang, true)}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold mt-0.5 ${
                      tierDiscount > 0
                        ? 'text-[#34C759]'
                        : isSelected
                        ? 'text-white/50'
                        : 'text-[#86868B]'
                    }`}
                  >
                    {tierDiscount > 0 ? `-${tierDiscount}%` : t.baseRateLabel}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Date input row for availability check */}
        <div className="pt-2 pb-1.5 border-t border-black/[0.05]" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-1.5 bg-[#F5F5F7] rounded-xl px-2.5 py-1.5 border border-black/[0.04] focus-within:border-[#0088CC] focus-within:bg-white transition-all">
            <span className="text-xs text-[#86868B] shrink-0">📅</span>
            <input
              type="text"
              value={datesInput}
              onChange={(e) => setDatesInput(e.target.value)}
              placeholder={isEn ? "Your dates (e.g. 10-15 Oct)..." : "Ваши даты (например: 10-15 октября)..."}
              className="w-full bg-transparent text-[11px] font-medium text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none"
            />
          </div>
        </div>

        {/* Footer: Price Row & Quick Actions */}
        <div className="pt-2.5 border-t border-black/[0.05] flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
                {formatPrice(effectivePriceGel)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#86868B] line-through font-normal">
                  {formatPrice(car.priceGel)}
                </span>
              )}
              <span className="text-xs font-normal text-[#86868B]">{t.perDay}</span>
            </div>

            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              <a
                href={getBookingLink(car.name, car.priceGel, 'whatsapp', duration, car.prices, datesInput)}
                target="_blank"
                rel="noreferrer"
                className="h-8 px-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs"
                title="WhatsApp"
              >
                <span>WA</span>
              </a>
              <a
                href={getBookingLink(car.name, car.priceGel, 'telegram', duration, car.prices, datesInput)}
                target="_blank"
                rel="noreferrer"
                className="h-8 px-2.5 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs"
                title="Telegram"
              >
                <span>TG</span>
              </a>
            </div>
          </div>

          {/* Primary Availability CTA Button: sends prefilled Telegram check */}
          <div onClick={(e) => e.stopPropagation()}>
            <a
              href={getBookingLink(car.name, car.priceGel, 'telegram', duration, car.prices, datesInput)}
              target="_blank"
              rel="noreferrer"
              className="w-full h-9 px-3 rounded-xl bg-[#0088CC] hover:bg-[#0077b5] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-98 shadow-sm group"
            >
              <span>✈️</span>
              <span className="truncate">{t.checkAvailabilityDates || 'Узнать доступность на мои даты'}</span>
            </a>
          </div>
        </div>
      </article>

      {/* Modal / Quick Details Sheet */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-3xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              aria-label="Закрыть карточку автомобиля"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5EA] flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
              {car.name}{' '}
              <span className="text-sm font-normal text-[#86868B]">({t.orSimilarCar || 'или аналогичный авто'})</span>
            </h2>
            <p className="text-sm text-[#86868B] mt-0.5">
              {t.yearLabel}: {car.year} • {t.categoryLabel}: {car.category.toUpperCase()} • {formatFuel(car.fuelType, lang)}
            </p>

            {/* Gallery in Modal */}
            <div className="relative w-full aspect-[16/10] my-4 rounded-2xl overflow-hidden bg-[#F5F5F7]">
              <Image
                src={car.images[activeImageIdx] || '/favicon.ico'}
                alt={`${car.name} — фото автомобиля`}
                fill
                className="object-contain"
              />
            </div>

            {/* Image Thumbnails */}
            {car.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    aria-label={`Открыть фото ${i + 1}`}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      i === activeImageIdx ? 'border-black' : 'border-transparent opacity-60'
                    }`}
                  >
                    <Image src={img} alt={`${car.name} миниатюра ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Duration Pricing Matrix */}
            <div className="bg-[#F5F5F7] p-4 rounded-2xl mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-[#1D1D1F] flex items-center gap-1.5">
                  <span>📅</span> {t.pricingTableTitle}
                </span>
                <span className="text-[10px] text-[#86868B]">
                  {t.pricingTableSubtitle}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {DURATION_TIERS.map((tier) => {
                  const p = calculateDailyPrice(car.priceGel, tier.id, car.prices)
                  const isSelected = duration === tier.id
                  const tierDiscount =
                    car.priceGel > 0 && p < car.priceGel
                      ? Math.round(((car.priceGel - p) / car.priceGel) * 100)
                      : tier.discountPercent

                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setDuration(tier.id)}
                      className={`p-2.5 rounded-xl text-center border transition-all ${
                        isSelected
                          ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-sm'
                          : 'bg-white text-[#1D1D1F] border-black/[0.06] hover:border-black/[0.15]'
                      }`}
                    >
                      <span className={`text-[10px] block font-medium ${isSelected ? 'text-white/70' : 'text-[#86868B]'}`}>
                        {getTierLabel(tier, lang)}
                      </span>
                      <span className="text-xs sm:text-sm font-bold block mt-0.5">
                        {formatPrice(p)}
                      </span>
                      <span className={`text-[9px] font-bold block mt-0.5 ${tierDiscount > 0 ? 'text-[#34C759]' : (isSelected ? 'text-white/50' : 'text-[#86868B]')}`}>
                        {tierDiscount > 0 ? `-${tierDiscount}%` : t.baseRateLabel}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Specification Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F5F5F7] p-4 rounded-2xl mb-6">
              <div>
                <span className="text-[#86868B] block">{t.specTransmission}</span>
                <span className="font-semibold text-[#1D1D1F]">{formatTransmission(car.transmission, lang)}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specAc}</span>
                <span className="font-semibold text-[#1D1D1F]">{t.specAcValue}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specDrive}</span>
                <span className="font-semibold text-[#1D1D1F]">{formatDrive(car.drive, lang)}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specSeats}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {formatSeats(car.seats, lang, t.seatsCount)}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specFuel}</span>
                <span className="font-semibold text-[#1D1D1F]">{formatFuel(car.fuelType, lang)}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specConsumptionHighway || 'Расход (трасса):'}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {car.consumptionHighway ? `${car.consumptionHighway} / 100 км` : formatConsumption(car.fuelConsumption, lang)}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specConsumptionMixed || 'Расход (средний):'}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {car.consumptionMixed ? `${car.consumptionMixed} / 100 км` : formatConsumption(car.fuelConsumption, lang)}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specCarPlay}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {car.carplay ? t.specCarPlayYes : t.specCarPlayBluetooth}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specMileage}</span>
                <span className="font-semibold text-[#34C759]">{t.specMileageUnlimited}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specInsurance}</span>
                <span className="font-semibold text-[#1D1D1F]">{t.specInsuranceIncluded}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specFranchise || 'Франшиза:'}</span>
                <span className="font-semibold text-[#1D1D1F]">{t.specFranchiseValue || '0 ₾ (стаж от 2 лет) • 3–5% (до 2 лет)'}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specDeposit}</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {car.depositGel === 0 ? t.specDepositZero : formatPrice(car.depositGel)}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specBookingTerms}</span>
                <span className="font-semibold text-[#1D1D1F]">{t.specBookingTermsValue}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">{t.specMinPeriod}</span>
                <span className="font-semibold text-[#1D1D1F]">{t.specMinPeriodValue}</span>
              </div>
              <div className="col-span-2 pt-2.5 mt-0.5 border-t border-black/[0.06] flex items-center justify-between flex-wrap gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm">👥</span>
                  <div>
                    <span className="text-[#86868B] block text-[11px] font-medium">
                      {t.specSecondDriver || 'Второй водитель:'}
                    </span>
                    <span className="font-semibold text-[#1D1D1F]">
                      {t.specSecondDriverValue || 'Бесплатно в договоре (0 ₾)'}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[#34C759] bg-[#34C759]/10 px-2.5 py-0.5 rounded-full">
                  ✓ 0 ₾
                </span>
              </div>
              <div className="col-span-2 pt-2 mt-0.5 border-t border-black/[0.06] flex items-center justify-between flex-wrap gap-1.5">
                <div>
                  <span className="text-[#86868B] block text-[11px]">{t.specExtension || 'Продление аренды:'}</span>
                  <span className="font-semibold text-[#1D1D1F]">
                    <span className="text-[#34C759] font-bold">{t.specExtFreeHour || '+1 ч бесплатно'}</span> • {formatPrice(getExtensionHourlyRate(car.priceGel))}{t.specPerHour || '/час'}
                  </span>
                </div>
                <span className="text-[11px] text-[#86868B]">
                  {t.specExtHint || 'со 2 по 7 ч (по согласованию)'}
                </span>
              </div>
            </div>

            {/* Mobility Guarantee Notice */}
            <div className="bg-[#F5F5F7] p-4 rounded-2xl border border-black/[0.05] mb-5">
              <div className="flex items-center gap-2 font-bold text-xs text-[#1D1D1F] mb-1.5">
                <span className="text-sm">🛡️</span>
                <span>{t.guaranteeTitle || 'Гарантия подмены: вы не останетесь без машины'}</span>
              </div>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {t.guaranteeDesc}
              </p>
              <div className="mt-2.5 pt-2.5 border-t border-black/[0.06] flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-[#86868B] flex items-center gap-1">
                  <span>🚨</span> {t.accidentHelpShort || 'При ДТП или происшествии (24/7):'}
                </span>
                <a
                  href="tel:+995591181430"
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-[#1D1D1F] hover:text-[#FF3B30] transition-colors"
                >
                  +995 591 181 430
                </a>
              </div>
            </div>

            {/* Modal Dates Input */}
            <div className="bg-[#F5F5F7] p-3.5 rounded-2xl border border-black/[0.05] mb-4">
              <label className="block text-xs font-bold text-[#1D1D1F] mb-1.5 flex items-center gap-1.5">
                <span>📅</span> {isEn ? "Specify your travel dates:" : "Укажите даты поездки:"}
              </label>
              <input
                type="text"
                value={datesInput}
                onChange={(e) => setDatesInput(e.target.value)}
                placeholder={isEn ? "e.g. 10-15 October, 5 days..." : "Например: 10-15 октября, 5 дней..."}
                className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-black/[0.08] text-xs font-semibold text-[#1D1D1F] placeholder:text-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#0088CC]"
              />
            </div>

            {/* Booking CTA row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div>
                <span className="text-xs text-[#86868B] block">
                  {t.specCostForPeriod} ({activeTier ? getTierLabel(activeTier, lang) : ''}):
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-[#1D1D1F]">
                    {formatPrice(effectivePriceGel)}
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-[#86868B] line-through font-normal">
                      {formatPrice(car.priceGel)}
                    </span>
                  )}
                  <span className="text-sm text-[#86868B]">{t.perDay}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                <a
                  href={getBookingLink(car.name, car.priceGel, 'telegram', duration, car.prices, datesInput)}
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 px-6 rounded-full bg-[#0088CC] hover:bg-[#0077b5] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                >
                  <span>✈️</span>
                  <span>{t.checkAvailabilityDates || 'Узнать доступность на мои даты'}</span>
                </a>
                <a
                  href={getBookingLink(car.name, car.priceGel, 'whatsapp', duration, car.prices, datesInput)}
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
