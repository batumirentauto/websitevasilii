import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Прокат автомобилей в Грузии от 1 суток без депозита (0 ₾) и без предоплаты. Честные цены, КАСКО + ОСАГО, неограниченный пробег, бесплатный 1-й час продления. Батуми, Тбилиси, Кутаиси.',
  images: [
    {
      url: `${getServerSideURL()}/images/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: 'VASILII RENT — Прокат автомобилей в Грузии',
    },
  ],
  siteName: 'VASILII RENT',
  title: 'Аренда авто в Грузии от 1 дня без залога — VASILII RENT',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
