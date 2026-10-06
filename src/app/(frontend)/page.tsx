import type { Metadata } from 'next'
import React from 'react'
import PageClient from './page.client'
import { getServerSideURL } from '@/utilities/getURL'

export const metadata: Metadata = {
  title: 'Car Rental in Georgia from 1 Day (Zero Deposit) | Batumi, Tbilisi, Kutaisi — VASILII RENT',
  description:
    'Car rental in Georgia from 1 day with zero deposit (0 ₾) and no prepayment. Transparent rates, full CDW + TPL insurance, unlimited mileage, free 1st hour extension. Fleet in Batumi, Tbilisi, and Kutaisi Airport.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Car Rental in Georgia from 1 Day (Zero Deposit) — VASILII RENT',
    description:
      'Car rental in Georgia with 0 deposit and zero prepayment. Full CDW + TPL insurance, free 1st hour extension. Batumi, Tbilisi, Kutaisi.',
    url: getServerSideURL(),
  },
}

export default function HomePage() {
  return <PageClient />
}
