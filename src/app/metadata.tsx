import type { Metadata } from 'next'

export const metadata = {
  title: 'Kinoroom',
  description: 'Weekly curated movie lists, recommendations to help you discover your next favorite film.',
  generator: 'AI Powered by GitHub Copilot',
  keywords: [
    "movies",
    "film recommendations",
    "what to watch",
    "best movies",
    "best directors",
    "evening watchlist",
    "movie lists",
    "cinema",
    "film reviews",
    "top rated movies",
    "hidden gems"
  ],
  metadataBase: new URL("https://kinoroom-559d8.web.app/"),
  openGraph: {
    url: "https://kinoroom-559d8.web.app/",
    type: "website",
    title: "Kinoroom - Weekly Curated Movie Lists",
    description:
      "Weekly curated movie lists, recommendations to help you discover your next favorite film.",
    images: [
      {
        url: "https://kinoroom-559d8.web.app/og-image.png",
        width: 930,
        height: 455,
        alt: "Kinoroom"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinoroom - Weekly Curated Movie Lists",
    description:
      "Weekly curated movie lists, recommendations to help you discover your next favorite film.",
    images: [
      {
        url: "https://kinoroom-559d8.web.app/og-image.png",
        width: 930,
        height: 455,
        alt: "Kinoroom"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
  applicationName: "Kinoroom",
  appleWebApp: {
    title: "Kinoroom",
    statusBarStyle: "default",
    capable: true
  },
  /*
  verification: {
    google: "YOUR_DATA",
    yandex: ["YOUR_DATA"],
    other: {
      "msvalidate.01": ["YOUR_DATA"],
      "facebook-domain-verification": ["YOUR_DATA"]
    }
  },*/

} satisfies Metadata