'use client'

import React, { useState, useMemo } from 'react'
import carsData from '@/data/cars.json'
import { CarCard, CarItem } from '@/components/CarCard'
import { useApp } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

const allCars = carsData as CarItem[]

export const CatalogSection: React.FC<{ limit?: number; showFilters?: boolean }> = ({
  limit,
  showFilters = true,
}) => {
  const { lang } = useApp()
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
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 scroll-mt-20">
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
