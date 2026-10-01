'use client'

import React from 'react'
import Link from 'next/link'
import { useApp, EMERGENCY_PHONE, EMERGENCY_WHATSAPP, PHONE_NUMBER } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export default function SosPage() {
  const { lang } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header Badge & Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F5] text-[#FF3B30] text-xs font-bold border border-[#FF3B30]/20 mb-4 shadow-xs">
          <span>🚨</span> {t.navSos || 'При ДТП / SOS'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight mb-4">
          {t.sosPageTitle || 'Что делать при ДТП или происшествии'}
        </h1>
        <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
          {t.sosPageSubtitle || 'Главное — не переживайте. Мы всегда на связи 24 часа в сутки и поможем в любой ситуации на дороге.'}
        </p>
      </div>

      {/* Primary Emergency Hotline Card */}
      <div className="bg-[#1D1D1F] text-white p-8 sm:p-10 rounded-3xl mb-12 shadow-xl border border-black/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-[#FF3B30] uppercase tracking-wider block mb-1">
              Круглосуточная экстренная линия поддержки 24/7
            </span>
            <a
              href={`tel:${EMERGENCY_PHONE.replace(/\s+/g, '')}`}
              className="text-3xl sm:text-4xl font-extrabold hover:text-[#FF3B30] transition-colors block"
            >
              {EMERGENCY_PHONE}
            </a>
            <p className="text-xs text-[#86868B] mt-2 max-w-md">
              Свяжитесь с нами сразу после происшествия. Мы скоординируем ваши действия и поможем всё оформить.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href={`tel:${EMERGENCY_PHONE.replace(/\s+/g, '')}`}
              className="flex-1 md:flex-initial h-12 px-6 rounded-full bg-[#FF3B30] hover:bg-[#E02D22] text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
            >
              <span>Позвонить</span>
            </a>
            <a
              href={`https://wa.me/${EMERGENCY_WHATSAPP}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 md:flex-initial h-12 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
            >
              <span>WhatsApp SOS</span>
            </a>
          </div>
        </div>
      </div>

      {/* 5-Step Action Algorithm */}
      <div className="mb-14">
        <h2 className="text-2xl font-bold text-[#1D1D1F] tracking-tight mb-6 flex items-center gap-2">
          <span>📋</span> Пошаговый порядок действий
        </h2>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl border border-black/[0.04] flex items-start gap-4">
            <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-sm font-bold text-[#1D1D1F] shrink-0 shadow-xs">
              1
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1D1D1F] mb-1">
                Остановитесь и включите аварийную сигнализацию
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                Заглушите двигатель, выставьте знак аварийной остановки. Убедитесь, что никто не пострадал. Не перемещайте автомобиль до фиксации сотрудниками патрульной полиции.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 p-6 rounded-3xl flex items-start gap-4">
            <div className="w-9 h-9 rounded-2xl bg-[#FF3B30] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-xs">
              2
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1D1D1F] mb-1">
                Наберите 112 (Патрульная полиция Грузии)
              </h3>
              <p className="text-xs sm:text-sm text-[#48484A] leading-relaxed">
                Вызов полиции по номеру <strong>112</strong> в Грузии бесплатный (операторы говорят на русском и английском). Это обязательно: <strong>страховая компания КАСКО + ОСАГО выплачивает возмещение только при наличии официального протокола патрульной полиции</strong>.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl border border-black/[0.04] flex items-start gap-4">
            <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-sm font-bold text-[#1D1D1F] shrink-0 shadow-xs">
              3
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1D1D1F] mb-1">
                Сразу позвоните нам: {EMERGENCY_PHONE}
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                Мы будем с вами на связи на протяжении всего процесса. Подскажем, как общаться с патрульной полицией, какие документы необходимо получить и как зафиксировать обстоятельства.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl border border-black/[0.04] flex items-start gap-4">
            <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-sm font-bold text-[#1D1D1F] shrink-0 shadow-xs">
              4
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1D1D1F] mb-1">
                Сделайте подробные фото и видео
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                Сфотографируйте повреждения обоих автомобилей со всех ракурсов, общий план расположения машин на проезжей части, дорожные знаки, разметку и регистрационные номера участников.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-[#F5F5F7] p-6 rounded-3xl border border-black/[0.04] flex items-start gap-4">
            <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center text-sm font-bold text-[#1D1D1F] shrink-0 shadow-xs">
              5
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1D1D1F] mb-1">
                Ни в коем случае не платите деньги на месте
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed">
                Любые финансовые вопросы, претензии и компенсации регулируются исключительно в правовом поле страховой компанией на основании полицейского протокола.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance & Replacement Guarantees */}
      <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.04] mb-12">
        <h2 className="text-xl font-bold text-[#1D1D1F] mb-4 flex items-center gap-2">
          <span>🛡️</span> Страховка и подменный автомобиль
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-white p-5 rounded-2xl border border-black/[0.06]">
            <span className="font-bold text-[#34C759] block mb-1">КАСКО + ОСАГО включены</span>
            <p className="text-[#6E6E73] leading-relaxed">
              Все автомобили застрахованы. При водительском стаже от 2 лет действует нулевая франшиза (0 ₾). Повреждения стекла также включены в покрытие.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-black/[0.06]">
            <span className="font-bold text-[#1D1D1F] block mb-1">Гарантия подмены авто</span>
            <p className="text-[#6E6E73] leading-relaxed">
              Если автомобиль получил повреждения и не может продолжать движение, мы оперативно предоставим подменную машину, чтобы ваш отдых в Грузии продолжался.
            </p>
          </div>
        </div>
      </div>

      {/* Return to Catalog CTA */}
      <div className="text-center pt-4">
        <Link
          href="/#catalog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
        >
          <span>← Вернуться к выбору автомобилей</span>
        </Link>
      </div>
    </div>
  )
}
