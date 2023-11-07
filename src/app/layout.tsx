import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import Providers from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Unsplash Photo Search',
  description: 'Search for photos on Unsplash',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
