"use client"
import { useEffect, useState } from 'react'
import { setConsent } from '../lib/ga'

const STORAGE_KEY = 'analytics-consent'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'granted' || saved === 'denied') {
      // Apply saved consent immediately
      setConsent({
        analytics_storage: saved as 'granted' | 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
      setVisible(false)
    } else {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, 'granted')
    setConsent({
      analytics_storage: 'granted',
    })
    setVisible(false)
  }

  const decline = () => {
    window.localStorage.setItem(STORAGE_KEY, 'denied')
    setConsent({
      analytics_storage: 'denied',
    })
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl overflow-hidden rounded-t-xl border border-neutral-200 bg-white/95 p-4 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mb-3 flex items-start gap-3">
        <div className="h-6 w-6 shrink-0 rounded-md bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xs font-semibold">GA</div>
        <p className="text-sm text-neutral-800 dark:text-neutral-200">
          Мы используем аналитические cookie-файлы, чтобы понимать, как вы
          используете сайт Kinoroom. Вы можете принять или отклонить сбор
          анонимной статистики. Подробнее —
          <a href="/privacy" className="ml-1 underline underline-offset-2 hover:opacity-80">политика конфиденциальности</a>.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <button
          onClick={decline}
          className="inline-flex items-center rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          Отклонить
        </button>
        <button
          onClick={accept}
          className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:opacity-90 dark:bg-white dark:text-black"
        >
          Принять
        </button>
      </div>
    </div>
  )
}
