import type { Metadata } from 'next'
import React from 'react'
import TermsClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'

export const metadata: Metadata = {
  title: 'Условия аренды авто в Грузии без залога',
  description:
    'Прозрачные условия проката автомобилей в Грузии: возраст от 21 года, стаж от 0 лет, страховка КАСКО + ОСАГО без франшизы (от 2 лет стажа), бесплатный 1-й час продления и честные почасовые тарифы.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Условия аренды авто в Грузии без залога — VASILII RENT',
    description:
      'Прозрачные условия проката: без депозита, стаж от 0 лет, страховка КАСКО + ОСАГО, выезд по всей Грузии, почасовое продление до 7 часов.',
    url: `${getServerSideURL()}/terms`,
  },
}

export default function TermsPage() {
  return <TermsClient />
}
