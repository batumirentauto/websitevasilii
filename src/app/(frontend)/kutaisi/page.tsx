import type { Metadata } from 'next'
import React from 'react'
import PageClient from '../page.client'
import { getServerSideURL } from '@/utilities/getURL'

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
  openGraph: {
    title: 'Прокат авто в аэропорту Кутаиси от 1 дня — VASILII RENT',
    description:
      'Круглосуточная встреча у терминала прилёта в аэропорту Кутаиси (KUT). Прокат авто без депозита (0 ₾) и предоплаты, КАСКО + ОСАГО.',
    url: `${getServerSideURL()}/kutaisi`,
  },
}

export default function KutaisiPage() {
  return (
    <PageClient
      initialCity="kutaisi"
      customTitle="Прокат авто в аэропорту Кутаиси от 1 дня без залога — VASILII RENT"
      customH1="Прокат авто в аэропорту Кутаиси от 1 дня без залога"
      customSubtitle="Встречаем у терминала прилёта 24/7 под ваш рейс. Быстрое оформление за 10 минут, страховка КАСКО + ОСАГО включена, без залога и с возможностью возврата в Батуми или Тбилиси."
    />
  )
}
