"use client"
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from '../lib/ga'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!pathname) return
    trackPageView(window.location.href)
  }, [pathname])

  return null
}
