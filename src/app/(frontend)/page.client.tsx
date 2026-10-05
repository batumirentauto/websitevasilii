'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CatalogSection } from '@/components/CatalogSection'
import ReviewsSection from '@/components/ReviewsSection'
import { useApp, CITIES_DATA, City, Lang, getCityName, getCityAddress, getCityDeliveryNote } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

const LOCAL_CITY_H1: Record<City, Record<Lang, string>> = {
  batumi: {
    ru: 'Прокат автомобилей в Грузии с подачей в аэропорт Батуми',
    en: 'Car Rental in Georgia with Batumi Airport Delivery',
    ar: 'تأجير سيارات في جورجيا مع التوصيل إلى مطار باتومي',
    fa: 'اجاره خودرو در گرجستان با تحویل در فرودگاه باتومی',
    pl: 'Wynajem samochodów w Gruzji z dostawą na lotnisko w Batumi',
    de: 'Mietwagen in Georgien mit Übergabe am Flughafen Batumi',
    it: 'Noleggio auto in Georgia con consegna all’aeroporto di Batumi',
    fr: 'Location de voiture en Géorgie avec livraison à l’aéroport de Batumi',
  },
  tbilisi: {
    ru: 'Прокат автомобилей в Грузии с подачей в аэропорт Тбилиси',
    en: 'Car Rental in Georgia with Tbilisi Airport Delivery',
    ar: 'تأجير سيارات في جورجيا مع التوصيل إلى مطار تبليسي',
    fa: 'اجاره خودرو در گرجستان با تحویل در فرودگاه تفلیس',
    pl: 'Wynajem samochodów w Gruzji z dostawą na lotnisko w Tbilisi',
    de: 'Mietwagen in Georgien mit Übergabe am Flughafen Tiflis',
    it: 'Noleggio auto in Georgia con consegna all’aeroporto di Tbilisi',
    fr: 'Location de voiture en Géorgie avec livraison à l’aéroport de Tbilissi',
  },
  kutaisi: {
    ru: 'Прокат автомобилей в аэропорту Кутаиси без ограничения пробега',
    en: 'Car Rental at Kutaisi Airport with Unlimited Mileage',
    ar: 'تأجير سيارات في مطار كوتايسي مع كيلومترات غير محدودة',
    fa: 'اجاره خودرو در فرودگاه کوتائیسی با کیلومتر نامحدود',
    pl: 'Wynajem samochodów na lotnisku w Kutaisi bez limitu kilometrów',
    de: 'Mietwagen am Flughafen Kutaissi mit unbegrenzten Kilometern',
    it: 'Noleggio auto all’aeroporto di Kutaisi con chilometraggio illimitato',
    fr: 'Location de voiture à l’aéroport de Koutaïssi avec kilométrage illimité',
  },
}

interface HomePageProps {
  initialCity?: City
}

export default function HomePage({
  initialCity,
}: HomePageProps = {}) {
  const { lang, city, setCity } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  React.useEffect(() => {
    if (initialCity && city !== initialCity) {
      setCity(initialCity)
    }
  }, [initialCity])

  const currentCity = CITIES_DATA[city]

  // On the main page, keep the general headline across all airports
  // On local pages (batumi, tbilisi, kutaisi), use the specific city landing headline
  const heroHeadline = initialCity
    ? (LOCAL_CITY_H1[city]?.[lang] || LOCAL_CITY_H1[initialCity]?.[lang] || t.heroTitle)
    : t.heroTitle

  React.useEffect(() => {
    if (!initialCity) {
      document.title =
        lang === 'ru'
          ? 'Прокат автомобилей в Грузии с подачей в аэропорты Тбилиси, Кутаиси и Батуми — VASILII RENT'
          : 'Car Rental in Georgia from 1 Day (Zero Deposit) — VASILII RENT'
    }
  }, [lang, initialCity])

  return (
    <div className="bg-[#FFFFFF]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-20 bg-gradient-to-b from-[#FBFBFD] to-[#FFFFFF] border-b border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column: Offer & Interactive Selectors */}
            <div className="lg:col-span-7 text-left">
              {/* Micro Tagline */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] text-[#1D1D1F] text-[11px] font-bold tracking-wider mb-4">
                <span>🚗</span>
                <span>{t.heroTag}</span>
              </div>

              {/* Main Display Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-[#1D1D1F] tracking-tight leading-[1.1] mb-4">
                {heroHeadline}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#6E6E73] font-normal leading-relaxed mb-6 max-w-xl">
                {t.heroSubtitle}
              </p>

              {/* City & Duration Selection Card */}
              <div className="bg-white/95 backdrop-blur-xl p-3.5 sm:p-5 rounded-3xl border border-black/[0.08] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.06)] mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block mb-2">
                  {t.citySelectLabel}
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['batumi', 'tbilisi', 'kutaisi'] as City[]).map((cKey) => (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setCity(cKey)}
                      className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 text-center ${
                        city === cKey
                          ? 'bg-[#1D1D1F] text-white shadow-md scale-[1.02]'
                          : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5EA]'
                      }`}
                    >
                      {getCityName(cKey, lang)}
                    </button>
                  ))}
                </div>

                {/* Competitive Advantages Row in Hero */}
                <div className="mt-3 pt-3 border-t border-black/[0.05] grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1D1D1F]">
                    <span className="text-[#34C759]">✓</span>
                    <span>{t.payOnPickupPill}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1D1D1F]">
                    <span className="text-[#34C759]">✓</span>
                    <span>{t.unlimitedMileage}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1D1D1F]">
                    <span className="text-[#34C759]">✓</span>
                    <span>{t.zeroDepositPill}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1D1D1F]">
                    <span className="text-[#34C759]">✓</span>
                    <span>{t.secondDriverFreePill}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1D1D1F]">
                    <span className="text-[#34C759]">✓</span>
                    <span>{lang === 'ru' ? 'Мыть при возврате не нужно' : 'No need to wash on return'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1D1D1F]">
                    <span className="text-[#34C759]">✓</span>
                    <span>{t.rentFrom1DayPill}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1D1D1F]">
                    <span className="text-[#34C759]">✓</span>
                    <span>{lang === 'ru' ? 'Возраст от 21 года' : 'Age 21+'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1D1D1F]">
                    <span className="text-[#34C759]">✓</span>
                    <span>{lang === 'ru' ? 'Стаж от 0 лет' : 'License from 0y'}</span>
                  </div>
                </div>

                {/* Highlighted Intercity / One-Way Return Banner */}
                <div className="mt-3.5 pt-3 border-t border-black/[0.06] bg-gradient-to-r from-[#F0FDF4] to-[#E8FAF0] p-3 rounded-2xl border border-[#34C759]/25 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#34C759] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                      ⚡
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-extrabold text-[#1D1D1F]">
                          {lang === 'ru' ? 'Возврат в другом городе (One-Way)' : 'Intercity Return (One-Way)'}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#34C759] text-white px-2 py-0.5 rounded-full">
                          0 ₾ {lang === 'ru' ? 'без доплаты' : 'free drop-off'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#48484A] mt-0.5 leading-snug">
                        {lang === 'ru'
                          ? 'Возьмите авто в Батуми и сдайте в Тбилиси или в аэропорту Кутаиси без переплат'
                          : 'Pick up in Batumi, drop off in Tbilisi or Kutaisi Airport with zero relocation fee'}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-[#248A3D] bg-white/80 px-2.5 py-1 rounded-lg border border-[#34C759]/20">
                    <span>Батуми</span>
                    <span>⇄</span>
                    <span>Тбилиси</span>
                    <span>⇄</span>
                    <span>Кутаиси</span>
                  </div>
                </div>
              </div>

              {/* Location Delivery & Station Notice */}
              <div className="bg-[#F5F5F7] p-3.5 rounded-2xl text-xs text-[#1D1D1F] flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div>
                  <span className="font-bold block text-[#1D1D1F] mb-0.5">
                    {t.baseLabel}: {getCityName(city, lang)} ({getCityAddress(city, lang)})
                  </span>
                  <span className="text-[#6E6E73]">{getCityDeliveryNote(city, lang)}</span>
                </div>
                {currentCity?.googleMapUrl && (
                  <a
                    href={currentCity.googleMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 px-3.5 py-1.5 bg-white border border-black/[0.1] rounded-full font-semibold text-[11px] text-[#1D1D1F] hover:bg-black hover:text-white transition-colors"
                  >
                    {t.onMap}
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)] border border-black/[0.08] group">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full">
                  <Image
                    src="/images/hero-georgia.jpg"
                    alt={heroHeadline}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                  {/* Top floating badge */}
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                      {t.heroPhotoBadge}
                    </span>
                  </div>

                  {/* Floating badges on image */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                      ✓ {t.payOnPickupPill}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                      ✓ {t.heroBadgeNoPrepayment}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1.5">
                      ✓ {t.heroBadgeFreeCancellation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Catalog Anchor */}
      <div id="catalog" className="scroll-mt-20" />

      {/* Catalog Title Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-16 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/[0.06] pb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block mb-1">
              {t.catalogTag}
            </span>
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
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block mb-2">
            {t.whyChooseUs}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight mb-3">
            {t.benefitsTitle}
          </h2>
          <p className="text-sm text-[#86868B]">
            {t.whyChooseUsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Unlimited Mileage */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl hover:bg-[#EFEFF2] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              🛣️
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit1Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {t.benefit1Desc}
            </p>
          </div>

          {/* 2. No Deposit */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl hover:bg-[#EFEFF2] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              💳
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit2Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {t.benefit2Desc}
            </p>
          </div>

          {/* 3. No Prepayment */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl hover:bg-[#EFEFF2] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              📅
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit3Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {t.benefit3Desc}
            </p>
          </div>

          {/* 4. Free Cancellation */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl hover:bg-[#EFEFF2] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              🔄
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit4Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {t.benefit4Desc}
            </p>
          </div>

          {/* 5. Rent from 1 Day & Hourly Extension */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl hover:bg-[#EFEFF2] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              ⏱️
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit5Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {t.benefit5Desc}
            </p>
          </div>

          {/* 6. Insurance Included */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl hover:bg-[#EFEFF2] transition-colors border border-[#34C759]/20 relative overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              🛡️
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit6Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {t.benefit6Desc}
            </p>
          </div>

          {/* 7. Free Intercity Drop-off */}
          <div className="bg-gradient-to-br from-[#F5F5F7] to-[#E8FAF0] p-6 rounded-3xl hover:bg-[#EFEFF2] transition-colors border-2 border-[#34C759]/40 relative overflow-hidden shadow-xs">
            <div className="absolute top-0 right-0 bg-[#34C759] text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wider">
              {lang === 'ru' ? 'ONE-WAY 0 ₾' : 'ONE-WAY 0 ₾'}
            </div>
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs border border-[#34C759]/20">
              ⚡
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5 flex items-center gap-1.5">
              <span>{t.benefit7Title}</span>
            </h3>
            <p className="text-xs text-[#48484A] leading-relaxed">
              {t.benefit7Desc}
            </p>
            <div className="mt-3 pt-2.5 border-t border-black/[0.06] text-[11px] font-bold text-[#248A3D] flex items-center gap-1">
              <span>✓ Батуми ⇄ Тбилиси ⇄ Кутаиси</span>
            </div>
          </div>

          {/* 8. Mobility & Car Replacement Guarantee */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl hover:bg-[#EFEFF2] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              🛡️
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit8Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {t.benefit8Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Route Consultation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="bg-gradient-to-r from-[#F5F5F7] via-[#FAFAFC] to-[#F0F0F3] border border-black/[0.05] p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-xs flex items-center justify-center text-2xl shrink-0 border border-black/[0.04]">
              🧭
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-[#1D1D1F] mb-1">
                {t.routeAdviceTitle || 'Не знаете, куда поехать? Поможем составить маршрут!'}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] max-w-2xl leading-relaxed">
                {t.routeAdviceDesc || 'Спросите у менеджера по бронированию: мы с радостью предложим красивые варианты под ваши даты, подскажем реальное время в пути и поможем составить комфортный маршрут.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/995591050752?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D0%B6%D0%B8%D1%82%D0%B5%20%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D1%8B%20%D0%BA%D1%83%D0%B4%D0%B0%20%D0%BF%D0%BE%D0%B5%D1%85%D0%B0%D1%82%D1%8C%20%D0%B8%20%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8%20%D0%B7%D0%B0%D0%B9%D0%BC%D1%91%D1%82%20%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B0%3F"
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-initial h-11 px-6 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-sm"
            >
              <span>{t.routeAdviceBtn || 'Спросить маршрут'}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Real Customer Reviews Section */}
      <ReviewsSection />
    </div>
  )
}