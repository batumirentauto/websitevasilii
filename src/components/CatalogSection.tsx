'use client'

import React, { useState, useMemo } from 'react'
import carsData from '@/data/cars.json'
import { CarCard, CarItem } from '@/components/CarCard'
import { useApp, DURATION_TIERS } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

const allCars = carsData as CarItem[]

export const CatalogSection: React.FC<{ limit?: number; showFilters?: boolean }> = ({
  limit,
  showFilters = true,
}) => {
  const { lang, duration, setDuration } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  const [category, setCategory] = useState<'all' | 'suv' | 'sedan' | 'cabrio' | 'minivan'>('all')
  const [filter7Seats, setFilter7Seats] = useState(false)
  const [filterCarplay, setFilterCarplay] = useState(false)
  const [filterAwd, setFilterAwd] = useState(false)
  const [filterNoDeposit, setFilterNoDeposit] = useState(false)

  const filteredCars = useMemo(() => {
    let result = allCars

    if (category !== 'all') {
      result = result.filter((c) => c.category === category)
    }

    if (filter7Seats) {
      result = result.filter((c) => c.seats >= 7)
    }

    if (filterCarplay) {
      result = result.filter((c) => c.carplay)
    }

    if (filterAwd) {
      result = result.filter((c) => c.drive.includes('AWD'))
    }

    if (filterNoDeposit) {
      result = result.filter((c) => c.depositGel === 0)
    }

    if (limit) {
      return result.slice(0, limit)
    }

    return result
  }, [category, filter7Seats, filterCarplay, filterAwd, filterNoDeposit, limit])

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-36">
      {/* Duration Selector Banner */}
      {showFilters && (
        <div className="bg-[#F5F5F7] p-3.5 sm:p-4 rounded-3xl mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-black/[0.04]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm shadow-xs shrink-0">
              📅
            </div>
            <div>
              <span className="text-xs font-bold text-[#1D1D1F] block">
                Срок аренды (скидка до 40%):
              </span>
              <span className="text-[11px] text-[#86868B]">
                Цены в каталоге автоматически пересчитываются под выбранный период
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {DURATION_TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setDuration(tier.id)}
                className={`h-9 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  duration === tier.id
                    ? 'bg-[#1D1D1F] text-white shadow-sm scale-[1.02]'
                    : 'bg-white text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5EA]'
                }`}
              >
                <span>{tier.label}</span>
                {tier.discountPercent > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                      duration === tier.id
                        ? 'bg-[#34C759] text-white'
                        : 'bg-[#34C759]/15 text-[#34C759]'
                    }`}
                  >
                    -{tier.discountPercent}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Pills */}
      {showFilters && (
        <div className="space-y-4 mb-8">
          {/* Main Body Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setCategory('all')}
              className={`h-10 px-5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                category === 'all'
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setCategory('suv')}
              className={`h-10 px-5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                category === 'suv'
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {t.filterSuv}
            </button>
            <button
              onClick={() => setCategory('sedan')}
              className={`h-10 px-5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                category === 'sedan'
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {t.filterSedan}
            </button>
            <button
              onClick={() => setCategory('cabrio')}
              className={`h-10 px-5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                category === 'cabrio'
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {t.filterCabrio}
            </button>
            <button
              onClick={() => setCategory('minivan')}
              className={`h-10 px-5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                category === 'minivan'
                  ? 'bg-[#1D1D1F] text-white shadow-sm'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {t.filterMinivan}
            </button>
          </div>

          {/* Quick Feature Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <button
              onClick={() => setFilter7Seats(!filter7Seats)}
              className={`px-3.5 py-1.5 rounded-full border transition-all ${
                filter7Seats
                  ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] font-semibold'
                  : 'bg-white text-[#6E6E73] border-black/[0.08] hover:border-black/[0.2]'
              }`}
            >
              🚐 {t.filter7Seats}
            </button>
            <button
              onClick={() => setFilterCarplay(!filterCarplay)}
              className={`px-3.5 py-1.5 rounded-full border transition-all ${
                filterCarplay
                  ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] font-semibold'
                  : 'bg-white text-[#6E6E73] border-black/[0.08] hover:border-black/[0.2]'
              }`}
            >
              📱 {t.filterCarplay}
            </button>
            <button
              onClick={() => setFilterAwd(!filterAwd)}
              className={`px-3.5 py-1.5 rounded-full border transition-all ${
                filterAwd
                  ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] font-semibold'
                  : 'bg-white text-[#6E6E73] border-black/[0.08] hover:border-black/[0.2]'
              }`}
            >
              ⛰️ {t.filterDriveAwd}
            </button>
            <button
              onClick={() => setFilterNoDeposit(!filterNoDeposit)}
              className={`px-3.5 py-1.5 rounded-full border transition-all ${
                filterNoDeposit
                  ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] font-semibold'
                  : 'bg-white text-[#6E6E73] border-black/[0.08] hover:border-black/[0.2]'
              }`}
            >
              ✨ {t.filterWithoutDeposit}
            </button>

            {(filter7Seats || filterCarplay || filterAwd || filterNoDeposit || category !== 'all') && (
              <button
                onClick={() => {
                  setCategory('all')
                  setFilter7Seats(false)
                  setFilterCarplay(false)
                  setFilterAwd(false)
                  setFilterNoDeposit(false)
                }}
                className="text-[#86868B] hover:text-[#1D1D1F] underline ml-2"
              >
                Сбросить
              </button>
            )}
          </div>
        </div>
      )}

      {/* Grid of Cars */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#F5F5F7] rounded-3xl p-8">
          <p className="text-[#1D1D1F] font-semibold text-base mb-1">По вашим фильтрам ничего не найдено</p>
          <p className="text-xs text-[#86868B] mb-4">Попробуйте сбросить параметры поиска</p>
          <button
            onClick={() => {
              setCategory('all')
              setFilter7Seats(false)
              setFilterCarplay(false)
              setFilterAwd(false)
              setFilterNoDeposit(false)
            }}
            className="px-5 py-2 rounded-full bg-[#1D1D1F] text-white text-xs font-semibold"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </section>
  )
}
