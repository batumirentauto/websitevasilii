'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useApp, DURATION_TIERS, calculateDailyPrice, RentalDuration } from '@/context/AppContext'
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
  fuelConsumption: string
  priceGel: number
  prices?: Partial<Record<RentalDuration, number>>
  depositGel: number
  featured?: boolean
  images: string[]
}

export function formatFuel(fuelType: string, lang: string): string {
  if (lang === 'en') return fuelType
  const map: Record<string, string> = {
    Petrol: 'Бензин',
    Diesel: 'Дизель',
    Hybrid: 'Гибрид',
    Electric: 'Электро',
  }
  return map[fuelType] || fuelType
}

export function formatTransmission(trans: string, lang: string): string {
  if (lang === 'en') return trans
  const map: Record<string, string> = {
    Automatic: 'Автомат',
    Manual: 'Механика',
  }
  return map[trans] || trans
}

export function formatDrive(drive: string, lang: string): string {
  if (lang === 'en') return drive
  if (drive.includes('AWD') || drive.includes('4x4')) return 'Полный привод'
  if (drive === 'FWD') return 'Передний привод'
  if (drive === 'RWD') return 'Задний привод'
  return drive
}

export function formatConsumption(consumption: string, lang: string): string {
  if (lang === 'en') return consumption
  return consumption.replace(/L\/100km/i, 'л / 100 км').replace(/l\/100km/i, 'л / 100 км')
}

export const CarCard: React.FC<{ car: CarItem }> = ({ car }) => {
  const { formatPrice, getBookingLink, lang, city, duration: globalDuration } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [localDuration, setLocalDuration] = useState<RentalDuration>(globalDuration || '1-2')

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
                {car.year} • {formatFuel(car.fuelType, lang)} • {formatTransmission(car.transmission, lang)}
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
              alt={car.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Gallery Arrows on hover */}
            {car.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={prevImg}
                  className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black text-xs"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextImg}
                  className="w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black text-xs"
                >
                  ›
                </button>
              </div>
            )}

            {/* Photo Counter */}
            {car.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
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
              {lang === 'en' ? `${car.seats} seats` : `${car.seats} мест`}
            </span>
            {car.carplay && (
              <span className="text-[11px] font-medium text-[#0071E3] bg-[#0071E3]/10 px-2.5 py-1 rounded-md">
                CarPlay
              </span>
            )}
            {car.panoramicRoof && (
              <span className="text-[11px] font-medium text-[#1D1D1F] bg-[#F5F5F7] px-2.5 py-1 rounded-md">
                Панорама
              </span>
            )}
          </div>
        </div>

        {/* Interactive Duration Radio Dots directly on Card */}
        <div className="pt-2.5 pb-2 border-t border-black/[0.05]" onClick={(e) => e.stopPropagation()}>
          <div className="mb-1.5 px-0.5">
            <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider">
              Срок аренды:
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
                    {tier.label.replace(' дня', ' дн').replace(' дней', ' дн')}
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
                    {tierDiscount > 0 ? `-${tierDiscount}%` : 'базовая'}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer: Price Row & Quick Actions */}
        <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between gap-2">
          <div>
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
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <a
              href={getBookingLink(car.name, car.priceGel, 'whatsapp', duration, car.prices)}
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Забронировать в WhatsApp"
            >
              <span>{t.btnBookWhatsApp}</span>
            </a>
            <a
              href={getBookingLink(car.name, car.priceGel, 'telegram', duration, car.prices)}
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3.5 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Забронировать в Telegram"
            >
              <span>{t.btnBookTelegram}</span>
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
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5EA] flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight">{car.name}</h2>
            <p className="text-sm text-[#86868B] mt-0.5">
              Год: {car.year} • Категория: {car.category.toUpperCase()} • {car.fuelType}
            </p>

            {/* Gallery in Modal */}
            <div className="relative w-full aspect-[16/10] my-4 rounded-2xl overflow-hidden bg-[#F5F5F7]">
              <Image
                src={car.images[activeImageIdx] || '/favicon.ico'}
                alt={car.name}
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
                    className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      i === activeImageIdx ? 'border-black' : 'border-transparent opacity-60'
                    }`}
                  >
                    <Image src={img} alt="thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Duration Pricing Matrix */}
            <div className="bg-[#F5F5F7] p-4 rounded-2xl mb-5">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-[#1D1D1F] flex items-center gap-1.5">
                  <span>📅</span> Тарифная сетка по срокам аренды:
                </span>
                <span className="text-[10px] text-[#86868B]">
                  Нажмите для выбора срока
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
                        {tier.daysLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-bold block mt-0.5">
                        {formatPrice(p)}
                      </span>
                      <span className={`text-[9px] font-bold block mt-0.5 ${tierDiscount > 0 ? (isSelected ? 'text-[#34C759]' : 'text-[#34C759]') : (isSelected ? 'text-white/50' : 'text-[#86868B]')}`}>
                        {tierDiscount > 0 ? `-${tierDiscount}%` : 'базовая'}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Specification Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F5F5F7] p-4 rounded-2xl mb-6">
              <div>
                <span className="text-[#86868B] block">Коробка передач:</span>
                <span className="font-semibold text-[#1D1D1F]">{formatTransmission(car.transmission, lang)} (АКПП)</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Кондиционер:</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {lang === 'en' ? 'A/C (working)' : 'Есть (климат-контроль)'}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">Привод:</span>
                <span className="font-semibold text-[#1D1D1F]">{formatDrive(car.drive, lang)}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Количество мест:</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {lang === 'en' ? `${car.seats} seats` : `${car.seats} мест`}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">Тип топлива:</span>
                <span className="font-semibold text-[#1D1D1F]">{formatFuel(car.fuelType, lang)}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Расход топлива:</span>
                <span className="font-semibold text-[#1D1D1F]">{formatConsumption(car.fuelConsumption, lang)}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Apple CarPlay / Android:</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {car.carplay
                    ? (lang === 'en' ? 'Yes (CarPlay installed)' : 'Да (CarPlay / Android)')
                    : 'Bluetooth аудио'}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">Пробег:</span>
                <span className="font-semibold text-[#34C759]">
                  {lang === 'en' ? 'Unlimited (0 ₾)' : 'Безлимитный (0 ₾)'}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">Страховка:</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {lang === 'en' ? 'Included (Zero franchise 2+ yrs)' : 'Включена (0 франшиза от 2 лет)'}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">Размер залога:</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {car.depositGel === 0 ? (lang === 'en' ? 'Zero deposit (0 ₾)' : 'Без залога (0 ₾)') : formatPrice(car.depositGel)}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">Условия бронирования:</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {lang === 'en' ? 'No prepayment • Free cancel' : 'Без предоплаты • Отмена 0 ₾'}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">Срок аренды:</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {lang === 'en' ? 'From 1 day' : 'От 1 дня'}
                </span>
              </div>
            </div>

            {/* Booking CTA row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div>
                <span className="text-xs text-[#86868B] block">
                  Стоимость ({activeTier?.daysLabel}):
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

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={getBookingLink(car.name, car.priceGel, 'whatsapp', duration, car.prices)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial h-12 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                >
                  <span>WhatsApp</span>
                </a>
                <a
                  href={getBookingLink(car.name, car.priceGel, 'telegram', duration, car.prices)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial h-12 px-6 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-sm font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                >
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
