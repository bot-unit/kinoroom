/* Minimal GA4 helpers for Next.js client navigation */

export const GA_MEASUREMENT_ID = 'G-QRG90D0Q8Q'

function hasWindow() {
  return typeof window !== 'undefined'
}

export function gtag(...args: any[]) {
  if (!hasWindow()) return
  ;(window as any).dataLayer = (window as any).dataLayer || []
  ;(window as any).dataLayer.push(args)
}

export function setConsent(values: {
  ad_storage?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
  ad_user_data?: 'granted' | 'denied'
  ad_personalization?: 'granted' | 'denied'
}) {
  gtag('consent', 'update', values)
}

export function trackPageView(url: string) {
  if (!GA_MEASUREMENT_ID) return
  gtag('event', 'page_view', {
    page_location: url,
    page_path: url,
    send_to: GA_MEASUREMENT_ID,
  })
}

export type GAEventParams = {
  action: string
  category?: string
  label?: string
  value?: number
  params?: Record<string, any>
}

export function trackEvent({ action, category, label, value, params }: GAEventParams) {
  if (!GA_MEASUREMENT_ID) return
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
    ...params,
  })
}
