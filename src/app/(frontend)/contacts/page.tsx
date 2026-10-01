import type { Metadata } from 'next'
import React from 'react'
import ContactsClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const metadata: Metadata = {
  title: 'Пункты выдачи авто и контакты в Батуми, Тбилиси, Кутаиси',
  description:
    'Адреса баз проката автомобилей в Батуми (ул. Мамия Варшанидзе 154), Тбилиси (ул. Коте Марджанишвили) и международном аэропорту Кутаиси. Точные координаты, телефоны, метки на картах Google и Яндекс.',
  alternates: {
    canonical: '/contacts',
  },
  openGraph: mergeOpenGraph({
    title: 'Пункты выдачи авто и контакты — VASILII RENT',
    description:
      'Офисы проката и круглосуточная выдача авто в Батуми, Тбилиси и аэропорту Кутаиси. Координаты, карты и связь в мессенджерах 24/7.',
    url: `${getServerSideURL()}/contacts`,
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Пункты выдачи авто и контакты — VASILII RENT',
    description:
      'Офисы проката авто в Батуми, Тбилиси и аэропорту Кутаиси. Точные координаты и связь 24/7.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
}

export default function ContactsPage() {
  return <ContactsClient />
}
