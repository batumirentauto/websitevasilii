'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { TRANSLATIONS } from '@/context/translations'
import reviewsData from '@/data/reviews.json'

export default function ReviewsSection() {
  const { lang, t: contextT } = useApp()
  const t = contextT || TRANSLATIONS[lang] || TRANSLATIONS.ru

  // Curate top 4 high-impact reviews for the homepage
  const featuredReviews = reviewsData.filter((r) =>
    ['review-2', 'review-1', 'review-3', 'review-4'].includes(r.id)
  )

  return (
    <section className="py-20 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1967D2] text-xs font-bold uppercase tracking-wider mb-3">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>{t.reviewsGoogleBadge} • 4.9 ★★★★★</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F]">
              {t.reviewsHomeTitle}
            </h2>
            <p className="text-base text-[#6E6E73] mt-2 max-w-2xl">
              {t.reviewsHomeSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1D1D1F] text-white text-xs font-bold hover:bg-[#0071E3] transition-colors shadow-sm"
            >
              <span>{t.allReviewsLink}</span>
            </Link>
          </div>
        </div>

        {/* Featured Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredReviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300 group"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: r.avatarBg }}
                    >
                      {r.avatarText}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#1D1D1F] line-clamp-1">
                          {r.author}
                        </span>
                        {r.isLocalExpert && (
                          <span className="text-[10px] text-[#FBBC04]" title="Местный эксперт">★</span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#86868B] block">
                        {r.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-[#FBBC04] text-xs">
                    {'★★★★★'}
                  </div>
                </div>

                {/* Car & Route Pill */}
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5F5F7] text-[11px] font-semibold text-[#1D1D1F] mb-3">
                  <span>🚗</span>
                  <span className="line-clamp-1">{r.car}</span>
                </div>

                {/* Photo Thumbnail if exists */}
                {r.photo && (
                  <Link
                    href="/reviews"
                    className="relative block w-full h-36 rounded-2xl overflow-hidden mb-3 bg-[#E5E5EA]"
                  >
                    <Image
                      src={r.photo}
                      alt={r.car}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}

                {/* Review Text Preview */}
                <p className="text-xs text-[#515154] leading-relaxed line-clamp-4 font-normal">
                  {r.text}
                </p>
              </div>

              {/* Verified footer */}
              <div className="pt-3 mt-4 border-t border-black/[0.04] flex items-center justify-between text-[10px] text-[#86868B]">
                <span className="flex items-center gap-1 text-[#34A853] font-semibold">
                  <span>✓</span>
                  <span>{t.verifiedGoogle}</span>
                </span>
                <Link href="/reviews" className="hover:text-[#0071E3] font-semibold">
                  Подробнее →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
