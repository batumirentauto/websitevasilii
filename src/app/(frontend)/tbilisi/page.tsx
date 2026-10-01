import type { Metadata } from 'next'
import React from 'react'
import PageClient from '../page.client'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Аренда авто в Тбилиси от 1 дня без залога',
  description:
    'Прокат автомобилей в Тбилиси без залога (0 ₾) и без предоплаты. Выдача с базы на Нуцубидзе, доставка в аэропорт Тбилиси (TBS) и к отелям. Страховка КАСКО + ОСАГО, безлимитный пробег.',
  keywords: [
    'аренда авто тбилиси',
    'прокат авто тбилиси без залога',
    'аренда авто аэропорт тбилиси',
    'прокат машин тбилиси',
    'tbilisi car rental',
    'rent a car tbilisi',
  ],
  alternates: {
    canonical: '/tbilisi',
  },
  openGraph: mergeOpenGraph({
    title: 'Аренда авто в Тбилиси от 1 дня без залога — VASILII RENT',
    description:
      'Прокат авто в Тбилиси без депозита (0 ₾) и предоплаты. Выдача на Нуцубидзе или в аэропорту Тбилиси (TBS). КАСКО + ОСАГО.',
    url: `${getServerSideURL()}/tbilisi`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Аренда авто в Тбилиси от 1 дня без залога — VASILII RENT',
    description:
      'Прокат авто в Тбилиси без депозита (0 ₾). КАСКО + ОСАГО, безлимитный пробег, бесплатный 1-й час продления.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
}

export default function TbilisiPage() {
  return <PageClient initialCity="tbilisi" />
}
