import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Прокат автомобилей в Грузии от 1 дня без залога. Аренда авто в Батуми, Тбилиси, Кутаиси.',
  images: [
    {
      url: `${getServerSideURL()}/images/hero-georgia.jpg`,
    },
  ],
  siteName: 'VSL Car Rental Georgia',
  title: 'Прокат автомобилей в Грузии от 1 дня',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
