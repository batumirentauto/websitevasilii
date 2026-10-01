import type { Metadata } from 'next'
import React from 'react'
import PageClient from '../page.client'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Прокат авто в аэропорту Кутаиси от 1 дня без залога',
  description:
    'Аренда автомобилей в Международном аэропорту Кутаиси (KUT) без залога (0 ₾) и без предоплаты. Круглосуточная встреча у терминала прилёта. Страховка КАСКО + ОСАГО, неограниченный пробег.',
  keywords: [
    'аренда авто кутаиси',
    'прокат авто аэропорт кутаиси',
    'аренда авто кутаиси без залога',
    'kutaisi airport car rental',
    'kutaisi car hire zero deposit',
  ],
  alternates: {
    canonical: '/kutaisi',
  },
  openGraph: mergeOpenGraph({
    title: 'Прокат авто в аэропорту Кутаиси от 1 дня — VASILII RENT',
    description:
      'Круглосуточная встреча у терминала прилёта в аэропорту Кутаиси (KUT). Прокат авто без депозита (0 ₾) и предоплаты, КАСКО + ОСАГО.',
    url: `${getServerSideURL()}/kutaisi`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Прокат авто в аэропорту Кутаиси от 1 дня — VASILII RENT',
    description:
      'Круглосуточная подача в аэропорт Кутаиси (KUT). Без залога (0 ₾), КАСКО + ОСАГО, возможность возврата в Батуми или Тбилиси.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
}

export default function KutaisiPage() {
  return <PageClient initialCity="kutaisi" />
}
