import type { Metadata } from 'next'
import React from 'react'
import PageClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'

export const metadata: Metadata = {
  title: 'Аренда авто в Грузии от 1 дня без залога | Батуми, Тбилиси, Кутаиси — VASILII RENT',
  description:
    'Прокат автомобилей в Грузии от 1 суток без депозита (0 ₾) и без предоплаты. Честные цены, КАСКО + ОСАГО, неограниченный пробег, бесплатный 1-й час продления. Автопарк в Батуми, Тбилиси и аэропорту Кутаиси.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Аренда авто в Грузии от 1 дня без залога — VASILII RENT',
    description:
      'Прокат автомобилей в Грузии от 1 суток без депозита (0 ₾) и без предоплаты. Честные цены, КАСКО + ОСАГО, бесплатный 1-й час продления. Батуми, Тбилиси, Кутаиси.',
    url: getServerSideURL(),
  },
}

export default function HomePage() {
  return <PageClient />
}
