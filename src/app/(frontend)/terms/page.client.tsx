'use client'

import React from 'react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'

export default function TermsPage() {
  const { lang, t } = useApp()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#86868B] block mb-2">
          {t.termsTag}
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
          <ul className="space-y-3.5 text-sm text-[#48484A]">
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <span>{t.termReq1}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <span>
                <strong>{t.termsExperience}:</strong> {t.termsExperienceText}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <div>
                <span>{t.termReq3}</span>
                <span className="block text-xs text-[#FF3B30] font-semibold mt-0.5">
                  ⚠️ Патрульная полиция требует строго физический оригинал прав (фото и электронные права не действуют).{' '}
                  <Link href="/guide#license-original" className="underline hover:text-[#1D1D1F]">
                    Подробнее в памятке →
                  </Link>
                </span>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <span>
                <strong>{t.termsMileage}:</strong> {t.termsMileageText}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <span>
                <strong>{t.termsBooking}:</strong> {t.termsBookingText}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <span>
                <strong>{t.termsDuration}:</strong> {t.termsDurationText}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#34C759] font-bold">✓</span>
              <span>
                <strong>{t.termsDeposit}:</strong> {t.termsDepositText}
              </span>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-5">
            <div className="bg-white p-4 rounded-2xl border border-black/[0.06]">
              <span className="font-bold text-[#34C759] block mb-1">{t.termsZeroFranchiseTitle}</span>
              <span className="text-[#6E6E73]">{t.termsZeroFranchiseDesc}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-black/[0.06]">
              <span className="font-bold text-[#1D1D1F] block mb-1">{t.termsJuniorTitle}</span>
              <span className="text-[#6E6E73]">{t.termsJuniorDesc}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-black/[0.06]">
              <span className="font-bold text-[#1D1D1F] block mb-1">{t.termsZeroDepositTitle}</span>
              <span className="text-[#6E6E73]">{t.termsZeroDepositDesc}</span>
            </div>
          </div>

          {/* Insurance Exceptions & Exclusions */}
          <div className="bg-white p-6 rounded-2xl border border-black/[0.06] text-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⚠️</span>
              <h3 className="font-bold text-sm text-[#1D1D1F]">
                {t.insuranceExceptionsTitle}
              </h3>
            </div>
            <p className="text-[#6E6E73] mb-3 leading-relaxed">
              {t.insuranceExceptionsSubtitle}
            </p>
            <ul className="space-y-2 text-[#48484A] mb-4">
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF3B30] font-bold text-sm shrink-0">✕</span>
                <span className="leading-relaxed">{t.insuranceEx1}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF3B30] font-bold text-sm shrink-0">✕</span>
                <span className="leading-relaxed">{t.insuranceEx2}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF3B30] font-bold text-sm shrink-0">✕</span>
                <span className="leading-relaxed">{t.insuranceEx3}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF3B30] font-bold text-sm shrink-0">✕</span>
                <span className="leading-relaxed">{t.insuranceEx4}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF3B30] font-bold text-sm shrink-0">✕</span>
                <span className="leading-relaxed">{t.insuranceEx5}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF3B30] font-bold text-sm shrink-0">✕</span>
                <span className="leading-relaxed">{t.insuranceEx6}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#FF3B30] font-bold text-sm shrink-0">✕</span>
                <span className="leading-relaxed">{t.insuranceEx7}</span>
              </li>
            </ul>
            <div className="bg-[#FFF9F2] border border-[#FF9500]/20 p-3.5 rounded-xl text-[11px] text-[#8A5A00] leading-relaxed">
              💡 <strong>Простыми словами:</strong> {t.insuranceExceptionsNote}
            </div>
          </div>
        </div>

        {/* Mobility Guarantee */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.04]">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
            <span>🛡️</span> {t.termsGuaranteeTitle || 'Гарантия предоставления автомобиля'}
          </h2>
          <p className="text-sm text-[#48484A] leading-relaxed">
            {t.termsGuaranteeText}
          </p>
        </div>

        {/* Accident / Incident Support (SOS 24/7) */}
        <div className="bg-[#FFF5F5] border border-[#FF3B30]/20 p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
            <span>🚨</span> {t.accidentHelpTitle || 'Помощь при ДТП или происшествии (24/7)'}
          </h2>
          <p className="text-sm text-[#48484A] leading-relaxed mb-5">
            {t.accidentHelpDesc}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+995591181430"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-sm font-bold shadow-xs transition-transform active:scale-95"
            >
              <span>📞 +995 591 181 430</span>
            </a>
            <a
              href="https://wa.me/995591181430"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold shadow-xs transition-transform active:scale-95"
            >
              <span>WhatsApp SOS</span>
            </a>
            <span className="text-xs text-[#86868B] font-medium">Круглосуточная поддержка 24/7</span>
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
          <div className="bg-white p-5 rounded-2xl border border-black/[0.06] text-xs space-y-3">
            <div>
              <strong className="text-[#34C759] font-bold block mb-1">{t.termsAllowedTitle} </strong>
              <p className="text-[#48484A] leading-relaxed">{t.termsAllowedText}</p>
            </div>
            <div className="pt-2.5 border-t border-black/[0.06]">
              <strong className="text-[#FF3B30] font-bold block mb-1">{t.termsForbiddenTitle} </strong>
              <p className="text-[#48484A] leading-relaxed">{t.termsForbiddenText}</p>
            </div>
          </div>

          {/* Route Advice Prompt */}
          <div className="mt-4 p-5 rounded-2xl bg-white border border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <span className="text-2xl shrink-0">🧭</span>
              <div>
                <strong className="text-sm font-bold text-[#1D1D1F] block mb-1">
                  {t.routeAdviceTitle}
                </strong>
                <p className="text-xs text-[#6E6E73] leading-relaxed">
                  {t.routeAdviceDesc}
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/995591050752?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9F%D0%BE%D0%B4%D1%81%D0%BA%D0%B0%D0%B6%D0%B8%D1%82%D0%B5%20%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D1%8B%20%D0%BA%D1%83%D0%B4%D0%B0%20%D0%BF%D0%BE%D0%B5%D1%85%D0%B0%D1%82%D1%8C%20%D0%B8%20%D1%81%D0%BA%D0%BE%D0%BB%D1%8C%D0%BA%D0%BE%20%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8%20%D0%B7%D0%B0%D0%B9%D0%BC%D1%91%D1%82%20%D0%B4%D0%BE%D1%80%D0%BE%D0%B3%D0%B0%3F"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 h-10 px-5 rounded-full bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95 shadow-xs"
            >
              <span>{t.routeAdviceBtn}</span>
            </a>
          </div>
        </div>

        {/* Delivery & Bases */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.04]">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
            <span>📍</span> {t.termsPickupTitle}
          </h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">
            {t.termsPickupDesc}
          </p>
          <div className="bg-white p-4 rounded-2xl border border-black/[0.06] text-xs">
            <span className="font-bold text-[#34C759] block mb-1">
              ✨ {t.termsFreeIntercityTitle}
            </span>
            <span className="text-[#6E6E73]">
              {t.termsFreeIntercityDesc}
            </span>
          </div>
        </div>

        {/* Rental Extension & Flexible Return */}
        <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/[0.04]">
          <h2 className="text-xl font-bold text-[#1D1D1F] mb-3 flex items-center gap-2">
            <span>⏱️</span> {t.termsExtensionTitle}
          </h2>
          <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">
            {t.termsExtensionSubtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
            <div className="bg-white p-4 rounded-2xl border border-black/[0.06]">
              <span className="font-bold text-[#34C759] block mb-1">🎁 {t.termsExtHourFreeTitle}</span>
              <span className="text-[#6E6E73] leading-relaxed">{t.termsExtHourFreeDesc}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-black/[0.06]">
              <span className="font-bold text-[#1D1D1F] block mb-1">🕐 {t.termsExtHourlyTitle}</span>
              <p className="text-[#6E6E73] mb-2 leading-relaxed">{t.termsExtHourlyDesc}</p>
              <ul className="space-y-1 font-semibold text-[#1D1D1F]">
                <li>• {t.termsExtTier1}</li>
                <li>• {t.termsExtTier2}</li>
                <li>• {t.termsExtTier3}</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-black/[0.06]">
              <span className="font-bold text-[#FF9500] block mb-1">📅 {t.termsExtDayTitle}</span>
              <span className="text-[#6E6E73] leading-relaxed">{t.termsExtDayDesc}</span>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-black/[0.06] text-xs flex items-center gap-2.5 text-[#6E6E73]">
            <span className="text-base shrink-0">💡</span>
            <span>{t.termsExtNote}</span>
          </div>
        </div>
      </div>

      {/* FAQ & Guide quick links banner */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/faq"
          className="p-5 bg-white rounded-2xl border border-black/[0.06] hover:border-[#0071E3]/40 hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0071E3] mb-1">
              FAQ
            </div>
            <div className="text-sm font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
              {lang === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}
            </div>
            <div className="text-xs text-[#86868B] mt-0.5">
              {lang === 'ru' ? 'Оплата, залог 0 ₾, страховка, пересечение границ' : 'Payment, zero deposit, insurance, borders'}
            </div>
          </div>
          <span className="text-lg text-[#86868B] group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <Link
          href="/guide"
          className="p-5 bg-white rounded-2xl border border-black/[0.06] hover:border-[#34C759]/40 hover:shadow-md transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#34C759] mb-1">
              {lang === 'ru' ? 'Памятка' : 'Guide'}
            </div>
            <div className="text-sm font-bold text-[#1D1D1F] group-hover:text-[#34C759] transition-colors">
              {lang === 'ru' ? 'Памятка водителю по Грузии' : 'Tourist Driving & Road Guide'}
            </div>
            <div className="text-xs text-[#86868B] mt-0.5">
              {lang === 'ru' ? 'ПДД, камеры скорости, парковки в Батуми и Тбилиси' : 'Rules, speed cameras, parking in Batumi & Tbilisi'}
            </div>
          </div>
          <span className="text-lg text-[#86868B] group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>

      {/* CTA Box */}
      <div className="mt-12 text-center bg-[#1D1D1F] text-white p-8 rounded-3xl">
        <h3 className="text-2xl font-bold mb-2">{t.termsCtaTitle}</h3>
        <p className="text-xs text-[#86868B] max-w-md mx-auto mb-6">
          {t.termsCtaDesc}
        </p>
        <div className="flex justify-center gap-3">
          <a
            href="https://wa.me/995591050752"
            target="_blank"
            rel="noreferrer"
            className="h-11 px-6 rounded-full bg-[#25D366] text-white text-xs font-bold flex items-center justify-center hover:bg-[#20ba59] transition-transform active:scale-95"
          >
            {t.termsCtaWhatsApp}
          </a>
          <Link
            href="/#catalog"
            className="h-11 px-6 rounded-full bg-white text-[#1D1D1F] text-xs font-bold flex items-center justify-center hover:bg-[#F5F5F7] transition-transform active:scale-95"
          >
            {t.termsCtaCatalog}
          </Link>
        </div>
      </div>
    </div>
  )
}
