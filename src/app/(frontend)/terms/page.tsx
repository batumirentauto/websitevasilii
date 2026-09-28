'use client'

import React from 'react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export default function TermsPage() {
  const { lang } = useApp()
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ru

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block mb-2">
          ПРОЗРАЧНОСТЬ И БЕЗОПАСНОСТЬ
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1D1D1F] tracking-tight mb-4">
          {t.termsTitle}
        </h1>
        <p className="text-sm text-[#6E6E73] leading-relaxed">
          {t.termsSubtitle}
        </p>
      </div>

      {/* Terms Sections */}
      <div className="space-y-6">
        {/* Requirements */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.04]">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-4 flex items-center gap-2">
            <span>👤</span> {t.termReqTitle}
          </h2>
          <ul className="space-y-3 text-sm text-[#48484A]">
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <span>{t.termReq1}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <span>{t.termReq2}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <span>{t.termReq3}</span>
            </li>
          </ul>
        </div>

        {/* Insurance */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.04]">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
            <span>🛡️</span> {t.termInsuranceTitle}
          </h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">
            {t.termInsuranceDesc}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-black/[0.06]">
              <span className="font-bold text-[#1D1D1F] block mb-1">КАСКО и ОСАГО</span>
              <span className="text-[#86868B]">Страхование ответственности и автомобиля включено в тариф.</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-black/[0.06]">
              <span className="font-bold text-[#1D1D1F] block mb-1">Возврат залога</span>
              <span className="text-[#86868B]">Залог возвращается сразу при сдаче автомобиля в чистом виде.</span>
            </div>
          </div>
        </div>

        {/* Territory */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.04]">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
            <span>🗺️</span> {t.termTravelTitle}
          </h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">
            {t.termTravelDesc}
          </p>
          <div className="bg-white p-4 rounded-2xl border border-black/[0.06] text-xs text-[#86868B] space-y-1.5">
            <p>
              <strong className="text-[#1D1D1F]">Разрешено:</strong> Батуми, Тбилиси, Кутаиси, Кахетия, Боржоми, Казбеги, Местия (Сванетия), побережье Черного моря.
            </p>
            <p>
              <strong className="text-[#FF3B30]">Запрещено:</strong> Выезд за пределы государственной границы Грузии, а также в оккупированные территории (Абхазия и Южная Осетия). Для экстремальных перевалов (Омало/Тушетия) проконсультируйтесь с менеджером.
            </p>
          </div>
        </div>

        {/* Delivery & Bases */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.04]">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
            <span>📍</span> Выдача и возврат автомобиля
          </h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">
            Мы рекомендуем получать автомобиль прямо с наших баз в Батуми и Тбилиси — это абсолютно бесплатно и занимает всего 5 минут. В Кутаиси выдача осуществляется в аэропорту KUT.
          </p>
          <div className="bg-white p-4 rounded-2xl border border-black/[0.06] text-xs">
            <span className="font-bold text-[#34C759] block mb-1">
              ✨ Бесплатный возврат в любом городе (0 ₾)
            </span>
            <span className="text-[#6E6E73]">
              Вы можете взять автомобиль в Батуми и сдать в Тбилиси или в аэропорту Кутаиси перед вылетом абсолютно БЕЗ доплаты за перегон машины между городами.
            </span>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="mt-12 text-center bg-[#1D1D1F] text-white p-8 rounded-3xl">
        <h3 className="text-2xl font-bold mb-2">Остались вопросы по условиям?</h3>
        <p className="text-xs text-[#86868B] max-w-md mx-auto mb-6">
          Напишите нам в мессенджер — ответим в течение 5 минут и поможем подобрать лучший автомобиль под ваш маршрут.
        </p>
        <div className="flex justify-center gap-3">
          <a
            href="https://wa.me/995591050752"
            target="_blank"
            rel="noreferrer"
            className="h-11 px-6 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center hover:bg-[#20ba59] transition-transform active:scale-95"
          >
            Написать в WhatsApp
          </a>
          <Link
            href="/#catalog"
            className="h-11 px-6 rounded-full bg-white text-[#1D1D1F] text-xs font-bold flex items-center justify-center hover:bg-[#F5F5F7] transition-transform active:scale-95"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    </div>
  )
}
