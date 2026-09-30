'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import reviewsData from '@/data/reviews.json'

interface ReviewItem {
  id: string
  author: string
  avatarText: string
  avatarBg: string
  reviewsCount: string
  date: string
  rating: number
  car: string
  route: string
  photo: string | null
  tags: string[]
  isLocalExpert?: boolean
  originalLang?: string
  text: string
  ownerReply: {
    date: string
    text: string
  } | null
}

const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/3zfbyPqrpVV4QmAj8?g_st=ic'

export default function ReviewsPage() {
  const { lang, t } = useApp()
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const reviews = reviewsData as ReviewItem[]

  // Filter reviews
  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'photos') return !!r.photo
    if (activeFilter === 'constructive') return r.tags.includes('честный отзыв')
    if (activeFilter === 'intercity') return r.tags.includes('межгород') || r.tags.includes('дальняя поездка')
    if (activeFilter === 'mountains') return r.tags.includes('горы') || r.tags.includes('джип')
    return true
  })

  const photosCount = reviews.filter((r) => !!r.photo).length
  const constructiveCount = reviews.filter((r) => r.tags.includes('честный отзыв')).length

  return (
    <div className="min-h-screen bg-[#F5F5F7] pt-24 pb-20 text-[#1D1D1F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#86868B] mb-6">
          <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
            {t.brandName}
          </Link>
          <span>/</span>
          <span className="text-[#1D1D1F]">{t.navReviews}</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-black/[0.06] shadow-sm mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0FE] text-[#1967D2] text-xs font-bold uppercase tracking-wider mb-4">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>{t.reviewsGoogleBadge}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1D1D1F] mb-3">
                {t.reviewsPageTitle}
              </h1>
              <p className="text-base sm:text-lg text-[#6E6E73] leading-relaxed">
                {t.reviewsPageSubtitle}
              </p>
            </div>

            {/* Google Rating Counter Block */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-[#F9F9FB] rounded-2xl p-5 sm:p-6 border border-black/[0.04]">
              <div className="flex items-center gap-3">
                <span className="text-5xl font-black text-[#1D1D1F] tracking-tighter">4.9</span>
                <div>
                  <div className="flex text-[#FBBC04] text-lg">
                    {'★★★★★'}
                  </div>
                  <span className="text-xs font-semibold text-[#86868B] block mt-0.5">
                    {t.reviewsStatText}
                  </span>
                </div>
              </div>

              <div className="h-10 w-px bg-black/[0.08] hidden sm:block" />

              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#1D1D1F] text-white text-xs font-bold hover:bg-[#0071E3] transition-all shadow-sm group"
              >
                <span>Google Maps</span>
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-black/[0.06]">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#1D1D1F] text-white shadow-xs'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {t.reviewsFilterAll} ({reviews.length})
            </button>
            <button
              onClick={() => setActiveFilter('photos')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'photos'
                  ? 'bg-[#1D1D1F] text-white shadow-xs'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <span>📷</span>
              <span>{t.reviewsFilterPhotos} ({photosCount})</span>
            </button>
            <button
              onClick={() => setActiveFilter('constructive')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'constructive'
                  ? 'bg-[#1D1D1F] text-white shadow-xs'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <span>💬</span>
              <span>{t.reviewsFilterConstructive} ({constructiveCount})</span>
            </button>
            <button
              onClick={() => setActiveFilter('intercity')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'intercity'
                  ? 'bg-[#1D1D1F] text-white shadow-xs'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <span>🛣️</span>
              <span>{t.reviewsFilterIntercity}</span>
            </button>
            <button
              onClick={() => setActiveFilter('mountains')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'mountains'
                  ? 'bg-[#1D1D1F] text-white shadow-xs'
                  : 'bg-[#F5F5F7] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              <span>⛰️</span>
              <span>{t.reviewsFilterMountains}</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl p-6 border border-black/[0.06] shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Author row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-xs shrink-0"
                      style={{ backgroundColor: r.avatarBg }}
                    >
                      {r.avatarText}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#1D1D1F] leading-tight">
                          {r.author}
                        </span>
                        {r.isLocalExpert && (
                          <span
                            title="Местный эксперт Google"
                            className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-[#FBBC04]/15 text-[#E37400] text-[10px] font-extrabold"
                          >
                            ★ Эксперт
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#86868B] block mt-0.5">
                        {r.reviewsCount} • {r.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex text-[#FBBC04] text-xs">
                    {'★★★★★'}
                  </div>
                </div>

                {/* Car & Route Badge */}
                {(r.car || r.route) && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-xs font-semibold mb-3">
                    <span>🚗</span>
                    <span>{r.car}</span>
                    {r.route && (
                      <>
                        <span className="text-[#86868B]">•</span>
                        <span className="text-[#6E6E73]">{r.route}</span>
                      </>
                    )}
                  </div>
                )}

                {/* Review Text */}
                <div className="text-sm text-[#1D1D1F] leading-relaxed whitespace-pre-line mb-4 font-normal">
                  {r.text}
                </div>

                {/* Photo attached */}
                {r.photo && (
                  <div
                    onClick={() => setSelectedPhoto(r.photo)}
                    className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 cursor-pointer group bg-[#E5E5EA]"
                  >
                    <Image
                      src={r.photo}
                      alt={`${r.car} - ${r.author}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs flex items-center gap-1">
                      <span>🔍</span>
                      <span>Увеличить</span>
                    </div>
                  </div>
                )}

                {/* Owner Reply */}
                {r.ownerReply && (
                  <div className="bg-[#F5F5F7] rounded-2xl p-4 border border-black/[0.04] mt-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </div>
                      <span className="text-xs font-bold text-[#1D1D1F]">
                        {t.ownerReplyLabel}
                      </span>
                      <span className="text-[10px] text-[#86868B] ml-auto">
                        {r.ownerReply.date}
                      </span>
                    </div>
                    <p className="text-xs text-[#515154] leading-relaxed">
                      {r.ownerReply.text}
                    </p>
                  </div>
                )}
              </div>

              {/* Card Footer: Verified Badge */}
              <div className="pt-4 mt-4 border-t border-black/[0.04] flex items-center justify-between text-[11px] text-[#86868B]">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 fill-[#34A853]" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>{t.verifiedGoogle}</span>
                </div>
                <a
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0071E3] transition-colors"
                >
                  Google Maps ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-[#1D1D1F] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
              {t.reviewsCtaTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#86868B] leading-relaxed mb-8">
              {t.reviewsCtaDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#catalog"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0071E3] text-white text-sm font-bold hover:bg-[#0077ED] transition-colors shadow-lg shadow-blue-500/20"
              >
                {t.reviewsCtaCatalog}
              </Link>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-bold transition-colors border border-white/10"
              >
                {t.reviewsCtaWrite} ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Fullsize Photo */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full h-[70vh]">
            <Image
              src={selectedPhoto}
              alt="Увеличенное фото отзыва"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white text-xl font-bold flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
