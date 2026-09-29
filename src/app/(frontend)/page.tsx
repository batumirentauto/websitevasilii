'use client'

import React from 'react'
import Link from 'next/link'
import { CatalogSection } from '@/components/CatalogSection'
import { useApp, CITIES_DATA, City, DURATION_TIERS } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export default function HomePage() {
  const { lang, city, setCity, duration, setDuration } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru
  const currentCity = CITIES_DATA[city]

  return (
    <div className="bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-[#FBFBFD] to-[#FFFFFF] border-b border-black/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Micro Tagline */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] text-[#1D1D1F] text-[11px] font-bold tracking-wider mb-6">
            <span>🇬🇪</span>
            <span>{t.heroTag}</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1D1D1F] tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#6E6E73] max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            {t.heroSubtitle}
          </p>

          {/* City & Duration Selection Card (Prominent & Clear) */}
          <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-3xl border border-black/[0.08] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)] mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block mb-2">
              {t.citySelectLabel}
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['batumi', 'tbilisi', 'kutaisi'] as City[]).map((cKey) => (
                <button
                  key={cKey}
                  onClick={() => setCity(cKey)}
                  className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                    city === cKey
                      ? 'bg-[#1D1D1F] text-white shadow-md scale-[1.02]'
                      : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5EA]'
                  }`}
                >
                  {CITIES_DATA[cKey].nameRu}
                </button>
              ))}
            </div>

            {/* Rental Duration Selection */}
            <div className="mt-3.5 pt-3 border-t border-black/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block">
                  Срок аренды (скидка до 40%):
                </span>
                <span className="text-[10px] text-[#34C759] font-bold">
                  Чем дольше — тем дешевле!
                </span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {DURATION_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setDuration(tier.id)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all duration-200 flex flex-col items-center justify-center ${
                      duration === tier.id
                        ? 'bg-[#1D1D1F] text-white shadow-sm scale-[1.02]'
                        : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5EA]'
                    }`}
                  >
                    <span>{tier.label}</span>
                    <span
                      className={`text-[9px] font-extrabold ${
                        tier.discountPercent > 0
                          ? duration === tier.id
                            ? 'text-[#34C759]'
                            : 'text-[#34C759]'
                          : duration === tier.id
                          ? 'text-white/60'
                          : 'text-[#86868B]'
                      }`}
                    >
                      {tier.discountPercent > 0 ? `-${tier.discountPercent}%` : 'базовая'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-black/[0.04] text-[11px] text-[#34C759] font-bold flex items-center justify-center gap-1.5">
              <span>⚡</span>
              <span>{t.freeIntercityBadge || 'Возврат в другом городе (Батуми / Тбилиси / Кутаиси) — 0 ₾ без доплаты!'}</span>
            </div>
          </div>

          {/* Location Delivery & Station Notice Banner */}
          <div className="max-w-2xl mx-auto bg-[#F5F5F7] p-4 rounded-2xl text-xs text-[#1D1D1F] flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div>
              <span className="font-bold block text-[#1D1D1F] mb-0.5">
                База: {currentCity.nameRu} ({currentCity.baseAddressRu})
              </span>
              <span className="text-[#6E6E73]">{currentCity.deliveryNoteRu}</span>
            </div>
            {currentCity.yandexMapUrl && (
              <a
                href={currentCity.yandexMapUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-3.5 py-1.5 bg-white border border-black/[0.1] rounded-full font-semibold text-[11px] text-[#1D1D1F] hover:bg-black hover:text-white transition-colors"
              >
                На карте ↗
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured Vehicles Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-2">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight">
              {t.featuredTitle}
            </h2>
            <p className="text-sm text-[#86868B] mt-1">{t.featuredSubtitle}</p>
          </div>
          <Link
            href="/#catalog"
            className="text-xs font-semibold text-[#0071E3] hover:underline flex items-center gap-1"
          >
            <span>{t.btnViewAll}</span>
            <span>↓</span>
          </Link>
        </div>
      </section>

      {/* Full Catalog with Real-Time Filters */}
      <CatalogSection />

      {/* Key Benefits Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 border-t border-black/[0.05]">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight mb-3">
            {t.benefitsTitle}
          </h2>
          <p className="text-sm text-[#86868B]">
            Делаем аренду авто в Грузии простой, честной и комфортной с первого километра.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#F5F5F7] p-6 rounded-3xl">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              ⚡
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit1Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">{t.benefit1Desc}</p>
          </div>

          <div className="bg-[#F5F5F7] p-6 rounded-3xl">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              🛡️
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit2Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">{t.benefit2Desc}</p>
          </div>

          <div className="bg-[#F5F5F7] p-6 rounded-3xl">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              📍
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit3Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">{t.benefit3Desc}</p>
          </div>

          <div className="bg-[#F5F5F7] p-6 rounded-3xl">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              💬
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit4Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">{t.benefit4Desc}</p>
          </div>
        </div>
      </section>

      {/* Fast 3-Step Process */}
      <section className="bg-[#F5F5F7] py-20 border-y border-black/[0.05]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight mb-2">
              Как арендовать автомобиль
            </h2>
            <p className="text-xs text-[#86868B]">Всего 3 простых шага без лишней бюрократии</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-black/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">
                  Шаг 01
                </span>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">Выберите автомобиль</h3>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  Посмотрите наш автопарк из 45 моделей. Выберите подходящий класс: кроссовер 4x4, комфортный седан или кабриолет.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">
                  Шаг 02
                </span>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">Напишите в мессенджер</h3>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  Нажмите кнопку WhatsApp или Telegram на карточке авто. Мы мгновенно проверим доступность на ваши даты и зафиксируем бронь.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-black/[0.06] flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">
                  Шаг 03
                </span>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">Получите ключи за 5 мин</h3>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  Приезжайте на базу в Батуми / Тбилиси или встречайте нас в аэропорту Кутаиси. Подписание договора занимает 5 минут.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
