import type { Metadata } from 'next'
import React from 'react'
import ReviewsClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'

export const metadata: Metadata = {
  title: 'Отзывы клиентов об аренде авто в Грузии (рейтинг 5.0)',
  description:
    'Реальные отзывы туристов и путешественников об аренде автомобилей в Грузии от компании VASILII RENT. Честные впечатления о сервисе, состоянии машин и маршрутах по всей стране.',
  alternates: {
    canonical: '/reviews',
  },
  openGraph: {
    title: 'Отзывы клиентов об аренде авто — VASILII RENT',
    description:
      'Оценка 5.0 на основе сотен отзывов. Узнайте реальный опыт клиентов проката автомобилей в Батуми, Тбилиси и Кутаиси.',
    url: `${getServerSideURL()}/reviews`,
  },
}

export default function ReviewsPage() {
  return <ReviewsClient />
}
