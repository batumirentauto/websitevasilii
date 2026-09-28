'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useApp } from '@/context/AppContext'
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
  depositGel: number
  featured?: boolean
  images: string[]
}

export const CarCard: React.FC<{ car: CarItem }> = ({ car }) => {
  const { formatPrice, getBookingLink, lang, city } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

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
                {car.year} • {car.fuelType} • {car.transmission}
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
              {car.drive}
            </span>
            <span className="text-[11px] font-medium text-[#1D1D1F] bg-[#F5F5F7] px-2.5 py-1 rounded-md">
              {car.seats} мест
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
            {car.winterTires && (
              <span className="text-[11px] font-medium text-[#48484A] bg-[#F5F5F7] px-2.5 py-1 rounded-md flex items-center gap-1">
                <span>❄️</span> Зима
              </span>
            )}
          </div>
        </div>

        {/* Footer: Price Row & Quick Actions */}
        <div className="pt-3 border-t border-black/[0.05] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#1D1D1F] tracking-tight">
                {formatPrice(car.priceGel)}
              </span>
              <span className="text-xs font-normal text-[#86868B]">{t.perDay}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <a
              href={getBookingLink(car.name, car.priceGel, 'whatsapp')}
              target="_blank"
              rel="noreferrer"
              className="h-9 px-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Забронировать в WhatsApp"
            >
              <span>{t.btnBookWhatsApp}</span>
            </a>
            <a
              href={getBookingLink(car.name, car.priceGel, 'telegram')}
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

            {/* Specification Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#F5F5F7] p-4 rounded-2xl mb-6">
              <div>
                <span className="text-[#86868B] block">Коробка передач:</span>
                <span className="font-semibold text-[#1D1D1F]">Автомат (АКПП)</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Кондиционер:</span>
                <span className="font-semibold text-[#1D1D1F]">Есть (исправен)</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Привод:</span>
                <span className="font-semibold text-[#1D1D1F]">{car.drive}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Количество мест:</span>
                <span className="font-semibold text-[#1D1D1F]">{car.seats} мест</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Расход топлива:</span>
                <span className="font-semibold text-[#1D1D1F]">{car.fuelConsumption}</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Apple CarPlay / Android:</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {car.carplay ? 'Да (установлен)' : 'Bluetooth аудио'}
                </span>
              </div>
              <div>
                <span className="text-[#86868B] block">Зимняя резина (по сезону):</span>
                <span className="font-semibold text-[#1D1D1F]">Установлена</span>
              </div>
              <div>
                <span className="text-[#86868B] block">Размер залога:</span>
                <span className="font-semibold text-[#1D1D1F]">
                  {car.depositGel === 0 ? 'Без залога' : formatPrice(car.depositGel)}
                </span>
              </div>
            </div>

            {/* Booking CTA row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div>
                <span className="text-xs text-[#86868B] block">Стоимость аренды:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#1D1D1F]">
                    {formatPrice(car.priceGel)}
                  </span>
                  <span className="text-sm text-[#86868B]">{t.perDay}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={getBookingLink(car.name, car.priceGel, 'whatsapp')}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial h-12 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                >
                  <span>WhatsApp</span>
                </a>
                <a
                  href={getBookingLink(car.name, car.priceGel, 'telegram')}
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
