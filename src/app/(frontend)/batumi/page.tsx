import type { Metadata } from 'next'
import React from 'react'
import PageClient from '../page.client'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Прокат авто в Батуми от 1 дня без залога',
  description:
    'Аренда автомобилей в Батуми от 1 суток без депозита (0 ₾) и без предоплаты. База на ул. Мамия Варшанидзе 154, бесплатная подача в аэропорт Батуми. Страховка КАСКО + ОСАГО, неограниченный пробег.',
  keywords: [
    'аренда авто батуми',
    'прокат авто батуми без залога',
    'аренда авто батуми аэропорт',
    'прокат авто батуми дешево',
    'batumi car rental',
    'rent a car batumi zero deposit',
  ],
  alternates: {
    canonical: '/batumi',
  },
  openGraph: mergeOpenGraph({
    title: 'Прокат авто в Батуми от 1 дня без залога — VASILII RENT',
    description:
      'Аренда авто в Батуми от 1 суток без залога и предоплаты. Выдача на ул. Мамия Варшанидзе 154 или в аэропорту Батуми. КАСКО + ОСАГО.',
    url: `${getServerSideURL()}/batumi`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Прокат авто в Батуми от 1 дня без залога — VASILII RENT',
    description:
      'Аренда авто в Батуми от 1 суток без депозита (0 ₾). КАСКО + ОСАГО, неограниченный пробег, бесплатный 1-й час продления.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
}

export default function BatumiPage() {
  return <PageClient initialCity="batumi" />
}
