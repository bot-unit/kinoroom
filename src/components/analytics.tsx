"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '../lib/ga'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!pathname) return
    // Ждём 400мс, чтобы дать ConsentBanner выставить consent
    const timeout = setTimeout(() => {
      const consent = window.localStorage.getItem('analytics-consent')
      if (consent === 'granted') {
        console.log('[Analytics] page_view sent:', window.location.href)
        trackPageView(window.location.href)
      } else {
        console.log('[Analytics] page_view NOT sent (no consent):', window.location.href)
      }
    }, 600)
    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
