import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { OfflineIndicator } from '@/components/common/OfflineIndicator'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Haven - Disaster & Climate Resilience Platform',
  description: 'AI-powered disaster preparedness and climate resilience platform for communities worldwide',
  keywords: 'disaster preparedness, climate resilience, emergency response, AI assistant, weather alerts, Haven',
  authors: [{ name: 'Haven Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Disaster Assistant" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <main className="relative">
              {children}
            </main>
            <Footer />
            <OfflineIndicator />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  fontSize: '14px',
                  maxWidth: '90vw',
                  wordWrap: 'break-word',
                },
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  )
}
