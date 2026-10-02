import type { Metadata } from 'next'
import React from 'react'
import PageClient from '../page.client'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Прокат автомобилей в Грузии с подачей в аэропорт Тбилиси — VASILII RENT',
  description:
    'Прокат автомобилей в Тбилиси без залога (0 ₾) и без предоплаты. Выдача с базы на Нуцубидзе, доставка в аэропорт Тбилиси (TBS) и к отелям. Страховка КАСКО + ОСАГО, безлимитный пробег.',
  keywords: [
    'аренда авто тбилиси',
    'прокат авто тбилиси без залога',
    'аренда авто аэропорт тбилиси',
    'прокат автомобилей в грузии с подачей в аэропорт тбилиси',
    'tbilisi car rental',
    'rent a car tbilisi',
  ],
  alternates: {
    canonical: '/tbilisi',
  },
  openGraph: mergeOpenGraph({
    title: 'Прокат автомобилей в Грузии с подачей в аэропорт Тбилиси — VASILII RENT',
    description:
      'Прокат авто в Тбилиси без депозита (0 ₾) и предоплаты. Выдача на Нуцубидзе или в аэропорту Тбилиси (TBS). КАСКО + ОСАГО.',
    url: `${getServerSideURL()}/tbilisi`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Прокат автомобилей в Грузии с подачей в аэропорт Тбилиси — VASILII RENT',
    description:
      'Прокат авто в Тбилиси без депозита (0 ₾). КАСКО + ОСАГО, безлимитный пробег, бесплатный 1-й час продления.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
}

import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

export default function TbilisiPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Аренда авто в Тбилиси', url: '/tbilisi' }]} />
      <PageClient initialCity="tbilisi" />
    </>
  )
}
