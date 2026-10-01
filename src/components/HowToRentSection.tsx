'use client'

import React from 'react'
import { useAppContext } from '@/context/AppContext'

/**
 * HowToRentSection (3 простых шага аренды)
 * Сохранен как отдельный компонент для возможности быстро вернуть и модифицировать блок.
 */
export const HowToRentSection: React.FC = () => {
  const { t } = useAppContext()

  return (
    <section className="bg-[#F5F5F7] py-20 border-y border-black/[0.05]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight mb-2">
            {t.howToRentTitle}
          </h2>
          <p className="text-xs text-[#86868B]">{t.howToRentSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">
                {t.step1Tag}
              </span>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">{t.step1Title}</h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {t.step1Desc}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">
                {t.step2Tag}
              </span>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">{t.step2Title}</h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {t.step2Desc}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-black/[0.06] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#86868B] uppercase tracking-wider block mb-2">
                {t.step3Tag}
              </span>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-2">{t.step3Title}</h3>
              <p className="text-xs text-[#6E6E73] leading-relaxed">
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
