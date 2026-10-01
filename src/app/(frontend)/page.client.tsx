'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CatalogSection } from '@/components/CatalogSection'
import ReviewsSection from '@/components/ReviewsSection'
import { useApp, CITIES_DATA, City, Lang, getCityName, getCityAddress, getCityDeliveryNote } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

interface HomePageProps {
  initialCity?: City
  customTitle?: string
  customH1?: string
  customSubtitle?: string
}

const CITY_H1: Record<City, Record<Lang, string>> = {
  batumi: {
    ru: 'Прокат автомобилей в Батуми от 1 дня без залога',
    en: 'Car Rental in Batumi from 1 Day (Zero Deposit)',
    ar: 'تأجير سيارات في باتومي ابتداءً من يوم واحد بدون تأمين',
    fa: 'اجاره خودرو در باتومی از ۱ روز بدون ودیعه',
    pl: 'Wynajem aut w Batumi od 1 doby bez kaucji',
    de: 'Mietwagen in Batumi ab 1 Tag ohne Kaution',
    it: 'Noleggio auto a Batumi da 1 giorno senza deposito',
    fr: 'Location de voiture à Batoumi dès 1 jour sans caution',
  },
  tbilisi: {
    ru: 'Аренда автомобилей в Тбилиси от 1 дня без залога',
    en: 'Car Rental in Tbilisi from 1 Day (Zero Deposit)',
    ar: 'تأجير سيارات في تبليسي ابتداءً من يوم واحد بدون تأمين',
    fa: 'اجاره خودرو در تفلیس از ۱ روز بدون ودیعه',
    pl: 'Wynajem aut w Tbilisi od 1 doby bez kaucji',
    de: 'Mietwagen in Tiflis ab 1 Tag ohne Kaution',
    it: 'Noleggio auto a Tbilisi da 1 giorno senza deposito',
    fr: 'Location de voiture à Tbilissi dès 1 jour sans caution',
  },
  kutaisi: {
    ru: 'Прокат авто в аэропорту Кутаиси от 1 дня без залога',
    en: 'Car Rental at Kutaisi Airport from 1 Day (Zero Deposit)',
    ar: 'تأجير سيارات في مطار كوتايسي ابتداءً من يوم واحد بدون تأمين',
    fa: 'اجاره خودرو در فرودگاه کوتایسی از ۱ روز بدون ودیعه',
    pl: 'Wynajem aut na lotnisku Kutaisi od 1 doby bez kaucji',
    de: 'Mietwagen am Flughafen Kutaissi ab 1 Tag ohne Kaution',
    it: 'Noleggio auto all\'aeroporto di Kutaisi da 1 giorno senza deposito',
    fr: 'Location de voiture à l\'aéroport de Koutaïssi dès 1 jour sans caution',
  },
}

const CITY_SUBTITLE: Record<City, Record<Lang, string>> = {
  batumi: {
    ru: 'Честные цены без скрытых наценок, страховка КАСКО + ОСАГО и бесплатный 1-й час продления. Выдача с базы на ул. Мамия Варшанидзе 154 или в аэропорту Батуми.',
    en: 'Fair transparent prices with zero hidden markups, full CASCO + TPL insurance, and free 1st extra hour. Pick up at our base on Mamiya Varshanidze St or request delivery to Batumi Airport.',
    ar: 'أسعار شفافة دون رسوم خفية، تأمين شامل كاسكو وساعة أولى مجانية للتمديد. الاستلام من فرعنا في شارع ماميا فارشانيدزه أو مطار باتومي.',
    fa: 'قیمت‌های منصفانه بدون هزینه پنهان، بیمه کامل بدنه و شخص ثالث، و ۱ ساعت تمدید رایگان. تحویل از دفتر خیابان مامیا وارشانیدزه یا فرودگاه باتومی.',
    pl: 'Uczciwe ceny bez ukrytych opłat, pełne ubezpieczenie i pierwsza godzina gratis przy przedłużeniu. Odbiór z bazy przy ul. Mamiya Varshanidze lub na lotnisku Batumi.',
    de: 'Faire Preise ohne versteckte Aufschläge, Vollkasko-Versicherung und 1. kostenlose Stunde bei Verlängerung. Abholung an unserer Station in der Mamiya-Varshanidze-Str. oder am Flughafen Batumi.',
    it: 'Prezzi trasparenti senza costi nascosti, assicurazione completa KASKO e 1ª ora gratis di proroga. Ritiro presso la nostra base in via Mamiya Varshanidze o all\'aeroporto di Batumi.',
    fr: 'Tarifs transparents sans frais cachés, assurance tous risques et 1re heure gratuite pour prolongation. Prise en charge à notre base rue Mamiya Varchanidzé ou à l\'aéroport de Batoumi.',
  },
  tbilisi: {
    ru: 'Надежные автомобили для поездок по Тбилиси, в Казбеги, Кахетию, Боржоми и Гудаури. Без залога на карте, страховка КАСКО + ОСАГО и бесплатный 1-й час продления.',
    en: 'Reliable vehicles for road trips across Tbilisi, Kazbegi, Kakheti, Borjomi, and Gudauri. Zero card deposit, full CASCO + TPL insurance, and free 1st extra hour.',
    ar: 'سيارات موثوقة لرحلاتك في تبليسي، كازبيجي، كاخيتي، بورجومي وغوداوري. بدون حجز مبلغ تأمين على البطاقة، تأمين شامل وساعة أولى مجانية.',
    fa: 'خودروهای مطمئن برای سفر به تفلیس، کازبگی، کاختی، برجومی و گودائوری. بدون مسدود کردن پول روی کارت، بیمه کامل و ۱ ساعت تمدید رایگان.',
    pl: 'Niezawodne auta na wyjazdy po Tbilisi, do Kazbegi, Kachetii, Borjomi i Gudauri. Bez blokady kaucji na karcie, pełne ubezpieczenie i pierwsza godzina gratis.',
    de: 'Zuverlässige Fahrzeuge für Fahrten in Tiflis, nach Kasbegi, Kachetien, Bordschomi und Gudauri. Ohne Kautionsblockierung, Vollkasko und 1. kostenlose Überstunde.',
    it: 'Auto affidabili per viaggiare a Tbilisi, Kazbegi, Cachezia, Borjomi e Gudauri. Senza blocco del deposito su carta, assicurazione completa e 1ª ora gratis.',
    fr: 'Véhicules fiables pour vos escapades à Tbilissi, Kazbegi, Kakhétie, Bordjomi et Goudaouri. Sans blocage de caution sur carte, assurance complète et 1re heure offerte.',
  },
  kutaisi: {
    ru: 'Круглосуточная встреча у терминала прилёта 24/7. Быстрое оформление за 10 минут, страховка КАСКО + ОСАГО включена, без залога и с возвратом в Батуми или Тбилиси.',
    en: '24/7 terminal meet & greet for your flight arrivals. Fast 10-minute handover, full CASCO + TPL insurance, zero deposit, and free drop-off in Batumi or Tbilisi.',
    ar: 'استقبال عند صالة الوصول على مدار 24/7 لكل الرحلات. تسليم سريع خلال 10 دقائق، تأمين شامل كاسكو، بدون تأمين وإمكانية التسليم في باتومي أو تبليسي.',
    fa: 'استقبال ۲۴ ساعته در ترمینال پروازهای ورودی فرودگاه. تحویل سریع ۱۰ دقیقه‌ای، بیمه کامل، بدون ودیعه و امکان بازگشت در باتومی یا تفلیس.',
    pl: 'Całodobowe powitanie w terminalu przylotów 24/7. Szybki odbiór w 10 minut, pełne ubezpieczenie, brak kaucji i możliwość zwrotu w Batumi lub Tbilisi.',
    de: 'Rund-um-die-Uhr-Abholung am Ankunftsterminal 24/7. Schnelle Übergabe in 10 Minuten, Vollkasko inklusive, ohne Kaution und Rückgabe in Batumi oder Tiflis möglich.',
    it: 'Accoglienza h24 al terminal arrivi per il tuo volo. Consegna rapida in 10 minuti, assicurazione KASKO inclusa, nessun deposito e riconsegna a Batumi o Tbilisi.',
    fr: 'Accueil personnalisé au terminal des arrivées 24h/24. Prise en charge rapide en 10 minutes, assurance tous risques incluse, sans caution et retour à Batoumi ou Tbilissi.',
  },
}

export default function HomePage({
  initialCity,
  customTitle,
  customH1,
  customSubtitle,
}: HomePageProps = {}) {
  const { lang, city, setCity } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  React.useEffect(() => {
    if (initialCity && city !== initialCity) {
      setCity(initialCity)
    }
  }, [initialCity])

  const currentCity = CITIES_DATA[city]

  React.useEffect(() => {
    if (customTitle) {
      document.title = customTitle
    } else if (initialCity) {
      const cityTitle = CITY_H1[initialCity]?.[lang] || CITY_H1[initialCity]?.ru
      document.title = `${cityTitle} — VASILII RENT`
    } else {
      document.title =
        lang === 'ru'
          ? 'Аренда авто в Грузии от 1 дня без залога — VASILII RENT'
          : 'Car Rental in Georgia from 1 Day (Zero Deposit) — VASILII RENT'
    }
  }, [lang, customTitle, initialCity])

  const heroHeadline =
    customH1 ||
    (initialCity ? CITY_H1[initialCity]?.[lang] || CITY_H1[initialCity]?.ru : t.heroTitle)

  const heroSub =
    customSubtitle ||
    (initialCity
      ? CITY_SUBTITLE[initialCity]?.[lang] || CITY_SUBTITLE[initialCity]?.ru
      : t.heroSubtitle)

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
                {heroSub}
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
                      onClick={() => setCity(cKey)}
                      className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                        city === cKey
                          ? 'bg-[#1D1D1F] text-white shadow-md scale-[1.02]'
                          : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#E5E5EA]'
                      }`}
                    >
                      {getCityName(cKey, lang)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Delivery & Base Location Info Note */}
              <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.04] text-xs text-[#1D1D1F] flex items-start gap-3">
                <span className="text-base shrink-0 mt-0.5">📍</span>
                <div>
                  <p className="font-semibold mb-0.5">
                    {t.baseLabel}: {getCityAddress(city, lang)}
                  </p>
                  <p className="text-[#6E6E73]">{getCityDeliveryNote(city, lang)}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-black/5 bg-[#F5F5F7]">
                <Image
                  src="/fleet/Ford_Escape_2010/IMG_9271.jpg"
                  alt="Car Rental Georgia"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                
                {/* Floating Highlights Badges */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-black/5 flex items-center gap-1.5 text-xs font-bold text-[#1D1D1F]">
                  <span>🛡️</span>
                  <span>{t.badgeFullInsurance}</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-black/5 flex items-center gap-1.5 text-xs font-bold text-[#34C759]">
                  <span>✓</span>
                  <span>{t.badgeNoDeposit}</span>
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
          <div className="bg-[#F5F5F7] p-6 rounded-3xl hover:bg-[#EFEFF2] transition-colors">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-lg mb-4 shadow-xs">
              ⚡
            </div>
            <h3 className="font-bold text-base text-[#1D1D1F] mb-1.5">{t.benefit7Title}</h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {t.benefit7Desc}
            </p>
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