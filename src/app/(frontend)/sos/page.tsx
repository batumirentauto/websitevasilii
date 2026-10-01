import type { Metadata } from 'next'
import React from 'react'
import SosClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Что делать при ДТП в Грузии | Круглосуточная помощь SOS 24/7',
  description:
    'Пошаговый порядок действий при аварии или происшествии на дороге в Грузии. Экстренная служба 112, круглосуточная связь с менеджером VASILII RENT (+995 591 181 430) и координация на месте.',
  alternates: {
    canonical: '/sos',
  },
  openGraph: mergeOpenGraph({
    title: 'Помощь при ДТП и происшествиях в Грузии — VASILII RENT',
    description:
      'Круглосуточная дорожная помощь 24/7. Порядок действий при страховом событии для спокойствия и безопасности на дорогах Грузии.',
    url: `${getServerSideURL()}/sos`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Помощь при ДТП на дорогах Грузии (SOS 24/7) — VASILII RENT',
    description:
      'Круглосуточная экстренная поддержка и координация при страховых случаях на дорогах Грузии.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
}

import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

export default function SosPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Помощь при ДТП (SOS)', url: '/sos' }]} />
      <SosClient />
    </>
  )
}
