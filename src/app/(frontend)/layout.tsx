import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { draftMode } from 'next/headers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import './globals.css'

import { AdminBar } from '@/components/AdminBar'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MobileFloatingBar } from '@/components/MobileFloatingBar'
import { AppProvider } from '@/context/AppContext'
import { JsonLd } from '@/components/JsonLd'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.svg?v=20261001-v2" rel="icon" type="image/svg+xml" />
        <link href="/favicon-32x32.png?v=20261001-v2" rel="icon" type="image/png" sizes="32x32" />
        <link href="/favicon-16x16.png?v=20261001-v2" rel="icon" type="image/png" sizes="16x16" />
        <link href="/favicon.ico?v=20261001-v2" rel="icon" sizes="any" />
        <link href="/favicon.ico?v=20261001-v2" rel="shortcut icon" />
        <link href="/apple-touch-icon.png?v=20261001-v2" rel="apple-touch-icon" sizes="180x180" />
        <link href="/apple-touch-icon-precomposed.png?v=20261001-v2" rel="apple-touch-icon-precomposed" sizes="180x180" />
        <JsonLd />
      </head>
      <body className="bg-[#FFFFFF] text-[#1D1D1F] antialiased selection:bg-black selection:text-white">
        <AppProvider>
          <Providers>
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />

            <Header />
            <main className="pt-16 min-h-screen">{children}</main>
            <Footer />
            <MobileFloatingBar />
          </Providers>
        </AppProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Аренда авто в Грузии от 1 дня без залога | Батуми, Тбилиси, Кутаиси — VASILII RENT',
    template: '%s | VASILII RENT',
  },
  description:
    'Прокат автомобилей в Грузии от 1 суток без депозита (0 ₾) и без предоплаты. Честные цены, страховка КАСКО + ОСАГО, неограниченный пробег, бесплатный 1-й час продления. Автопарк в Батуми, Тбилиси и аэропорту Кутаиси.',
  keywords: [
    'аренда авто в грузии',
    'прокат авто батуми',
    'аренда авто тбилиси',
    'прокат авто аэропорт кутаиси',
    'аренда авто без залога грузия',
    'прокат машин без депозита',
    'аренда авто каско осаго',
    'car rental georgia',
    'car hire batumi',
    'tbilisi car rental',
    'kutaisi airport car hire',
    'rent a car batumi',
  ],
  authors: [{ name: 'VASILII RENT', url: getServerSideURL() }],
  creator: 'VASILII RENT',
  publisher: 'VASILII RENT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: mergeOpenGraph({
    title: 'Аренда авто в Грузии от 1 дня без залога — VASILII RENT',
    description:
      'Прокат автомобилей в Грузии от 1 суток без депозита (0 ₾) и без предоплаты. Честные цены, КАСКО + ОСАГО, бесплатный 1-й час продления. Батуми, Тбилиси, Кутаиси.',
    url: getServerSideURL(),
    siteName: 'VASILII RENT',
    locale: 'ru_RU',
    type: 'website',
    images: [
      {
        url: `${getServerSideURL()}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'VASILII RENT — Прокат автомобилей в Грузии',
      },
    ],
  }),
  twitter: {
    card: 'summary_large_image',
    title: 'Аренда авто в Грузии от 1 дня без залога — VASILII RENT',
    description:
      'Прокат автомобилей в Грузии от 1 суток без депозита (0 ₾) и без предоплаты. Батуми, Тбилиси, Кутаиси.',
    images: [`${getServerSideURL()}/images/og-image.jpg`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg?v=20261001-v2', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png?v=20261001-v2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=20261001-v2', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico?v=20261001-v2', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=20261001-v2', sizes: '180x180' },
      { url: '/apple-touch-icon-precomposed.png?v=20261001-v2', sizes: '180x180' },
    ],
    shortcut: ['/favicon.ico?v=20261001-v2'],
  },
}
