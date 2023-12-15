import localFont from 'next/font/local'

import '@/styles/globals.css'

import { cn } from '@/lib/utils'
import Analytics from '@/components/analytics'

const circular = localFont({
  src: [
    { path: '../assets/fonts/CircularStd-Book.woff', weight: '400' },
    {
      path: '../assets/fonts/CircularStd-BookItalic.woff',
      weight: '400',
      style: 'italic'
    },
    { path: '../assets/fonts/CircularStd-Medium.woff', weight: '500' },
    {
      path: '../assets/fonts/CircularStd-MediumItalic.woff',
      weight: '500',
      style: 'italic'
    },
    { path: '../assets/fonts/CircularStd-Bold.woff', weight: '700' },
    {
      path: '../assets/fonts/CircularStd-BoldItalic.woff',
      weight: '700',
      style: 'italic'
    },
    { path: '../assets/fonts/CircularStd-Black.woff', weight: '900' },
    {
      path: '../assets/fonts/CircularStd-BlackItalic.woff',
      weight: '900',
      style: 'italic'
    }
  ]
})

export const metadata = {
  title: {
    default: 'My Spotify Profile',
    template: `%s | My Spotify Profile`
  },
  description: 'Web app for visualising personalised Spotify data',
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components'],
  authors: [
    {
      name: 'Ubong George',
      url: 'https://www.ubonggeorge.com'
    }
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://my-spotify.vercel.app',
    title: 'My Spotify Profile',
    description: 'Web app for visualising personalised Spotify data',
    siteName: 'My Spotify Profile',
    images: 'https://my-spotify.vercel.app/og.png'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Spotify Profile',
    description: 'Web app for visualising personalised Spotify data',
    images: `https://my-spotify.vercel.app/og.png`,
    creator: '@__pragmaticdev'
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `https://my-spotify.vercel.app/site.webmanifest`
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-black-100 text-white antialiased',
          circular.className
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
