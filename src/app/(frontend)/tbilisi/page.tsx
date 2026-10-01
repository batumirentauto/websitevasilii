import type { Metadata } from 'next'
import React from 'react'
import PageClient from '../page.client'
import { getServerSideURL } from '@/utilities/getURL'

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
  openGraph: {
    title: 'Аренда авто в Тбилиси от 1 дня без залога — VASILII RENT',
    description:
      'Прокат авто в Тбилиси без депозита (0 ₾) и предоплаты. Выдача на Нуцубидзе или в аэропорту Тбилиси (TBS). КАСКО + ОСАГО.',
    url: `${getServerSideURL()}/tbilisi`,
  },
}

export default function TbilisiPage() {
  return (
    <PageClient
      initialCity="tbilisi"
      customTitle="Аренда авто в Тбилиси от 1 дня без залога — VASILII RENT"
      customH1="Аренда автомобилей в Тбилиси от 1 дня без залога"
      customSubtitle="Надежные автомобили для поездок по Тбилиси, в Казбеги, Кахетию, Боржоми и Гудаури. Без депозита на карте, со страховкой КАСКО + ОСАГО и бесплатным 1-м часом продления."
    />
  )
}
