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

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="ru" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
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
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
