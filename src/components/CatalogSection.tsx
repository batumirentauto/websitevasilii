'use client'

import React, { useState, useMemo } from 'react'
import carsData from '@/data/cars.json'
import { CarCard, CarItem } from '@/components/CarCard'
import { useApp, DURATION_TIERS, calculateDailyPrice, getTierLabel } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

const allCars = carsData as CarItem[]

function getCarBrand(carName: string): string {
  if (carName.startsWith('Alfa Romeo')) return 'Alfa Romeo'
  if (carName.startsWith('Land Rover')) return 'Land Rover'
  if (carName.startsWith('Mercedes-Benz')) return 'Mercedes-Benz'
  return carName.split(' ')[0]
}

type SortOption = 'price-asc' | 'price-desc' | 'brand-asc'

export const CatalogSection: React.FC<{ limit?: number; showFilters?: boolean }> = ({
  limit,
  showFilters = true,
}) => {
  const { lang, duration, setDuration } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  const [category, setCategory] = useState<'all' | 'suv' | 'sedan' | 'cabrio' | 'minivan'>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('price-asc')
  const [filter7Seats, setFilter7Seats] = useState(false)
  const [filterHybrid, setFilterHybrid] = useState(false)
  const [filterCarplay, setFilterCarplay] = useState(false)
  const [filterAwd, setFilterAwd] = useState(false)
  const [filterNoDeposit, setFilterNoDeposit] = useState(false)

  const allBrands = useMemo(() => {
    const counts: Record<string, number> = {}
    allCars.forEach((c) => {
      const brand = getCarBrand(c.name)
      counts[brand] = (counts[brand] || 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [])

  const filteredCars = useMemo(() => {
    let result = allCars

    if (category !== 'all') {
      result = result.filter((c) => c.category === category)
    }

    if (selectedBrand !== 'all') {
      result = result.filter((c) => getCarBrand(c.name) === selectedBrand)
    }

    if (filter7Seats) {
      result = result.filter((c) => c.seats >= 7)
    }

    if (filterHybrid) {
      result = result.filter(
        (c) =>
          c.fuelType.toLowerCase().includes('hybrid') ||
          c.name.toLowerCase().includes('hybrid')
      )
    }

    if (filterCarplay) {
      result = result.filter((c) => c.carplay)
    }

    if (filterAwd) {
      result = result.filter((c) => c.drive.toUpperCase().includes('AWD') || c.drive.toUpperCase().includes('4X4') || c.drive.toUpperCase().includes('4WD'))
    }

    if (filterNoDeposit) {
      result = result.filter((c) => c.depositGel === 0)
    }

    // Sorting (defaults to price ascending: cheapest first)
    if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => {
        const pA = calculateDailyPrice(a.priceGel, duration, a.prices)
        const pB = calculateDailyPrice(b.priceGel, duration, b.prices)
        return pB - pA
      })
    } else if (sortBy === 'brand-asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name))
    } else {
      // price-asc (default)
      result = [...result].sort((a, b) => {
        const pA = calculateDailyPrice(a.priceGel, duration, a.prices)
        const pB = calculateDailyPrice(b.priceGel, duration, b.prices)
        if (pA !== pB) return pA - pB
        return a.name.localeCompare(b.name)
      })
    }

    if (limit) {
      return result.slice(0, limit)
    }

    return result
  }, [category, selectedBrand, sortBy, filter7Seats, filterHybrid, filterCarplay, filterAwd, filterNoDeposit, duration, limit])

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
                {t.durationDiscountBanner}
              </span>
              <span className="text-[11px] text-[#86868B]">
                {t.durationAutoRecalc}
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
                <span>{getTierLabel(tier, lang)}</span>
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

          {/* Quick Feature Filter Pills & Brand Dropdown */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            {/* Brand Select Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={selectedBrand}
                aria-label={t.brandFilterLabel}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className={`h-9 pl-3.5 pr-8 rounded-full border text-xs font-semibold appearance-none cursor-pointer transition-all focus:outline-hidden ${
                  selectedBrand !== 'all'
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs'
                    : 'bg-[#F5F5F7] text-[#1D1D1F] border-black/[0.08] hover:border-black/[0.2] hover:bg-[#EBEBEF]'
                }`}
              >
                <option value="all" className="text-black bg-white">
                  {t.allBrands} ({allCars.length})
                </option>
                {allBrands.map(([brand, count]) => (
                  <option key={brand} value={brand} className="text-black bg-white">
                    {brand} ({count})
                  </option>
                ))}
              </select>
              <span
                className={`pointer-events-none absolute right-3 text-[10px] transition-colors ${
                  selectedBrand !== 'all' ? 'text-white' : 'text-[#86868B]'
                }`}
              >
                ▾
              </span>
            </div>
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
              onClick={() => setFilterHybrid(!filterHybrid)}
              className={`px-3.5 py-1.5 rounded-full border transition-all ${
                filterHybrid
                  ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] font-semibold'
                  : 'bg-white text-[#6E6E73] border-black/[0.08] hover:border-black/[0.2]'
              }`}
            >
              🔋 {t.filterHybrid}
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

            {(filter7Seats || filterHybrid || filterCarplay || filterAwd || filterNoDeposit || category !== 'all' || selectedBrand !== 'all' || sortBy !== 'price-asc') && (
              <button
                onClick={() => {
                  setCategory('all')
                  setSelectedBrand('all')
                  setSortBy('price-asc')
                  setFilter7Seats(false)
                  setFilterHybrid(false)
                  setFilterCarplay(false)
                  setFilterAwd(false)
                  setFilterNoDeposit(false)
                }}
                className="text-[#86868B] hover:text-[#1D1D1F] underline ml-2 font-medium"
              >
                {t.resetAll}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Sorting & Results Count Bar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pt-3 border-t border-black/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1D1D1F]">
              {t.foundCarsCount} {filteredCars.length} {t.ofCars} {allCars.length} {t.carsUnit}
            </span>
            {selectedBrand !== 'all' && (
              <span className="text-[11px] font-semibold bg-black/5 text-[#1D1D1F] px-2 py-0.5 rounded-full">
                {t.brandLabel} {selectedBrand}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider mr-1">
              {t.sortByLabel}
            </span>
            <button
              onClick={() => setSortBy('price-asc')}
              className={`h-8 px-3 rounded-full font-medium transition-all flex items-center gap-1 ${
                sortBy === 'price-asc'
                  ? 'bg-[#1D1D1F] text-white font-semibold shadow-xs'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5EA]'
              }`}
            >
              <span>{t.sortPriceAsc}</span>
              <span>↑</span>
            </button>
            <button
              onClick={() => setSortBy('price-desc')}
              className={`h-8 px-3 rounded-full font-medium transition-all flex items-center gap-1 ${
                sortBy === 'price-desc'
                  ? 'bg-[#1D1D1F] text-white font-semibold shadow-xs'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5EA]'
              }`}
            >
              <span>{t.sortPriceDesc}</span>
              <span>↓</span>
            </button>
            <button
              onClick={() => setSortBy('brand-asc')}
              className={`h-8 px-3 rounded-full font-medium transition-all flex items-center gap-1 ${
                sortBy === 'brand-asc'
                  ? 'bg-[#1D1D1F] text-white font-semibold shadow-xs'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5EA]'
              }`}
            >
              <span>{t.sortBrand}</span>
              <span>{lang === 'ru' ? 'А-Я' : 'A-Z'}</span>
            </button>
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
          <p className="text-[#1D1D1F] font-semibold text-base mb-1">{t.noCarsFound}</p>
          <p className="text-xs text-[#86868B] mb-4">{t.tryResetFilters}</p>
          <button
            onClick={() => {
              setCategory('all')
              setSelectedBrand('all')
              setSortBy('price-asc')
              setFilter7Seats(false)
              setFilterHybrid(false)
              setFilterCarplay(false)
              setFilterAwd(false)
              setFilterNoDeposit(false)
            }}
            className="px-5 py-2 rounded-full bg-[#1D1D1F] text-white text-xs font-semibold"
          >
            {t.btnResetFilters}
          </button>
        </div>
      )}
    </section>
  )
}
