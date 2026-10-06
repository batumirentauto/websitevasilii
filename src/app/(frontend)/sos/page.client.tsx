'use client'

import React from 'react'
import Link from 'next/link'
import { useApp, EMERGENCY_PHONE, EMERGENCY_WHATSAPP } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export default function SosPage() {
  const { lang, t } = useApp()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header Badge & Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F5] text-[#FF3B30] text-xs font-bold border border-[#FF3B30]/20 mb-4 shadow-xs">
          <span>🚨</span> {t.navSos || 'При ДТП / SOS'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1F] tracking-tight mb-4">
          {t.sosPageTitle || 'Что делать при ДТП или происшествии в Грузии'}
        </h1>
        <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
          {t.sosPageSubtitle || 'Главное — не переживайте. Мы всегда на связи 24 часа в сутки и поможем в любой ситуации на дороге.'}
        </p>
      </div>

      {/* Primary Emergency Hotline Card */}
      <div className="bg-[#1D1D1F] text-white p-8 sm:p-10 rounded-3xl mb-8 shadow-xl border border-black/10">
        <span className="text-xs font-bold text-[#FF3B30] uppercase tracking-wider block mb-2">
          Экстренная линия поддержки 24/7
        </span>
        <a
          href={`tel:${EMERGENCY_PHONE.replace(/\s+/g, '')}`}
          className="text-3xl sm:text-4xl font-extrabold hover:text-[#FF3B30] transition-colors block mb-4"
        >
          {EMERGENCY_PHONE}
        </a>
        <p className="text-sm text-[#A1A1A6] mb-8 max-w-lg leading-relaxed">
          В случае происшествия или любого повреждения автомобиля — чтобы к вам не было никаких претензий при возврате, сразу позвоните или напишите нам. Менеджер подскажет точный порядок действий. Если вы всё делаете своевременно, тогда к вам не будет абсолютно никаких претензий при сдаче машины.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={`tel:${EMERGENCY_PHONE.replace(/\s+/g, '')}`}
            className="flex-1 sm:flex-initial h-12 px-8 rounded-full bg-[#FF3B30] hover:bg-[#E02D22] text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <span>Позвонить</span>
          </a>
          <a
            href={`https://wa.me/${EMERGENCY_WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-initial h-12 px-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
          >
            <span>Написать в WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Calm Guidance Card */}
      <div className="bg-[#F5F5F7] p-6 sm:p-8 rounded-3xl border border-black/[0.04] mb-10">
        <h2 className="text-lg font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
          <span>🤝</span> Мы всегда рядом и поможем разобраться
        </h2>
        <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">
          Каждая ситуация на дороге индивидуальна. Главное правило: при любом происшествии или повреждении сразу свяжитесь с нами и следуйте инструкциям менеджера. При своевременном обращении и фиксации обстоятельств вы полностью защищены, и при возврате автомобиля к вам не возникнет никаких претензий.
        </p>
        <div className="flex items-center gap-3 pt-2 text-xs text-[#86868B]">
          <span className="w-2 h-2 rounded-full bg-[#34C759] shrink-0 animate-pulse" />
          <span>Поддержка работает без выходных и праздников</span>
        </div>
      </div>

      {/* Return to Catalog CTA */}
      <div className="text-center pt-2">
        <Link
          href="/#catalog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D1D1F] hover:text-[#0071E3] transition-colors"
        >
          <span>← Вернуться к каталогу автомобилей</span>
        </Link>
      </div>
    </div>
  )
}
