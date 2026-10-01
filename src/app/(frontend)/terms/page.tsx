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
              <span>{t.termReq3}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
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
