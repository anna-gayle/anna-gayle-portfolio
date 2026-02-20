import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'anna-gayle · terminal',
  description: 'Fancy terminal-style GitHub portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
}