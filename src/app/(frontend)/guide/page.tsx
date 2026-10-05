import type { Metadata } from 'next'
import React from 'react'
import GuideClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Памятка водителю в Грузии: ПДД, камеры и штрафы | VASILII RENT',
  description:
    'Полезная информация для автопутешествий по Грузии: строго оригинал прав для иностранцев (электронные не принимаются), нештрафуемый лимит +15 км/ч, секционный контроль средней скорости, проверка на police.ge, парковки и бензин.',
  alternates: {
    canonical: '/guide',
  },
  openGraph: mergeOpenGraph({
    title: 'Памятка водителю в Грузии: ПДД, камеры и штрафы — VASILII RENT',
    description:
      'Честный гид для туристов за рулем в Грузии: требование оригинала прав, нештрафуемый лимит +15 км/ч, секционные камеры средней скорости, проверка штрафов на police.ge, парковки и безопасное вождение.',
    url: `${getServerSideURL()}/guide`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Памятка водителю в Грузии: ПДД, камеры и штрафы — VASILII RENT',
    description:
      'Полезная информация для автопутешествий по Грузии от автопроката VASILII RENT.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
}

export default function GuidePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Памятка водителю', url: '/guide' }]} />
      <GuideClient />
    </>
  )
}
