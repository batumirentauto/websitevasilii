import type { Metadata } from 'next'
import React from 'react'
import FaqClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Часто задаваемые вопросы (FAQ) об аренде авто в Грузии | VASILII RENT',
  description:
    'Ответы на популярные вопросы об аренде авто в Батуми, Тбилиси и Кутаиси: 0 залог, оплата в рублях и USDT, оригинал прав, страховка КАСКО без франшизы, доставка в аэропорт и возврат в другом городе.',
  alternates: {
    canonical: '/faq',
  },
  openGraph: mergeOpenGraph({
    title: 'Часто задаваемые вопросы (FAQ) об аренде авто в Грузии — VASILII RENT',
    description:
      'Реальные ответы на вопросы клиентов: залог, оплата картами/наличными/USDT, документы, поездки по всей Грузии, страховка и возврат между городами.',
    url: `${getServerSideURL()}/faq`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Часто задаваемые вопросы (FAQ) — VASILII RENT',
    description: 'Ответы на все вопросы об аренде авто в Грузии без залога.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
}

export default function FaqPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Частые вопросы (FAQ)', url: '/faq' }]} />
      <FaqClient />
    </>
  )
}
