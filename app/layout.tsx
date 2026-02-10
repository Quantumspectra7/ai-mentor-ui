import React from "react"
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Manrope } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-context'
import { ThemeWrapper } from '@/components/theme-wrapper'

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display'
})

const manrope = Manrope({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body'
})

export const metadata: Metadata = {
  title: 'AI Mentor - Your 90-Day Guide',
  description: 'Your personal AI mentor guiding you through your first 90 days on campus',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#8b5cf6',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
