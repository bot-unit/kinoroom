export { metadata } from './metadata'
import type { Viewport } from "next";

import './globals.css'

import { Geist, Geist_Mono, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'
import ConsentBanner from '../components/consent-banner'
import Analytics from '../components/analytics'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {/* GA4 via gtag.js */}
        {/* Only loads on client; uses NEXT_PUBLIC_GA_MEASUREMENT_ID */}
        {/* Consent Mode defaults; adjust via your consent UI if needed */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // Consent defaults: deny until user accepts
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            `,
          }}
        />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var id = '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''}';
                if (!id || typeof window === 'undefined') return;
                function gtag(){window.dataLayer && window.dataLayer.push(arguments);} 
                gtag('js', new Date());
                gtag('config', id, { send_page_view: false });
              })();
            `,
          }}
        />
        {children}
        <Analytics />
        <ConsentBanner />
      </body>
    </html>
  )
}
