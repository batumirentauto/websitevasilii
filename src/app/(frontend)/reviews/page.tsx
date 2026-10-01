import type { Metadata } from 'next'
import React from 'react'
import ReviewsClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Отзывы клиентов об аренде авто в Грузии (рейтинг 5.0)',
  description:
    'Реальные отзывы туристов и путешественников об аренде автомобилей в Грузии от компании VASILII RENT. Честные впечатления о сервисе, состоянии машин и маршрутах по всей стране.',
  alternates: {
    canonical: '/reviews',
  },
  openGraph: mergeOpenGraph({
    title: 'Отзывы клиентов об аренде авто — VASILII RENT',
    description:
      'Оценка 5.0 на основе сотен отзывов. Узнайте реальный опыт клиентов проката автомобилей в Батуми, Тбилиси и Кутаиси.',
    url: `${getServerSideURL()}/reviews`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Отзывы об аренде авто в Грузии (5.0) — VASILII RENT',
    description:
      'Реальные отзывы туристов с фото об аренде авто без залога в Батуми, Тбилиси и Кутаиси.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
}

import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

export default function ReviewsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Отзывы клиентов', url: '/reviews' }]} />
      <ReviewsClient />
    </>
  )
}
