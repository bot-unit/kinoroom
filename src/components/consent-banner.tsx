"use client";
import { useEffect, useState } from "react";
import { setConsent, GA_MEASUREMENT_ID } from "../lib/ga";
// Добавляем объявление window.gtag для TypeScript
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

const STORAGE_KEY = "analytics-consent";
const STORAGE_TIME_KEY = "analytics-consent-timestamp";
const DENIED_TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24 часа

export default function ConsentBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = window.localStorage.getItem(STORAGE_KEY);
        const savedTime = window.localStorage.getItem(STORAGE_TIME_KEY);
        // По умолчанию: разрешаем аналитику, запрещаем рекламу
        setConsent({
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
        });
        // Если пользователь запретил — запрещаем всё
        if (saved === 'denied') {
            const deniedAt = savedTime ? parseInt(savedTime, 10) : 0;
            if (!deniedAt || Date.now() - deniedAt > DENIED_TIMEOUT_MS) {
                setVisible(true);
            } else {
                setConsent({
                    analytics_storage: 'denied',
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied',
                });
                setVisible(false);
            }
        } else if (saved === 'granted') {
            // Если пользователь дал согласие — ничего не меняем
            setVisible(false);
        } else {
            // Нет данных — показываем баннер
            setVisible(true);
        }
    }, []);

    const accept = () => {
        window.localStorage.setItem(STORAGE_KEY, 'granted')
        window.localStorage.removeItem(STORAGE_TIME_KEY)
        const consentObj = {
            analytics_storage: 'granted' as const,
            ad_storage: 'granted' as const,
            ad_user_data: 'granted' as const,
            ad_personalization: 'granted' as const,
        }
        const trySetConsentAndConfig = (attempt = 0) => {
            setConsent(consentObj)
            if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
                window.gtag('config', GA_MEASUREMENT_ID)
                console.log('[ConsentBanner] gtag config отправлен после согласия')
            } else if (attempt < 10) {
                setTimeout(() => trySetConsentAndConfig(attempt + 1), 300)
                if (attempt === 0) console.log('[ConsentBanner] gtag не найден, повторяем попытку...')
            } else {
                console.warn('[ConsentBanner] gtag так и не был найден после 10 попыток')
            }
        }
        trySetConsentAndConfig()
    };

    const decline = () => {
        window.localStorage.setItem(STORAGE_KEY, "denied");
        window.localStorage.setItem(STORAGE_TIME_KEY, Date.now().toString());
        setConsent({
            analytics_storage: 'denied' as const,
            ad_storage: 'denied' as const,
            ad_user_data: 'denied' as const,
            ad_personalization: 'denied' as const,
        });
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-3xl overflow-hidden rounded-t-xl border border-neutral-200 bg-white/95 p-4 shadow-xl backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-neutral-800 dark:bg-neutral-950/90">
            <div className="mb-3 flex items-start gap-3">
                <div className="h-6 w-6 shrink-0 rounded-md bg-black text-white dark:bg-white dark:text-black flex items-center justify-center text-xs font-semibold">
                    GA
                </div>
                <p className="text-sm text-neutral-800 dark:text-neutral-200">
                    Мы используем аналитические cookie-файлы, чтобы понимать,
                    как вы используете сайт Kinoroom. Вы можете принять или
                    отклонить сбор анонимной статистики. Подробнее —
                    <a
                        href="/privacy"
                        className="ml-1 underline underline-offset-2 hover:opacity-80"
                    >
                        политика конфиденциальности
                    </a>
                    .
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
    );
}
