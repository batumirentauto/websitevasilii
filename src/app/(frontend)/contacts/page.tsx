import type { Metadata } from 'next'
import React from 'react'
import ContactsClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'

export const metadata: Metadata = {
  title: 'Пункты выдачи авто и контакты в Батуми, Тбилиси, Кутаиси',
  description:
    'Адреса баз проката автомобилей в Батуми (ул. Мамия Варшанидзе), Тбилиси (ул. Коте Марджанишвили) и международном аэропорту Кутаиси. Точные координаты, телефоны, метки на картах Google и Яндекс.',
  alternates: {
    canonical: '/contacts',
  },
  openGraph: {
    title: 'Пункты выдачи авто и контакты — VASILII RENT',
    description:
      'Офисы проката и круглосуточная выдача авто в Батуми, Тбилиси и аэропорту Кутаиси. Координаты, карты и связь в мессенджерах 24/7.',
    url: `${getServerSideURL()}/contacts`,
  },
}

export default function ContactsPage() {
  return <ContactsClient />
}
